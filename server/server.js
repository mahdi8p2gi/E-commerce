import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import connectdb from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRoutes from "./routes/productRoutes.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import commentsRouter from "./routes/commentsRouter.js";

// Initialize environment variables
dotenv.config();

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
await connectdb();

// Connect to Cloudinary
await connectCloudinary();

// ----------------- Middleware ----------------- //
// Parse incoming JSON requests
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Enable CORS for frontend (adjust the origin for production)
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true, // allow cookies
  })
);

// ----------------- Routes ----------------- //
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product", productRoutes);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/comments", commentsRouter);

// ----------------- Health Check ----------------- //
app.get("/", (req, res) => {
  res.send("✅ Express server is running!");
});

// ----------------- 404 Handler ----------------- //
// Catch all undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

// ----------------- Start Server ----------------- //
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
