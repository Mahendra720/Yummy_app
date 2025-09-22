// const express = require("express");
// const router = express.Router();
// const {
//   createOrder,
//   getUserOrders,
//   updateOrderStatus,
// } = require("../controllers/orderController");

// // Create order
// router.post("/", createOrder);

// // Get user orders
// router.get("/user/:userId", getUserOrders);

// // Update order status
// router.put("/:id/status", updateOrderStatus);

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const { createOrder, getUserOrders } = require("../controllers/orderController");

// // POST /api/orders => create new order
// router.post("/", createOrder);

// // GET /api/orders/:userId => get all orders for a user
// router.get("/:userId", getUserOrders);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/orderController"); // ✅ make sure path is correct

router.post("/", createOrder); // ✅ must be a function
// If you have extra routes, make sure the handler is a function
// e.g. router.get("/all", getAllOrders);

module.exports = router;
