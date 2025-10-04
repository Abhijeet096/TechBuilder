import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import { User } from '../models/User.js';
import { sendMail } from '../utils/mailer.js';

const signupSchema = z.object({ name: z.string(), email: z.string().email(), password: z.string().min(6) });
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

function signToken(user) {
  const payload = { sub: user.id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export async function signup(req, res) {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
  const { name, email, password } = parsed.data;
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'Email already in use' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });
  const token = signToken(user);
  try { await sendMail({ to: email, subject: 'Welcome to AI Website Builder', text: `Hi ${name}, welcome!` }); } catch {}
  res.status(201).json({ token, user: { id: user.id, name, email } });
}

export async function login(req, res) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.message });
  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = signToken(user);
  try { await sendMail({ to: email, subject: 'Login notification', text: `Login successful` }); } catch {}
  res.json({ token, user: { id: user.id, name: user.name, email } });
}

export async function requestReset(req, res) {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email required' });
  const user = await User.findOne({ email });
  if (!user) return res.json({ ok: true });
  user.resetToken = crypto.randomBytes(24).toString('hex');
  user.resetTokenExp = new Date(Date.now() + 1000 * 60 * 30);
  await user.save();
  const link = `${process.env.APP_ORIGIN || 'http://localhost:5173'}/reset?token=${user.resetToken}`;
  try { await sendMail({ to: email, subject: 'Password reset', text: `Reset your password: ${link}` }); } catch {}
  res.json({ ok: true });
}

export async function resetPassword(req, res) {
  const { token, password } = req.body || {};
  if (!token || !password) return res.status(400).json({ error: 'Token and password required' });
  const user = await User.findOne({ resetToken: token, resetTokenExp: { $gt: new Date() } });
  if (!user) return res.status(400).json({ error: 'Invalid or expired token' });
  user.passwordHash = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExp = undefined;
  await user.save();
  res.json({ ok: true });
}
