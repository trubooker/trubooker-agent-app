"use client";

import React from "react";
import EarningsCard from "@/components/EarningsCard";
import DashboardCard from "@/components/ReferCard";
import Notification from "@/components/notifications";
import ReferredDrivers from "@/components/ReferredDrivers";

const Dashboard = () => {

  return (
    <div className="flex flex-col h-fit w-full">
      <div className="flex flex-col xl:flex-row w-full gap-4">
        <>
          <div className="w-full xl:w-[80%] flex flex-col">
            <div className="grid grid-rows-1 lg:grid-cols-2 gap-4 w-full">
              <EarningsCard />
              <div className="flex flex-row lg:flex-col gap-4">
                <DashboardCard title={"Referrals"} amount={1} />
                <DashboardCard title={"Pending Referrals"} amount={2} />
              </div>
            </div>
            <div className="w-full hidden mt-14 xl:block">
              <ReferredDrivers />
            </div>
          </div>
          <div className="xl:w-[30%] w-full">
            <Notification />
          </div>
        </>
      </div>
      <div className="xl:hidden">
        <ReferredDrivers />
      </div>
    </div>
  );
};
export default Dashboard;
