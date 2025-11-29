// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Modern Mongoose doesn't need deprecated options
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.error("❌ Full error details:", error);
    process.exit(1);
  }
};

export default connectDB;
