import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User.js";  // مسیر درست به مدل کاربر

const MONGO_URI = "mongodb://localhost:27017/green-cart"; // آدرس دیتابیس‌ات را اینجا بذار

async function createAdmin() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const email = "admin@example.com";      // ایمیل ادمین رو اینجا تغییر بده
  const password = "admin123";             // پسورد ادمین رو اینجا تغییر بده
  const username = "admin";

  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) {
    console.log("ادمین قبلاً ساخته شده");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUser = new User({
    username,
    email,
    password: hashedPassword,
    role: "admin",
  });

  await adminUser.save();
  console.log("ادمین ساخته شد!");
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
