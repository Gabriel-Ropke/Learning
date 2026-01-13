import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Extra Functions
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

// Controller
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // user will send this data
  const name = product.name?.trim();
  const price = Number(product.price);
  const image = product.image?.trim();

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Por favor, preencha todos os campos" });
  }

  if (Number.isNaN(price)) {
    return res.status(400).json({
      success: false,
      message: "Preencha este campo com um número válido",
    });
  }

  if (name.length < 5 || name.length > 15) {
    return res.status(400).json({
      success: false,
      message: "O Nome do produto deve conter entre 5 a 15 caracteres",
    });
  }

  if (price < 0.1) {
    return res.status(400).json({
      success: false,
      message: "O valor do produto não pode ser inferior a 10 centavos",
    });
  }

  if (!verifyImageUrl(image)) {
    return res.status(400).json({
      success: false,
      message:
        "URL inválida, por favor veja se a extensão da sua imagem é válido [.jpg, .jpeg, .png, .gif, .webp, .avif]",
    });
  }

  product.name = name;
  product.price = price;
  product.image = image;

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(400).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("error in deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
