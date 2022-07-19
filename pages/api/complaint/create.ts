// @ts-nocheck

import connectDb from "../../../utils/connectDb";
import User from "../../../models/User";
import Complaint from "../../../models/Complaint";
import mongoose from "mongoose";
import { generateUniqueId, sendinfobip, sendMail } from "../../../helper";

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

    res.status(200).json({
      status: 1,
      data: complaint,
    });

    // sendMail({
    //   from: process,
    //   to: [complainantEmail,respondentEmail, odrProvider.email],
    //   subject: "Complaint Filled Successfully",
    //   text: `Complaint filled successfully:\n
    //   ${complaint.complainantName} vs ${complaint.respondentName}\n
    //   ODR Provider: ${odrProvider.name}\n
    //   Complaint Id: ${complaint.comaplaintId}`,
    // });
    await sendMail({
      from: process.env.MAIL_EMAIL_ID,
      to: complainantEmail,
      subject: "Complaint Filled Successfully",
      text: `Complaint filled successfully:\n
      ${complaint.complainantName} vs ${complaint.respondentName}\n
      ODR Provider: ${odrProvider.name}\n
      Complaint Id: ${complaint.comaplaintId}`,
    });
    await sendMail({
      from: process,
      to: respondentEmail,
      subject: "Complaint Filled against You",
      text: `A complaint has been filled aginst you by ${complaint.complainantName}\n
               Dispute will be resolved by the ODR Provider: ${odrProvider.name}\n
               Complaint Id of the same is ${complaint.comaplaintId}`,
    });
    await sendMail({
      from: process,
      to: odrProvider.email,
      subject: "Received a new Complaint on Vikalp",
      text: `You have received a new complaint on vikalp Platform. Please checkout the details listed below:\n
              ${complaint.complainantName} vs ${complaint.respondentName}\n
                Complaint Id: ${complaint.comaplaintId}\n
                Happy Resolving`,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: 0,
      message: "Internal server error",
    });
  }
}
