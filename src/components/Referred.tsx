import Link from "next/link";
import React from "react";
// import { Referall } from "@/constants";
import { Separator } from "./ui/separator";

const Referred = ({ Referall }: any) => {
  return (
    <div className="border rounded-lg p-5 pb-0">
      <div className="mb-2 text-lg flex justify-between items-center text-black text-left">
        <p className="mb-2 text-base text-gray-500 ">Referred Drivers</p>
        <Link
          href={"/dashboard/referral/all"}
          className={`text-sm text-[--primary] ${
            Referall?.length > 0 ? "" : "hidden"
          }`}
        >
          See all
        </Link>
      </div>
      <Separator orientation="horizontal" />
      {Referall?.length > 0 ? (
        <div className="h-full">
          {Referall.slice(0, 3).map((data: any, index: number) => (
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
      ) : (
        <div className="flex flex-col h-[100px] w-full justify-center text-center my-auto">
          <p className="text-base text-gray-500 italic">
            No referred drivers found
          </p>
        </div>
      )}
    </div>
  );
};

export default Referred;
