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
import { Separator } from "../ui/separator";
import Spinner from "../Spinner";

export function DrawerDialogDemo({
  onSelectBeneficiary,
}: {
  onSelectBeneficiary: (id: number) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useIsMobile();
  const { data, isLoading } = useGetBeneficiaryQuery(null);
  const beneficiary = data?.data;

  const handleSelectBeneficiary = (id: number) => {
    onSelectBeneficiary(id);
    setOpen(false);
  };

  const renderBeneficiaries = () => {
    if (isLoading) return <Spinner />;
    if (!beneficiary?.length) return <div>No beneficiaries found</div>;

    return (
      <ul>
        {beneficiary.map((item: any) => (
          <li key={item.id}>
            <Separator />
            <div
              className="my-3 cursor-pointer"
              onClick={() => handleSelectBeneficiary(item.id)}
            >
              {item.bank_holder_name}
            </div>
            <Separator />
          </li>
        ))}
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
