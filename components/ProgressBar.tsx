// @ts-nocheck

import React from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { complaintDetails } from "../atoms/complaintDetails";

const ProgressBar = () => {
  const [complaintDetail, setComplaintDetail] =
    useRecoilState(complaintDetails);

  return (
    <div className="h-[500px] bg-secondaryColorLight w-1 relative">
      <div
        className={`bg-mainColor max-h-[500px]  transition-all duration-300 ease-in-out`}
        style={{
          height: complaintDetail.stage * 50 + "%",
        }}
      >
        <div
          onClick={() => setComplaintDetail({ ...complaintDetail, stage: 0 })}
          className={`absolute top-0 -left-[0.7rem] w-7 h-7 ${
            complaintDetail.stage >= 0
              ? "bg-mainColor"
              : "bg-secondaryColorLight"
          } rounded-full transition-all duration-300 ease-in-out cursor-pointer`}
        ></div>
        <div
          onClick={() =>
            complaintDetail.respondentName &&
            complaintDetail.respondentEmail &&
            complaintDetail.respondentPhone
              ? setComplaintDetail({ ...complaintDetail, stage: 1 })
              : toast.error("Please fill all the fields")
          }
          className={`absolute top-1/2 -left-[0.7rem] w-7 h-7 ${
            complaintDetail.stage >= 1
              ? "bg-mainColor"
              : "bg-secondaryColorLight"
          } rounded-full transition-all duration-300 ease-in-out cursor-pointer`}
        ></div>
        <div
          onClick={() =>
            complaintDetail.complaintDescription &&
            complaintDetail.complaintCategory
              ? setComplaintDetail({ ...complaintDetail, stage: 2 })
              : toast.error("Please fill all the fields")
          }
          className={`absolute bottom-0 -left-[0.7rem] w-7 h-7 ${
            complaintDetail.stage >= 2
              ? "bg-mainColor"
              : "bg-secondaryColorLight"
          } rounded-full transition-all duration-300 ease-in-out cursor-pointer`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
