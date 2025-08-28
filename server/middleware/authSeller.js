import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate seller access
 * Checks for a JWT in cookies and validates against the authorized seller email
 */
const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  // If no token is provided, deny access
  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    // Verify token using JWT_SECRET
    const tokenDecoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    // Only allow access if the email matches the authorized seller email
    if (tokenDecoded.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.status(403).json({ success: false, message: "Not Authorized" });
    }
  } catch (error) {
    // Handle invalid or expired token
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authSeller;
