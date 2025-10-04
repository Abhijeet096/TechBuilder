import { z } from 'zod';
import { Site } from '../models/Site.js';

const createSchema = z.object({
  userId: z.string(),
  templateId: z.string().optional(),
  business: z.object({
    name: z.string(),
    description: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    logo: z.string().url().optional(),
  }),
  content: z.object({
    about: z.string().optional(),
    services: z.array(z.string()).optional(),
  }).optional(),
});

export async function list(req, res) {
  const { userId } = req.query;
  const q = userId ? { userId } : {};
  const items = await Site.find(q).sort({ createdAt: -1 });
  res.json(items);
}

export async function get(req, res) {
  const item = await Site.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
}

export async function create(req, res) {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
  const created = await Site.create(parsed.data);
  res.status(201).json(created);
}

export async function update(req, res) {
  const { id } = req.params;
  const updated = await Site.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
}

export async function remove(req, res) {
  const { id } = req.params;
  const deleted = await Site.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
}
