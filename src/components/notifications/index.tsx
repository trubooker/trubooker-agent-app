import { IoPersonOutline } from "react-icons/io5";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { truncateText } from "@/lib/utils";
import { Notification } from "@/constants";
import Image from "next/image";
import Logo from "@/public/trubookerNotification.svg";

const Notifications = () => {
  return (
    // <div className="xl:sticky xl:top-[25vh] mb-10 xl:mb-5">
    <div className="mb-10 xl:mb-5">
      <Card className="w-full h-fit overflow-auto max-h-[500px] xl:shadow-xl border-none">
        <CardHeader className="sticky pt-5 pb-3 top-0 z-50 bg-white text-left text-xl">
          Notifications
        </CardHeader>
        <CardContent>
          {Notification.map((actions: any) => (
            <div key={actions.id}>
              <Separator />
              <div className="my-4">
                <div className="flex w-full items-start space-x-4">
                  <Image src={Logo} width="40" alt="Logo" className=" flex " />
                  <div className="">
                    <p className="text-gray-800 font-medium text-sm flex">
                      {truncateText(actions.message)}
                    </p>
                    <p className="text-xs text-gray-500">{actions.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
