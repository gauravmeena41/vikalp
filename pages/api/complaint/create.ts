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
      complaintDescription,
      complaintCategory,
      expectedResolution,
      complainantName,
      complainantEmail,
      complainantPhone,
      respondentName,
      respondentEmail,
      respondentPhone,
      fileLink,
    } = req.body;

    const complaint = await Complaint.create({
      odrProviderId,
      comaplaintId: await generateUniqueId(),
      complaintDescription,
      complaintCategory,
      expectedResolution,
      complainantName,
      complainantEmail,
      complainantPhone,
      respondentName,
      respondentEmail,
      respondentPhone,
      fileLink,
    });

    // await sendMail({
    //   from: process.env.MAIL_EMAIL_ID,
    //   to: odrProvider.email,
    //   subject: "Received a new Complaint on Vikalp",
    //   text: `You have received a new complaint on vikalp Platform. Please checkout the details listed below:\n
    //           ${complaint.complainantName} vs ${complaint.respondentName}\n
    //             Complaint Id: ${complaint.comaplaintId}\n
    //             Happy Resolving`,
    // });

    res.status(200).json({
      status: 1,
      data: complaint,
    });

    await sendMail({
      from: process.env.MAIL_EMAIL_ID,
      to: complainantEmail,
      subject: "Complaint Filled Successfully",
      text: `Complaint filled successfully:\n
      ${complaint.complainantName} vs ${complaint.respondentName}\n
      Complaint Id: ${complaint.comaplaintId}`,
    });
    await sendMail({
      from: process.env.MAIL_EMAIL_ID,
      to: respondentEmail,
      subject: "Complaint Filled against You",
      text: `A complaint has been filled aginst you by ${complaint.complainantName}\n
               Dispute will be resolved by SAMA\n
               Complaint Id of the same is ${complaint.comaplaintId}`,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: 0,
      message: "Internal server error",
    });
  }
}
