"use client";

import Referred from "@/components/Referred";
import Goback from "@/components/Goback";
import ReferralSteps from "@/components/ReferalInfo";
import { Button } from "@/components/ui/button";
import { truncateText } from "@/lib/utils";
import React, { useState } from "react";
import { useGetReferralsQuery } from "@/redux/services/Slices/Dashboard/dashboardApiSlice";
import { useLoggedInUser } from "@/hooks/useLoggedUser";
import { toast } from "react-hot-toast";

const Referall = () => {
  const { data } = useGetReferralsQuery(null);
  const referall = data?.data;
  const [copied, setCopied] = useState(false);
  const { userData } = useLoggedInUser();
  const referralLink = `https://connectors.trubooker.com/connector/${userData?.referral}`;
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopied(true);
        toast("✅ Referral code copied to clipboard");
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };
  return (
    <div>
      <Goback name={"Referral Information"} />
      <div className="w-full p-4 lg:w-11/12 mb-10 mx-auto h-full flex flex-col justify-center">
        <ReferralSteps />
        <div className="lg:my-5 my-10">
          <p className="mb-2 text-base text-gray-500 text-left ps-2">
            Referral Link
          </p>
          <div className="border border-gray-400 py-3 px-4 rounded-lg w-full justify-between items-center flex">
            <p className="text-left text-gray-400 text-sm">
              {truncateText(referralLink, 30)}
            </p>
            <Button
              onClick={handleCopyLink}
              variant="ghost"
              className="text-sm text-[--primary] hover:text-[--primary-hover]"
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
        <div className="lg:mt-5">
          <Referred Referall={referall} />
        </div>
      </div>
    </div>
  );
};

export default Referall;
