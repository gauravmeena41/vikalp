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
