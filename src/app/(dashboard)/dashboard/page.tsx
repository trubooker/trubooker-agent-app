"use client";

import React from "react";
import EarningsCard from "@/components/EarningsCard";
import DashboardCard from "@/components/ReferCard";
import Notification from "@/components/notifications";
import ReferredDrivers from "@/components/ReferredDrivers";
import { useGetReferralsQuery } from "@/redux/services/Slices/Dashboard/dashboardApiSlice";
import Link from "next/link";

const Dashboard = () => {
  const { data } = useGetReferralsQuery(null);
  const referall = data?.data;
  return (
    <div className="flex flex-col h-fit w-full">
      <div className="flex flex-col xl:flex-row w-full gap-8">
        <>
          <div className="w-full xl:w-[80%] flex flex-col">
            <div className="grid grid-rows-1 lg:grid-cols-2 gap-4 w-full">
              <EarningsCard />
              {referall?.length > 0 ? (
                <Link
                  href="/dashboard/referral/all"
                  className="flex flex-row lg:flex-col gap-4"
                >
                  <DashboardCard
                    title={"Referral(s)"}
                    amount={referall?.length}
                  />
                </Link>
              ) : (
                <div className="flex flex-row lg:flex-col gap-4">
                  <DashboardCard
                    title={"Referral(s)"}
                    amount={referall?.length}
                  />
                </div>
              )}
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
