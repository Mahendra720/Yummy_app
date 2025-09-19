import express from "express";
import { addToCart, getCart, clearCart } from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected by JWT
router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/clear", authMiddleware, clearCart);

export default router;
