// @ts-nocheck

import { atom } from "recoil";

export const complaintDetails = atom({
  key: "complaintDetails",
  default: {
    stage: 0,
    vua: "61684e2bd4bcd0001462a4a4",
    complaintDescription: "",
    complaintCategory: "",
    expectedResolution: "",
    complainantName: "",
    complainantEmail: "",
    complainantPhone: "",
    respondentName: "",
    respondentEmail: "",
    respondentPhone: "",
    file: {
      fileLink: "",
      fileType: "",
    },
  },
});
