// @ts-nocheck

import { atom } from "recoil";

export const complaintDetails = atom({
  key: "complaintDetails",
  default: {
    stage: 0,
    complaintDescription: "dcadadada",
    complaintCategory: "dcadadada",
    expectedResolution: "dcadadada",
    expectedResolutionDescription: "dcadadada",
    respondentName: "dcadadada",
    respondentEmail: "dcadadada",
    respondentPhone: "dcadadada",
    file: {
      fileLink: "",
      fileType: "dcadadada",
    },
    consent: false,
    status: "Pending",
  },
});
