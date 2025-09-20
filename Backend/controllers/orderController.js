const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const { userId, items, address, paymentMethod } = req.body;
    const order = await Order.create({ userId, items, address, paymentMethod });
    res.json({ message: "Thank you, your order was placed successfully!", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
