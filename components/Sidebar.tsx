// @ts-nocheck

import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  DocumentAddIcon,
  SearchIcon,
  CubeTransparentIcon,
  CogIcon,
} from "@heroicons/react/outline";
import Router from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";
const Sidebar = () => {
  const [expandSidebar, setExpandSidebar] = useState(false);
  const user = useRecoilValue(userState);

  return (
    <div
      className={`bg-[#6e44ff] w-20 ${
        expandSidebar && "w-72"
      } h-screen rounded-r-[1.5rem] grid grid-rows-2 place-items-center
      py-12 transition-all duration-300 ease-in-out z-[2] fixed top-0`}
      onClick={() => setExpandSidebar(true)}
      onMouseLeave={() => setExpandSidebar(false)}
    >
      <div
        className={`flex flex-col justify-center space-y-2 mt-20 ${
          expandSidebar && "w-full"
        }`}
      >
        <div
          className={`cursor-pointer flex items-center space-x-6 w-full
        py-3 ${
          expandSidebar && "pl-10 hover:bg-[#664FDB]"
        } transition-all duration-300`}
          onClick={() => Router.push("/")}
        >
          <HomeIcon
            className={`w-[28px] text-gray-200 ${
              !expandSidebar && "hover:scale-125"
            } transition-all duration-300`}
          />
          <span
            className={`text-gray-200 text-xl font-bold ${
              expandSidebar ? "animate-slide-left" : "hidden"
            } animate-slide-left`}
          >
            Home
          </span>
        </div>
        <div
          className={`cursor-pointer flex items-center space-x-6 hover:w-full
        py-3 ${
          expandSidebar && "pl-10 hover:bg-[#664FDB]"
        } transition-all duration-300`}
          onClick={() => Router.push("/file_complaint")}
        >
          <DocumentAddIcon
            className={`w-[28px] text-gray-200 ${
              !expandSidebar && "hover:scale-125"
            } transition-all duration-300`}
          />
          <span
            className={`text-gray-200 text-xl font-bold ${
              expandSidebar ? "animate-slide-left" : "hidden"
            } animate-slide-left`}
          >
            File new cases
          </span>
        </div>
        <div
          className={`cursor-pointer flex items-center space-x-6 hover:w-full
        py-3 ${
          expandSidebar && "pl-10 hover:bg-[#664FDB]"
        } transition-all duration-300`}
          onClick={() => Router.push("/search")}
        >
          <SearchIcon
            className={`w-[28px] text-gray-200 ${
              !expandSidebar && "hover:scale-125"
            } transition-all duration-300`}
          />
          <span
            className={`text-gray-200 text-xl font-bold ${
              expandSidebar ? "animate-slide-left" : "hidden"
            } animate-slide-left`}
          >
            Track cases
          </span>
        </div>
        <div
          className={`cursor-pointer flex items-center space-x-6 hover:w-full
        py-3 ${
          expandSidebar && "pl-10 hover:bg-[#664FDB]"
        } transition-all duration-300`}
        >
          <CubeTransparentIcon
            className={`w-[28px] text-gray-200 ${
              !expandSidebar && "hover:scale-125"
            } transition-all duration-300`}
          />
          <span
            className={`text-gray-200 text-xl font-bold ${
              expandSidebar ? "animate-slide-left" : "hidden"
            } animate-slide-left`}
          >
            ODR Providers
          </span>
        </div>
      </div>
      <div
        className={`h-full cursor-pointer flex items-end justify-start w-full`}
      >
        <div
          className={` flex hover:bg-[#664FDB] ${
            expandSidebar ? "justify-start pl-10" : "justify-center"
          }
        space-x-6 transition-all duration-300 w-full py-3`}
        >
          <CogIcon
            className={`w-[28px] text-gray-200 ${
              !expandSidebar && "hover:scale-125"
            } transition-all duration-300`}
          />
          <span
            className={`text-gray-200 text-xl font-bold ${
              expandSidebar ? "animate-slide-left" : "hidden"
            } animate-slide-left`}
          >
            Setting
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
