// place order cod : /api/cod

import Order from "../models/Order.js";
import Product from "../models/Product.js";


export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      res.json({ success: false, message: "invalid data" });
    }
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);
    amount += Math.floor(amount * 0.02);
    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });
    res.json({ success: true, message: "order placed seuuccfyluut" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};



// Get orders by user id : /api/order/user

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    // پیدا کردن سفارش‌ها با شرط COD یا پرداخت شده
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address") // دقت کن اسم فیلدهای مدل
      .sort({ createdAt: -1 }); // ترتیب از جدیدترین به قدیمی‌ترین

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// get all orders (sellers /admin) : /api/order/seller

export const getAllOrders = async (req, res) => {
  try {
   

    // پیدا کردن سفارش‌ها با شرط COD یا پرداخت شده
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address") // دقت کن اسم فیلدهای مدل
      .sort({ createdAt: -1 }); // ترتیب از جدیدترین به قدیمی‌ترین

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
