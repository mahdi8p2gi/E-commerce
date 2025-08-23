import { v2 as cloudinary } from "cloudinary";

import Product from "../models/Product.js";

// add product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    // Parse محصول
    const productData = JSON.parse(req.body.productData);
    productData.category = productData.category.toLowerCase();

    // بررسی فایل‌ها
    const images = req.files || []; // اگر هیچ فایلی نبود آرایه خالی

    // آپلود تصاویر روی Cloudinary
    let imageUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // ایجاد محصول در دیتابیس
    const newProduct = await Product.create({
      ...productData,
      image: imageUrl, // آرایه URL ها
    });

    res.json({
      success: true,
      message: "Product added",
      product: newProduct,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get product : /api/product/list
export const productList = async (req, res) => {
  try {
    const product = await Product.find({});
    res.json({ success: true, products: product });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get single product : /api/product/id
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// change product in stock : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
