const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { userId, items, address, subtotal, payment } = req.body;

    if (!userId || !items || !address || !subtotal || !payment || !payment.method) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const order = new Order({
      userId,
      items,
      address,
      subtotal,
      payment,
      status: "success",
    });

    await order.save();
    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("❌ Create order failed:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
