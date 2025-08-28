import User from "../models/User.js";

/**
 * Update user cart data
 * POST /api/cart/update
 * 
 * Accepts updates from both logged-in users and guests
 */
export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    // Handle guest cart updates (no userId)
    if (!userId) {
      return res.json({
        success: true,
        message: "Guest cart accepted",
        cartItems,
      });
    }

    // Update cart for logged-in user
    await User.findByIdAndUpdate(userId, { cartItems }, { new: true });

    return res.json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.error("Update cart error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating cart",
    });
  }
};
