// @ts-nocheck

import connectDb from "../../../utils/connectDb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../models/User";

connectDb();

export default async function handler(req: any, res: any) {
  try {
    const {
      name,
      email,
      phone,
      password,
      termsAndConditions,
      role = 0,
    } = req.body;
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))
      return res.status(200).json({ status: 0, message: "Invalid email" });
    else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password)
    )
      return res.status(200).json({
        status: 0,
        message: "Password doesn't meet the security criteria",
      });
    else if (!/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone))
      return res
        .status(200)
        .json({ status: 0, message: "Invalid phone number" });
    else if (!termsAndConditions)
      return res.status(200).json({
        status: 0,
        message: "Please accept terms & conditions",
      });
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(200)
        .json({ status: 0, message: "User already exists" });
    user = await User.create({
      name,
      email,
      phone,
      role,
      password: await bcrypt.hash(req.body.password, 12),
      termsAndConditions,
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

    await sendMail({
      from: process.env.MAIL_EMAIL_ID,
      to: email,
      subject: `Welcome to Vikalp`,
      text: `Welcome ${name} to Vikalp,\n
             your account has been created successfully.
             Happy Resolving`,
    });

    res.status(200).json({
      status: 1,
      authToken,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
}
