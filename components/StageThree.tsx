// @ts-nocheck

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { complaintDetails } from "../atoms/complaintDetails";

const StageThree = () => {
  const [complaintDetail, setComplaintDetail] =
    useRecoilState(complaintDetails);
  const [otherParty, setOtherParty] = useState("Individual");
  const [selectedParty, setSelectedParty] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);

  const parties = ["Finvu", "Onemoney", "HDFC Bank"];

  return (
    <div className="grid grid-cols-2 gap-10 w-full">
      <div className="space-y-6">
        <h1 className="text-mainColor text-2xl font-bold">Step Three</h1>
        <p className="text-mainColor text-sm">
          Against whom would you like to raise this grievance?
        </p>
        <div className="grid grid-cols-3">
          <div
            onClick={(e) => setOtherParty(e.target.innerHTML)}
            className={`${
              otherParty === "Enterprise"
                ? "bg-mainColor text-[#f1f1f1]"
                : "text-gray-700"
            } flex justify-center font-medium cursor-pointer py-2 border-2 border-r-0 rounded-l-lg border-mainColor`}
          >
            Enterprise
          </div>
          <div
            onClick={(e) => setOtherParty(e.target.innerHTML)}
            className={`${
              otherParty === "Individual"
                ? "bg-mainColor text-[#f1f1f1]"
                : "text-gray-700"
            } flex justify-center font-medium cursor-pointer py-2 border-2 border-mainColor`}
          >
            Individual
          </div>
          <div
            onClick={(e) => setOtherParty(e.target.innerHTML)}
            className={`${
              otherParty === "Other"
                ? "bg-mainColor text-[#f1f1f1]"
                : "text-gray-700"
            } flex justify-center font-medium cursor-pointer py-2 border-2 border-l-0 rounded-r-lg border-mainColor`}
          >
            Other
          </div>
        </div>
        {otherParty === "Enterprises" ? ( // Bhai ye temporary hai isko bad me hatana h 😜
          <div
            className={`w-[300px] px-5 py-2 text-xl font-medium text-mainColor cursor-pointer border-2 border-purple-300 rounded-[2rem]`}
            onClick={() => setShowDropDown(!showDropDown)}
          >
            {!showDropDown &&
              (selectedParty ? selectedParty : "Select an option")}
            {showDropDown &&
              parties.map((party, key) => (
                <div
                  key={key}
                  onClick={() => {
                    setSelectedParty(party);
                    setComplaintDetail({
                      ...complaintDetail,
                      respondentName: party,
                    });
                    setShowDropDown(false);
                  }}
                  className="py-2 text-xl font-medium text-purple-300 cursor-pointer
                    hover:text-mainColor last-of-type:rounded-b-lg"
                >
                  {party}
                </div>
              ))}
          </div>
        ) : (
          otherParty === "Individual" && (
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
          )
        )}
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
            className="text-mainColor w-10 h-10 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default StageThree;
