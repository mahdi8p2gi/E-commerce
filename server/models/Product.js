import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: [{ type: String }], // آرایه از توضیحات
  image: [{ type: String }],       // آرایه از لینک‌های تصویر
  bestSeller: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true }, // موجودی محصول
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
