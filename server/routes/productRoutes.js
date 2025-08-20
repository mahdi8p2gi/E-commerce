import express from "express";
import multer from "multer";
import path from "path";
import Product from "../models/Product.js";

import fs from "fs";
const router = express.Router();

// محل ذخیره‌سازی عکس‌ها

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // پوشه رو بسازه اگه نبود
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

  console.log('req.body.productData:', req.body.productData);

    const productData = JSON.parse(req.body.productData);

    const { name, price, category, description } = productData;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: "نام، قیمت و دسته‌بندی الزامی است" });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const newProduct = new Product({
      name,
      price,
      category,
      description,
      image: imagePath,
    });

    await newProduct.save();

    res
      .status(201)
      .json({
        message: "✅ محصول ذخیره شد",
        product: newProduct,
        success: true,
      });
  } catch (error) {
    console.error("Error in POST /api/products:", error);
    res
      .status(500)
      .json({ message: "❌ خطا در ذخیره محصول", error: error.message });
  }
});

// دریافت همه محصولات
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ خطا در گرفتن محصولات", error: error.message });
  }
});

export default router;
