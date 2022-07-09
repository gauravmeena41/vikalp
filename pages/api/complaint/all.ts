// @ts-nocheck

import connectDb from "../../../utils/connectDb";
import User from "../../../models/User";
import Complaint from "../../../models/Complaint";
import mongoose from "mongoose";

connectDb();
export default async function handler(req: any, res: any) {
  try {
    let complaints = [];
    if (req.query.odrProviderId) {
      const odrProvider = await User.findOne({
        _id: mongoose.Types.ObjectId(req.query.odrProviderId),
      });
      if (!odrProvider)
        return res.json({
          status: 0,
          message: "This ODR Provider is not registered on Vikalp",
        });
      complaints = await Complaint.find({
        odrProviderId: req.query.odrProviderId,
      }).sort({ createdAt: -1 });
    } else if (req.query.userId) {
      complaints = await Complaint.find({
        complainantId: req.query.userId,
      }).sort({ createdAt: -1 });
    }
    res.status(200).json({
      status: 1,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Internal server error",
    });
  }
}
