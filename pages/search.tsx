// @ts-nocheck

import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { SearchIcon } from "@heroicons/react/outline";
import axios from "axios";
import Router from "next/router";
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
    Reason:"",
    status: "",
  });
  const [userComplaints, setUserComplaints] = useState([]);

  const fetchComplaint = async (complaintId: string) => {
    if(complaintId === "") return toast.error("Please enter a complaint id");
    try {
      if (!toggle && complaintId) {
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
            Reason:"",
            status: "",
            });
        console.log(res.data.data);
      } else {
        let res = await axios.get(
          `/api/complaint/all?userId=${user.id}`
        );
        setUserComplaints(res.data.data);
      }
    } catch (error) {
      toast.error("Some error occur");
    }
  };

  useEffect(() => {
    user.email ? Router.push("/search") : Router.push("/login");
    fetchComplaint(user.id);
  }, [toggle]);

  if (!user.email) {
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
        <div className="w-[80px]">
          <Sidebar />
        </div>
        <div className="w-[calc(100vw-80px)]">
          <div className="flex items-center justify-center mt-[3%] space-x-10">
            <h1
              className={`text-3xl font-semibold ${
                !toggle ? "text-mainColor underline" : "text-secondaryColor"
              } cursor-pointer`}
              onClick={() => setToggle(false)}
            >
              Track
            </h1>
            <h1
              className={`text-3xl font-semibold ${
                toggle ? "text-mainColor underline" : "text-secondaryColor"
              } cursor-pointer`}
              onClick={() => setToggle(true)}
            >
              History
            </h1>
          </div>
          <div className="flex justify-center items-center mt-44 w-full">
            {!toggle ? (
              <div className="space-y-5 flex flex-col items-center justify-center">
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
                  <div className="grid grid-cols-5 w-[calc(100vw-80px)] border-y-2 border-secondaryColor animate-fade">
                    {Object.entries(complaintDetails).map(([key, value]) => (
                      <div className="border-r-2 border-secondaryColor">
                        <div
                          className="p-4 flex items-center justify-center font-semibold text-mainColor
                                        border-b-2 border-secondaryColor uppercase"
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
            ) : (
              <div>
                <div className="grid grid-cols-5 w-[calc(100vw-80px)] border-y-2 border-secondaryColor animate-fade uppercase">
                  <div>
                    <div className="p-4 border-r-2 border-secondary flex items-center justify-center font-semibold text-mainColor">
                      complaintId
                    </div>
                  </div>
                  <div>
                    <div className="p-4 border-r-2 border-secondary flex items-center justify-center font-semibold text-mainColor">
                      complainantemail
                    </div>
                  </div>
                 
                  <div>
                    <div className="p-4 border-r-2 border-secondary flex items-center justify-center font-semibold text-mainColor">
                      respondentemail
                    </div>
                  </div>
                  <div>
                    <div className="p-4 border-r-2 border-secondary flex items-center justify-center font-semibold text-mainColor">
                      Reason
                    </div>
                  </div>
                  <div>
                    <div className="p-4 border-r-2 border-secondary flex items-center justify-center font-semibold text-mainColor">
                      status
                    </div>
                  </div>
                </div>
                {userComplaints.map((complaint) => (
                  <div className="grid grid-cols-5 w-[calc(100vw-80px)] animate-fade">
                    <div>
                      <div className="p-4 text-xs flex items-center justify-center font-semibold text-gray-600">
                        {complaint.comaplaintId}
                      </div>
                    </div>
                   
                    <div>
                      <div className="p-4 text-xs flex items-center justify-center font-semibold text-gray-600">
                        {complaint.complainantEmail}
                      </div>
                    </div>
                   
                    <div>
                      <div className="p-4 text-xs flex items-center justify-center font-semibold text-gray-600">
                        {complaint.respondentEmail}
                      </div>
                    </div>
                    <div>
                      <div className="p-4 text-xs flex items-center justify-center font-semibold text-gray-600">
                        {complaint.complaintDescription.slice(0, 40)}
                      </div>
                    </div>
                    <div>
                      <div className="p-4 text-xs flex items-center justify-center font-semibold text-gray-600">
                        {complaint.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default search;
