const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  items: [
    {
      name: String,
      price: Number,
      qty: Number
    }
  ]
});

module.exports = mongoose.model("Cart", cartSchema);
