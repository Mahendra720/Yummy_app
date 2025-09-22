const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  id: { type: String, required: true }, // product id
  title: { type: String, required: true }, // product name
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
});
// const cartSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   items: [
//     {
//       productId: String,
//       title: String,
//       price: Number,
//       qty: Number,
//     },
//   ],
//   subtotal: { type: Number, default: 0 },
// });
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
  subtotal: { type: Number, required: true },
});

module.exports = mongoose.model("Cart", cartSchema);
