const Reward = require('../models/Reward');
const CustomerCard = require('../models/CustomerCard');
const ah = require('../utils/asyncHandler');

// Shared by POST /loyalty/cards/:id/redeem and POST /rewards/:id/redeem
exports.redeemCard = async (card) => {
  if (!card.rewardUnlocked) {
    const e = new Error(card.rewardRedeemed ? 'Reward already redeemed' : 'Reward not unlocked yet'); e.status = 400; throw e;
  }
  card.currentStamps = 0; card.rewardUnlocked = false; card.rewardRedeemed = true; card.redeemedCount += 1;
  await card.save();
  await Reward.findOneAndUpdate({ customer: card.customer, program: card.program, status: 'unlocked' }, { status: 'redeemed' });
  return card;
};

exports.list = ah(async (req, res) =>
  res.json(await Reward.find({ customer: req.user._id }).populate('business', 'businessName').sort('-createdAt')));

exports.redeem = ah(async (req, res) => {
  const reward = await Reward.findOne({ _id: req.params.id, customer: req.user._id });
  if (!reward) return res.status(404).json({ message: 'Reward not found' });
  if (reward.status === 'redeemed') return res.status(400).json({ message: 'Reward already redeemed' });
  const card = await CustomerCard.findOne({ customer: req.user._id, program: reward.program });
  res.json(await exports.redeemCard(card));
});
