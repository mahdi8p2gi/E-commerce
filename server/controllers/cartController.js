import User from "../models/User.js";



// Update User CartData : /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    // Guest cart: accept update without user
    if (!userId) {
      return res.json({ success: true, message: "Guest cart accepted", cartItems });
    }

    await User.findByIdAndUpdate(userId, { cartItems }, { new: true });
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

