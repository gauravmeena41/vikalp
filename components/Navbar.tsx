import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between border-b-2 border-gray-300 h-16">
      <div
        className="relative w-[120px] h-[120px] ml-20 cursor-pointer"
        onClick={() => router.push("/file_complaint")}
      >
        <Image src="/Images/Vikalplogo.svg" layout="fill" />
      </div>
    </div>
  );
};

export default Navbar;
