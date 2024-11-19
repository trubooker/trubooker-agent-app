"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";
import { truncateText } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function SidebarOptInForm({ data }: any) {
  const router = useRouter();
  const referralLink = `Trubooker.com/${data?.referral}`;
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => alert("Referral link copied!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };
  return (
    <div className="w-full p-4">
      <div className="mb-5">
        <p className="mb-2 text-base text-gray-500 text-left ps-2">
          Referral Link
        </p>
        <div className="border border-gray-400 py-3 px-4 rounded-lg w-full justify-between items-center flex">
          <p className="text-left text-gray-400 text-sm">
            {truncateText(referralLink, 18)}
          </p>
          <FaRegCopy className="cursor-pointer" onClick={handleCopyLink} />
        </div>
      </div>
      <div
        onClick={() => router.push("/profile")}
        className="flex hover:bg-blue-50 rounded-full p-2 cursor-pointer w-full items-center space-x-4"
      >
        <Avatar className="w-12 h-12">
          <AvatarImage src={data?.profile_image} />
          <AvatarFallback>
            <IoPersonOutline />
          </AvatarFallback>
        </Avatar>
        <div className="grid grid-rows-1 text-left text-xs lg:text-base lg:gap-1">
          <p className="font-bold text-lg">
            {data?.first_name} {data?.last_name}
          </p>
          <p className="text-gray-400 font-medium text-sm">Edit your profile</p>
        </div>
      </div>
    </div>
  );
}
