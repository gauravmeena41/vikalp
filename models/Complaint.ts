import mongoose, { Schema } from "mongoose";

const ComplaintSchema = new Schema({
  comaplaintId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  odrProviderId: {
    type: String,
    ref: "User",
  },
  complaintDescription: {
    type: String,
    required: true,
  },
  complaintCategory: {
    type: String,
    required: true,
  },
  expectedResolution: {
    type: String,
    required: true,
  },
  expectedResolutionDescription: {
    type: String,
    required: true,
  },
  complainantName: {
    type: String,
    required: true,
  },
  complainantEmail: {
    type: String,
    required: true,
  },
  complainantPhone: {
    type: String,
    required: true,
  },
  respondentName: {
    type: String,
    required: true,
  },
  respondentEmail: {
    type: String,
    required: true,
  },
  respondentPhone: {
    type: String,
    required: true,
  },
  files: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  consent: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    index: true,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Complaint || mongoose.model("Complaint", ComplaintSchema);
