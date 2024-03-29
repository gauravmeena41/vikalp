// @ts-nocheck

import { DocumentTextIcon } from "@heroicons/react/outline";
import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { complaintDetails } from "../atoms/complaintDetails";
import { userState } from "../atoms/user";

const ComplaintSummary = () => {
  const [complaintDetail, setComplaintDetail] =
    useRecoilState(complaintDetails);
  const user = useRecoilValue(userState);
  const [loading, setLoading] = useState(false);
  const [odrProvider, setOdrProvider] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const fileComplaint = async () => {
    setLoading(true);
    try {
      await axios.post("api/complaint/create", {
        odrProviderId: odrProvider.id,
        complainantId: user.id,
        complaintDescription: complaintDetail.complaintDescription,
        complaintCategory: complaintDetail.complaintCategory,
        expectedResolution: complaintDetail.expectedResolution,
        expectedResolutionDescription:
          complaintDetail.expectedResolutionDescription,
        respondentName: complaintDetail.respondentName,
        respondentEmail: complaintDetail.respondentEmail,
        respondentPhone: complaintDetail.respondentPhone,
        file: complaintDetail.file.fileType,
        consent: complaintDetail.consent,
        status: complaintDetail.status,
        complainantName: user.name,
        complainantEmail: user.email,
        complainantPhone: user.phone,
      });
      toast.success("Complaint filed successfully");
      setComplaintDetail({
        stage: 0,
        complaintDescription: "",
        complaintCategory: "",
        expectedResolution: "",
        expectedResolutionDescription: "",
        respondentName: "",
        respondentEmail: "",
        respondentPhone: "",
        file: {
          fileLink: "",
          fileType: "",
        },
        consent: false,
        status: "Pending",
      });
      setLoading(false);
      Router.push("/search");
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  const fetchOdrProvider = async () => {
    await axios.get("api/complaint/odrProviders").then((res) =>
      setOdrProvider({
        id: res.data.selectedODRProvider._id,
        name: res.data.selectedODRProvider.name,
        email: res.data.selectedODRProvider.email,
        phone: res.data.selectedODRProvider.phone,
      })
    );
  };
  useEffect(() => {
    fetchOdrProvider();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-10 w-full">
      <div className="space-y-6">
        <h1 className="text-mainColor text-3xl font-bold">Summary</h1>
        <h1 className="text-mainColor text-2xl font-bold">{`${user.name} vs ${complaintDetail.respondentName}`}</h1>
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full">
            <h1 className="bg-mainColor px-5 py-2 my-2 w-fit rounded-[2rem] text-[#f1f1f1] font-medium">
              Case Details
            </h1>
            <p
              className="border-2 border-secondaryColor rounded-[2rem] h-[250px] p-5 text-mainColor
                font-medium text overflow-scroll scrollbar-hide"
            >
              {complaintDetail.complaintDescription}
            </p>
          </div>
          <div className="w-full">
            <h1 className="bg-mainColor px-5 py-2 my-2 w-fit rounded-[2rem] text-[#f1f1f1] font-medium">
              Documents
            </h1>
            <div
              className="h-[250px] text-gray-200 border-2 border-secondaryColor rounded-[2rem] flex flex-col items-center justify-center
            bg-gray-300"
            >
              <DocumentTextIcon className="w-full h-full bg-white rounded-t-[1.8rem]" />
              <h1 className="text-center text-gray-700 font-semibold p-2">
                {complaintDetail.file.fileLink}
              </h1>
            </div>
          </div>
        </div>
        <h1 className="text-2xl text-mainColor font-bold">Did you know?</h1>
        <p className="text-mainColor font-medium w-3/4">
          Traditional Litigation can be much more expensive than ODR, while a
          case would take 3-4 years on average. ODR is 90% cheaper & faster!
        </p>
      </div>
      <div className="pl-20 border-l-[3px] border-mainColor space-y-6">
        <h1 className="text-mainColor text-3xl font-bold">Confirmation</h1>
        <div className="space-y-3 border-2 border-secondaryColor rounded-[2rem] p-5">
          <div className="grid grid-cols-2">
            <h1 className="text-mainColor text-xl font-medium">Case Name</h1>
            <p className="text-mainColor font-medium">{`${user.name} vs ${complaintDetail.respondentName}`}</p>
          </div>
          <div className="grid grid-cols-2">
            <h1 className="text-mainColor text-xl font-medium">Vendor</h1>
            <p className="text-mainColor font-medium">Sama ODR</p>
          </div>
          <div className="grid grid-cols-2">
            <h1 className="text-mainColor text-xl font-medium">
              Resolution Time
            </h1>
            <p className="text-mainColor font-medium">2 weeks</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className={`text-white font-medium text-2xl px-14 py-3 rounded-lg
            transition-all duration-300 ease-in-out ${
              loading
                ? "cursor-not-allowed bg-secondaryColor"
                : "cursor-pointer active:scale-95 bg-green-400"
            }`}
            onClick={() => {
              !loading && odrProvider.id && fileComplaint();
            }}
          >
            {loading ? "Please wait..." : "Confirm Case Filing"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintSummary;
