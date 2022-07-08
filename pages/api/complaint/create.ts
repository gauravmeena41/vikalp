// @ts-nocheck

import connectDb from "../../../utils/connectDb";
import User from "../../../models/User";
import Complaint from "../../../models/Complaint";
import mongoose from "mongoose";
import { generateUniqueId } from "../../../helper";

connectDb();
export default handler = async (req: any, res: any) => {
  try {
    const {
      odrProviderId,
      complaintDescription,
      complaintCategory,
      expectedResolution,
      expectedResolutionDescription,
      complainantName,
      complainantEmail,
      complainantPhone,
      respondentName,
      respondentEmail,
      respondentPhone,
      files,
      status,
      consent,
    } = req.body;
    const odrProvider = await User.findOne({
      _id: mongoose.Types.ObjectId(odrProviderId),
    });
    if (!odrProvider || (odrProvider && !odrProvider.role))
      return res.json({
        status: 0,
        message: "This ODR Provider is not registered on Vikalp",
      });

    const complaint = await Complaint.create({
      comaplaintId: await generateUniqueId(),
      odrProviderId,
      complaintDescription,
      complaintCategory,
      expectedResolution,
      expectedResolutionDescription,
      complainantName,
      complainantEmail,
      complainantPhone,
      respondentName,
      respondentEmail,
      respondentPhone,
      files,
      status,
      consent,
    });
    res.status(200).json({
      status: 1,
      data: complaint,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: 0,
      message: "Internal server error",
    });
  }
};
