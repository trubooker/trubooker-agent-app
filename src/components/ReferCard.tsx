"use client";

import { BsFillPersonFill } from "react-icons/bs";

const DashboardCard = ({ title, amount }: any) => {
  return (
    <div className="w-full bg-[#EEEEFD] flex flex-col justify-between text-white p-4 rounded-lg h-[120px] shadow-md hover:-full">
      <div className="flex h-full items-center gap-x-8">
        <span className="text-white">
          <BsFillPersonFill className="text-[--primary] w-12 h-12" />
        </span>
        <div className="flex flex-col lg:flex-row gap-x-3 text-black justify-between mb-2 lg:mb-0">
          <span className="text-base font-bold ms-2">{amount}</span>
          <span className="text-base font-light">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
