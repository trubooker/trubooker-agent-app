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
        Follow the steps below and get rewarded as an agent
      </h2>

      <div className="flex items-start mb-4 lg:mb-8">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-3">
          1
        </div>
        <div className="flex-1 flex items-center gap-x-3">
          <span>Share your link</span>
          <FaRegCopy
            className="w-4 h-4 text-indigo-600 cursor-pointer"
            onClick={handleCopyLink}
          />
        </div>
      </div>

      <div className="flex items-start mb-4 lg:mb-8">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-3">
          2
        </div>
        <span>Drivers sign up using your link</span>
      </div>

      <div className="flex items-start mb-4 lg:mb-8">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-3">
          3
        </div>
        <span>Driver completes a trip</span>
      </div>

      <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-700">
        <p className="flex items-center">
          <span className="mr-2 text-indigo-600">
            <GiTakeMyMoney className="w-8 h-8 inline" />
          </span>
          You get
        </p>
        <p className="mt-2 text-sm">
          Small percentage of the earnings is credited to you for each trip the
          driver completes, until you earn 1000 Naira from that driver.
        </p>
      </div>
    </div>
  );
};

export default ReferralSteps;
