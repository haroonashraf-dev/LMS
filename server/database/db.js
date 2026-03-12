// Database User Password==> lms_mern_project3407

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("error occurred", error);
  }
};

export default connectDB;
