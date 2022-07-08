// @ts-nocheck

import connectDb from "../../../utils/connectDb";
import Complaint from "../../../models/Complaint";
import mongoose from "mongoose";

connectDb();
export default handler = async (req: any, res: any) => {
  try {
    const complaint = await Complaint.findOne({
      comaplaintId: req.query.complaintId,
    });
    res.status(200).json({ status: 1, complaintStatus: complaint.status });
  } catch (error) {
    res.status(500).send({
      status: 0,
      message: "Internal Server Error",
    });
  }
};
