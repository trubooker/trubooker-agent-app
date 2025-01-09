"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/logo.svg";

const ReferredSuccessfully = () => {
  const param = useParams();
  const code = String(param.code);
  const handleDownload = () => {
    // window.location.href = "Replace with the actual app download link"
  };
  
  return (
    <div className="mx-5">
      <div className="flex fixed mt-10 items-center my-2 lg:my-5 w-full">
        <div className="flex justify-between items-center w-full">
          <Image
            src={Logo}
            width="60"
            alt="Logo"
            className="lg:hidden flex mx-auto w-32 h-10"
          />
          <Image
            src={Logo}
            width="100"
            alt="Logo"
            className="lg:flex mx-auto hidden w-52 h-16"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-12 text-center max-w-md">
          <Image
            className="mx-auto"
            width={100}
            height={100}
            src={"/check-circle.svg"}
            alt=""
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            You have been referred to join{" "}
            <span className="text-[--primary-orange]">Trubooker Drivers!</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Click the button below to download the Trubooker Drivers App and get
            started.
          </p>
          <button
            onClick={handleDownload}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Download the App
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferredSuccessfully;
