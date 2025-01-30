"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  code: z.string().min(6, {
    message: "Enter OTP code sent to your email. Check spam as well",
  }),
});

export function TransactionPin({
  onSelectValues,
  exists,
}: {
  onSelectValues: (code: string) => void;
  exists: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useIsMobile();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const EnterTransactionPin = () => {
    return (
      <div>
        <Form {...form}>
          <form className="w-full space-y-6 relative">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="text-center ">
                  <FormControl>
                    <InputOTP
                      autoFocus
                      maxLength={6}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e); // Update form state
                        if (e.length === 4) {
                          onSelectValues(e); // Auto-submit when full
                          setOpen(false);
                        }
                      }}
                    >
                      <InputOTPGroup className="w-full max:w-10/12 justify-around">
                        {[...Array(4)].map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="rounded-0 h-14 w-14 pe-2 text-xl"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  };

  if (!isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={`h-12 ${
              !exists
                ? "w-full bg-[--primary] hover:bg-[--primary-hover]"
                : "bg-[--primary-orange] hover:bg-[--primary-orange-hover] w-[150px]"
            }  rounded-xl text-white mt-5`}
          >
            {!exists ? "Confirm Withdrawal" : "Enter Pin"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transaction Pin</DialogTitle>
            <DialogDescription>
              Enter your 4-digit pin to process your withdrawal request
            </DialogDescription>
          </DialogHeader>
          <div className="px-4 mt-5">{EnterTransactionPin()}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className={`h-12 ${
            !exists
              ? "w-full bg-[--primary] hover:bg-[--primary-hover]"
              : "bg-[--primary-orange] hover:bg-[--primary-orange-hover] w-[150px]"
          }  rounded-xl text-white mt-5`}
        >
          {!exists ? "Confirm Withdrawal" : "Enter Pin"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Transaction Pin</DrawerTitle>
          <DrawerDescription>
            Enter your 4-digit pin to process your withdrawal request
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-5 py-5">{EnterTransactionPin()}</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
