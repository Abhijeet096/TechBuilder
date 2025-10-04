import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  resetToken: { type: String },
  resetTokenExp: { type: Date },
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);
