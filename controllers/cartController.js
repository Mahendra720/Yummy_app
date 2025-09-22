// const Cart = require("../models/Cart");

// // Save or update cart
// exports.saveCart = async (req, res) => {
//   try {
//     const { userId, items, subtotal } = req.body;

//     if (!userId || !items || items.length === 0) {
//       return res.status(400).json({ success: false, message: "Invalid cart data" });
//     }

//     let cart = await Cart.findOne({ userId });

//     if (cart) {
//       cart.items = items;
//       cart.subtotal = subtotal;
//       await cart.save();
//     } else {
//       cart = new Cart({ userId, items, subtotal });
//       await cart.save();
//     }

//     res.json({ success: true, message: "Cart saved successfully", cart });
//   } catch (err) {
//     console.error("Cart save error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Fetch cart
// exports.getCart = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ success: false, message: "Cart not found" });
//     }

//     res.json({ success: true, cart });
//   } catch (err) {
//     console.error("Cart fetch error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

const Cart = require("../models/Cart");

// Save or update cart
exports.saveCart = async (req, res) => {
  try {
    const { userId, items, subtotal } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid cart data" });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Update existing cart
      cart.items = items;
      cart.subtotal = subtotal;
      await cart.save();
    } else {
      // Create new cart
      cart = new Cart({ userId, items, subtotal });
      await cart.save();
    }

    res.json({ success: true, message: "Cart saved successfully", cart });
  } catch (err) {
    console.error("Cart save error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get cart by userId
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({
        success: false,
        message: "Cart not found",
        cart: { items: [], subtotal: 0 },
      });
    }

    res.json({ success: true, cart });
  } catch (err) {
    console.error("Cart fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

