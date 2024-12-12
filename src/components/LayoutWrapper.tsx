"use client";

import { AppSidebar } from "@/components/styledComponents/app-sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { IoPersonOutline } from "react-icons/io5";
import LogoutModal from "./LogoutModal";
import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { Separator } from "./ui/separator";
import useAuthCheck from "@/hooks/useAuthCheck";
import { useLoggedInUser } from "@/hooks/useLoggedUser";
import InactiveAccount from "./InactiveAccount";
import BouncingBall from "./BounceXanimation";
import Image from "next/image";
import Logo from "@/public/Logo";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  useAuthCheck();
  const isMobile = useIsMobile();
  const [openLog, setOpenLog] = useState(false);
  const handleLogout = () => {
    setOpenLog(true);
  };
  const { userData, userLoading, userFetching } = useLoggedInUser();
  return (
    <>
      {userFetching || userLoading ? (
        <div className="fixed inset-0 flex flex-col gap-y-2 items-center justify-center bg-white z-50">
          {/* <div className="w-48 h-32 relative">
            <Image src="/trubookerConnector.svg" alt="Logo" fill />
          </div> */}
          <Logo className="w-48 h-32" />
          <div className="">
            <BouncingBall />
          </div>
        </div>
      ) : (
        <div>
          {userData?.status === "active" ? "" : <InactiveAccount />}
          <>
            <LogoutModal open={openLog} setOpen={setOpenLog} />
            <SidebarProvider>
              {/* Sidebar */}
              <AppSidebar />

              {/* Navheader */}
              <SidebarInset>
                {isMobile ? (
                  <header className="flex h-20 w-full justify-between shrink-0 items-center gap-2 border-b px-4">
                    <div className="flex w-full items-center space-x-4">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={userData?.profile_image} />
                        <AvatarFallback>
                          <IoPersonOutline />
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid grid-rows-1 text-xs lg:text-base gap-1">
                        <p className="text-gray-400 font-medium text-sm">
                          Hello
                        </p>
                        <p className="font-bold text-lg text-black">
                          {userData?.first_name} {userData?.last_name}
                        </p>
                      </div>
                    </div>
                    <SidebarTrigger className="rounded-full border shadow-md" />
                    <Separator
                      orientation="vertical"
                      className="h-10 ms-2 me-1"
                    />
                    <HiOutlineLogout
                      className="h-9 w-9 text-red-500 cursor-pointer"
                      onClick={() => handleLogout()}
                    />
                  </header>
                ) : (
                  <header className="flex h-16 justify-between shrink-0 items-center gap-2 border-b px-4">
                    <div className="flex w-full items-center space-x-4 justify-end">
                      <p className="text-base text-black">
                        Hello, {userData?.first_name} {userData?.last_name}
                      </p>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={userData?.profile_image} />
                        <AvatarFallback>
                          <IoPersonOutline />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </header>
                )}
                <div className="flex flex-1 flex-col gap-4 py-10 lg:px-20 px-5">
                  {children}
                </div>
              </SidebarInset>
            </SidebarProvider>
          </>
        </div>
      )}
    </>
  );
};

export default LayoutWrapper;
