import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; // 👈 توکن از کوکی گرفته می‌شود

    if (!token) {
      return res.status(401).json({ message: "توکن ارسال نشده" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error("توکن نامعتبر یا منقضی شده:", error.message);
    res.status(401).json({ message: "توکن نامعتبر یا منقضی شده" });
  }
};


