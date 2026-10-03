const { Schema, model, Types } = require('mongoose');
const schema = new Schema({
  customer: { type: Types.ObjectId, ref: 'User', required: true },
  business: { type: Types.ObjectId, ref: 'Business', required: true },
  program: { type: Types.ObjectId, ref: 'LoyaltyProgram', required: true },
  currentStamps: { type: Number, default: 0, min: 0 },
  totalStamps: { type: Number, default: 0 },        // lifetime, for analytics
  redeemedCount: { type: Number, default: 0 },
  rewardUnlocked: { type: Boolean, default: false },
  rewardRedeemed: { type: Boolean, default: false },
}, { timestamps: true });
schema.index({ customer: 1, program: 1 }, { unique: true });   // one card per customer per program
module.exports = model('CustomerCard', schema);
