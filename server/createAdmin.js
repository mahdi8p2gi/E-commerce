import mongoose from "mongoose";
import User from "./models/User.js"; // مسیر مدل
import bcrypt from "bcrypt";
mongoose
  .connect("mongodb://localhost:27017/green-cart")
  .then(async () => {
    const adminExists = await User.findOne({ email: "admin@example.com" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("yourAdminPassword", 10);
      const admin = new User({
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword, 
        role: "admin",
      });
      await admin.save();
      console.log("ادمین ساخته شد");
    } else {
      console.log("ادمین قبلاً وجود دارد");
    }
    mongoose.disconnect();
  })
  .catch(console.error);
