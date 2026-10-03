const Business = require('../models/Business');
const LoyaltyProgram = require('../models/LoyaltyProgram');
const CustomerCard = require('../models/CustomerCard');
const Reward = require('../models/Reward');
const User = require('../models/User');
const { redeemCard } = require('./rewardController');
const ah = require('../utils/asyncHandler');

const populate = (q) => q.populate('program').populate('business', 'businessName category');

exports.myCards = ah(async (req, res) => res.json(await populate(CustomerCard.find({ customer: req.user._id }).sort('-updatedAt'))));

exports.createProgram = ah(async (req, res) => {
  const business = await Business.findOne({ owner: req.user._id });
  if (!business) return res.status(404).json({ message: 'Business profile not found' });
  const { title, description, requiredStamps, rewardDescription } = req.body;
  res.status(201).json(await LoyaltyProgram.create({ business: business._id, title, description, requiredStamps: Number(requiredStamps), rewardDescription }));
});

exports.getProgram = ah(async (req, res) => {
  const p = await LoyaltyProgram.findById(req.params.id).populate('business', 'businessName category address');
  p ? res.json(p) : res.status(404).json({ message: 'Program not found' });
});

exports.join = ah(async (req, res) => {
  const p = await LoyaltyProgram.findOne({ _id: req.params.id, isActive: true });
  if (!p) return res.status(404).json({ message: 'Program not found' });
  if (await CustomerCard.findOne({ customer: req.user._id, program: p._id })) return res.status(409).json({ message: 'You already joined this program' });
  const card = await CustomerCard.create({ customer: req.user._id, business: p.business, program: p._id });
  res.status(201).json(await populate(CustomerCard.findById(card._id)));
});

// Business adds one stamp. Everything is re-checked on the server; the client is never trusted.
exports.stamp = ah(async (req, res) => {
  const { email, customerId, programId } = req.body;
  const business = await Business.findOne({ owner: req.user._id });
  if (!business) return res.status(404).json({ message: 'Business profile not found' });
  if (!email && !customerId) return res.status(400).json({ message: 'Customer email is required' });
  const customer = await User.findOne({ ...(customerId ? { _id: customerId } : { email: email.toLowerCase().trim() }), role: 'customer' });
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  const card = await CustomerCard.findOne({ customer: customer._id, business: business._id, ...(programId && { program: programId }) }).sort('-createdAt').populate('program');
  if (!card) return res.status(400).json({ message: 'Customer has not joined this business' });
  if (!card.program.isActive) return res.status(400).json({ message: 'This program is not active' });
  if (card.rewardUnlocked) return res.status(400).json({ message: 'Reward already unlocked. The customer must redeem it first.' });
  card.currentStamps += 1; card.totalStamps += 1; card.rewardRedeemed = false;
  if (card.currentStamps >= card.program.requiredStamps) {
    card.currentStamps = card.program.requiredStamps; card.rewardUnlocked = true;
    await Reward.create({ customer: customer._id, business: business._id, program: card.program._id, title: card.program.title, description: card.program.rewardDescription });
  }
  await card.save();
  res.json({ message: card.rewardUnlocked ? 'Reward unlocked!' : 'Stamp added', card, customer: { name: customer.name, email: customer.email } });
});

exports.redeem = ah(async (req, res) => {
  const card = await CustomerCard.findOne({ _id: req.params.id, customer: req.user._id });
  if (!card) return res.status(404).json({ message: 'Card not found' });
  res.json(await populate(CustomerCard.findById((await redeemCard(card))._id)));
});

// ---- Manage programs (requiredStamps is locked so existing cards stay valid) ----
exports.updateProgram = ah(async (req, res) => {
  const b = await Business.findOne({ owner: req.user._id }); if (!b) return res.status(404).json({ message: 'Business profile not found' });
  const patch = Object.fromEntries(Object.entries(req.body).filter(([k]) => ['title', 'description', 'rewardDescription', 'isActive'].includes(k)));
  const p = await LoyaltyProgram.findOneAndUpdate({ _id: req.params.id, business: b._id }, patch, { new: true, runValidators: true });
  p ? res.json(p) : res.status(404).json({ message: 'Program not found' });
});
exports.deleteProgram = ah(async (req, res) => {
  const b = await Business.findOne({ owner: req.user._id }); if (!b) return res.status(404).json({ message: 'Business profile not found' });
  const p = await LoyaltyProgram.findOne({ _id: req.params.id, business: b._id });
  if (!p) return res.status(404).json({ message: 'Program not found' });
  if (await CustomerCard.exists({ program: p._id })) return res.status(409).json({ message: 'Customers have already joined. Deactivate this program instead.' });
  await p.deleteOne();
  res.json({ deleted: true });
});
