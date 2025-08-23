import mongoose from "mongoose";
import {
  dummyProducts,
  categories,
  dummyOrders,
  dummyAddress,
  features,
  footerLinks,
} from "../client/src/assets/assets";

// اتصال به Atlas
const atlasURI = "mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.xxxxx.mongodb.net/green-cart";

// اسکیمای محصولات
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  inStock: Boolean,
  image: [String],
});
const Product = mongoose.model("Product", productSchema);

// اسکیمای دسته‌بندی
const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Category = mongoose.model("Category", categorySchema);

// سفارشات
const orderSchema = new mongoose.Schema({
  user: String,
  total: Number,
  status: String,
});
const Order = mongoose.model("Order", orderSchema);

// آدرس‌ها
const addressSchema = new mongoose.Schema({
  user: String,
  city: String,
  zip: String,
});
const Address = mongoose.model("Address", addressSchema);

// ویژگی‌ها
const featureSchema = new mongoose.Schema({
  title: String,
  description: String,
});
const Feature = mongoose.model("Feature", featureSchema);

// لینک‌های فوتر
const footerLinkSchema = new mongoose.Schema({
  title: String,
  url: String,
});
const FooterLink = mongoose.model("FooterLink", footerLinkSchema);

async function seedData() {
  try {
    await mongoose.connect(atlasURI);
    console.log("✅ Connected to Atlas");

    // پاک کردن داده‌های قبلی (اختیاری)
    await Promise.all([
      Product.deleteMany({}),
      Category.deleteMany({}),
      Order.deleteMany({}),
      Address.deleteMany({}),
      Feature.deleteMany({}),
      FooterLink.deleteMany({}),
    ]);
    console.log("🗑️ Old data removed");

    // وارد کردن داده‌ها
    await Product.insertMany(dummyProducts);
    await Category.insertMany(categories);
    await Order.insertMany(dummyOrders);
    await Address.insertMany(dummyAddress);
    await Feature.insertMany(features);
    await FooterLink.insertMany(footerLinks);

    console.log("🎉 All assets inserted into Atlas successfully!");

    process.exit();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

seedData();
