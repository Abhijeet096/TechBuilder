import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  about: String,
  services: [String],
}, { _id: false });

const BusinessSchema = new mongoose.Schema({
  name: String,
  description: String,
  email: String,
  phone: String,
  logo: String,
}, { _id: false });

const SiteSchema = new mongoose.Schema({
  userId: { type: String, index: true },
  templateId: { type: String, default: 'clean' },
  business: BusinessSchema,
  content: ContentSchema,
}, { timestamps: true });

export const Site = mongoose.model('Site', SiteSchema);
