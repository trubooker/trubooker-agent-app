"use client";

import { useLoggedInUser } from "@/hooks/useLoggedUser";
import { FaRegCopy } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { toast } from "react-hot-toast";

const ReferralSteps = () => {
  const { userData } = useLoggedInUser();
  const referralLink = `Trubooker.com/${userData?.referral}`;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => toast("✅ Referral code copied to clipboard"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <div className="w-full text-sm lg:text-base bg-white text-gray-700">
      <h2 className="text-lg font-medium mb-4 lg:mb-8">
        Follow the steps below and get rewarded as a connector
      </h2>

      {/* Steps */}
      <div className="relative">
        {/* Step 1 */}
        <div className="flex items-start mb-10">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 text-indigo-600 font-bold mr-4">
            1
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 h-10 w-[2px] bg-gray-200"></div>
          </div>
          <div className="flex-1 flex items-center gap-x-3 my-auto">
            <span>Share your link</span>
            <FaRegCopy
              className="w-4 h-4 text-indigo-600 cursor-pointer"
              onClick={handleCopyLink}
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-start mb-10">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 text-indigo-600 font-bold mr-4">
            2
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 h-10 w-[2px] bg-gray-200"></div>
          </div>
          <span className=" my-auto">Drivers sign up using your link</span>
        </div>

        {/* Step 3 */}
        <div className="flex items-start">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 text-indigo-600 font-bold mr-4">
            3
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 h-8 w-[2px] bg-gray-200"></div>
          </div>
          <span className=" my-auto">Driver completes a trip</span>
        </div>
      </div>

      {/* Reward Section */}
      <div className="mt-8 p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-700">
        <p className="flex items-center">
          <span className="mr-2 text-indigo-600">
            <GiTakeMyMoney className="w-8 h-8 inline" />
          </span>
          You get
        </p>
        <p className="mt-2 text-sm">
          Small percentage of the earnings is credited to you for each trip the
          driver completes, until you earn 2,500 Naira from that driver.
        </p>
      </div>
    </div>
  );
};

export default ReferralSteps;
