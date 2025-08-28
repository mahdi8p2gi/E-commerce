import mongoose from "mongoose";

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Connect to MongoDB (Mongoose 8+ doesn't require useNewUrlParser or useUnifiedTopology)
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Stop server if DB connection fails
  }
};

export default connectDB;
