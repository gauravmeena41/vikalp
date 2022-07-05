import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcryptjs";

type Data = {
  name: string;
};

connectDb();

export default async function authHandler(req: any, res: any) {
  switch (req.body.type) {
    case "login":
      try {
        const { email, password, termsAndConditions } = req.body;
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))
          return res.json({ status: 0, message: "Invalid email" });
        else if (
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
            password
          )
        )
          return res.json({ status: 0, message: "Invalid Password" });
        const user = await User.findOne({ email });
        if (!user)
          return res.json({ status: 0, message: "User doesn't exists" });
        else if (!(await bcrypt.compare(password, user.password)))
          return res.json({ status: 0, message: "Invalid Password" });
        else if (!termsAndConditions)
          return res.json({
            status: 0,
            message: "Please accept terms & conditions",
          });

        res.status(200).json({
          status: 1,
          data: user,
        });
      } catch (error) {
        console.log(error);
      }
      break;
    case "signup":
      try {
        const { name, email, phone, password, termsAndConditions } = req.body;
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))
          return res.json({ status: 0, message: "Invalid email" });
        else if (
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
            password
          )
        )
          return res.json({
            status: 0,
            message: "Password doesn't meet the security criteria",
          });
        else if (!/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone))
          return res.json({ status: 0, message: "Invalid phone number" });
        else if (!termsAndConditions)
          return res.json({
            status: 0,
            message: "Please accept terms & conditions",
          });
        let user = await User.findOne({ email });
        if (user)
          return res.json({ status: 0, message: "User already exists" });
        user = await User.create({
          name,
          email,
          phone,
          password: await bcrypt.hash(req.body.password, 10),
          termsAndConditions,
        });
        res.status(201).json({
          status: 1,
          data: user,
        });
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.status(405).json({
        status: "fail",
        message: "Method not allowed",
      });
  }
}
