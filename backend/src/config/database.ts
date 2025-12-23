import mongoose from "mongoose";


const connectDB = async (): Promise<void> => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI missing in environment variables");
    }

    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Database connection failed:", error);

    // Stop the app if database connection fails
    process.exit(1);
  }
};

export default connectDB;
