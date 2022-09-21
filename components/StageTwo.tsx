// @ts-nocheck

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { complaintDetails } from "../atoms/complaintDetails";

const StageTwo = () => {
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
        <h1 className="text-mainColor text-2xl font-bold">Step Two</h1>
        <p className="text-mainColor text-sm">
          Against whom would you like to raise this grievance?
        </p>
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
            value={complaintDetail.respondentName}
            className="border-2 border-secondaryColor outline-none px-5 py-2 w-[300px] rounded-[2rem] text-mainColor font-medium text-lg"
            onChange={(e) =>
              setComplaintDetail({
                ...complaintDetail,
                respondentName: e.target.value,
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
            value={complaintDetail.respondentEmail}
            className="border-2 border-secondaryColor outline-none px-5 py-2 w-[300px] rounded-[2rem] text-mainColor font-medium text-lg"
            onChange={(e) =>
              setComplaintDetail({
                ...complaintDetail,
                respondentEmail: e.target.value,
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
            value={complaintDetail.respondentPhone}
            className="border-2 border-secondaryColor outline-none px-5 py-2 w-[300px] rounded-[2rem] text-mainColor font-medium text-lg"
            onChange={(e) =>
              setComplaintDetail({
                ...complaintDetail,
                respondentPhone: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex items-end justify-end h-[530px]">
        <div className="flex items-end justify-end space-x-2">
          <button
            className="text-white bg-mainColor px-5 py-1 rounded-2xl font-semibold"
            onClick={() =>
              setComplaintDetail({
                ...complaintDetail,
                stage: complaintDetail.stage - 1,
              })
            }
          >
            Prev
          </button>
          <button
            className="text-white bg-mainColor px-5 py-1 rounded-2xl font-semibold"
            onClick={() =>
              complaintDetail.respondentName &&
              complaintDetail.respondentEmail.match(
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
              ) &&
              complaintDetail.respondentPhone.match(/^\d{10}$/)
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

export default StageTwo;
