const { Schema, model } = require('mongoose');
module.exports = model('User', new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },   // bcrypt hash, hidden by default
  resetTokenHash: { type: String, select: false },   // sha256 of the emailed token
  resetTokenExpires: { type: Date, select: false },
  role: { type: String, enum: ['customer', 'business'], required: true },
}, { timestamps: true }));
