const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

exports.addProduct = async (req, res) => {
  const { title, description, price, image } = req.body;
  const product = await Product.create({ title, description, price, image });
  res.status(201).json(product);
};
