import { nanoid } from 'nanoid';

// Simple localStorage-backed mock DB
const DB_KEYS = {
  USERS: 'awb_users',
  SITES: 'awb_sites',
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const mockAuthApi = {
  async signup({ name, email, password }) {
    await delay(600);
    const users = read(DB_KEYS.USERS, []);
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }
    const newUser = { id: nanoid(), name, email };
    users.push({ ...newUser, password });
    write(DB_KEYS.USERS, users);
    return newUser;
  },
  async login({ email, password }) {
    await delay(500);
    const users = read(DB_KEYS.USERS, []);
    const match = users.find(u => u.email === email && u.password === password);
    if (!match) throw new Error('Invalid credentials');
    const { password: _, ...safe } = match;
    return safe;
  }
};

export const mockSitesApi = {
  async listSites(userId) {
    await delay(400);
    const sites = read(DB_KEYS.SITES, []);
    return sites.filter(s => s.userId === userId);
  },
  async createSite({ userId, business, templateId, content }) {
    await delay(900);
    const sites = read(DB_KEYS.SITES, []);
    const site = { id: nanoid(), userId, business, templateId, content, createdAt: Date.now() };
    sites.push(site);
    write(DB_KEYS.SITES, sites);
    return site;
  },
  async getSite(siteId) {
    await delay(300);
    const sites = read(DB_KEYS.SITES, []);
    return sites.find(s => s.id === siteId);
  },
  async updateSite(siteId, update) {
    await delay(300);
    const sites = read(DB_KEYS.SITES, []);
    const idx = sites.findIndex(s => s.id === siteId);
    if (idx >= 0) {
      sites[idx] = { ...sites[idx], ...update };
      write(DB_KEYS.SITES, sites);
    }
    return sites[idx];
  }
};

export async function simulateAiContent({ businessName, description }) {
  await delay(1200);
  return {
    about: `Welcome to ${businessName}. ${description} We are committed to excellence and customer satisfaction.`,
    services: [
      'Consulting and Strategy',
      'Design and Development',
      'Marketing and Analytics',
    ],
  };
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
