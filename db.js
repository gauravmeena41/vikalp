const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToMongoose = () => {
  mongoose.connect(process.env.DEV_MONGO_URI, () => {
    console.log("Connected to DB, Let's roll");
  });
};
module.exports = connectToMongoose;
