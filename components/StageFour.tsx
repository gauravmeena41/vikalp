// @ts-nocheck

import { ArrowCircleUpIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { complaintDetails } from "../atoms/complaintDetails";
import axios from "axios";
import Router from "next/router";

const StageFour = () => {
  const [complaintDetail, setComplaintDetail] =
    useRecoilState(complaintDetails);
  const [showDropDown, setShowDropDown] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = ["Compensation", "Discounts", "Other"];

  const fileComplaint = async () => {
    try {
      setLoading(true);
      let complaint = await axios.post("api/complaint/create", {
        vua: complaintDetail.vua?.trim(),
        odrProviderId: "62c82df5ea4b234384d2c554",
        complaintDescription: complaintDetail.complaintDescription?.trim(),
        expectedResolution: complaintDetail.expectedResolution?.trim(),
        complainantName: complaintDetail.complainantName?.trim(),
        complainantEmail: complaintDetail.complainantEmail?.trim(),
        complainantPhone: complaintDetail.complainantPhone?.trim(),
        respondentName: complaintDetail.respondentName?.trim(),
        respondentEmail: complaintDetail.respondentEmail?.trim(),
        respondentPhone: complaintDetail.respondentPhone?.trim(),
        file: complaintDetail.file.fileName?.trim(),
      });

      complaint && toast.success("Complaint filed successfully 🙂");
      setLoading(false);
      complaint &&
        (await Router.push(
          `/search?ComplainId=${complaint.data.data.comaplaintId}`
        ));

      setComplaintDetail({
        stage: 0,
        complaintDescription: "",
        expectedResolution: "",
        respondentName: "",
        respondentEmail: "",
        respondentPhone: "",
        file: {
          fileLink: "",
          fileType: "",
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong ☹️");
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-10 w-full">
      <div className="space-y-5">
        <h1 className="text-mainColor text-2xl font-bold">Step Three</h1>
        <p className="text-mainColor text-sm">What redress are you seeking?</p>
        <div className="space-y-5 animate-fade">
          <div className="relative">
            <div
              onClick={() => setShowDropDown(!showDropDown)}
              className={`w-[300px] px-5 py-2 text-xl font-medium text-mainColor cursor-pointer border-2 border-secondaryColorLight rounded-[2rem]`}
            >
              {!showDropDown &&
                (complaintDetail.expectedResolution
                  ? complaintDetail.expectedResolution
                  : " Select an option")}
              {showDropDown &&
                categories.map((category, key) => (
                  <div
                    key={key}
                    className="py-2 text-xl font-medium text-mainColor cursor-pointer
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
          {complaintDetail.expectedResolution === "Other" && (
            <div className="animate-slide-down">
              <textarea
                onChange={(e) =>
                  setComplaintDetail({
                    ...complaintDetail,
                    expectedResolutionDescription: e.target.value,
                  })
                }
                name=""
                value={complaintDetail.expectedResolutionDescription}
                placeholder="Tell us about the redressal you seek briefly"
                className={`border-[2px] border-secondaryColorLight text-mainColor
                 p-4 w-[350px] h-[150px] outline-none
          rounded-[2rem]  resize-none placeholder:text-secondaryColorLight`}
              ></textarea>
            </div>
          )}
          <p className="text-mainColor text-sm">
            Attach any file that will help the Neutral resolve your case
          </p>
          <label
            className="min-w-[150px] max-w-fit flex items-center justify-center p-4 rounded-full text-mainColor font-bold cursor-pointer border-2
            border-secondaryColorLight text-lg"
            htmlFor="chooseFile"
          >
            {!complaintDetail.file.fileLink ? (
              <div className="flex items-center">
                <ArrowCircleUpIcon className="w-7 h-7 text-mainColor mr-2" />
                <p>Upload</p>
              </div>
            ) : (
              String(complaintDetail.file.fileLink).slice(0, 20)
            )}
          </label>
          <input
            type="file"
            name=""
            id="chooseFile"
            className="hidden"
            onChange={(e) =>
              setComplaintDetail({
                ...complaintDetail,
                file: {
                  ...complaintDetail.file,
                  fileLink: e?.target?.files[0]?.name,
                },
              })
            }
          />
        </div>
      </div>
      <div className="flex items-end justify-end h-[530px]">
        <div className="flex items-end justify-end space-x-2">
          <button
            className="button bg-secondaryColor"
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
            className="button bg-mainColor"
            onClick={() =>
              complaintDetail.expectedResolution
                ? fileComplaint()
                : toast.error("Please Select Your Expected Redressal")
            }
          >
            {!loading ? (
              "Submit"
            ) : (
              <>
                <div class="loading">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div></div>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageFour;
