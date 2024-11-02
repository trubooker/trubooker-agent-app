import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = () => {
  return (
    <div>
      <h2 className=" w-full text-left text-gray-600 font-bold text-base my-3">
        FAQ&apos;s
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-medium text-sm text-left">
            How do I refer a driver?
          </AccordionTrigger>
          <AccordionContent className="text-xs text-gray-500">
            If you miss your bus, check for alternative options in the app,
            contact customer support for assistance, and review the cancellation
            and refund policies. If needed, update your booking for a future
            trip.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-medium text-sm text-left">
            How do I apply for withdrawal?
          </AccordionTrigger>
          <AccordionContent className="text-xs text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
            consectetur, ipsam ut sed labore impedit reiciendis in sint iusto
            asperiores repellat quam suscipit odio explicabo quisquam id
            corrupti veniam mollitia commodi animi architecto repudiandae.
            Expedita, repellendus modi nesciunt nam optio nulla veniam dicta!
            Accusamus culpa, nihil dolorem laudantium ab cupiditate.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="font-medium text-sm text-left">
            What should I do if I forget my password?
          </AccordionTrigger>
          <AccordionContent className="text-xs text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
            consectetur, ipsam ut sed labore impedit reiciendis in sint iusto
            asperiores repellat quam suscipit odio explicabo quisquam id
            corrupti veniam mollitia commodi animi architecto repudiandae.
            Expedita, repellendus modi nesciunt nam optio nulla veniam dicta!
            Accusamus culpa, nihil dolorem laudantium ab cupiditate.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="font-medium text-sm text-left">
            How can I change my booking details?
          </AccordionTrigger>
          <AccordionContent className="text-xs text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
            consectetur, ipsam ut sed labore impedit reiciendis in sint iusto
            asperiores repellat quam suscipit odio explicabo quisquam id
            corrupti veniam mollitia commodi animi architecto repudiandae.
            Expedita, repellendus modi nesciunt nam optio nulla veniam dicta!
            Accusamus culpa, nihil dolorem laudantium ab cupiditate.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQS;
