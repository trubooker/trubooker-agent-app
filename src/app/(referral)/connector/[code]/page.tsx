"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";

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
          <div className="flex items-center flex-wrap justify-center gap-6">
            <Link
              href="https://play.google.com/store/apps/details?id=com.trubooker.trubooker&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                onClick={handleDownload}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
              >
                <Image
                  src="/playStore.png"
                  alt="Download Icon"
                  width={30}
                  height={30}
                  className="inline mr-2"
                />
                Play store
              </button>
            </Link>
            <Link
              href="https://apps.apple.com/ng/app/trubooker/id6743930941"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                onClick={handleDownload}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
              >
                <Image
                  src="/AppStore.png"
                  alt="Download Icon"
                  width={25}
                  height={25}
                  className="inline mr-2"
                />
                App store
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferredSuccessfully;
