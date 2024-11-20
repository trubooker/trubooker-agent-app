import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import { NavMain } from "@/components/styledComponents/nav-main";
import { SidebarOptInForm } from "@/components/styledComponents/sidebar-bottom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Logo from "@/public/trubookerAgent.svg";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="relative w-40 ms-3 lg:w-52 h-20">
              <Image className="sm:mx-0 mt-1 rounded" src={Logo} fill alt="" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-16 w-full lg:w-auto">
        <NavMain />
      </SidebarContent>
      <SidebarFooter className="w-full">
        <div className="p-1 bottom-0 absolute w-full left-0">
          <SidebarOptInForm />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
