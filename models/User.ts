import { Schema, model, models } from "mongoose";

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  termsAndConditions: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", user);

export default User;
