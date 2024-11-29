"use client";

import Goback from "@/components/Goback";
import React, { useEffect, useRef } from "react";
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
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import {
  useGetBankCodesQuery,
  useWithdrawFundsMutation,
  useResolveAccountNumberMutation,
} from "@/redux/services/Slices/Withdrawal/withdrawalApiSlice";
import { DrawerDialogDemo } from "@/components/DualModal";
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
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [selectedBank, setSelectedBank] = useState({
    bank_name: "",
    bank_code: "",
  });
  const [accountError, setAccountError] = useState("");
  const [bankError, setBankError] = useState("");
  const [bankSearch, setBankSearch] = useState(""); // User's search input
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownInputs, setShowDropdownInputs] = useState(false);

  //  Beneficiary states
  const [beneficiaryId, setBeneficiaryId] = useState<number | null>(null);
  const [beneficiaryBankName, setBeneficiaryBankName] = useState<string | null>(
    null
  );
  const [beneficiaryAccountNumber, setBeneficiaryAccountNumber] = useState<
    string | null
  >(null);
  const [beneficiaryBankHolderName, setBeneficiaryBankHolderName] = useState<
    string | null
  >(null);
  const [beneficiaryCode, setBeneficiaryCode] = useState<string | null>(null);

  const { data, isLoading: bankLoading } = useGetBankCodesQuery(null);
  const [withdraw, { isLoading: withdrawLoading }] = useWithdrawFundsMutation();
  const [resolve, { isLoading: resolveLoading }] =
    useResolveAccountNumberMutation();
  const banks = data?.data;
  const filteredBanks = banks?.filter((bank: any) =>
    bank.name.toLowerCase().includes(bankSearch.toLowerCase())
  );

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

  const handleBeneficiarySelection = (
    id: number,
    account_Number: string,
    beneficiary_bank_holder_name: string,
    bank_Name: string,
    bank_code: string
  ) => {
    setBeneficiaryId(id);
    setBeneficiaryBankName(bank_Name);
    setBeneficiaryBankHolderName(beneficiary_bank_holder_name);
    setBeneficiaryAccountNumber(account_Number);
    setBeneficiaryCode(bank_code);
  };

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setShowDropdownInputs(false);
      setIsFadingOut(false);
    }, 500);
    form.setValue("account_number", "");
    form.setValue("narration", "");
    form.setValue("bank_holder_name", "");
    form.setValue("bank_name", "");
    form.setValue("amount", "");
    setBeneficiaryId(null);
    setBeneficiaryBankName(null);
    setBeneficiaryBankHolderName(null);
    setBeneficiaryAccountNumber(null);
    setBeneficiaryCode(null);
  };

  useEffect(() => {
    if (
      beneficiaryBankHolderName &&
      beneficiaryBankName &&
      beneficiaryAccountNumber
    ) {
      form.setValue("account_number", beneficiaryAccountNumber);
      form.setValue("bank_holder_name", beneficiaryBankHolderName);
      form.setValue("bank_name", beneficiaryBankName);
      setShowDropdownInputs(true);
    }
  }, [
    beneficiaryBankHolderName,
    beneficiaryBankName,
    beneficiaryAccountNumber,
    form,
  ]);

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
        setAccountError("");
        setBankError("");
        const resolvedName = res?.data?.account_name || "";
        form.setValue("bank_holder_name", resolvedName);
        toast.success(res?.message);
        setShowDropdownInputs(true);
      } else if (res.data.status == false) {
        setAccountError("");
        setBankError("");
        console.log(res);
        setAccountError(res?.data?.message);
      }
    } catch (err: any) {
      console.error("Error resolving account number:", err);
      if (err.status === 422) {
        setAccountError(
          err?.data?.errors?.account_number?.map((err: any, index: number) => (
            <div key={index}>
              <ul className="list-disc list-inside">
                <li>{err}</li>
              </ul>
            </div>
          ))
        );
        setBankError(
          err?.data?.errors?.bank_code?.map((err: any, index: number) => (
            <div key={index}>
              <ul className="list-disc list-inside">
                <li>{err}</li>
              </ul>
            </div>
          ))
        );
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const formData = {
      ...values,
      amount: Number(values.amount),
      beneficiary_id: beneficiaryId ? String(beneficiaryId) : null,
      bank_code: beneficiaryCode || selectedBank.bank_code,
      save_beneficiary: true,
    };
    setAccountError("");
    setBankError("");
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
        setBeneficiaryId(null);
        setBeneficiaryBankName(null);
        setBeneficiaryBankHolderName(null);
        setBeneficiaryAccountNumber(null);
        setBeneficiaryCode(null);
      })
      .catch((err) => {
        if (err?.status !== 503) {
          toast.error(err?.data?.error?.message?.message);
        }
        if (err?.status === 503) {
          toast.error("Service Unavailable");
          setShowDropdownInputs(false);
          form.setValue("narration", "");
          form.setValue("bank_holder_name", "");
          form.setValue("amount", "");
          form.setValue("bank_name", "");
          form.setValue("account_number", "");
          setBeneficiaryId(null);
          setBeneficiaryBankName(null);
          setBeneficiaryBankHolderName(null);
          setBeneficiaryAccountNumber(null);
          setBeneficiaryCode(null);
        }
      });
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for the dropdown

  useEffect(() => {
    // Detect clicks outside of the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Goback name={"Apply for withdrawal"} />
      <div className="h-full flex flex-col justify-center">
        <div className="w-full px-5 pb-24 lg:w-8/12">
          {!showDropdownInputs && (
            <DrawerDialogDemo
              onSelectBeneficiary={handleBeneficiarySelection}
            />
          )}

          {showDropdownInputs && (
            <Button
              variant="outline"
              onClick={handleClose}
              className="ms-auto flex justify-end font-bold"
            >
              Close
            </Button>
          )}

          <h2 className=" w-full text-left text-gray-400 text-base my-10">
            Request a payout of your earnings. Ensure your bank details are
            correct before confirming the withdrawal.
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="grid gap-4">
                <div className="grid grid-rows-1 lg:grid-cols-2 gap-4 relative">
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
                              disabled={
                                beneficiaryAccountNumber || showDropdownInputs
                                  ? true
                                  : false
                              }
                              placeholder="Enter account number"
                              {...field}
                            />
                          </FormControl>
                          {accountError && (
                            <FormMessage>{accountError}</FormMessage>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <>
                      {beneficiaryBankName ? (
                        <FormField
                          control={form.control}
                          name="bank_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bank Name</FormLabel>
                              <FormControl>
                                <Input
                                  id="bank_name"
                                  type="text"
                                  disabled
                                  {...field}
                                />
                              </FormControl>
                              {accountError && (
                                <FormMessage>{accountError}</FormMessage>
                              )}
                            </FormItem>
                          )}
                        />
                      ) : (
                        <FormField
                          control={form.control}
                          name="bank_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bank Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    id="bank_name"
                                    type="text"
                                    disabled={bankLoading || showDropdownInputs}
                                    placeholder={
                                      !bankLoading
                                        ? `Select bank`
                                        : "Fetching Bank List"
                                    }
                                    value={bankSearch}
                                    onChange={(e) => {
                                      setBankSearch(e.target.value);
                                      setShowDropdown(true);
                                    }}
                                    onFocus={() => setShowDropdown(true)}
                                  />
                                  {bankLoading && (
                                    <div className="absolute inset-y-0 left-40 flex items-center">
                                      <BouncingBall />
                                    </div>
                                  )}
                                </div>
                              </FormControl>

                              {showDropdown && filteredBanks?.length > 0 && (
                                <div
                                  className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-auto mt-2 w-full"
                                  ref={dropdownRef}
                                  onMouseDown={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                                >
                                  {filteredBanks.map((bank: any) => (
                                    <div
                                      key={bank.code}
                                      onClick={() => {
                                        setSelectedBank({
                                          bank_name: bank.name,
                                          bank_code: bank.code,
                                        });
                                        form.setValue("bank_name", bank.name);
                                        setBankSearch(bank.name);
                                        setShowDropdown(false);
                                      }}
                                      className="p-2 cursor-pointer hover:bg-gray-200"
                                    >
                                      {bank.name}
                                    </div>
                                  ))}
                                </div>
                              )}
                              {bankSearch && filteredBanks?.length === 0 && (
                                <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md mt-2 w-full p-2 text-gray-500">
                                  No banks found
                                </div>
                              )}
                              {bankError && (
                                <FormMessage>{bankError}</FormMessage>
                              )}
                            </FormItem>
                          )}
                        />
                      )}
                    </>
                  </div>
                  {!showDropdownInputs && (
                    <div className="flex flex-col gap-y-4 mt-5">
                      <Button
                        type="submit"
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
                    showDropdownInputs && !isFadingOut
                      ? "opacity-100 max-h-screen"
                      : "opacity-0 max-h-0"
                  }`}
                >
                  {showDropdownInputs && (
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
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid gap-2 mx-1">
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
                        <div className="grid gap-2 m-1">
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
                        {/* <FormField
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
                        /> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {showDropdownInputs && (
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
