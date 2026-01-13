import mongoose from "mongoose";

const verifyImageUrl = (str) => {
  const normalizedStr = str.toLowerCase();

  const urlWithoutQuery = normalizedStr.split("?")[0];

  const startsWithHttp = urlWithoutQuery.startsWith("http");
  const validExtensions = [".jpg", ".png", ".jpeg", ".webp", ".avif", ".gif"];

  const endsWithValidExtension = validExtensions.some((ext) =>
    normalizedStr.endsWith(ext)
  );

  return startsWithHttp && endsWithValidExtension;
};

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
