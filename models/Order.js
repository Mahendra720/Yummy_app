const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ title: String, price: Number, qty: Number }],
  address: {
    name: String,
    addr: String,
    city: String,
    phone: String,
  },
  subtotal: { type: Number, required: true },
  payment: {
    method: { type: String, enum: ["card", "cod"], required: true },
    card: {
      number: String,
      name: String,
      month: String,
    },
  },
  status: { type: String, default: "success" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
