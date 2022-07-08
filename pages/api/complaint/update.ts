// @ts-nocheck

import connectDb from "../../../utils/connectDb";
import User from "../../../models/User";
import Complaint from "../../../models/Complaint";
import mongoose from "mongoose";

connectDb();
export default handler = async (req: any, res: any) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.query.complaintId),
      },
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
    res.status(500).json({
      status: 0,
      message: "Internal server error",
    });
  }
};
