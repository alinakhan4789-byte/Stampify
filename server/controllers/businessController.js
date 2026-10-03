const Business = require('../models/Business');
const LoyaltyProgram = require('../models/LoyaltyProgram');
const CustomerCard = require('../models/CustomerCard');
const ah = require('../utils/asyncHandler');

exports.list = ah(async (req, res) => {
  const businesses = await Business.find().sort('businessName').lean();
  const programs = await LoyaltyProgram.find({ isActive: true, business: { $in: businesses.map((b) => b._id) } }).lean();
  res.json(businesses.map((b) => ({ ...b, programs: programs.filter((p) => String(p.business) === String(b._id)) })));
});

exports.getOne = ah(async (req, res) => {
  const b = await Business.findById(req.params.id).lean();
  if (!b) return res.status(404).json({ message: 'Business not found' });
  res.json({ ...b, programs: await LoyaltyProgram.find({ business: b._id, isActive: true }).lean() });
});

exports.dashboard = ah(async (req, res) => {
  const business = await Business.findOne({ owner: req.user._id });
  if (!business) return res.status(404).json({ message: 'Business profile not found' });
  const programs = await LoyaltyProgram.find({ business: business._id }).sort('-createdAt');
  const cards = (await CustomerCard.find({ business: business._id }).populate('customer', 'name email').populate('program', 'title requiredStamps').sort('-updatedAt')).filter((c) => c.customer && c.program);
  res.json({
    business, programs,
    stats: {
      totalCustomers: new Set(cards.map((c) => String(c.customer._id))).size,
      totalStamps: cards.reduce((n, c) => n + c.totalStamps, 0),
      rewardsRedeemed: cards.reduce((n, c) => n + c.redeemedCount, 0),
      activePrograms: programs.filter((p) => p.isActive).length,
    },
    customers: cards.slice(0, 25),
  });
});

exports.updateMe = ah(async (req, res) => {
  const allowed = ['businessName', 'description', 'category', 'address', 'phone', 'logo'];
  const patch = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
  const b = await Business.findOneAndUpdate({ owner: req.user._id }, patch, { new: true, runValidators: true });
  b ? res.json(b) : res.status(404).json({ message: 'Business profile not found' });
});

// ---- Branches ----
const Branch = require('../models/Branch');
const myBusiness = (req) => Business.findOne({ owner: req.user._id });

exports.listBranches = ah(async (req, res) => {
  const b = await myBusiness(req); if (!b) return res.status(404).json({ message: 'Business profile not found' });
  res.json(await Branch.find({ business: b._id }).sort('-createdAt'));
});
exports.addBranch = ah(async (req, res) => {
  const b = await myBusiness(req); if (!b) return res.status(404).json({ message: 'Business profile not found' });
  res.status(201).json(await Branch.create({ business: b._id, name: req.body.name, address: req.body.address, phone: req.body.phone }));
});
exports.deleteBranch = ah(async (req, res) => {
  const b = await myBusiness(req); if (!b) return res.status(404).json({ message: 'Business profile not found' });
  (await Branch.findOneAndDelete({ _id: req.params.id, business: b._id })) ? res.json({ deleted: true }) : res.status(404).json({ message: 'Branch not found' });
});
