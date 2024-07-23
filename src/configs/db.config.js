import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const env = process.env;
const connectDB = async () => {
  await mongoose
    .connect(env.MONGODB_URI)
    .then(() => console.log("Connecting mongodb"))
    .catch((error) => console.log("Error: ", error));
};

export default connectDB;
