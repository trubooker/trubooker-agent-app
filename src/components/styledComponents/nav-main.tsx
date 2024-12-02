"use client";

import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { links } from "@/constants";
import { useState } from "react";
import LogoutModal from "@/components/LogoutModal";
import { useIsMobile } from "@/hooks/use-mobile";

export function NavMain() {
  const [openLog, setOpenLog] = useState(false);
  const handleLogout = () => {
    // alert("clicked");
    setOpenLog(true);
  };
  const { push } = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  return (
    <SidebarGroup className="w-full">
      <LogoutModal open={openLog} setOpen={setOpenLog} />
      <SidebarMenu>
        <nav className=" space-y-4 ms-3">
          {links.map((feature, index: number) => (
            <div key={index}>
              {isMobile ? (
                feature.title !== "Logout" ? (
                  <div key={feature.id}>
                    <div
                      onClick={() =>
                        feature.link === "/logout"
                          ? handleLogout()
                          : push(feature.link)
                      }
                      className={`flex text-base items-center rounded-lg space-x-2 hover:bg-blue-50 w-full lg:w-auto py-2 pl-4 cursor-pointer transition-all text-left text-[--secondary] ${
                        pathname === feature.link
                          ? `bg-blue-50  border-blue-400 border-l-8`
                          : `bg-white`
                      }`}
                    >
                      <li className="text-sm items-center text-left flex gap-x-3">
                        <dt className="inline text-black">
                          <feature.icon
                            aria-hidden="true"
                            className="h-6 w-6"
                          />
                        </dt>
                        <p className="text-black">{feature.title}</p>
                      </li>
                    </div>
                  </div>
                ) : (
                  ""
                )
              ) : (
                <div key={feature.id}>
                  <div
                    onClick={() =>
                      feature.link === "/logout"
                        ? handleLogout()
                        : push(feature.link)
                    }
                    className={`flex text-base items-center rounded-lg space-x-2 w-full hover:bg-blue-50 lg:w-auto py-2 pl-4 cursor-pointer transition-all text-left text-[--secondary] ${
                      pathname === feature.link
                        ? `bg-blue-50  border-blue-400 border-l-8`
                        : pathname === feature.link
                        ? "bg-red-50 border-red-400 border-l-8"
                        : feature.title === "Logout"
                        ? "hover:bg-red-50 "
                        : `bg-white`
                    }`}
                  >
                    <li className="text-sm items-center text-left flex gap-x-3">
                      <dt
                        className={`inline  ${
                          feature.title === "Logout"
                            ? "text-red-500"
                            : "text-black"
                        }`}
                      >
                        <feature.icon aria-hidden="true" className="h-6 w-6" />
                      </dt>
                      <p
                        className={`${
                          feature.title === "Logout"
                            ? "text-red-500"
                            : "text-black"
                        }`}
                      >
                        {feature.title}
                      </p>
                    </li>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </SidebarMenu>
    </SidebarGroup>
  );
}
