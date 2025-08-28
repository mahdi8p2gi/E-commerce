import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Secret key for signing JWTs
// Make sure to set a strong key in .env for production
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

/**
 * Middleware to protect routes and authenticate users
 * Checks for a JWT in cookies, verifies it, and attaches the user to req.user
 */
export const authUser = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user to request object (exclude password)
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error("Invalid or expired token:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authUser;
