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

export const sendMail = async (messageArr) => {
  try {
    let transporter = await nodemailer.createTransport({
      pool: true,
      service: "hotmail",
      auth: {
        user: process.env.MAIL_EMAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    let res = await transporter.sendMail(messageArr.shift());
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
