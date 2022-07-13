// @ts-nocheck

import connectDb from "../../../utils/connectDb";
import User from "../../../models/User";
import Complaint from "../../../models/Complaint";
import mongoose from "mongoose";
import { generateUniqueId, sendMail } from "../../../helper";

connectDb();
export default async function handler(req: any, res: any) {
  try {
    const {
      odrProviderId,
      complainantId,
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
    const user = await User.findOne({
      _id: mongoose.Types.ObjectId(complainantId),
    });
    if (!odrProvider || (odrProvider && !odrProvider.role))
      return res.json({
        status: 0,
        message: "This ODR Provider is not registered on Vikalp",
      });
    else if (!user)
      return res.json({
        status: 0,
        message: "This user is not registered on Vikalp",
      });

    const complaint = await Complaint.create({
      comaplaintId: await generateUniqueId(),
      odrProviderId,
      complainantId,
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

    sendMail({
      from: "vikalp_sama@hotmail.com",
      to: [complainantEmail, odrProvider.email],
      subject: "Complaint Filled Successfully",
      text: `Complaint filled successfully:\ncomplainentName: ${complaint.complainantName}\nODR Provider: ${odrProvider.name}\nComplaint Id: ${complaint.comaplaintId}`,
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
}
