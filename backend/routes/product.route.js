import express from "express";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { validateProduct } from "../middleware/product.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", validateProduct, createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
