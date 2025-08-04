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
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
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

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

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

// دریافت اطلاعات کاربر فعلی
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage || null,
    });
  } catch (error) {
    console.error("❌ خطا در دریافت پروفایل:", error);
    res.status(500).json({ message: "خطای سرور" });
  }
};

// بروزرسانی پروفایل و عکس پروفایل
export const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

    // چک کردن نام کاربری تکراری به جز کاربر خودش
    if (username && username !== user.username) {
      const exists = await User.findOne({
        username,
        _id: { $ne: req.user.id },
      });
      if (exists)
        return res.status(400).json({ message: "نام کاربری تکراری است" });
      user.username = username.toLowerCase().trim();
    }

    if (email && email.toLowerCase() !== user.email) {
      const emailExists = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: req.user.id },
      });
      if (emailExists)
        return res.status(400).json({ message: "ایمیل تکراری است" });
      user.email = email.toLowerCase().trim();
    }

    if (req.file) {
      const buffer = await sharp(req.file.buffer).resize(300).png().toBuffer();
      user.profileImage = buffer.toString("base64");
    }

    await user.save();

    res.json({
      message: "پروفایل بروز شد",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage || null,
      },
    });
  } catch (error) {
    console.error("❌ خطا در بروز رسانی پروفایل:", error);
    res.status(500).json({ message: "خطای سرور" });
  }
};

// تغییر رمز عبور
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // لاگ‌ برای دیباگ
    console.log("User ID:", req.user?.id);
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "هر دو رمز قبلی و جدید باید وارد شوند" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ message: "رمز قبلی اشتباه است" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "رمز عبور با موفقیت تغییر کرد" });
  } catch (error) {
    console.error("❌ خطا در تغییر رمز عبور:", error);
    res.status(500).json({ message: "خطای سرور", error: error.message });
  }
};
// حذف حساب کاربری
export const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.clearCookie("token");
    res.json({ message: "حساب کاربری حذف شد" });
  } catch (error) {
    console.error("❌ خطا در حذف حساب:", error);
    res.status(500).json({ message: "خطای سرور" });
  }
};
