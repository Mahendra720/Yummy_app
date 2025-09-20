const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: Number, unique: true },
  title: String,
  description: String,
  price: Number,
  image: String
});

module.exports = mongoose.model("Product", productSchema);
