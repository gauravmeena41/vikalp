// @ts-nocheck

import React from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { complaintDetails } from "../atoms/complaintDetails";

const ProgressBar = () => {
  const [complaintDetail, setComplaintDetail] =
    useRecoilState(complaintDetails);

  return (
    <div className="h-[500px] bg-gray-300 w-1 relative">
      <div
        className={`bg-mainColor max-h-[500px]  transition-all duration-300 ease-in-out`}
        style={{
          height: complaintDetail.stage * 34 + "%",
        }}
      >
        <div
          onClick={() => setComplaintDetail({ ...complaintDetail, stage: 0 })}
          className={`absolute top-0 -left-[0.7rem] w-7 h-7 ${
            complaintDetail.stage >= 0 ? "bg-mainColor" : "bg-gray-300"
          } rounded-full transition-all duration-300 ease-in-out cursor-pointer`}
        ></div>
        <div
          onClick={() =>
            complaintDetail.complaintCategory &&
            complaintDetail.complaintDescription
              ? setComplaintDetail({ ...complaintDetail, stage: 1 })
              : toast.error("Please fill all the fields")
          }
          className={`absolute top-1/3 -left-[0.7rem] w-7 h-7 ${
            complaintDetail.stage >= 1 ? "bg-mainColor" : "bg-gray-300"
          } rounded-full transition-all duration-300 ease-in-out cursor-pointer`}
        ></div>
        <div
          onClick={() =>
            complaintDetail.expectedResolution &&
            complaintDetail.expectedResolutionDescription
              ? setComplaintDetail({ ...complaintDetail, stage: 2 })
              : toast.error("Please fill all the fields")
          }
          className={`absolute top-2/3 -left-[0.7rem] w-7 h-7 ${
            complaintDetail.stage >= 2 ? "bg-mainColor" : "bg-gray-300"
          } rounded-full transition-all duration-300 ease-in-out cursor-pointer`}
        ></div>
        <div
          onClick={() =>
            complaintDetail.respondentName &&
            complaintDetail.respondentEmail &&
            complaintDetail.respondentPhone
              ? setComplaintDetail({ ...complaintDetail, stage: 3 })
              : toast.error("Please fill all the fields")
          }
          className={`absolute bottom-0 -left-[0.7rem] w-7 h-7 ${
            complaintDetail.stage >= 3 ? "bg-mainColor" : "bg-gray-300"
          } rounded-full transition-all duration-300 ease-in-out cursor-pointer`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
