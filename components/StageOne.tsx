// @ts-nocheck

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { complaintDetails } from "../atoms/complaintDetails";

const StageOne = () => {
  const [complaintDetail, setComplaintDetail] =
    useRecoilState(complaintDetails);
  // const [otherParty, setOtherParty] = useState("Enterprise");
  // const [selectedParty, setSelectedParty] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  // });
  // const [showDropDown, setShowDropDown] = useState(false);

  // const parties = [
  //   {
  //     name: "Finvu",
  //     email: "finvu@gmail.com",
  //     phone: "0787878787",
  //   },
  // ];

  return (
    <div className="grid grid-cols-2 gap-10 w-full">
      <div className="space-y-6">
        <h1 className="text-mainColor text-2xl font-bold">Step One</h1>
        <p className="text-mainColor text-sm">Please enter your details.</p>
        <div className="flex flex-col space-y-5">
          <label
            htmlFor="userName"
            className="text-xl text-mainColor font-medium"
          >
            Name
          </label>
          <input
            type="text"
            id="userName"
            value={complaintDetail.complainantName}
            className="border-2 border-secondaryColor outline-none px-5 py-2 w-[300px] rounded-[2rem] text-mainColor font-medium text-lg"
            onChange={(e) =>
              setComplaintDetail({
                ...complaintDetail,
                complainantName: e.target.value,
              })
            }
          />
          <label
            htmlFor="userEmail"
            className="text-xl text-mainColor font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="userEmail"
            value={complaintDetail.complainantEmail}
            className="border-2 border-secondaryColor outline-none px-5 py-2 w-[300px] rounded-[2rem] text-mainColor font-medium text-lg"
            onChange={(e) =>
              setComplaintDetail({
                ...complaintDetail,
                complainantEmail: e.target.value,
              })
            }
          />
          <label
            htmlFor="userPhone"
            className="text-xl text-mainColor font-medium"
          >
            Phone
          </label>
          <input
            type="text"
            id="userPhone"
            value={complaintDetail.complainantPhone}
            className="border-2 border-secondaryColor outline-none px-5 py-2 w-[300px] rounded-[2rem] text-mainColor font-medium text-lg"
            onChange={(e) =>
              setComplaintDetail({
                ...complaintDetail,
                complainantPhone: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex items-end justify-end h-[530px]">
        <div className="flex items-end justify-end space-x-2">
          <button className="text-white bg-secondaryColor px-5 py-1 rounded-2xl font-semibold">
            Prev
          </button>
          <button
            className="text-white bg-mainColor px-5 py-1 rounded-2xl font-semibold"
            onClick={() =>
              complaintDetail.complainantName &&
              complaintDetail.complainantEmail.match(
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
              ) &&
              complaintDetail.complainantPhone.match(/^\d{10}$/)
                ? setComplaintDetail({
                    ...complaintDetail,
                    stage: complaintDetail.stage + 1,
                  })
                : toast.error("Please fill all the fields correctly")
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageOne;
