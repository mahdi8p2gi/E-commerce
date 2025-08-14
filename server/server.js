import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import connectdb from "./configs/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRouter from "./routes/userRoute.js";
// import bestSellersRoutes from "./routes/bestSellers.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// پیکربندی dotenv
dotenv.config();

// ساخت اپ
const app = express();
const port = process.env.PORT || 5000;

// اتصال به دیتابیس
connectdb();

// Middleware ها
app.use(express.json()); // برای پردازش JSON
app.use(cookieParser());

// فعال‌سازی CORS برای فرانت
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// مسیر فایل‌های آپلود شده
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// مسیرهای API
app.use("/api/products", productRoutes);
app.use("/api/users", userRouter);
// app.use("/api/best-sellers", bestSellersRoutes);

// تست سلامت سرور
app.get("/", (req, res) => {
  res.send("✅ سرور Express فعال است!");
});

// اجرای سرور
app.listen(port, () => {
  console.log(`🚀 سرور در حال اجراست: http://localhost:${port}`);
});
