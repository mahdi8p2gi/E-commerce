import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import connectdb from "./configs/db.js";
import userRouter from "./routes/userRoute.js";

// گرفتن مسیر فعلی فایل برای کار با __dirname در ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// ساخت اپ
const app = express();
const port = process.env.PORT || 5000;

// اتصال به دیتابیس
connectdb();

// لیست دامین‌هایی که اجازه دسترسی به سرور رو دارن
const allowedOrigins = ["http://localhost:3000"];

app.use(express.json());
app.use(cookieParser());

// تنظیم cors برای فرانت‌اند
app.use(
  cors({
     origin: "http://localhost:3000",
    credentials: true, // برای ارسال کوکی‌ها از فرانت
  })
);

// تست سالم بودن سرور
app.get("/", (req, res) => {
  res.send("✅ سرور Express فعال است!");
});

// مسیر آپلود فایل‌ها
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// مسیر API کاربران
app.use("/api/users", userRouter);

// اجرای سرور
app.listen(port, () => {
  console.log(`🚀 سرور در حال اجراست در آدرس: http://localhost:${port}`);
});
