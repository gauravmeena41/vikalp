// @ts-nocheck

import connectDb from "../../../utils/connectDb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../models/User";

connectDb();

export default async function handler(req: any, res: any) {
  try {
    const { email, password, termsAndConditions } = req.body;
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))
      return res.json({ status: 0, message: "Invalid email" });
    else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password)
    )
      return res.json({ status: 0, message: "Invalid Password" });
    const user = await User.findOne({ email });
    if (!user) return res.json({ status: 0, message: "User doesn't exists" });
    else if (!(await bcrypt.compare(password, user.password)))
      return res.json({ status: 0, message: "Invalid Password" });
    else if (!termsAndConditions)
      return res.json({
        status: 0,
        message: "Please accept terms & conditions",
      });
    let authToken: string = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
        phone: user.phone,
        termsAndConditions: user.termsAndConditions,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      status: 1,
      authToken,
    });
  } catch (error) {
    console.log(error);
  }
}