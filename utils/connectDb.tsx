// @ts-nocheck

import mongoose from "mongoose";

const connectDb = async () => {
  mongoose
    .connect(process.env.DEV_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res: any) => console.log("Connected to MongoDB"));
};
export default connectDb;
