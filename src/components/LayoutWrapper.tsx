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

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {isMobile ? (
            <header className="flex h-28 justify-between shrink-0 items-center gap-2 border-b px-4">
              <div className="flex w-full items-center space-x-4">
                <Avatar className="w-16 h-16">
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
                  <p className="text-gray-400 font-medium text-base">Hello</p>
                  <p className="font-bold text-xl text-black">John Smith</p>
                </div>
              </div>
              <SidebarTrigger className="rounded-full m-2 border border-white shadow-md" />
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
