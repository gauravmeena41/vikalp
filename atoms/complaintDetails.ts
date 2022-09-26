// @ts-nocheck

import { atom } from "recoil";

export const complaintDetails = atom({
  key: "complaintDetails",
  default: {
    stage: 0,
    complaintDescription: "",
    complaintCategory: "",
    expectedResolution: "",
    complainantName: "Gaurav Meena",
    complainantEmail: "gurumeena41.gm@gmail.com",
    complainantPhone: "8769973256",
    respondentName: "",
    respondentEmail: "",
    respondentPhone: "",
    file: {
      fileLink: "",
      fileType: "",
    },
  },
});
