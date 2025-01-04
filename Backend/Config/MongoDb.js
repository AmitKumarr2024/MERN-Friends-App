import mongoose from "mongoose";

const mongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error in connecting to MongoDB:", error);
  }
};

export default mongodb;
