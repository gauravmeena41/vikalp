// @ts-nocheck

import nodemailer from "nodemailer";

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

export const generateUniqueId = async () => {
  return `${
    letters[Math.floor(Math.random() * letters.length)]
  }${new Date().getTime()}${
    letters[Math.floor(Math.random() * letters.length)]
  }`;
};

export const sendMail = async (mailOptions) => {
  try {
    let transporter = await nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.MAIL_EMAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    mailOptions.map(async(mailOption) => {
      let res = await transporter.sendMail(mailOption);
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};
