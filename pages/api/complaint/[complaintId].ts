// @ts-nocheck

import connectDb from "../../../utils/connectDb";
import User from "../../../models/User";
import Complaint from "../../../models/Complaint";
import mongoose from "mongoose";

connectDb();
export default handler = async (req: any, res: any) => {
  try {
    const complaints = await Complaint.findOne({
      comaplaintId: req.query.complaintId,
    });
    res.status(200).json({
      status: 1,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Internal server error",
      error
    });
  }
};
