// @ts-nocheck

import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import Router from "next/router";
import toast from "react-hot-toast";
import Image from "next/image";
import Head from "next/head";
import jwt from "jsonwebtoken";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    termsAndConditions: false,
    role: false,
  });
  const [user, setUser] = useRecoilState(userState);
  const [toggle, setToggle] = useState<Boolean>(false);

  const login = async (e: any) => {
    e.preventDefault();
    let res = await axios.post("/api/auth/login", {
      email: userDetails.email,
      password: userDetails.password,
      termsAndConditions: userDetails.termsAndConditions,
    });
    res.data.data = jwt.decode(res.data.authToken);

    res.data.data &&
      setUser({
        name: res.data.data.name,
        email: res.data.data.email,
        phone: res.data.data.phone,
        role: res.data.data.role,
        termsAndConditions: res.data.data.termsAndConditions,
      });

    res.data.status && Router.push("/");
    !res.data.status && toast.error(res.data.message);
  };

  const signup = async (e: any) => {
    console.log(userDetails);
    e.preventDefault();
    let res = await axios.post("/api/auth/signup", {
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
      phone: userDetails.phoneNumber,
      termsAndConditions: userDetails.termsAndConditions,
      role: userDetails.role,
    });
    res.data.status && toast.success("Sign up Successful");
    !res.data.status && toast.error(res.data.message);
    res.data.status && setToggle(false);
    setUserDetails({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      termsAndConditions: false,
      role: false,
    });
  };

  useEffect(() => {
    user.email && Router.push("/");
  }, [user]);

  if (user.email) {
    return <div></div>;
  }

  return (
    <div
      className="bg-loginBackground bg-center w-screen h-screen
    flex items-center justify-center lg:justify-end"
    >
      <Head>
        <title>Vikalp | Login</title>
      </Head>
      <div className="lg:w-1/2 flex items-center justify-center ">
        <div className="bg-white lg:w-4/6 max-w-lg rounded-3xl lg:rounded-[2.5rem] relative">
          <form
            className={`flex flex-col px-4 py-4 lg:px-16 ${
              toggle ? "lg:py-14" : "lg:py-24 lg:pb-20"
            }`}
          >
            <h1 className="text-2xl lg:text-4xl text-mainColor font-bold mb-10">
              {toggle ? "Create account" : "Login"}
            </h1>
            {toggle && (
              <input
                className="text-purple-600 text-lg font-medium border-2 rounded-full px-4 py-2 lg:py-3 outline-none shadow-base-shadow mb-4
                      focus:border-purple-200 placeholder:text-purple-300 placeholder:text-lg placeholder:font-medium"
                type="text"
                placeholder="Full Name"
                name="name"
                value={userDetails.name}
                required
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
              />
            )}
            <input
              className="text-purple-600 text-lg font-medium border-2 rounded-full px-4 py-2 lg:py-3 outline-none shadow-base-shadow mb-4
                focus:border-purple-200 placeholder:text-purple-300 placeholder:text-lg placeholder:font-medium"
              type="email"
              placeholder={`${toggle ? "Email" : "Phone Number / Username"}`}
              name="email"
              value={userDetails.email}
              required
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
            {toggle && (
              <input
                className="text-purple-600 text-lg font-medium border-2 rounded-full px-4 py-2 lg:py-3 outline-none shadow-base-shadow mb-4
              focus:border-purple-200 placeholder:text-purple-300 placeholder:text-lg placeholder:font-medium"
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={userDetails.phoneNumber}
                required
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    phoneNumber: e.target.value,
                  })
                }
              />
            )}
            <input
              className="text-purple-600 text-lg font-medium border-2 rounded-full px-4 py-2 lg:py-3 outline-none shadow-base-shadow mb-4
               focus:border-purple-200 placeholder:text-purple-300 placeholder:text-lg placeholder:font-medium"
              type="password"
              placeholder="Password"
              name="password"
              value={userDetails.password}
              required
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
            {toggle && (
              <div className="w-full flex items-center mb-2 space-x-1">
                <h1
                  className={`${
                    !userDetails.role ? "text-mainColor" : "text-secondaryColor"
                  } text-xs font-medium uppercase`}
                >
                  User
                </h1>
                <input
                  type="checkbox"
                  id="toggle"
                  checked={userDetails.role}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, role: e.target.checked })
                  }
                />
                <label id="toggleLabel" htmlFor="toggle"></label>
                <h1
                  className={`${
                    userDetails.role ? "text-mainColor" : "text-secondaryColor"
                  } text-xs font-medium uppercase`}
                >
                  Enterprise
                </h1>
              </div>
            )}
            <div className="flex items-center space-x-2 mb-6">
              <input
                type="checkbox"
                className="appearance-none border checked:bg-mainColor text-white rounded-[6px] w-4 h-4 outline-none cursor-pointer"
                name=""
                id="t&C"
                required
                checked={userDetails.termsAndConditions}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    termsAndConditions: e.target.checked,
                  })
                }
              />
              <label
                className="text-sm text-mainColor font-medium cursor-pointer"
                htmlFor="t&C"
              >
                I agree to Vikalp's Terms & Conditions.
              </label>
            </div>
            <div className="flex items-center justify-end">
              <button
                className={`w-[150px] py-3 border-2 rounded-lg bg-mainColor text-lg text-white font-medium ${
                  !userDetails.termsAndConditions &&
                  "opacity-50 cursor-not-allowed"
                }`}
                disabled={!userDetails.termsAndConditions}
                onClick={toggle ? signup : login}
              >
                {toggle ? "Sign Up" : "Log In"}
              </button>
            </div>
          </form>
          <h1
            onClick={() => setToggle(!toggle)}
            className="text-center text-xs font-bold underline uppercase mb-5 text-mainColor cursor-pointer "
          >
            {toggle ? "Login here..." : "Create an account"}
          </h1>
          <div className="w-28 h-28 absolute -bottom-4 right-5 opacity-90">
            <Image
              src="/Images/Vikalplogo.svg"
              layout="fill"
              className="absolute"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
