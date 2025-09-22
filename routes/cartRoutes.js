// const express = require("express");
// const router = express.Router();
// const cartController = require("../controllers/cartController");

// // Save or update cart
// router.post("/", cartController.saveCart);

// // Get cart by userId
// router.get("/:userId", cartController.getCart);

// module.exports = router;

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Save/update cart
router.post("/", cartController.saveCart);

// Get cart by userId
router.get("/:userId", cartController.getCart);

module.exports = router;

