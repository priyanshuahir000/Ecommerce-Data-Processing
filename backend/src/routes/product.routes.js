import express from "express";
import { getAllProducts } from "../controllers/product.controller.js";

const router = express.Router();

// Route to get all products
router.get("/", getAllProducts);

export default router;
