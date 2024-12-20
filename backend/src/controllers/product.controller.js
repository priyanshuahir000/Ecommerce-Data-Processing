import Product from "../models/product.model.js";

// Get all products
export const getAllProducts = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    categories = "",
    subcategories = "",
    brands = "",
    seller = "",
    colors = "",
    fabric = "",
    pattern = "",
    outOfStock = false,
    discount = "",
  } = req.query;
  try {
    const query = {};
    if (categories) query.category = { $in: categories.split(",") }; // Splitting the categories by comma and storing them in an array
    if (subcategories) query.sub_category = { $in: subcategories.split(",") };
    if (brands) query.brand = { $in: brands.split(",") };
    if (seller) query.seller = seller;
    if (colors) query["product_details.Color"] = { $in: colors.split(",") };
    if (fabric) query["product_details.Fabric"] = { $in: fabric.split(",") };
    if (pattern) query["product_details.Pattern"] = { $in: pattern.split(",") };
    if (outOfStock) query.out_of_stock = outOfStock;
    if (discount) query.discount = { $gte: discount };

    // getting the data fromt he db based on the query
    const products = await Product.find(query)
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

// Get a single product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of category
export const getCategoryCount = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of subcategory
export const getSubCategoryCount = async (req, res) => {
  try {
    const subcategories = await Product.aggregate([
      { $group: { _id: "$sub_category", count: { $sum: 1 } } },
    ]);
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of brands
export const getBrandCount = async (req, res) => {
  try {
    const brands = await Product.aggregate([
      { $group: { _id: "$brand", count: { $sum: 1 } } },
    ]);
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of colors
export const getColorCount = async (req, res) => {
  try {
    const colors = await Product.aggregate([
      { $unwind: "$product_details.Color" },
      { $group: { _id: "$product_details.Color", count: { $sum: 1 } } },
    ]);
    res.status(200).json(colors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of fabric
export const getFabricCount = async (req, res) => {
  try {
    const fabric = await Product.aggregate([
      { $unwind: "$product_details.Fabric" },
      { $group: { _id: "$product_details.Fabric", count: { $sum: 1 } } },
    ]);
    res.status(200).json(fabric);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of pattern
export const getPatternCount = async (req, res) => {
  try {
    const pattern = await Product.aggregate([
      { $unwind: "$product_details.Pattern" },
      { $group: { _id: "$product_details.Pattern", count: { $sum: 1 } } },
    ]);
    res.status(200).json(pattern);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


