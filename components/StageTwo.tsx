// @ts-nocheck

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { complaintDetails } from "../atoms/complaintDetails";

const StageTwo = () => {
  const [complaintDetail, setComplaintDetail] =
    useRecoilState(complaintDetails);
  const [showDropDown, setShowDropDown] = useState(false);

  const categories = ["Compensation", "Discounts", "Other"];

  return (
    <div className="grid grid-cols-2 gap-10 w-full">
      <div className="space-y-5">
        <h1 className="text-mainColor text-2xl font-bold">Step Two</h1>
        <p className="text-mainColor text-sm">What redress are you seeking?</p>
        <div className="relative">
          <div
            onClick={() => setShowDropDown(!showDropDown)}
            className={`w-[300px] px-5 py-2 text-xl font-medium text-purple-300 cursor-pointer border-2 border-purple-300 rounded-[2rem]`}
          >
            {!showDropDown &&
              (complaintDetail.expectedResolution
                ? complaintDetail.expectedResolution
                : " Select an option")}
            {showDropDown &&
              categories.map((category, key) => (
                <div
                  key={key}
                  className="py-2 text-xl font-medium text-purple-300 cursor-pointer
                hover:text-mainColor last-of-type:rounded-b-lg"
                  onClick={(e) => {
                    setComplaintDetail({
                      ...complaintDetail,
                      expectedResolution: e.target.innerHTML,
                    });
                    setShowDropDown(false);
                  }}
                >
                  {category}
                </div>
              ))}
          </div>
        </div>
        <p className="text-mainColor text-sm">
          Tell us about the redressal you seek briefly
        </p>
        <textarea
          onChange={(e) =>
            setComplaintDetail({
              ...complaintDetail,
              expectedResolutionDescription: e.target.value,
            })
          }
          name=""
          value={complaintDetail.expectedResolutionDescription}
          placeholder="Write here..."
          className={`border-[2px] border-purple-300 p-4 w-[350px] ${
            showDropDown ? "h-[150px]" : "h-[250px]"
          } outline-none
          rounded-[2rem] text-purple-400 resize-none placeholder:text-purple-300`}
        ></textarea>
      </div>
      <div className="flex items-end justify-end h-[530px]">
        <div className="flex items-end justify-end">
          <ChevronLeftIcon
            onClick={() =>
              setComplaintDetail({
                ...complaintDetail,
                stage: complaintDetail.stage - 1,
              })
            }
            className="text-mainColor w-10 h-10 cursor-pointer"
          />
          <ChevronRightIcon
            onClick={() =>
              complaintDetail.expectedResolution&& complaintDetail.expectedResolutionDescription?
              setComplaintDetail({
                ...complaintDetail,
                stage: complaintDetail.stage + 1,
              }): toast.error("Please fill all the fields")
            }
            className="text-mainColor w-10 h-10 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default StageTwo;
