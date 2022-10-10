// @ts-nocheck

import connectDb from "../../../utils/connectDb";
import Complaint from "../../../models/Complaint";
import { generateUniqueId, sendMail, sendMailSES } from "../../../helper";

connectDb();
export default async function handler(req: any, res: any) {
  const errors = [];
  try {
    const {
      vua,
      odrProviderId,
      complaintDescription,
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
      comaplaintId: generateUniqueId(),
      complaintDescription,
      expectedResolution,
      complainantName,
      complainantEmail,
      complainantPhone,
      respondentName,
      respondentEmail,
      respondentPhone,
      fileLink,
    });

    try {
      sendMailSES({
        toAddresses: [respondentEmail],
        emailSubject: "Complaint Filed against You",
        emailBody: `Hello,\n

        //   We are Team Sama! Sama helps people solve their legal problems without going to court, completely online. A complaint has been filed against you by <Complainant Name>. Don’t worry, Sama is here to listen to your side of the case too.\n
  
        //   Sama will help you and ${complainantName} resolve this issue peacefully with the help of an expert Sama Conciliator. Sama’s Conciliators are trained in resolving conflict and have already resolved over 200,000 cases for Sama! Your case is in safe hands.\n
  
        //   The Sama Conciliator will get in touch with you shortly.\n
  
        //   Suljhao, Magar Pyaar Se,\n
        //   Team Sama`,
      });

      sendMailSES({
        toAddresses: [complainantEmail],
        emailSubject: "Complaint Filed against You",
        emailBody: `Hi ${complainantName},\n

        //   Your complaint was filed successfully. We have reached out to the other party and will have one of Sama’s expert Conciliators speak with you shortly.\n
  
        //   Sama’s Conciliators have helped resolve over 200,000 cases in the last year! Your case is in safe hands.\n
        //   We look forward to helping you resolve this case peacefully.\n
  
        //   Suljhao, Magar Pyaar Se,\n
        //   Team Sama`,
      });
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({
      status: 1,
      data: complaint,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 0,
      message: "Complaint not filled successfully",
    });
  }
}
