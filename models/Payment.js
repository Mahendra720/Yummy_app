const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: { type: String, default: '' },
  name: { type: String },
  price: { type: Number },
  qty: { type: Number }
}, { _id: false });

const paymentSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // use String to avoid casting issues
  items: [itemSchema],
  subtotal: { type: Number, default: 0 },
  paymentMethod: { type: String, enum: ['card','cod'], required: true },
  paymentStatus: { type: String, default: 'Pending' }, // Pending / Paid
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
