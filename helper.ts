// @ts-nocheck

import axios from "axios";

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

export const sendMail = async () => {
  const headers = {
    Authorization:
      "App 950a23d4c29c7be2afcb32e7e339dff2-7ce613f0-0986-4c25-8593-47f5ebfb4817",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  let url;
  url = `https://lzvd9j.api.infobip.com/email/3/send`;
  let body = {
    'from': '<gurumeena41.gm@gmail.com>',
    'to': 'gurumeena41.gm@gmail.com',
    'subject': 'Mail subject text',
    'html': '<h1>Html body</h1><p>Rich HTML message body.</p>',
    'text': 'Mail body text',
    'intermediateReport': 'true',
};
  let result = await axios.post(url, body, {
    headers: headers,
  });

  console.log(result);
};
