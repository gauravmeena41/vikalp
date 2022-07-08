// @ts-nocheck

import connectDb from "../../../utils/connectDb";
import User from "../../../models/User";

let staticIndex = 0;

connectDb();
export default handler = async (req: any, res: any) => {
  try {
    const odrProviders = await User.find({ role: 1 });

    if (odrProviders.length <= 0)
      return res.json({
        status: 0,
        message: "No ODR Providers",
      });

    odrProviders.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));

    if (staticIndex >= odrProviders.length) staticIndex = 0;

    // This will give a random number but it's no use for now
    //   odrProviders[Math.floor(Math.random() * odrProviders.length)],

    let odrProvider = odrProviders[staticIndex++];

    res.status(200).json({
      status: 1,
      data: odrProviders,
      selectedODRProvider: {
        _id: odrProvider._id,
        name: odrProvider.name,
        email: odrProvider.email,
        phone: odrProvider.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Internal Server Error" });
  }
};
