// models/Order.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true }, // ✅ every order must have unique orderId
  userId: { type: Number, required: true },
  items: [{ id: String, title: String, price: Number, qty: Number }],
  address: {
    name: String,
    addr: String,
    city: String,
    phone: String,
  },
  paymentMethod: {
    type: String,
    enum: ["card", "cod"], // must match exactly
    required: true,
  },
  cardNumber: { type: String, default: null },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// ✅ generate unique orderId before save
orderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    this.orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }

  // ✅ hash card number if card payment
  if (this.paymentMethod === "card" && this.cardNumber) {
    const salt = await bcrypt.genSalt(10);
    this.cardNumber = await bcrypt.hash(this.cardNumber, salt);
  }

  next();
});

export default mongoose.model("Order", orderSchema);
