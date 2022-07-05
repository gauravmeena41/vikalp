import React, { useState } from "react";
import {
  HomeIcon,
  DocumentAddIcon,
  SearchIcon,
  CubeTransparentIcon,
  CogIcon,
} from "@heroicons/react/outline";
const Sidebar = () => {
  const [expandSidebar, setExpandSidebar] = useState(false);

  return (
    <div
      className="bg-[#7158F4] w-20 hover:w-64 h-screen rounded-r-[1.5rem] grid grid-rows-2 place-items-center
    py-12 transition-all duration-300"
      onMouseEnter={() => setExpandSidebar(true)}
      onMouseLeave={() => setExpandSidebar(false)}
    >
      <div className="flex flex-col justify-center space-y-6 mt-20">
        <div className="cursor-pointer flex items-center space-x-2">
          <HomeIcon className="w-8 text-gray-200 duration-300" />
          <span
            className={`text-gray-200 text-xl font-semibold ${
              expandSidebar ? "inline-block" : "hidden"
            }`}
          >
            Home
          </span>
        </div>
        <div className="cursor-pointer flex items-center space-x-2">
          <DocumentAddIcon className="w-8 text-gray-200" />{" "}
          <span className="text-gray-200 text-xl font-semibold">Home</span>
        </div>
        <div className="cursor-pointer flex items-center space-x-2">
          <SearchIcon className="w-8 text-gray-200" />{" "}
          <span className="text-gray-200 text-xl font-semibold">Home</span>
        </div>
        <div className="cursor-pointer flex items-center space-x-2">
          <CubeTransparentIcon className="w-8 text-gray-200" />{" "}
          <span className="text-gray-200 text-xl font-semibold">Home</span>
        </div>
      </div>
      <div className="h-full flex items-end">
        <CogIcon className="w-8 text-gray-200" />
      </div>
    </div>
  );
};

export default Sidebar;
