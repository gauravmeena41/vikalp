import { Schema, model, models } from "mongoose";

const odrProvider = new Schema({
    id: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
  },
});

const ODRProvider = models.ODRProvider || model("ODRProvider", odrProvider);

module.exports = ODRProvider;
