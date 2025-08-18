"use client";

import React from "react";
import Image from "next/image";

const InactiveAccount = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 backdrop-blur-3xl bg-[#E9E7E0]/30 z-50 h-screen w-screen flex-col text-center flex justify-center gap-y-8 text-white">
        <div className="relative w-32 lg:w-64 mb-10 h-12 mx-auto">
          <Image className="mx-auto" src={"/logo.svg"} alt="" fill />
        </div>
        <div className="relative w-[70%] lg:w-1/4 h-48 lg:h-72 text-white p-10 rounded-2xl mx-auto">
          <Image className="mx-auto" src={"/deny.svg"} alt="" fill />
        </div>
        <h2 className="mt-6 leading-7 text-2xl w-[80%] mx-auto font-bold text-gray-600">
          🚦 Your Connector Account is Under Review
        </h2>
        <div className="w-8/12 mx-auto ">
          <p className="text-lg font-bold text-gray-600">
            Thank you for joining the TruBooker Connector program! 🙌
          </p>
          <p className="mt-1 text-base font-bold text-gray-600">
            {" "}
            We’re reviewing your account to make sure everything is set up
            correctly. Once approved, you’ll be able to start referring drivers,
            tracking your referrals, and earning rewards. We’ll notify you by
            email as soon as your account is active.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InactiveAccount;
