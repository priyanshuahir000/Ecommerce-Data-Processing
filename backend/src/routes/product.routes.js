import express from "express";
import { getAllProducts } from "../controllers/product.controller.js";

const router = express.Router();

// Route to get all products
router.get("/", getAllProducts);

// Route to get a single product
router.get("/:id", getProduct);

// Route to get number of categories
router.get("/category/count", getCategoryCount);

// Route to get number of subcategories
router.get("/subcategory/count", getSubCategoryCount);

// Route to get number of brands
router.get("/brand/count", getBrandCount);

export default router;
