import Order from "../models/Order.js";
import Product from "../models/Product.js";

/**
 * Place an order with Cash on Delivery (COD)
 * POST /api/cod
 */
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid order data" });
    }

    // Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      amount += product.offerPrice * item.quantity;
    }

    // Add 2% tax or fees
    amount += Math.floor(amount * 0.02);

    // Create order in DB
    const newOrder = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Place order error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get orders for a specific user
 * POST /api/order/user
 */
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: "User ID is required" });

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address") // populate products and addresses
      .sort({ createdAt: -1 }); // newest orders first

    return res.json({ success: true, orders });
  } catch (error) {
    console.error("Get user orders error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get all orders (for sellers/admin)
 * GET /api/order/seller
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (error) {
    console.error("Get all orders error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
