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
// import { TransactionPin } from "@/components/DualModal/ReusableDualModal";

/**
 * ─── Backend envelope helpers ────────────────────────────────────────────────
 * The NestJS backend wraps every response as:
 *   success -> { success: true,  message, result }
 *   error   -> { success: false, message, errors: [{ field, errors: string[] }] }
 * Validation failures come back as HTTP 400 (not 422) with `errors` as an ARRAY.
 */
type FieldError = { field: string; errors: string[] };

// Flatten the backend's `errors` array into { field: string[] } for easy lookup.
const getFieldErrors = (err: any): Record<string, string[]> => {
  const arr: FieldError[] | undefined = err?.data?.errors;
  if (!Array.isArray(arr)) return {};
  return arr.reduce((acc: Record<string, string[]>, e: any) => {
    if (e?.field) acc[e.field] = Array.isArray(e.errors) ? e.errors : [];
    return acc;
  }, {});
};

const renderErrors = (messages: string[]): React.ReactNode => (
  <ul className="list-disc list-inside">
    {messages.map((m, i) => (
      <li key={i}>{m}</li>
    ))}
  </ul>
);

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
  // These hold either "" or rendered JSX, so type them as ReactNode.
  const [accountError, setAccountError] = useState<React.ReactNode>("");
  const [bankError, setBankError] = useState<React.ReactNode>("");
  const [amountError, setAmountError] = useState<React.ReactNode>("");
  const [bankSearch, setBankSearch] = useState(""); // User's search input
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownInputs, setShowDropdownInputs] = useState(false);
  // const [transactionPinExist, setTransactionPinExist] = useState(false);
  //  Beneficiary states
  const [beneficiaryId, setBeneficiaryId] = useState<string | null>(null);
  // const [transactionPin, setTransactionPin] = useState<string | null>(null);
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
  // Backend puts the payload under `result`, not `data`.
  const banks = (data as any)?.result;
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
    id: string,
    account_number: string,
    bank_holder_name: string,
    bank_name: string,
    bank_code: string
  ) => {
    setBeneficiaryId(id);
    setBeneficiaryBankName(bank_name);
    setBeneficiaryBankHolderName(bank_holder_name);
    setBeneficiaryAccountNumber(account_number);
    setBeneficiaryCode(bank_code);
  };

  // const handleTransactionPin = (code: string) => {
  //   setTransactionPin(code);
  //   setTransactionPinExist(true);
  //   console.log("code: ", code);
  // };

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
    setBankSearch("");
    // setTransactionPin(null);
    // setTransactionPinExist(false);
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

    // Clear previous inline errors before a new attempt.
    setAccountError("");
    setBankError("");

    const payload = {
      account_number: accountNumber,
      bank_code: bankCode,
    };

    try {
      const res: any = await resolve(payload).unwrap();

      // Backend flag is `success`; payload is under `result`.
      if (res?.success) {
        const resolvedName = res?.result?.account_name || "";
        form.setValue("bank_holder_name", resolvedName);
        toast.success(res?.result?.message || "Account resolved successfully");
        setShowDropdownInputs(true);
      } else {
        toast.error(res?.message || "Could not resolve account number");
      }
    } catch (err: any) {
      console.error("Error resolving account number:", err);

      // Validation errors arrive as HTTP 400 with an `errors` array.
      const fields = getFieldErrors(err);

      if (fields.account_number?.length) {
        setAccountError(renderErrors(fields.account_number));
      }
      if (fields.bank_code?.length) {
        setBankError(renderErrors(fields.bank_code));
      }

      // No field-level errors -> surface the generic backend message.
      if (!fields.account_number?.length && !fields.bank_code?.length) {
        toast.error(err?.data?.message || "Could not resolve account number");
      }
    }
  };

  const clearStates = () => {
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
    setBankSearch("");
    // setTransactionPin(null);
    // setTransactionPinExist(false);
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const formData = {
      ...values,
      amount: Number(values.amount),
      beneficiary_id: beneficiaryId ? String(beneficiaryId) : null,
      bank_code: beneficiaryCode || selectedBank.bank_code,
      save_beneficiary: true,
      transaction_pin: "1234",
      // transaction_pin: transactionPin,
    };
    // if (!transactionPin) {
    //   return;
    // }
    // console.log("formData: ", formData);
    setAccountError("");
    setBankError("");
    setAmountError("");
    withdraw(formData)
      .unwrap()
      .then((res: any) => {
        // Prefer the service message (under result), fall back to envelope message.
        toast.success(
          res?.result?.message || res?.message || "Withdrawal request submitted"
        );
        console.log(res);
        clearStates();
      })
      .catch((err: any) => {
        console.log(err);

        if (err?.status === 503) {
          toast.error("Service Unavailable");
          clearStates();
          return;
        }

        // Field-level validation errors (HTTP 400, `errors` array).
        const fields = getFieldErrors(err);

        if (Object.keys(fields).length) {
          if (fields.amount?.length) {
            setAmountError(renderErrors(fields.amount));
          }
          // Surface any non-amount field problems as a toast.
          const others = Object.entries(fields)
            .filter(([field]) => field !== "amount")
            .flatMap(([, msgs]) => msgs);
          if (others.length) toast.error(others[0]);
        } else {
          // Business errors (e.g. "Insufficient balance") -> plain message.
          toast.error(err?.data?.message || "Withdrawal failed");
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
        <div className="w-full lg:px-5 pb-10 lg:pb-24 lg:w-8/12">
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
                        type="button"
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
                                    id="amount"
                                    type="number"
                                    {...field}
                                  />
                                </FormControl>
                                {amountError && (
                                  <FormMessage>{amountError}</FormMessage>
                                )}
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
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {showDropdownInputs && (
                <Button
                  type="submit"
                  className={`w-full h-12 rounded-xl text-white bg-[--primary] mt-5 hover:bg-[--primary-hover]`}
                  disabled={withdrawLoading}
                >
                  {withdrawLoading ? "Loading..." : "Confirm Withdrawal"}
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFunds;