const express = require("express");
const Cart = require("../models/Cart");
const User = require("../models/User");

const router = express.Router();

// Save cart items
// Save cart items for a user
router.post("/save", async (req, res) => {
  try {
    const { userId, items } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    const cart = new Cart({
      userId: user._id,
      userName: user.fullName,
      items
    });

    await cart.save();
    res.json({ success: true, message: "Cart saved successfully", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
