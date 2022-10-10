// @ts-nocheck
import nodemailer from "nodemailer";
import AWS from "aws-sdk";

const config = {
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
  region: "ap-south-1",
};

let ses = new AWS.SES(config);

let letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const generateUniqueId = () => {
  return `${
    letters[Math.floor(Math.random() * letters.length)]
  }${new Date().getTime()}${
    letters[Math.floor(Math.random() * letters.length)]
  }`;
};

export const sendMail = async (mailOptions) => {
  try {
    if (process.env.COMMUNICATION === "1") {
      let res = await nodemailer
        .createTransport({
          service: "hotmail",
          auth: {
            user: process.env.MAIL_EMAIL_ID,
            pass: process.env.MAIL_PASSWORD,
          },
        })
        .sendMail(mailOptions);
      console.log(res);
    } else {
      console.log("no communication");
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendMailSES = ({ toAddresses, emailBody, emailSubject }) => {
  for (let i = 0; i < toAddresses.length; i++) {}

  emailBody += `<p><br><br><br>
  <img width="30%" src="https://www.sama.live/assets/img/logo.png" />
  <p style='color:red;font-size:10px'>
  Note : The information contained in this e-mail and any attachments to this message are intended for the exclusive use of the intended recipient and may contain proprietary, confidential or legally privileged information. If you are not the intended recipient, please note that you are not authorised to disseminate, distribute or copy this e-mail or any parts of it or act upon/rely on the contents of this e-mail in any manner. Please notify the sender immediately by e-mail and destroy all copies of this e-mail and any attachments. Please also note that ODRways Solutions Private Limited or its subsidiaries and associated companies, (collectively 'ODRways'), are unable to exercise control or ensure or guarantee the integrity of/over the contents of the information contained in e-mail transmissions and that any views expressed in this e-mail are not endorsed by/binding on the ODRways unless the sender does so expressly with due authority of ODRways. Before opening any attachments please check them for viruses and defects and please note that ODRways accepts no liability or responsibility for any damage caused by any virus that may be transmitted by this email. Thank you for your cooperation.</p>`;

  return new Promise((resolve, reject) => {
    if (process.env.COMMUNICATION && process.env.COMMUNICATION == "0") {
      console.log("no communication");
      resolve("No communication");
    } else {
      console.log("comunication on");
      ses.sendEmail(
        {
          Source: "Sama <noreply@mailers.sama.live>",
          Destination: {
            ToAddresses: toAddresses,
          },
          ReplyToAddresses: ["info@sama.live"],
          Message: {
            Subject: {
              Charset: "UTF-8",
              Data: emailSubject,
            },
            Body: {
              Html: {
                Charset: "UTF-8",
                Data: emailBody,
              },
            },
          },
        },
        (err, data) => {
          //
          if (err) {
            resolve(err);
          } else {
            // setTimeout(async () => {
            //   ses.getSendStatistics(keys)
            // }, 5000);

            console.log("Email Response -> ", {
              responseId: data.MessageId,
              requestId: data.ResponseMetadata.RequestId,
              timestamp: new Date(Date.now()).toISOString(),
              sender: "aws sns",
              status: "pending",
            });
            resolve({
              responseId: data.MessageId,
              requestId: data.ResponseMetadata.RequestId,
              timestamp: new Date(Date.now()).toISOString(),
              sender: "aws sns",
              status: "pending",
            });
          }
        }
      );
    }
  });
};
