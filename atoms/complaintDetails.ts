// @ts-nocheck

import { atom } from "recoil";

export const complaintDetails = atom({
  key: "complaintDetails",
  default: {
    stage: 0,
    vua: "",
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
