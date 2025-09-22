// routes/addressRoute.js
const express = require('express');
const router = express.Router();
const Address = require('../models/Address');

router.post('/save', async (req, res) => {
  try {
    const { userId, name, addr, city, phone } = req.body;

    if (!userId || !name || !addr || !city || !phone) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const newAddress = new Address({ userId, name, addr, city, phone });
    await newAddress.save();

    res.json({ success: true, address: newAddress });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
