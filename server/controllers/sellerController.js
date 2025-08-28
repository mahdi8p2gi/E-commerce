import jwt from "jsonwebtoken";

/**
 * Seller Login
 * POST /api/seller/login
 */
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check credentials against environment variables
    if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      // Set sellerToken cookie
      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({ success: true, message: "Logged in successfully" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Seller login error:", error);
    return res.status(500).json({ success: false, message: "Server error during login" });
  }
};

/**
 * Check if Seller is Authenticated
 * GET /api/seller/is-auth
 */
export const isSellerAuth = async (req, res) => {
  try {
    // If this middleware is reached, the seller token is valid
    return res.json({ success: true });
  } catch (error) {
    console.error("Seller auth check error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Seller Logout
 * POST /api/seller/logout
 */
export const sellerLogout = async (req, res) => {
  try {
    // Clear sellerToken cookie
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Seller logout error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
