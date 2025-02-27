"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useLoggedInUser } from "@/hooks/useLoggedUser";

const EarningsCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { userData } = useLoggedInUser();
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const router = useRouter();
  return (
    <div className="w-full bg-indigo-600 flex flex-col text-white p-10 rounded-lg h-64 shadow-md hover:-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-light">Total earning</span>
      </div>
      <div className="text-2xl mt-5 font-bold flex gap-x-4">
        <button onClick={toggleVisibility} aria-label="Toggle visibility">
          {isVisible ? (
            <FaEyeSlash className="w-5 h-5 text-white" />
          ) : (
            <FaEye className="w-5 h-5 text-white" />
          )}
        </button>
        <span className=" font-bold">
          {isVisible
            ? userData?.current_balance === null
              ? "₦ 0.00"
              : `₦ ${userData?.current_balance}`
            : "* * * *"}
        </span>
      </div>
      <Button
        onClick={() => router.push("dashboard/withdraw")}
        className="mt-auto w-full bottom-0 top-0 bg-white hover:bg-blue-50 text-black py-2 rounded-full font-medium"
      >
        Apply for withdrawal
      </Button>
    </div>
  );
};

export default EarningsCard;
