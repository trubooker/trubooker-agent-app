import React from "react";
import { CiSettings } from "react-icons/ci";
import { LuCalendarCheck2 } from "react-icons/lu";
import { TbCreditCardOff } from "react-icons/tb";
import { MdOutlineSupportAgent } from "react-icons/md";

const Support = () => {
  return (
    <div>
      <div className="w-full  my-10">
        <h2 className=" w-full text-left text-gray-400 text-base my-5">
          Help categories
        </h2>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center mb-4 lg:mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-3">
              <CiSettings className="w-6 h-6" />
            </div>
            <div className=" w-[90%] flex flex-col gap-y-2">
              <span>Getting Started</span>
              <span className="text-xs text-gray-400">
                Learn how to set up and begin using the connector platform.
              </span>
            </div>
          </div>
          <div className="flex items-center mb-4 lg:mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-3">
              <LuCalendarCheck2 className="w-6 h-6" />
            </div>
            <div className=" w-[90%] flex flex-col gap-y-2">
              <span>Referrals</span>
              <span className="text-xs text-gray-400">
                How to refer drivers and manage referrals.
              </span>
            </div>
          </div>
          <div className="flex items-center mb-4 lg:mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-3">
              <TbCreditCardOff className="w-6 h-6" />
            </div>
            <div className=" w-[90%] flex flex-col gap-y-2">
              <span>Payment Issues</span>
              <span className="text-xs text-gray-400">
                Understand how earnings work and how to apply for withdrawals.
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-3">
              <MdOutlineSupportAgent className="w-6 h-6" />
            </div>
            <div className=" w-[90%] flex flex-col gap-y-2">
              <span>Technical Support</span>
              <span className="text-xs text-gray-400">
                Get help with app performance or technical issues.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
