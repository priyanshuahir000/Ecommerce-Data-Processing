import express from "express";
import { getAllProducts } from "../controllers/product.controller.js";
import { getProduct } from "../controllers/product.controller.js";
import { getCategoryCount } from "../controllers/product.controller.js";
import { getSubCategoryCount } from "../controllers/product.controller.js";
import { getBrandCount } from "../controllers/product.controller.js";
import { getColorCount } from "../controllers/product.controller.js";
import { getFabricCount } from "../controllers/product.controller.js";
import { getDiscountCount } from "../controllers/product.controller.js";
import { getOutOfStockCount } from "../controllers/product.controller.js";
import { getSellerCount } from "../controllers/product.controller.js";
import { getProductCount } from "../controllers/product.controller.js";

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

// Route to get number of colors
router.get("/color/count", getColorCount);

// Route to get number of fabric
router.get("/fabric/count", getFabricCount);

// Route to get number of discount
router.get("/discount/count", getDiscountCount);

// Route to get number of out of stock
router.get("/outofstock/count", getOutOfStockCount);

// Route to get number of sellers
router.get("/seller/count", getSellerCount);

// Route to get number of products
router.get("/product/count", getProductCount);

export default router;
