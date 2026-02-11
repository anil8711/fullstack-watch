const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct
} = require("../Controller/productcontroller");

// Routes
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
