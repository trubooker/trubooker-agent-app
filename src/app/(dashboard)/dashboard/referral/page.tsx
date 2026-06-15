"use client";

import Referred from "@/components/Referred";
import Goback from "@/components/Goback";
import ReferralSteps from "@/components/ReferalInfo";
import { Button } from "@/components/ui/button";
import { truncateText } from "@/lib/utils";
import React, { useState } from "react";
import { useGetReferralsQuery, useGetReferralDashboardQuery } from "@/redux/services/Slices/Dashboard/dashboardApiSlice";
import { useLoggedInUser } from "@/hooks/useLoggedUser";
import { toast } from "react-hot-toast";

const Referall = () => {
  const { data: referralsData, isLoading: referralsLoading, error: referralsError } = useGetReferralsQuery(null);
  const { data: dashboardData, isLoading: dashboardLoading } = useGetReferralDashboardQuery(null);
  
  const referall = referralsData?.data || [];
  const dashboard = dashboardData?.data || {};
  
  const [copied, setCopied] = useState(false);
  const { userData } = useLoggedInUser();
  const referralLink = `${userData?.referral}`;
  
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopied(true);
        toast.success("✅ Referral code copied to clipboard");
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };
  
  if (referralsLoading || dashboardLoading) {
    return <div>Loading...</div>;
  }
  
  if (referralsError) {
    console.error("Referrals error:", referralsError);
    return <div>Error loading referrals. Please try again.</div>;
  }
  
  return (
    <div>
      <Goback name={"Referral Information"} />
      <div className="w-full p-4 lg:w-11/12 mb-10 mx-auto h-full flex flex-col justify-center">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Earnings</p>
            <p className="text-2xl font-bold">₦{dashboard.total_earnings || 0}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Referrals</p>
            <p className="text-2xl font-bold">{dashboard.total_referrals || 0}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Amount Withdrawn</p>
            <p className="text-2xl font-bold">₦{dashboard.amount_withdrawn || 0}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Current Balance</p>
            <p className="text-2xl font-bold">₦{dashboard.balance || 0}</p>
          </div>
        </div>
        
        <ReferralSteps />
        
        <div className="lg:my-5 my-10">
          <p className="mb-2 text-base text-gray-500 text-left ps-2">
            Referral Code
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