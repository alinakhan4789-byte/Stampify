const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const Business = require('../models/Business');
const token = require('../utils/generateToken');
const ah = require('../utils/asyncHandler');

const pub = async (u) => {
  const b = u.role === 'business' ? await Business.findOne({ owner: u._id }) : null;
  return { id: u._id, name: u.name, email: u.email, role: u.role, businessName: b?.businessName };
};

exports.register = ah(async (req, res) => {
  const { name, email, password, role, businessName } = req.body;
  if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || '')) return res.status(400).json({ message: 'Enter a valid name and email' });
  if ((password || '').length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' });
  if (!['customer', 'business'].includes(role)) return res.status(400).json({ message: 'Role must be customer or business' });
  if (role === 'business' && !businessName?.trim()) return res.status(400).json({ message: 'Business name is required' });
  if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ message: 'Email already registered' });
  const user = await User.create({ name, email, role, password: await bcrypt.hash(password, 10) });
  if (role === 'business') await Business.create({ owner: user._id, businessName: businessName.trim() });
  res.status(201).json({ token: token(user._id), user: await pub(user) });
});

exports.login = ah(async (req, res) => {
  const user = await User.findOne({ email: (req.body.email || '').toLowerCase() }).select('+password');
  if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password' });
  res.json({ token: token(user._id), user: await pub(user) });
});

exports.me = ah(async (req, res) => res.json({ user: await pub(req.user) }));

const sha = (t) => crypto.createHash('sha256').update(t).digest('hex');

// No email service in this MVP: the link is printed in the server console (and returned outside production).
exports.forgotPassword = ah(async (req, res) => {
  const out = { message: 'If that email is registered, a reset link has been created.' };
  const user = await User.findOne({ email: (req.body.email || '').toLowerCase().trim() });
  if (user) {
    const raw = crypto.randomBytes(32).toString('hex');
    user.resetTokenHash = sha(raw); user.resetTokenExpires = Date.now() + 15 * 60 * 1000;
    await user.save();
    const link = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${raw}`;
    console.log('Password reset link:', link);
    if (process.env.NODE_ENV !== 'production') out.devResetLink = link;
  }
  res.json(out);
});

exports.resetPassword = ah(async (req, res) => {
  if ((req.body.password || '').length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' });
  const user = await User.findOne({ resetTokenHash: sha(req.params.token), resetTokenExpires: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: 'This reset link is invalid or has expired' });
  user.password = await bcrypt.hash(req.body.password, 10); user.resetTokenHash = undefined; user.resetTokenExpires = undefined;
  await user.save();
  res.json({ message: 'Password updated. You can sign in now.' });
});
