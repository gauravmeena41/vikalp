// @ts-nocheck

import connectDb from "../../../utils/connectDb";
import User from "../../../models/User";
import Complaint from "../../../models/Complaint";
import mongoose from "mongoose";

connectDb();
export default async function handler(req: any, res: any) {
  try {
    let complaint = await Complaint.findOne({
      complaintId: req.query.complaintId,
    });
    complaint = await Complaint.findByIdAndUpdate(
      complaint._id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: 1,
      data: complaint,
      message: "Complaint updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 0,
      message: "Internal server error",
    });
  }
}
