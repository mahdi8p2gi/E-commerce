import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // لینک یا مسیر عکس
  bestSeller: { type: Boolean, default: false }

}, { timestamps: true });

export default mongoose.model("Product", productSchema);
