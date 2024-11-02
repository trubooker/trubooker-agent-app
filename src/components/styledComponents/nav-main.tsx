"use client";

import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { links } from "@/constants";

export function NavMain() {
  const { push } = useRouter();
  const pathname = usePathname();
  return (
    <SidebarGroup className="w-full">
      <SidebarMenu>
        <nav className=" space-y-4 ms-3">
          {links.map((feature) => (
            <div key={feature.id}>
              <div
                onClick={() => push(feature.link)}
                className={`flex text-base items-center rounded-lg space-x-2 hover:bg-blue-50 w-full lg:w-auto py-2 pl-4 cursor-pointer transition-all text-left text-[--secondary] ${
                  pathname === feature.link
                    ? `bg-blue-50  border-blue-400 border-l-8`
                    : `bg-white`
                }`}
              >
                <li className="text-sm items-center text-left flex gap-x-3">
                  <dt className="inline text-black">
                    <feature.icon aria-hidden="true" className="h-6 w-6" />
                  </dt>
                  <p className="text-black">{feature.title}</p>
                </li>
              </div>
            </div>
          ))}
        </nav>
      </SidebarMenu>
    </SidebarGroup>
  );
}
