// @ts-nocheck

import { atom } from "recoil";

// enum User {
//   name = "",
//   email = "",
//   phone = "",
//   termsAndConditions = 0,
//   role = 0,
// }

export const userState = atom({
  key: "userState",
  default: {
    name: "",
    email: "",
    phone: "",
    termsAndConditions: 0,
    role: 0,
  },
});
