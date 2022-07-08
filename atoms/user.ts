// @ts-nocheck

import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    id: "",
    name: "",
    email: "",
    phone: "",
    termsAndConditions: 0,
    role: 0,
  },
});
