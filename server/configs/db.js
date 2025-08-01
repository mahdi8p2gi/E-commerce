// اتصال به دیتابیس MongoDB
import mongoose from "mongoose";

// تابع اتصال
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ اتصال به MongoDB با موفقیت انجام شد");
  } catch (error) {
    console.error("❌ خطا در اتصال به دیتابیس:", error.message);
    process.exit(1); // اگر اتصال قطع شد، سرور رو متوقف کن
  }
};

export default connectdb;
