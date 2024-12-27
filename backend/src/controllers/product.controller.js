import Product from "../models/product.model.js";

// Get all products
const getAllProducts = async (req, res) => {
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
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of category
const getCategoryCount = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of subcategory
const getSubCategoryCount = async (req, res) => {
  try {
    const subcategories = await Product.aggregate([
      { $group: { _id: "$sub_category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of brands
const getBrandCount = async (req, res) => {
  try {
    const brands = await Product.aggregate([
      { $group: { _id: "$brand", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of colors
const getColorCount = async (req, res) => {
  try {
    const colors = await Product.aggregate([
      {
        $unwind: "$product_details",
      },
      {
        $match: {
          "product_details.Color": {
            $exists: true,
          },
        },
      },
      {
        $project: {
          color: {
            $split: ["$product_details.Color", ", "],
          },
        },
      },
      {
        $unwind: "$color",
      },
      {
        $group: {
          _id: "$color",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);
    res.status(200).json(colors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of fabric
const getFabricCount = async (req, res) => {
  try {
    const fabric = await Product.aggregate([
      {
        $unwind: "$product_details",
      },
      {
        $match: {
          "product_details.Fabric": {
            $exists: true,
            $ne: null,
            $ne: "",
          },
        },
      },
      {
        $project: {
          fabric: {
            $trim: {
              input: {
                $toUpper: "$product_details.Fabric",
              },
            },
          },
        },
      },
      // Add normalization rules
      {
        $project: {
          fabric: {
            $switch: {
              branches: [
                // Normalize Cotton variants
                {
                  case: {
                    $regexMatch: {
                      input: "$fabric",
                      regex: /COTTON|COTTAN|COOTAN/i,
                    },
                  },
                  then: "COTTON",
                },
                // Normalize Polyester variants
                {
                  case: {
                    $regexMatch: {
                      input: "$fabric",
                      regex: /POLYESTER|POLYSTER|POLY/i,
                    },
                  },
                  then: "POLYESTER",
                },
                // Keep original if no match
                {
                  case: true,
                  then: "$fabric",
                },
              ],
            },
          },
        },
      },
      // Filter out unwanted entries
      {
        $match: {
          fabric: {
            $not: {
              $in: [
                "HANDWASH, MACHINEWASH",
                "INNER MATERIAL: FABRIC",
                "CLOTH",
                "FABRIC",
                "HIGH QUALITY MATERIAL",
                "-`",
                // Add more items to filter
                "MACHINE WASH",
                "WASH CARE",
              ],
            },
          },
        },
      },
      // Group and count
      {
        $group: {
          _id: "$fabric",
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 5 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.status(200).json(fabric);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of pattern
const getPatternCount = async (req, res) => {
  try {
    const pattern = await Product.aggregate([
      {
        $unwind: "$product_details",
      },
      {
        $match: {
          "product_details.Pattern": {
            $exists: true,
            $ne: null,
            $ne: "",
          },
        },
      },
      {
        $project: {
          patterns: {
            $split: [
              {
                $trim: {
                  input: {
                    $toUpper: "$product_details.Pattern",
                  },
                },
              },
              ", ",
            ],
          },
        },
      },
      {
        $unwind: "$patterns",
      },
      {
        $group: {
          _id: "$patterns",
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 5 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.status(200).json(pattern);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of discount
const getDiscountCount = async (req, res) => {
  try {
    const discount = await Product.aggregate([
      {
        $match: {
          discount: {
            $exists: true,
            $ne: "",
            $ne: null,
          },
        },
      },
      {
        $project: {
          discountValue: {
            $convert: {
              input: {
                $replaceAll: {
                  input: "$discount",
                  find: "% off",
                  replacement: "",
                },
              },
              to: "int",
              onError: 0,
              onNull: 0,
            },
          },
        },
      },
      {
        $project: {
          range: {
            $switch: {
              branches: [
                {
                  case: {
                    $and: [
                      { $gte: ["$discountValue", 0] },
                      { $lte: ["$discountValue", 20] },
                    ],
                  },
                  then: "0-20% off",
                },
                {
                  case: {
                    $and: [
                      { $gt: ["$discountValue", 20] },
                      { $lte: ["$discountValue", 40] },
                    ],
                  },
                  then: "21-40% off",
                },
                {
                  case: {
                    $and: [
                      { $gt: ["$discountValue", 40] },
                      { $lte: ["$discountValue", 60] },
                    ],
                  },
                  then: "41-60% off",
                },
                {
                  case: {
                    $and: [
                      { $gt: ["$discountValue", 60] },
                      { $lte: ["$discountValue", 80] },
                    ],
                  },
                  then: "61-80% off",
                },
                {
                  case: { $gt: ["$discountValue", 80] },
                  then: "81-100% off",
                },
              ],
              default: "No discount",
            },
          },
        },
      },
      {
        $group: {
          _id: "$range",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.status(200).json(discount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of out of stock
const getOutOfStockCount = async (req, res) => {
  try {
    const outOfStock = await Product.aggregate([
      { $group: { _id: "$out_of_stock", count: { $sum: 1 } } },
    ]);
    res.status(200).json(outOfStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of seller
const getSellerCount = async (req, res) => {
  try {
    const seller = await Product.aggregate([
      { $group: { _id: "$seller", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get number of products
const getProductCount = async (req, res) => {
  try {
    const product = await Product.aggregate([
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllProducts,
  getProduct,
  getCategoryCount,
  getSubCategoryCount,
  getBrandCount,
  getColorCount,
  getFabricCount,
  getPatternCount,
  getDiscountCount,
  getOutOfStockCount,
  getSellerCount,
  getProductCount,
};
