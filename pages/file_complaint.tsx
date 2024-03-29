// @ts-nocheck

import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { complaintDetails } from "../atoms/complaintDetails";
import { userState } from "../atoms/user";
import FileComplaint from "../components/FileComplaint";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const file_complaint = () => {
  // const user = useRecoilValue(userState)
  // const [complaintDetail, setComplaintDetail] =
  //   useRecoilState(complaintDetails);

  // useEffect(() => {
  //   user.email ? Router.push("/file_complaint") : Router.push("/login");
  //   setComplaintDetail({
  //     ...complaintDetail,
  //     stage: 0,
  //   });
  // }, []);

  // if (!user.email) {
  //   return <div></div>;
  // }
  return (
    <div>
      <Head>
        <title>Vikalp || Complaint filing</title>
        <link rel="icon" href="/Images/law.png" />
      </Head>
      <Navbar />
      <FileComplaint />
    </div>
  );
};

export default file_complaint;
