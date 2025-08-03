import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./configs/db.js";
import userRouter from "./routes/userRoute.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// اجازه اتصال از کلاینت
const allowedOrigins = ["http://localhost:3000"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// چک سلامت سرور
app.get("/", (req, res) => {
  res.send("✅ سرور Express فعال است!");
});

// مسیرهای API
app.use("/api/user", userRouter);


// اجرای سرور
const startServer = async () => {
  try {
    await connectdb();
    app.listen(port, () => {
      console.log(`🚀 سرور در حال اجراست: http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ خطا در اجرای سرور:", err.message);
  }
};

startServer();
