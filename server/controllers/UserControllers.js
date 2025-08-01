import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = "your_jwt_secret_key";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "تمام فیلدها را پر کنید" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "ایمیل قبلا ثبت شده" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ارسال توکن در کوکی با تنظیمات امنیتی
    res.cookie("token", token, {
      httpOnly: true,     // فقط از طریق HTTP (نه جاوااسکریپت) قابل دسترسیه برای امنیت بیشتر
      secure: process.env.NODE_ENV === "production", // فقط روی HTTPS کوکی ارسال میشه
      sameSite: "strict",  // جلوگیری از کوکی‌ در درخواست‌های سایت‌های دیگر
      maxAge: 60 * 60 * 1000  // زمان انقضا کوکی به میلی‌ثانیه (1 ساعت)
    });

    res.status(201).json({ 
      success: true, 
      message: "ثبت‌نام با موفقیت انجام شد",
      user: { name: newUser.name, email: newUser.email }  // اطلاعات کاربر بدون پسورد
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "خطای سرور" });
  }
};
