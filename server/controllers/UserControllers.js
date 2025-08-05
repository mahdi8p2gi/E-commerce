import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sharp from "sharp";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// ثبت‌نام
export const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "تمام فیلدها را پر کنید" });
    }

    username = username.toLowerCase().trim();
    email = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      $or: [
        { email },
        { username: { $regex: `^${username}$`, $options: "i" } },
      ],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "ایمیل یا نام کاربری قبلا ثبت شده" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "user", // 👈 نقش پیش‌فرض
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role }, // 👈 نقش داخل توکن
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "ثبت‌نام با موفقیت انجام شد",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role, // 👈 فرستادن نقش به فرانت
      },
    });
  } catch (error) {
    console.error("❌ خطا در ثبت‌نام:", error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res
        .status(409)
        .json({ success: false, message: `${field} تکراری است` });
    }
    return res.status(500).json({ success: false, message: "خطای سرور" });
  }
};


// لاگین
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "ایمیل و رمز عبور الزامی است" });
    }

    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "رمز عبور اشتباه است" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // 👈 role اضافه شده باشه
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "ورود موفق",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role, // 👈 این خط رو اضافه کن
      },
    });
  } catch (error) {
    console.error("❌ خطا در ورود:", error);
    return res.status(500).json({ message: "خطای سرور در ورود" });
  }
};





