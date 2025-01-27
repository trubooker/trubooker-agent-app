"use client";

import Goback from "@/components/Goback";
import React, { useState } from "react";
// import { Referall } from "@/constants";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { truncateText } from "@/lib/utils";
import { useGetReferralsQuery } from "@/redux/services/Slices/Dashboard/dashboardApiSlice";
import toast from "react-hot-toast";
import { useLoggedInUser } from "@/hooks/useLoggedUser";

const AllReferredDrivers = () => {
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
      <Goback name={"Referred Drivers"} />
      <div className="w-10/5 lg:w-full mx-auto grid grid-cols-1 xl:grid-cols-6 pt-5 pb-10 lg:py-10 gap-12">
        <div className="overflow-hidden xl:col-span-4">
          {referall?.map((data: any, index: number) => (
            <div key={index}>
              <div className="flex items-start gap-x-3 w-full my-5">
                <small className="text-gray-500">#{index + 1}</small>
                <div className="flex justify-between text-sm lg:text-base items-center w-full">
                  <div>
                    <div className="flex flex-col gap-y-2">
                      <small className="text-gray-500">Driver: </small>
                      <span>{data?.driver}</span>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <div className="flex flex-col gap-y-2">
                      <small className="text-gray-500">Referral Date: </small>
                      <small>
                        {new Date(data?.referred_at).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </small>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col gap-y-2">
                      <small className="text-gray-500">Earnings: </small>
                      <span className="font-semibold text-sm text-end">
                        ₦ {data?.earned_amount}
                      </span>
                    </div>
                  </div>
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
