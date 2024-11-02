"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";

interface Props {
  name: string;
}

const Goback = ({ name }: Props) => {
  const router = useRouter();
  return (
    <div className="flex items-center space-x-4 lg:space-x-10 w-full">
      <button
        onClick={router.back}
        className="text-gray-500 top-7 left-8 lg:top-2 lg:left-2 z-20 bg-white h-10 w-10 flex items-center justify-center"
      >
        <IoChevronBackOutline className="h-6 w-6 text-gray-800" />
      </button>
      <span className="font-bold lg:flex text-lg lg:text-xl items-center">
        {name}
      </span>
    </div>
  );
};

export default Goback;
