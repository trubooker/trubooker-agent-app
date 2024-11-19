"use client";

import Goback from "@/components/Goback";
import React, { useState } from "react";
// import { Referall } from "@/constants";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { truncateText } from "@/lib/utils";
import { useGetReferralsQuery } from "@/redux/services/Slices/Dashboard/dashboardApiSlice";

const AllReferredDrivers = () => {
  const { data } = useGetReferralsQuery(null);
  const referall = data?.data;
  const [copied, setCopied] = useState(false);
  const referralLink = "Trubooker.com/krvw-224";
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopied(true);
        // alert("Referral link copied!");
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };
  return (
    <div>
      <Goback name={"Referred Drivers"} />
      <div className="w-10/5 lg:w-full mx-auto grid grid-cols-1 xl:grid-cols-6 pt-5 pb-10 lg:py-10 gap-12">
        <div className="overflow-hidden xl:col-span-4">
          {referall.map((data: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between text-sm lg:text-base items-center my-5">
                <span>{data.name}</span>
                <div>
                  {data.status === "Pending" ? (
                    <div className="flex items-center mx-auto gap-x-2 px-3 py-1 rounded-full justify-center w-auto bg-[#FFF3E5] text-[#FD8C00]">
                      <span className="font-bold">Pending</span>
                    </div>
                  ) : (
                    <div className="flex items-center mx-auto gap-x-2 px-3 py-1 rounded-full justify-center w-auto bg-[#CCFFCD] text-[#00B771]">
                      <span className="font-bold">{data.status}%</span>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </div>
          ))}
        </div>
        <div className="xl:col-span-2">
          <div className="fixed pe-10 lg:pe-0 w-full bottom-5 lg:relative lg:top-5">
            <div className=" border-2 lg:border-none bg-gray-50  shadow-2xl lg:shadow-md py-5 px-4 rounded-lg w-full justify-between items-center flex">
              <p className="text-left text-gray-400 text-sm flex flex-col gap-y-3">
                <span className="font-bold text-lg text-[--primary]">
                  Referral Link:
                </span>
                <span>{truncateText(referralLink, 30)}</span>
              </p>
              <Button
                onClick={handleCopyLink}
                variant="ghost"
                className="text-sm underline text-[--primary-hover]"
              >
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReferredDrivers;
