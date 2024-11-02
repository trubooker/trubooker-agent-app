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

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const [openLog, setOpenLog] = useState(false);
  const handleLogout = () => {
    // alert("clicked");
    setOpenLog(true);
  };
  return (
    <div>
      <LogoutModal open={openLog} setOpen={setOpenLog} />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {isMobile ? (
            <header className="flex h-20 w-full justify-between shrink-0 items-center gap-2 border-b px-4">
              <div className="flex w-full items-center space-x-4">
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
                <div className="grid grid-rows-1 text-xs lg:text-base gap-1">
                  <p className="text-gray-400 font-medium text-sm">Hello</p>
                  <p className="font-bold text-lg text-black">John Smith</p>
                </div>
              </div>

              {/* <div className="flex gap-x-5 items-center"> */}
              <SidebarTrigger className="rounded-full border shadow-md" />
              <Separator orientation="vertical" className="h-10 ms-2 me-1" />
              <HiOutlineLogout
                className="h-9 w-9 text-red-500 cursor-pointer"
                onClick={() => handleLogout()}
              />
              {/* </div> */}
            </header>
          ) : (
            <header className="flex h-16 justify-between shrink-0 items-center gap-2 border-b px-4">
              <div className="flex w-full items-center space-x-4 justify-end">
                <p className="text-base text-black">Hello, John Smith</p>
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={
                      "https://images.pexels.com/photos/20594698/pexels-photo-20594698/free-photo-of-raised-arm-with-tattoo-over-antenna.png?auto=compress&cs=tinysrgb&w=400&lazy=load"
                    }
                  />
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
    </div>
  );
};

export default LayoutWrapper;
