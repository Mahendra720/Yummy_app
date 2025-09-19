import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;

    // Find cart for logged-in user
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    const total = cart.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

    // Save new order
    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map((i) => ({
        product: i.product._id,
        qty: i.qty,
      })),
      total,
      address,
      paymentMethod,
    });

    // Empty the cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Server error while creating order" });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product");
    res.json(orders);
  } catch (error) {
    console.error("Fetching orders failed:", error);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};
