import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sharp from "sharp";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// ثبت‌نام

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
        .json({ success: false, message: "ایمیل یا نام کاربری قبلاً ثبت شده" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "user", // نقش پیش‌فرض
    });

    await newUser.save();

    // ✅ ایجاد توکن با اطلاعات کاربر
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ ست کردن توکن در کوکی (اختیاری - برای استفاده با مرورگر)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // در توسعه false
      sameSite: "lax", // یا "strict"
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ پاسخ به فرانت‌اند
    return res.status(201).json({
      success: true,
      message: "ثبت‌نام با موفقیت انجام شد",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      token, // فرستادن توکن برای ذخیره در localStorage
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

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

    const { name, email, password } = req.body;

    // به‌روزرسانی نام و ایمیل
    if (name) user.name = name;
    if (email) user.email = email;

    // اگر رمز وارد شده بود، رمز قبلی را بروزرسانی کن
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // اگر کاربر عکس فرستاده بود
    if (req.file) {
      const imageBuffer = req.file.buffer;
      // اینجا می‌تونی ذخیره کنی در دیسک یا فضای ابری
      // برای تست، فرض می‌گیریم آدرس عکس رو در فیلد avatar ذخیره می‌کنی
      user.avatar = `data:${req.file.mimetype};base64,${imageBuffer.toString(
        "base64"
      )}`;
    }

    await user.save();

    res.json({
      message: "پروفایل با موفقیت به‌روزرسانی شد",
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error("خطا در ویرایش پروفایل:", err);
    res.status(500).json({ message: "خطا در سرور" });
  }
};
