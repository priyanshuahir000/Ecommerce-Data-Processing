import mongoose, { Schema } from "mongoose";

const ecommerce_dataset_schema = new mongoose.Schema({
  _id: { type: String, required: true },
  actual_price: { type: String, required: true },
  average_rating: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  crawled_at: { type: Date, required: true },
  description: { type: String, required: true },
  discount: { type: String },
  images: { type: [String], required: true },
  out_of_stock: { type: Boolean, required: true },
  pid: { type: String, required: true },
  product_details: {
    type: [{ key: { type: String }, value: { type: String } }],
    required: true,
  },
  seller: { type: String, required: true },
  selling_price: { type: String, required: true },
  sub_category: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
});

export const ecommerce_dataset = mongoose.model(
  "ecommerce_dataset",
  ecommerce_dataset_schema
);
