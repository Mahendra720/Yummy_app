const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

router.post('/save', async (req, res) => {
  try {
    console.log('POST /api/payment/save body:', req.body);

    const { userId, items, subtotal, paymentMethod, paymentStatus } = req.body;
    if (!userId || !paymentMethod) {
      return res.status(400).json({ success: false, error: 'Missing userId or paymentMethod' });
    }

    const payment = new Payment({
      userId,
      items: items || [],
      subtotal: subtotal || 0,
      paymentMethod,
      paymentStatus: paymentStatus || (paymentMethod === 'cod' ? 'Pending' : 'Paid')
    });

    const saved = await payment.save();
    console.log('Saved payment id:', saved._id);
    return res.status(201).json({ success: true, payment: saved });
  } catch (err) {
    console.error('Payment save error:', err);
    // If Mongoose validation error, send the message
    return res.status(500).json({ success: false, error: err.message });
  }
});

// optional: list payments for quick verify
router.get('/all', async (req, res) => {
  const payments = await Payment.find().sort({ createdAt: -1 }).limit(100);
  res.json({ success: true, payments });
});

module.exports = router;
