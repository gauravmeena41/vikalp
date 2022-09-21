// @ts-nocheck

import React from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { complaintDetails } from "../atoms/complaintDetails";

const StageOne = () => {
  const [complaintDetail, setComplaintDetail] =
    useRecoilState(complaintDetails);

  return (
    <div className="grid grid-cols-2 gap-10 w-full">
      <div className="space-y-6 animate-fade">
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
            className="input"
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
            className="input"
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
            className="input"
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
          <button className="button bg-secondaryColor">Prev</button>
          <button
            className="button bg-mainColor"
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
