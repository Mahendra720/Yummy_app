// models/Address.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  addr: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Address', addressSchema);
