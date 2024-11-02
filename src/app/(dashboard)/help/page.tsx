import Contact from "@/components/contact";
import FAQS from "@/components/FAQS";
import Goback from "@/components/Goback";
import Support from "@/components/Support";
import { Button } from "@/components/ui/button";
import React from "react";

const Help = () => {
  return (
    <>
      <Goback name={"Help & Support"} />
      <div className="w-full lg:mx-auto grid grid-cols-1 xl:grid-cols-6 pb-10 lg:py-10 gap-12">
        <div className="lg:border rounded-3xl px-5 lg:mb-0 overflow-hidden xl:col-span-4">
          <Support />
          <FAQS />
          <Contact />
        </div>
        <div className="xl:col-span-2">
          <div className="fixed pe-10 lg:pe-0 w-full bottom-5 lg:relative lg:top-0">
            <div className=" border-2 bg-gray-50 lg:border-none shadow-lg lg:shadow-md py-5 px-4 rounded-lg w-full justify-between items-center flex flex-col gap-4">
              <div className="text-center">Didn&apos;t find what you are looking for?</div>
              <Button className="bg-[--primary] hover:bg-[--primary-hover] text-white py-2 px-4 rounded-md w-[200px]">
                Start a conversation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
