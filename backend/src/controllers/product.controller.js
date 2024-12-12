import Product from "../models/product.model.js";

// Get all products
export const getAllProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalProduct = await Product.countDocuments();
    res.status(200).json({
      totalProduct,
      totalPages: Math.ceil(totalProduct / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
