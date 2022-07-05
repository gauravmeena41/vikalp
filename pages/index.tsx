import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import Dashboard from "../components/Dashboard";

const Home: NextPage = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    // setUser({
    //   name: "",
    //   email: "",
    //   phone: "",
    // });
  }, []);
  return (
    <div>
      <Head>
        <title>Vikalp</title>
      </Head>
      <Dashboard/>
    </div>
  );
};

export default Home;
