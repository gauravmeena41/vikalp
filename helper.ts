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
    await nodemailer
      .createTransport({
        service: "hotmail",
        auth: {
          user: "vikalp.sama@hotmail.com",
          pass: process.env.MAIL_PASSWORD,
        },
      })
      .sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
