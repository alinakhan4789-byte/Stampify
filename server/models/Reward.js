const { Schema, model, Types } = require('mongoose');
module.exports = model('Reward', new Schema({
  customer: { type: Types.ObjectId, ref: 'User', required: true },
  business: { type: Types.ObjectId, ref: 'Business', required: true },
  program: { type: Types.ObjectId, ref: 'LoyaltyProgram', required: true },
  title: String, description: String,
  status: { type: String, enum: ['unlocked', 'redeemed'], default: 'unlocked' },
}, { timestamps: true }));
