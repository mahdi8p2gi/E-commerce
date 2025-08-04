import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const protect = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "احراز هویت انجام نشد، توکن موجود نیست" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    console.error("❌ خطا در middleware احراز هویت:", error);
    return res.status(401).json({ message: "توکن نامعتبر یا منقضی شده" });
  }
};
