// @ts-nocheck

import { UserIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '../atoms/user'

const Navbar = () => {
  const user = useRecoilValue(userState);

  return (
    <div className="flex items-center justify-between border-b-2 border-gray-300 h-16">
     
      <div className="relative w-[120px] h-[120px] ml-20">
        <Image src="/Images/Vikalplogo.svg" layout="fill" />
      </div>
        <div className="bg-mainColor rounded-full w-12 h-12 flex items-center justify-center mr-5 cursor-pointer">
            <h1 className="text-3xl font-bold text-[#f1f1f1]">{user.name[0]}</h1>
        </div>
    </div>
  )
}

export default Navbar