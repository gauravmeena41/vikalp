// @ts-nocheck

import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import Dashboard from "../components/Dashboard";
import FileComplaint from "../components/FileComplaint";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    user.email ? Router.push("/") : Router.push("/login");
  }, []);

  if (!user.email) {
    return <div></div>;
  }

  return (
    <div>
      <Head>
        <title>Vikalp</title>
        <link rel="icon" href="/Images/law.png" />
      </Head>

      <Toaster position="top-right" />
      <Navbar />
      <div className="flex">
        <div className="w-[80px]">
          <Sidebar />
        </div>
        <div className="w-[calc(100vw-80px)]">{/* <FileComplaint /> */}</div>
      </div>
    </div>
  );
};

export default Home;
