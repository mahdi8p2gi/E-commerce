import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

/**
 * Add a new product
 * POST /api/product/add
 */
export const addProduct = async (req, res) => {
  try {
    // Parse product data from request body
    const productData = JSON.parse(req.body.productData);
    productData.category = productData.category.toLowerCase();

    // Get uploaded files, if any
    const images = req.files || [];

    // Upload images to Cloudinary and get secure URLs
    const imageUrls = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Create new product in DB
    const newProduct = await Product.create({
      ...productData,
      image: imageUrls,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Add product error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * List all products
 * GET /api/product/list
 */
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json({ success: true, products });
  } catch (error) {
    console.error("Product list error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a single product by ID
 * POST /api/product/id
 */
export const productById = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) return res.status(400).json({ success: false, message: "Product ID is required" });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    return res.json({ success: true, product });
  } catch (error) {
    console.error("Get product by ID error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update product stock status
 * PUT /api/product/stock
 */
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    if (!id) return res.status(400).json({ success: false, message: "Product ID is required" });

    await Product.findByIdAndUpdate(id, { inStock });
    return res.json({ success: true, message: "Stock updated successfully" });
  } catch (error) {
    console.error("Change stock error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
