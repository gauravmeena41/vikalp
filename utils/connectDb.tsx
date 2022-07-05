import mongoose from "mongoose";

console.log(process.env.DEV_MONGO_URI);

const connectDb = async () =>
  mongoose
    .connect(
      process.env.DEV_MONGO_URI
    )
    .then((res: any) => console.log("Connected to MongoDB"));

export default connectDb;
