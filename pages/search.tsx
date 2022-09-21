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
    complaintId: "",
    complainantEmail: "",
    respondentEmail: "",
    Reason: "",
    status: "",
  });
  const [userComplaints, setUserComplaints] = useState([]);

  const { query } = useRouter();

  const fetchComplaint = async (complaintId: string) => {
    console.log("chala");
    if (complaintId === "") return toast.error("Please enter a complaint id");
    try {
      let res = await axios.get(`/api/complaint/${complaintId}`);
      // !res.data.data && toast.error("Complaint Not Found !"); // Issue h isme error aayega
      res.data.data
        ? setComplaintDetails({
            complaintId: res.data.data.comaplaintId,
            complainantEmail: res.data.data.complainantEmail,
            respondentEmail: res.data.data.respondentEmail,
            Reason: res.data.data.complaintDescription,
            status: res.data.data.status,
          })
        : setComplaintDetails({
            complaintId: "",
            complainantEmail: "",
            respondentEmail: "",
            Reason: "",
            status: "",
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
                Enter Case ID
              </h1>
              <div className="relative">
                <SearchIcon
                  className="absolute top-[0.7rem] right-4 w-8 h-8 text-secondaryColor cursor-pointer bg-white"
                  onClick={() => fetchComplaint(complaintId)}
                />

                <input
                  type="text"
                  placeholder="Case ID"
                  maxLength={20}
                  value={complaintId}
                  className="w-80 p-3 text-lg text-mainColor font-medium border-[3px] border-secondaryColor rounded-[2rem] outline-none
                    placeholder:text-secondaryColor placeholder:text-lg placeholder:font-medium"
                  onChange={(e) => {
                    setComplaintId(e.target.value);
                  }}
                  onKeyUpCapture={(e) =>
                    e.key === "Enter" && fetchComplaint(complaintId)
                  }
                />
              </div>
              {complaintDetails.status && complaintId && (
                <div className="grid grid-cols-5 w-[100vw] animate-slide-down">
                  {Object.entries(complaintDetails).map(([key, value]) => (
                    <div className="">
                      <div
                        className="p-4 flex items-center justify-center font-semibold text-mainColor
                                         bg-[#fbf3ff] uppercase"
                      >
                        {key}
                      </div>
                      <div className="p-4 flex items-center justify-center text-gray-500 text-xs font-semibold">
                        {value}
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
