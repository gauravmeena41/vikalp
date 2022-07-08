// @ts-nocheck

import { PaperClipIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { complaintDetails } from "../atoms/complaintDetails";

const StageFour = () => {
  const [complaintDetail, setComplaintDetail] =
    useRecoilState(complaintDetails);

  const categories = ["Screenshot", "Affidavit", "Agreement", "Recording"];

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="space-y-6">
        <h1 className="text-mainColor text-2xl font-bold">Step One</h1>
        <p className="text-mainColor text-sm">
          Attach any file that will help the Neutral resolve your case
        </p>
        <label
          className="w-[250px] flex p-3 rounded-full text-white font-semibold cursor-pointer border-2
            border-secondaryColor"
          //   htmlFor="chooseFile" // Isse change kar dena bete bad me
          onClick={()=>{
            toast.error("File uploading not supported yet.");
          }}
        >
          <PaperClipIcon className="w-7 h-7 text-mainColor mr-2" />
          Add Image
        </label>
        <input type="file" name="" id="chooseFile" className="hidden" />
        <p className="text-mainColor">What kind of Attachment is it?</p>
        <div className="flex flex-wrap">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={(e) => {
                setComplaintDetail({
                  ...complaintDetail,
                  file: {
                    fileLink: "At this time we don't have any link",
                    fileType: category,
                  },
                });
              }}
              type="button"
              value={category}
              className={`${
                complaintDetail.file.fileType === category
                  ? "bg-mainColor"
                  : "bg-secondaryColor"
              }  rounded-full text-lg text-white font-medium px-6 py-1 ml-0 m-2`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="checkbox"
            className="appearance-none border checked:bg-mainColor text-white rounded-[6px] w-4 h-4 outline-none cursor-pointer"
            name=""
            id="t&C"
            required
            onChange={(e) =>
              setComplaintDetail({
                ...complaintDetail,
                consent: e.target.checked,
              })
            }
          />
          <label
            className="text-sm text-mainColor font-medium cursor-pointer"
            htmlFor="t&C"
          >
            Suljhao Magar Pyaar Se
          </label>
        </div>
        <div className="flex items-center">
          <button
            onClick={() =>
              complaintDetail.file.fileType && complaintDetail.consent
                ? setComplaintDetail({
                    ...complaintDetail,
                    stage: complaintDetail.stage + 1,
                  })
                : toast.error("Please fill all the fields")
            }
            className={`w-[220px] py-3 border-2 rounded-lg bg-mainColor text-lg text-white font-medium`}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="pl-20 border-l-[3px] border-mainColor space-y-6">
        <h1 className="text-mainColor text-2xl font-bold">
          Acceptable Documents
        </h1>
        <div className="space-y-3 border-b-[3px] border-mainColor pb-4">
          <h1 className="rounded-full text-lg text-white font-medium px-6 py-1 bg-mainColor w-fit">
            Invoice
          </h1>
          <p className="text-mainColor">
            Invoices will be considered as a solid proof of service.
          </p>
        </div>
        <div className="space-y-3 border-b-[3px] border-mainColor pb-4">
          <h1 className="rounded-full text-lg text-white font-medium px-6 py-1 bg-mainColor w-fit">
            Screenshot
          </h1>
          <p className="text-mainColor">
            Screenshots are also considered as a proof.
          </p>
        </div>
        <p className="text-mainColor text-sm font-medium uppercase underline">
          See the Full List
        </p>
        <div className="flex items-end justify-end h-[200px]">
          <ChevronLeftIcon
            onClick={() =>
              setComplaintDetail({
                ...complaintDetail,
                stage: complaintDetail.stage - 1,
              })
            }
            className="text-mainColor w-10 h-10 cursor-pointer"
          />
          <ChevronRightIcon className="text-secondaryColor w-10 h-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default StageFour;
