import Link from "next/link";
import React from "react";
import { Referall } from "@/constants";
import { Separator } from "./ui/separator";

const Referred = () => {
  return (
    <div className="border rounded-lg p-5 pb-0">
      <div className="mb-2 text-lg flex justify-between items-center text-black text-left">
        <p className="mb-2 text-base text-gray-500">Referred Drivers</p>
        <Link
          href={"/dashboard/referral/all"}
          className="text-sm text-[--primary]"
        >
          See all
        </Link>
      </div>
      <div className="h-full">
        {Referall.slice(0, 3).map((data: any, index: number) => (
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
    </div>
  );
};

export default Referred;
