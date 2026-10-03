const { Schema, model, Types } = require('mongoose');
module.exports = model('Business', new Schema({
  owner: { type: Types.ObjectId, ref: 'User', required: true, unique: true },
  businessName: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: { type: String, default: 'General' },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  logo: { type: String, default: '' },
}, { timestamps: true }));
