// @ts-nocheck

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { SearchIcon } from "@heroicons/react/outline";
import axios from "axios";
import Router, { useRouter } from "next/router";
import toast, { LoaderIcon } from "react-hot-toast";

enum User {
  name = "",
  email = "",
  phone = "",
  termsAndConditions = 0,
  role = 0,
}

const search = () => {
  const user: User = useRecoilValue(userState);
  const [toggle, setToggle] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  const [complaintDetails, setComplaintDetails] = useState({
    Vua: "",
    "Complaint Id": "",
    "Complainant Email": "",
    "Respondent Email": "",
    Reason: "",
    Status: "",
  });

  const { query } = useRouter();

  const fetchComplaint = async (complaintId: string) => {
    console.log("chala");
    if (complaintId === "") return toast.error("Please enter a complaint id");
    try {
      let res = await axios.get(`/api/complaint/${complaintId}`);
      // !res.data.data && toast.error("Complaint Not Found !"); // Issue h isme error aayega
      res.data.data
        ? setComplaintDetails({
            "Complaint Id": res.data.data.comaplaintId,
            Vua: res.data.data.vua,
            "Complainant Email": res.data.data.complainantEmail,
            "Respondent Email": res.data.data.respondentEmail,
            Reason: res.data.data.complaintDescription,
            Status: res.data.data.status,
          })
        : setComplaintDetails({
            "Complaint Id": "",
            Vua: "",
            "Complainant Email": "",
            "Respondent Email": "",
            Reason: "",
            Status: "",
          });
      console.log(res.data.data);
    } catch (error) {
      toast.error("Some error occur");
    }
  };

  useEffect(() => {
    query.ComplainId && setComplaintId(query.ComplainId);
    complaintId && fetchComplaint(complaintId);
  }, [query.ComplainId, complaintId]);

  console.log(complaintDetails);

  if (!complaintId) {
    return <div></div>;
  }

  return (
    <div>
      <Head>
        <title>Vikalp || Search</title>
        <link rel="icon" href="/Images/law.png" />
      </Head>
      <Navbar />
      <div className="flex">
        <div className="w-full">
          <div className="flex justify-center items-center mt-32 w-full">
            <div className="space-y-10 flex flex-col items-center justify-center">
              <h1 className="text-mainColor text-center font-bold text-xl">
                Enter Complaint ID
              </h1>
              <div className="relative">
                <SearchIcon
                  className="absolute top-[0.8rem] right-4 w-8 h-8 text-secondaryColorLight cursor-pointer bg-white"
                  onClick={() => fetchComplaint(complaintId)}
                />

                <input
                  type="text"
                  placeholder="Case ID"
                  maxLength={20}
                  value={complaintId}
                  className="w-80 p-3 text-lg text-mainColor font-medium border-[3px] border-secondaryColorLight rounded-[2rem] outline-none
                    placeholder:text-secondaryColor placeholder:text-lg placeholder:font-medium"
                  onChange={(e) => {
                    setComplaintId(e.target.value);
                  }}
                  onKeyUpCapture={(e) =>
                    e.key === "Enter" && fetchComplaint(complaintId)
                  }
                />
              </div>
              {complaintDetails.Status && complaintId && (
                <div className="grid grid-cols-6 w-[100vw] animate-slide-down">
                  {Object.entries(complaintDetails).map(([key, value]) => (
                    <div className="">
                      <div
                        className="p-4 flex items-center justify-center font-semibold text-mainColor
                                         bg-[#fff9e3]"
                      >
                        {key}
                      </div>
                      <div className="p-4 flex items-center justify-center text-secondaryColor text-xs font-semibold">
                        {value ? value : "-"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default search;
