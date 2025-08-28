import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import mongoose from "mongoose";

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
      token,
    });
  } catch (error) {
    console.error("❌ خطا در ورود:", error);
    return res.status(500).json({ message: "خطای سرور در ورود" });
  }
};

export const isAuth = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("-password");
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    // پاک کردن کوکی sellerToken
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // فقط روی https در پروداکشن
      sameSite: "strict",
    });

    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};





export const updateProfile = async (req, res) => {
  try {
    const { userId, username, email } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "شناسه کاربر معتبر نیست" });
    }

    if (!username && !email) {
      return res
        .status(400)
        .json({ message: "نام کاربری یا ایمیل باید ارسال شود" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(username && { username }),
        ...(email && { email }),
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطای سرور" });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await User.find({}, {
      username: 1,
      email: 1,
      role: 1,
      avatar: 1,
      isBanned: 1,
      createdAt: 1,
    }).sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "خطا در دریافت لیست کاربران" });
  }
};

export const toggleBanUser = async (req, res) => {
  try {
    const { userId, isBanned } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: "شناسه کاربر الزامی است" });
    await User.findByIdAndUpdate(userId, { isBanned: !!isBanned });
    res.json({ success: true, message: isBanned ? "کاربر مسدود شد" : "کاربر آزاد شد" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "خطا در تغییر وضعیت کاربر" });
  }
};
