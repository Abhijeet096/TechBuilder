import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const EVENT_PATH = process.env.GITHUB_EVENT_PATH;

async function main() {
  if (!EVENT_PATH) {
    console.error('GITHUB_EVENT_PATH not set.');
    process.exit(1);
  }
  const event = JSON.parse(await BunOrNode.readFile(EVENT_PATH));
  if (!event.pull_request) {
    console.log('Not a pull_request event. Skipping.');
    return;
  }

  const owner = event.repository.owner.login;
  const repo = event.repository.name;
  const pull_number = event.pull_request.number;
  const prTitle = event.pull_request.title || '';
  const prBody = event.pull_request.body || '';
  const isFork = Boolean(event.pull_request.head?.repo?.fork);

  if (!GITHUB_TOKEN) {
    console.error('GITHUB_TOKEN not provided.');
    process.exit(1);
  }

  // Fetch changed files with diffs
  const diffs = await gatherPullRequestDiffs({ owner, repo, pull_number, token: GITHUB_TOKEN });
  const diffText = diffs.map(f => `FILE: ${f.filename}\nSTATUS: ${f.status}\n${f.patch ? f.patch : ''}`).join('\n\n---\n\n');

  let reviewText = '';
  if (!OPENAI_API_KEY) {
    reviewText = [
      '**Automated review notice**',
      '',
      'OPENAI_API_KEY is not configured for this repository. Please add a repository secret named OPENAI_API_KEY to enable automated PR reviews.'
    ].join('\n');
  } else {
    const client = new OpenAI({ apiKey: OPENAI_API_KEY });

    const prompt = buildPrompt({ prTitle, prBody, owner, repo, pull_number, diffText });

    try {
      const completion = await client.chat.completions.create({
        model: 'gpt-5-high',
        temperature: 0.2,
        messages: [
          { role: 'system', content: 'You are a seasoned staff engineer. Provide concise, high-signal PR feedback. Focus on correctness, security, accessibility, performance, and maintainability. Suggest concrete improvements. Use markdown with short bullet points. Reference files and lines where possible.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1800,
      });
      reviewText = completion.choices?.[0]?.message?.content?.trim() || 'No feedback produced.';
    } catch (err) {
      console.error('OpenAI call failed:', err.message);
      reviewText = `Failed to get model review: ${err.message}`;
    }
  }

  // Post comment to PR
  await postIssueComment({ owner, repo, issue_number: pull_number, token: GITHUB_TOKEN, body: `🤖 PR Review by gpt-5-high\n\n${reviewText}` });

  // Optionally add a label that review ran
  try {
    await addLabels({ owner, repo, issue_number: pull_number, token: GITHUB_TOKEN, labels: ['ai-reviewed'] });
  } catch (e) {
    // non-fatal
  }
}

function buildPrompt({ prTitle, prBody, owner, repo, pull_number, diffText }) {
  const header = `Repository: ${owner}/${repo}\nPR #${pull_number}\nTitle: ${prTitle}\nDescription: ${prBody || '(no description)'}\n`;
  const truncated = diffText.length > 120000 ? diffText.slice(0, 120000) + '\n\n[Diff truncated for length]' : diffText;
  return `${header}\n\nPlease review the following diffs and provide specific, actionable feedback.\n\n${truncated}`;
}

async function gatherPullRequestDiffs({ owner, repo, pull_number, token }) {
  const results = [];
  let page = 1;
  while (page < 20) { // up to 2000 files safety cap
    const res = await ghRequest(`https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/files?per_page=100&page=${page}`, token);
    if (!Array.isArray(res) || res.length === 0) break;
    results.push(...res);
    if (res.length < 100) break;
    page += 1;
  }
  return results;
}

async function postIssueComment({ owner, repo, issue_number, token, body }) {
  return ghRequest(`https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}/comments`, token, {
    method: 'POST',
    body: JSON.stringify({ body })
  });
}

async function addLabels({ owner, repo, issue_number, token, labels }) {
  return ghRequest(`https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}/labels`, token, {
    method: 'POST',
    body: JSON.stringify({ labels })
  });
}

async function ghRequest(url, token, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'gpt-5-high-pr-review-agent',
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${text}`);
  }
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }
  return res.text();
}

const BunOrNode = {
  async readFile(path) {
    if (typeof Bun !== 'undefined' && Bun.file) {
      const file = Bun.file(path);
      return await file.text();
    }
    const fs = await import('node:fs/promises');
    return fs.readFile(path, 'utf8');
  }
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
