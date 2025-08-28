import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import connectdb from "./configs/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRouter from "./routes/userRoute.js";
// import sellerRouter from "./routes/sellerRoute.js";
import connectCloudunary from "./configs/cloudinary.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import commentsRoutesr from "./routes/commentsRouter.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// پیکربندی dotenv
dotenv.config();

// ساخت اپ
const app = express();
const port = process.env.PORT || 5000;

await connectdb();
await connectCloudunary();

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

// مسیرهای API
app.use("/api/users", userRouter);
// app.use("/api/seller", sellerRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product", productRoutes);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/comments", commentsRoutesr);




// تست سلامت سرور
app.get("/", (req, res) => {
  res.send("✅ سرور Express فعال است!");
});

// اجرای سرور
app.listen(port, () => {
  console.log(`🚀 سرور در حال اجراست: http://localhost:${port}`);
});

app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});
