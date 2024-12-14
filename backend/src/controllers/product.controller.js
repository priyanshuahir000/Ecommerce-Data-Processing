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
