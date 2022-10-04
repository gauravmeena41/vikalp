// @ts-nocheck

import connectDb from "../../../utils/connectDb";
import Complaint from "../../../models/Complaint";
import { generateUniqueId, sendMail } from "../../../helper";

connectDb();
export default async function handler(req: any, res: any) {
  try {
    const {
      vua,
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
      vua,
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
