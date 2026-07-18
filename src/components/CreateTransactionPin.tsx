"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useCreateTransactionPinMutation } from "@/redux/services/Slices/userApiSlice";
import toast from "react-hot-toast";

const CreateTransactionPin = () => {
  const FormSchema = z
    .object({
      pin: z
        .string()
        .min(1, { message: "Pin is required" })
        .max(4, { message: "4 digit pin only" }),
      pin_confirmation: z.string(),
    })
    .refine((data) => data.pin === data.pin_confirmation, {
      message: "Pins must match",
      path: ["pin_confirmation"],
    });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const [pinError, setPinError] = useState("");
  const [pinExist, setPinExist] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showpin_confirmation, setShowpin_confirmation] = useState(false);
  const togglePinVisibility = () => {
    setShowPin(!showPin);
  };
  const togglepin_confirmationVisibility = () => {
    setShowpin_confirmation(!showpin_confirmation);
  };
  const [createPin, { isLoading: loading }] = useCreateTransactionPinMutation();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await createPin({
      pin: Number(data.pin),
      pin_confirmation: Number(data.pin_confirmation),
    })
      .unwrap()
      .then((res) => {
        setPinError("");
        console.log(res);
        toast.success("Pin is updated! Login again");
        setPinExist(!pinExist);
      })
      .catch((err) => {
        console.log(err);
        setPinExist(!pinExist);
        setPinError(err?.data?.error?.message);
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Transaction Pin</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div
              className={`grid grid-rows-1 lg:grid-cols-2 lg:items-center gap-4`}
            >
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pin</FormLabel>
                      <FormControl>
                        <Input
                          id="pin"
                          // type={showPin ? "text" : "password"}
                          type="number"
                          disabled={!pinExist}
                          placeholder="Enter Pin"
                          className="spin-button-none"
                          {...field}
                        />
                      </FormControl>
                      {pinError ? (
                        <FormMessage>{pinError}</FormMessage>
                      ) : (
                        <FormMessage />
                      )}
                    </FormItem>
                  )}
                />
              </div>
              {pinExist ? (
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="pin_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pin Confirmation</FormLabel>
                        <FormControl>
                          <Input
                            id="pin_confirmation"
                            // type={showpin_confirmation ? "text" : "password"}
                            type="number"
                            placeholder="Re-enter pin"
                            className="spin-button-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setPinExist(!pinExist)}
                  className={`text-sm lg:w-[80px] lg:mt-10 lg:my-auto lg:h-10 font-semibold underline`}
                >
                  Edit
                </button>
              )}
            </div>
            {pinExist && (
              <div className="mx-auto w-full text-center">
                <Button
                  variant="default"
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-[--primary] hover:bg-[--primary-hover] text-white hover:text-white font-bold"
                >
                  {loading ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Setting...
                    </>
                  ) : (
                    "Set Pin"
                  )}
                </Button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateTransactionPin;
