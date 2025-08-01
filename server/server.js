import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./configs/db.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:3000'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.get('/', (req, res) => {
  res.send("✅ سرور وصل شد!");
});

app.use('/api/user', userRouter);

// ✅ تابع main جداگانه برای اتصال و راه‌اندازی
const startServer = async () => {
  try {
    await connectdb();
    app.listen(port, () => {
      console.log(`🚀 سرور در حال اجرا: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ سرور اجرا نشد:", error.message);
  }
};

startServer();
