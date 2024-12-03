import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { truncateText } from "@/lib/utils";
import { Notification } from "@/constants";
import Image from "next/image";
import Logo from "@/public/trubookerNotification.svg";
import Spinner from "../Spinner";

const Notifications = () => {
  const isFetching: boolean = false;
  return (
    // <div className="xl:sticky xl:top-[25vh] mb-10 xl:mb-5">
    <div className="mb-10 xl:mb-5">
      <Card className="w-full h-fit overflow-auto max-h-[500px] xl:shadow-xl border-none">
        <CardHeader className="sticky pt-5 pb-3 top-0 z-50 bg-white text-left text-xl">
          Notifications
        </CardHeader>
        <CardContent>
          {Notification?.length > 0 ? (
            <>
              {Notification.map((actions: any, index: number) => (
                <div key={index}>
                  <Separator />
                  <div className="my-4">
                    <div className="flex w-full items-start space-x-4">
                      <Image
                        src={Logo}
                        width="40"
                        alt="Logo"
                        className=" flex "
                      />
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
            </>
          ) : (
            <>
              {isFetching ? (
                <div className="h-full">
                  <Spinner />
                </div>
              ) : (
                <div className="flex items-center w-full h-[390px] flex-col justify-center">
                  <Image
                    src={"/nodata.svg"}
                    alt=""
                    width={150}
                    height={150}
                    className="object-cover me-5"
                  />
                  <h1 className="mt-8 text-lg text-center font-semibold">
                    You are all caught up
                  </h1>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
