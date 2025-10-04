import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

// Axios client placeholder for future backend
export const client = axios.create({ baseURL: '/api' })

const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

const keyForWebsites = (email) => `websites:${email}`

export async function login({ email, password }) {
  await sleep(600)
  if (!email || !password) {
    throw new Error('Please enter email and password')
  }
  return { user: { name: email.split('@')[0] || 'User', email } }
}

export async function signup({ name, email, password }) {
  await sleep(800)
  if (!name || !email || !password) {
    throw new Error('All fields are required')
  }
  return { user: { name, email } }
}

export async function getWebsites(email) {
  await sleep(300)
  const raw = localStorage.getItem(keyForWebsites(email))
  return raw ? JSON.parse(raw) : []
}

function saveWebsites(email, websites) {
  localStorage.setItem(keyForWebsites(email), JSON.stringify(websites))
}

export async function createWebsite(email, data) {
  await sleep(1000)
  const websites = await getWebsites(email)
  const website = {
    id: uuidv4(),
    ownerEmail: email,
    businessName: data.businessName,
    description: data.description,
    logoDataUrl: data.logoDataUrl || null,
    contactEmail: data.contactEmail || '',
    contactPhone: data.contactPhone || '',
    templateId: data.templateId || 'classic',
    sections: data.sections || { about: '', services: [] },
    createdAt: new Date().toISOString(),
  }
  const next = [website, ...websites]
  saveWebsites(email, next)
  return website
}

export async function updateWebsite(email, id, updates) {
  await sleep(400)
  const websites = await getWebsites(email)
  const idx = websites.findIndex((w) => w.id === id)
  if (idx === -1) throw new Error('Website not found')
  const updated = { ...websites[idx], ...updates }
  const next = [...websites]
  next[idx] = updated
  saveWebsites(email, next)
  return updated
}

export async function deleteWebsite(email, id) {
  await sleep(300)
  const websites = await getWebsites(email)
  const next = websites.filter((w) => w.id !== id)
  saveWebsites(email, next)
  return { ok: true }
}

export async function getWebsiteById(email, id) {
  await sleep(200)
  const websites = await getWebsites(email)
  return websites.find((w) => w.id === id) || null
}

export async function generateAIContent({ businessName, description }) {
  await sleep(1200)
  const about = `${businessName} is committed to excellence. ${description || ''}`.trim()
  const services = [
    'Consultation and Strategy',
    'Design and Development',
    'Optimization and Analytics',
  ]
  return { about, services }
}
