const { Schema, model, Types } = require('mongoose');
module.exports = model('Branch', new Schema({
  business: { type: Types.ObjectId, ref: 'Business', required: true },
  name: { type: String, required: [true, 'Branch name is required'], trim: true },
  address: { type: String, default: '', trim: true },
  phone: { type: String, default: '', trim: true },
}, { timestamps: true }));
