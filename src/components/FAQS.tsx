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
          <AccordionContent className="text-xs lg:text-sm text-gray-500">
            You can refer a driver by sharing your unique referral link from
            your dashboard. Simply navigate to the &apos;Referrals&apos;
            section, copy your link, and send it to potential drivers.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-medium text-sm text-left">
            How do I apply for withdrawal?
          </AccordionTrigger>
          <AccordionContent className="text-xs lg:text-sm text-gray-500">
            Go to the &apos;Earnings&apos; section on your dashboard. Check your
            total eligible earnings and click on the &apos;Withdraw&apos;
            button. Fill in the required details, including your bank account,
            and submit your request.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="font-medium text-sm text-left">
            What should I do if I forget my password?
          </AccordionTrigger>
          <AccordionContent className="text-xs lg:text-sm text-gray-500">
            Click on the &apos;Forgot Password&apos; option on the login screen.
            Enter your registered email, and a password reset link will be sent
            to you. Follow the instructions to reset your password.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="font-medium text-sm text-left">
            How do I get paid from driver referrals?
          </AccordionTrigger>
          <AccordionContent className="text-xs lg:text-sm text-gray-500">
            You earn a commission for every driver you refer once they start
            completing trips. Payments are processed after the driver completes
            trips, and TruBooker deducts its percentage for payment processing.
            You can track your earnings in the &apos;Earnings&apos; section of
            your dashboard. Once eligible, you can apply for withdrawal.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQS;
