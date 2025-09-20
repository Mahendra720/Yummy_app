// routes/orderRoutes.js
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, items, address, paymentMethod, cardNumber, total } = req.body;

    if (!userId || !items || !address || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!["card", "cod"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    const order = new Order({
      userId,
      items,
      address,
      paymentMethod,
      cardNumber: paymentMethod === "card" ? cardNumber : null,
      total,
    });

    await order.save();
    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Order failed", error: err.message });
  }
});

export default router;
