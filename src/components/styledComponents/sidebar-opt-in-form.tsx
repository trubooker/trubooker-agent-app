"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";
import { truncateText } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function SidebarOptInForm() {
  const router = useRouter();
  const referralLink = "Trubooker.com/krvw-224";
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => alert("Referral link copied!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };
  return (
    <div className="w-full p-4">
      <div className="mb-10">
        <h4 className="font-bold text-black text-left">Referral Link</h4>
        <div className="border border-gray-400 py-4 px-4 rounded-lg w-full justify-between items-center flex">
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
        <Avatar className="w-14 h-14">
          <AvatarImage
            src={
              "https://images.pexels.com/photos/20594698/pexels-photo-20594698/free-photo-of-raised-arm-with-tattoo-over-antenna.png?auto=compress&cs=tinysrgb&w=400&lazy=load"
            }
          />
          <AvatarFallback>
            <IoPersonOutline />
          </AvatarFallback>
        </Avatar>
        <div className="grid grid-rows-1 text-left  text-xs lg:text-base gap-2 lg:gap-1">
          <p className="font-bold text-lg text-black">John Smith</p>
          <p className="text-gray-400 font-medium text-sm">Edit your profile</p>
        </div>
      </div>
    </div>
  );
}
