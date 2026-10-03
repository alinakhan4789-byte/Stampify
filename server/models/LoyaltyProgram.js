const { Schema, model, Types } = require('mongoose');
module.exports = model('LoyaltyProgram', new Schema({
  business: { type: Types.ObjectId, ref: 'Business', required: true },
  title: { type: String, required: [true, 'Program title is required'], trim: true },
  description: { type: String, default: '' },
  requiredStamps: { type: Number, required: true, min: [2, 'At least 2 stamps'], max: [30, 'At most 30 stamps'] },
  rewardDescription: { type: String, required: [true, 'Reward description is required'], trim: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true }));
