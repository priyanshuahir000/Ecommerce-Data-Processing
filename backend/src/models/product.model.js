import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    actual_price: String,
    average_rating: String,
    brand: String,
    category: String,
    description: String,
    discount: String,
    images: [String],
    out_of_stock: Boolean,
    pid: String,
    product_details: [
      {
        StyleCode: String,
        Closure: String,
        Pockets: String,
        Fabric: String,
        Pattern: String,
        Color: String,
      },
    ],
    seller: String,
    selling_price: String,
    sub_category: String,
    title: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
