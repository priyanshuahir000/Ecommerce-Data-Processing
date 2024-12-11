import { ecommerce_dataset } from "../models/ecommerce_dataset.model.js";

const getAllUser = async () => {
  try {
    const products = await ecommerce_dataset.findById(
      "fa8e22d6-c0b6-5229-bb9e-ad52eda39a0a"
    );
    return products;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export { getAllUser };
