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
    id: string,
    account_number: string,
    bank_holder_name: string,
    bank_name: string,
    bank_code: string
  ) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useIsMobile();
  const { data, isLoading } = useGetBeneficiaryQuery(null);
  const beneficiary = data?.data;

  const handleSelectBeneficiary = (
    id: string,
    account_number: string,
    bank_holder_name: string,
    bank_name: string,
    bank_code: string
  ) => {
    onSelectBeneficiary(
      id,
      account_number,
      bank_holder_name,
      bank_name,
      bank_code
    );
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
        <ScrollArea className="max-h-[500px] overflow-y-auto">
          <>
            {beneficiary.map((item: any) => (
              <li key={item.id}>
                <div
                  className="my-3 cursor-pointer"
                  onClick={() =>
                    handleSelectBeneficiary(
                      item?.id,
                      item?.account_number,
                      item?.bank_holder_name,
                      item?.bank_name,
                      item?.bank_code
                    )
                  }
                >
                  <div className="bg-white shadow-md p-3 rounded-md border hover:shadow-lg transition-shadow">
                    <h3 className="text-base font-medium capitalize">
                      {item?.bank_holder_name}
                    </h3>
                    <p className="text-sm font-light text-gray-600">
                      Account Number: {item?.account_number}
                    </p>
                    <p className="text-sm font-light text-gray-600">
                      Bank: {item?.bank_name}
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
