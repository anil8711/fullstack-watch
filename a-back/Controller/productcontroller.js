const Product = require("../model/Product");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const {
      productName,
      price,
      category,
      description,
      isFeatured,
      hasDiscount,
      discountValue,
      image
    } = req.body;

    console.log(req.body);


    if (!productName || !price || !category || !description) {
      return res.status(400).json({
        status: false,
        message: "productName, price, category, and description are required"
      });
    }

    const newProduct = await Product.create({
      productName,
      price: parseFloat(price),
      category,
      description,
      isFeatured: isFeatured === true,
      hasDiscount: hasDiscount === true,
      discountValue: hasDiscount === true ? parseFloat(discountValue) : 0,
      image
    });

    res.status(201).json({
      status: true,
      message: "Product created successfully",
      data: newProduct
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: true,
      message: "Products fetched successfully",
      data: products
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }
    res.status(200).json({ status: true, data: product });
  } catch (err) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }
    res.status(200).json({ status: true, message: "Product deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    console.log("Update Request Body:", req.body);
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }
    res.status(200).json({ status: true, message: "Product updated", data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct
};
