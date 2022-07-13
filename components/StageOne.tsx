// @ts-nocheck

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { complaintDetails } from "../atoms/complaintDetails";

const StageOne = () => {
  const [complaintDetail, setComplaintDetail] =
    useRecoilState(complaintDetails);

  const categories = [
    "Fraud",
    "Harassment",
    "Violence",
    "Cheating",
    "Property",
    "Loan",
    "Other",
  ];

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="space-y-5">
        <h1 className="text-mainColor text-2xl font-bold">Step One</h1>
        <p className="text-mainColor text-sm">Tell us about your complaint</p>
        <textarea
          onChange={(e) =>
            setComplaintDetail({
              ...complaintDetail,
              complaintDescription: e.target.value,
            })
          }
          name=""
          value={complaintDetail.complaintDescription}
          placeholder="Write here..."
          className="border-[2px] border-purple-300 p-4 w-[350px] h-[250px] outline-none
          rounded-[2rem] text-purple-400 resize-none placeholder:text-purple-300"
        ></textarea>
        <p className="text-mainColor font-medium text-lg">Category</p>
        <div className="flex flex-wrap">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={(e) => {
                setComplaintDetail({
                  ...complaintDetail,
                  complaintCategory:
                    complaintDetail.complaintCategory &&
                    complaintDetail.complaintCategory === category
                      ? ""
                      : e.target.value,
                });
              }}
              type="button"
              value={category}
              className={`${
                complaintDetail.complaintCategory === category
                  ? "bg-mainColor"
                  : "bg-secondaryColor"
              }  rounded-full text-lg text-white font-medium px-6 py-1 ml-0 m-2 active:scale-95 transition-all duration-300 ease-in-out`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="pl-20 border-l-[3px] border-mainColor space-y-6">
        <h1 className="text-mainColor text-2xl font-bold">Case Categories</h1>
        <div className="space-y-3 border-b-[3px] border-mainColor pb-4">
          <h1 className="rounded-full text-lg text-white font-medium px-6 py-1 bg-mainColor w-fit">
            Illegal Data Requests
          </h1>
          <p className="text-mainColor">
            Data collected without user's consent.
          </p>
        </div>
        <div className="space-y-3 border-b-[3px] border-mainColor pb-4">
          <h1 className="rounded-full text-lg text-white font-medium px-6 py-1 bg-mainColor w-fit">
            Other
          </h1>
          <p className="text-mainColor">
            Any other practices, in which user faces inconvenience
          </p>
        </div>
        <p className="text-mainColor text-sm font-medium uppercase underline">
          See the Full List
        </p>
        <div className="flex items-end justify-end h-[200px]">
          <ChevronLeftIcon className="text-secondaryColor w-10 h-10 cursor-pointer" />
          <ChevronRightIcon
            onClick={() =>
              complaintDetail.complaintCategory &&
              complaintDetail.complaintDescription ?
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

export default StageOne;
