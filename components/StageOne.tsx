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
      <div className="flex flex-col justify-between h-[530px]">
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
