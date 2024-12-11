"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const InactiveAccount = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 backdrop-blur-3xl bg-[#E9E7E0]/30 z-50 h-screen w-screen flex-col text-center flex justify-center gap-y-8 text-white">
        <div className="relative w-32 lg:w-64 mb-10 h-12 mx-auto">
          <Image className="mx-auto" src={"/trubookerAgent.svg"} alt="" fill />
        </div>
        <div className="relative w-[70%] lg:w-1/4 h-48 lg:h-72 text-white p-10 rounded-2xl mx-auto">
          <Image className="mx-auto" src={"/deny.svg"} alt="" fill />
        </div>
        <p className="mt-6 leading-7 text-base w-[80%] mx-auto font-bold text-gray-600">
          <span className="mb-2 text-xl text-[#F83937]">🚫 Access Denied</span>{" "}
          <br /> <br />
          Your account is currently inactive. Please contact our support team to
          reactivate your account.
        </p>
        <div className="flex items-center justify-center gap-x-6">
          <Link
            href="mailto:trubookerofficial@gmail.com"
            className="w-auto bg-[--primary] shadow-md text-white p-4 rounded-xl hover:scale-105 duration-300"
          >
            Send an email to truBooker Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InactiveAccount;
