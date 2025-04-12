import mongoose from "mongoose";

const connectDb = () => {
  try {
    mongoose.connect(process.env.MONGODB);
    console.log("Successfully connected to database.");
  } catch (error) {
    console.log("Failed to connect to database.");
  }
};

export default connectDb;
