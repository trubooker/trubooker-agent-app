import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { truncateText } from "@/lib/utils";
import { Button } from "./ui/button";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { useLoggedInUser } from "@/hooks/useLoggedUser";
import toast from "react-hot-toast";

const ReferredDrivers = () => {
  const { userData: data } = useLoggedInUser();
  const referralLink = `https://connectors.trubooker.com/connector/${data?.referral}`;
  const [copied, setCopied] = useState(false);
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
    <div className="mb-5">
      <Link
        href={"/dashboard/referral"}
        className="mb-2 text-lg font-bold flex justify-between items-center text-black text-left ps-2"
      >
        Referred Drivers
        <IoIosArrowForward className="h-6 w-6 text-gray-800" />
      </Link>
      <Separator />
      <ul className="list-disc list-inside my-5 ms-5">
        <li className="my-2">Share your link</li>
        <li className="my-2">Drivers sign up using your link.</li>
      </ul>
      <div className="border border-gray-400 py-3 px-4 rounded-lg w-full justify-between items-center flex">
        <p className="text-left text-gray-400 text-sm">
          {truncateText(referralLink, 30)}
        </p>
        <Button onClick={handleCopyLink} variant="ghost" className="text-sm">
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
};

export default ReferredDrivers;
