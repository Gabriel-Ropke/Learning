import mongoose from "mongoose";
import { verifyImageUrl } from "../utils/verifyImageUrl.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0.1,
    },
    description: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      validate: (value) => verifyImageUrl(value),
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
