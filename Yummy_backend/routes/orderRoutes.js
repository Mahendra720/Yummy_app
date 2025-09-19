import express from "express";
import { createOrder, getOrdersByUser } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Place new order
router.post("/", authMiddleware, createOrder);

// Get logged-in user's orders
router.get("/", authMiddleware, getOrdersByUser);

export default router;
