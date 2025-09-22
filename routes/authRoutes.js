const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, password: hashedPass });
    await newUser.save();

    res.json({ 
      success: true, 
      message: "User registered successfully", 
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email } 
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// LOGIN
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, fullName: user.fullName, email: user.email } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports=router;