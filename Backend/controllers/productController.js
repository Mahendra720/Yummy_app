const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const { productId, title, description, price, image } = req.body;
    const product = new Product({ productId, title, description, price, image });
    await product.save();
    res.json({ message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
