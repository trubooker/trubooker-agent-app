"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useGetBeneficiaryQuery } from "@/redux/services/Slices/Withdrawal/withdrawalApiSlice";
import Spinner from "../Spinner";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export function DrawerDialogDemo({
  onSelectBeneficiary,
}: {
  onSelectBeneficiary: (
    id: number,
    account_Number: string,
    account_Name: string,
    bank_Name: string,
    bank_code: string
  ) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useIsMobile();
  const { data, isLoading } = useGetBeneficiaryQuery(null);
  // const beneficiary = data?.data;

  const beneficiary = [
    {
      id: 1,
      account_Number: "1234567890",
      account_Name: "John Doe",
      bank_Name: "Bank of America",
      bank_code: "034",
    },
    {
      id: 2,
      account_Number: "9876543210",
      account_Name: "Jane Doe",
      bank_Name: "UBA",
      bank_code: "235",
    },
    {
      id: 3,
      account_Number: "1111111111",
      account_Name: "John Doe",
      bank_Name: "First Bank",
      bank_code: "436",
    },
  ];

  const handleSelectBeneficiary = (
    id: number,
    account_Number: string,
    account_Name: string,
    bank_Name: string,
    bank_code: string
  ) => {
    onSelectBeneficiary(id, account_Number, account_Name, bank_Name, bank_code);
    setOpen(false);
  };

  const renderBeneficiaries = () => {
    if (isLoading) return <Spinner />;
    if (!beneficiary?.length)
      return (
        <div className="w-full text-center italic">No beneficiaries found</div>
      );

    return (
      <ul>
        <ScrollArea className="max-h-[500px]">
          <>
            {beneficiary.map((item: any) => (
              <li key={item.id}>
                <div
                  className="my-3 cursor-pointer"
                  onClick={() =>
                    handleSelectBeneficiary(
                      item?.id,
                      item?.account_Number,
                      item?.account_Name,
                      item?.bank_Name,
                      item?.bank_code
                    )
                  }
                >
                  <div className="bg-white shadow-md p-3 rounded-md border hover:shadow-lg transition-shadow">
                    <h3 className="text-base font-medium">
                      {item?.account_Name}
                    </h3>
                    <p className="text-sm font-light text-gray-600">
                      Account Number: {item?.account_Number}
                    </p>
                    <p className="text-sm font-light text-gray-600">
                      Bank: {item?.bank_Name}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </>
          <ScrollBar />
        </ScrollArea>
      </ul>
    );
  };

  if (!isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="ms-auto flex justify-end font-bold"
          >
            Get Beneficiaries
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Beneficiaries</DialogTitle>
          </DialogHeader>
          <div className="px-4 mt-5">{renderBeneficiaries()}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="ms-auto flex justify-end font-bold"
        >
          Get Beneficiaries
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Beneficiaries</DrawerTitle>
        </DrawerHeader>
        <div className="px-2 mt-5">{renderBeneficiaries()}</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
