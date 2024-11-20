"use client";

import Goback from "@/components/Goback";
import React, { useEffect } from "react";
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
import {
  useGetBankCodesQuery,
  useWithdrawFundsMutation,
  useResolveAccountNumberMutation,
} from "@/redux/services/Slices/Withdrawal/withdrawalApiSlice";
import { DrawerDialogDemo } from "@/components/DualModal";
import { Checkbox } from "@/components/ui/checkbox";
import { ReloadIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import BouncingBall from "@/components/BounceXanimation";

const WithdrawFunds = () => {
  const FormSchema = z.object({
    account_number: z
      .string()
      .min(1, { message: "Account Number is required" })
      .max(10, {
        message: "Too long, max of 10",
      }),
    save_beneficiary: z.boolean().optional(),
    narration: z.string().min(1, { message: "Narration is required" }),
    bank_name: z.string().min(1, { message: "Bank Name is required" }),
    amount: z.string().min(1, { message: "Amount is required" }),
    bank_holder_name: z
      .string()
      .min(1, { message: "Bank Holder Name is required" }),
  });
  const [selectedBank, setSelectedBank] = useState({
    bank_name: "",
    bank_code: "",
  });
  const [isFadingOut] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [beneficiaryId, setBeneficiaryId] = useState<number | null>(null);
  const { data, isLoading: bankLoading } = useGetBankCodesQuery(null);
  const [withdraw, { isLoading: withdrawLoading }] = useWithdrawFundsMutation();
  const [resolve, { isLoading: resolveLoading }] =
    useResolveAccountNumberMutation();
  const banks = data?.data;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      account_number: "",
      bank_holder_name: "",
      bank_name: "",
      narration: "",
      amount: "",
      save_beneficiary: false,
    },
  });

  const router = useRouter();

  const handleBeneficiarySelection = (id: number) => {
    setBeneficiaryId(id);
    console.log("Beneficiary ID updated:", id);
  };

  const handleResolve = async () => {
    const accountNumber = form.getValues("account_number");
    const bankCode = selectedBank.bank_code;
    const data = {
      account_number: accountNumber,
      bank_code: bankCode,
    };

    try {
      const res = await resolve(data).unwrap();
      console.log("Account number resolved successfully:", res);
      if (res.status == true) {
        const resolvedName = res?.data?.account_name || "";
        form.setValue("bank_holder_name", resolvedName);
        toast.success(res?.message);
        setShowPasswordInput(true);
      } else if (res.data.status == false) {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.error("Error resolving account number:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const formData = {
      ...values,
      amount: Number(values.amount),
      beneficiary_id: beneficiaryId ? String(beneficiaryId) : null,
      bank_code: selectedBank.bank_code,
      save_beneficiary: values.save_beneficiary
        ? values.save_beneficiary
        : null,
    };
    console.log(formData);
    await withdraw(formData)
      .unwrap()
      .then((res) => {
        console.log(res);
        form.setValue("account_number", "");
        form.setValue("narration", "");
        form.setValue("bank_holder_name", "");
        form.setValue("bank_name", "");
        form.setValue("amount", "");
      })
      .catch((err) => {
        toast.error(err?.data?.error?.message?.message);
      });
  };

  return (
    <div>
      <Goback name={"Apply for withdrawal"} />
      <div className="h-full flex flex-col justify-center">
        <div className="w-full px-5 pb-24 lg:w-8/12">
          <DrawerDialogDemo onSelectBeneficiary={handleBeneficiarySelection} />

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
                      name="account_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account number</FormLabel>
                          <FormControl>
                            <Input
                              id="account_number"
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
                      name="bank_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              const selected = banks.find(
                                (bank: any) => bank.name === value
                              );
                              if (selected) {
                                setSelectedBank({
                                  bank_name: selected.name,
                                  bank_code: selected.code,
                                });
                                field.onChange(value);
                              }
                            }}
                            defaultValue={field.value}
                            disabled={bankLoading}
                          >
                            <FormControl>
                              <SelectTrigger className="h-14">
                                <SelectValue
                                  placeholder={
                                    bankLoading ? (
                                      <div className="flex items-center gap-x-7">
                                        <BouncingBall />
                                        Fetching banks...
                                      </div>
                                    ) : (
                                      "Select bank"
                                    )
                                  }
                                  className="text-gray-100"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {banks?.map((bank: any) => (
                                <SelectItem key={bank.id} value={bank.name}>
                                  <p>{bank.name}</p>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {!showPasswordInput && (
                    <div className="flex flex-col gap-y-4 mt-5">
                      <Button
                        className="w-full h-12 rounded-xl text-white bg-[--primary] hover:bg-[--primary-hover]"
                        disabled={resolveLoading}
                        onClick={handleResolve}
                      >
                        {resolveLoading ? (
                          <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Confirming...
                          </>
                        ) : (
                          "Confirm Account Details"
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    showPasswordInput && !isFadingOut
                      ? "opacity-100 max-h-screen"
                      : "opacity-0 max-h-0"
                  }`}
                >
                  {showPasswordInput && (
                    <div>
                      <div className="grid grid-rows-1 lg:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <FormField
                            control={form.control}
                            name="bank_holder_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bank Holder Name</FormLabel>
                                <FormControl>
                                  <Input
                                    id="bank_holder_name"
                                    type="text"
                                    disabled
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
                      <div className="flex flex-col gap-y-3 mt-4">
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
                        <FormField
                          control={form.control}
                          name="save_beneficiary"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none flex flex-col">
                                <FormLabel className="text-gray-600 mt-0.5">
                                  Add as beneficiary
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {showPasswordInput && (
                <div className="flex flex-col gap-y-4 mt-5">
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl text-white bg-[--primary] hover:bg-[--primary-hover]"
                    disabled={withdrawLoading}
                  >
                    {withdrawLoading ? "Loading..." : "Confirm Withdrawal"}
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFunds;
