"use client";

import Goback from "@/components/Goback";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { states } from "@/constants";

const WithdrawFunds = () => {
  const FormSchema = z.object({
    accountNumber: z
      .string()
      .min(1, { message: "Account Number is required" })
      .max(10, {
        message: "Too long, max of 10",
      }),
    narration: z.string().min(1, { message: "Narration is required" }),
    bankName: z.string().min(1, { message: "Bank Name is required" }),
    amount: z.string({ message: "Amount is required" }),
    bankHolderName: z
      .string()
      .min(1, { message: "Bank Holder Name is required" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    setTimeout(() => {
      form.setValue("accountNumber", "");
      form.setValue("narration", "");
      form.setValue("bankHolderName", "");
      form.setValue("bankName", "");
      form.setValue("amount", "");
      alert(values);
    }, 3000);
  };

  return (
    <div>
      <Goback name={"Apply for withdrawal"} />
      <div className="h-full flex flex-col justify-center">
        <div className="w-full px-5 pb-24 lg:w-8/12">
          <h2 className=" w-full text-left text-gray-400 text-base my-10">
            Request a payout of your earnings. Ensure your bank details are
            correct before confirming the withdrawal.
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="grid gap-4">
                <div className="grid grid-rows-1 lg:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account number</FormLabel>
                          <FormControl>
                            <Input
                              id="accountNumber"
                              type="text"
                              placeholder="00112233"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-14">
                                <SelectValue
                                  placeholder="Select bank"
                                  className="text-gray-100"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {states?.map((state, i) => (
                                <SelectItem key={i} value={state?.name}>
                                  <p>{state?.name}</p>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-rows-1 lg:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="bankHolderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Holder Name</FormLabel>
                          <FormControl>
                            <Input
                              id="bankHolderName"
                              type="text"
                              placeholder="John doe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <Input
                              id="narration"
                              type="number"
                              placeholder="NGN1,400.00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="narration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Narration</FormLabel>
                        <FormControl>
                          <Input
                            id="narration"
                            type="text"
                            placeholder="e.g sent from trubooker wallet"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-y-4 mt-5">
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl text-white bg-[--primary] hover:bg-[--primary-hover]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Confirm Withdrawal"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFunds;
