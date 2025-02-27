"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/public/illustration2.svg";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RenderProps } from "input-otp";
import fetchToken from "@/lib/auth";
import { ReloadIcon } from "@radix-ui/react-icons";
import React from "react";
import { useSearchParams } from "next/navigation";
import { truncateNumber } from "@/lib/utils";
import Link from "next/link";
import useCountdown from "@/hooks/otpHook";
import {
  useOtpMutation,
  useResendOtpMutation,
} from "@/redux/services/Slices/auth/otpApiSlice";

const FormSchema = z.object({
  code: z.string().min(6, {
    message: "Enter OTP code sent to your email. Check spam as well",
  }),
});

const OTPForm = () => {
  const params = useSearchParams();
  const email = String(params.get("email"));
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });
  const { timeLeft, isActive, startTimer } = useCountdown(5);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const [Otp, { isLoading }] = useOtpMutation();
  const [Resend, { isLoading: isResendLoading }] = useResendOtpMutation();

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResendOtp = async () => {
    try {
      startTimer();
      await Resend(null)
        .unwrap()
        .then((res) => console.log(res));
    } catch (error: any) {
      console.error(
        "Error sending Code:",
        error?.response?.data?.message || error.message
      );
    }
  };

  const handleBack = () => {
    router.back();
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await Otp({ ...values })
        .unwrap()
        .then((res) => {
          console.log(res);
          router.push("/dashboard");
        });
    } catch (error: any) {
      console.log(error);
      setServerError(error?.data?.error?.message);
    }
  };

  return (
    <div className="h-full mt-24 flex flex-col justify-center">
      <button
        onClick={handleBack}
        className="text-gray-500 fixed top-7 left-8 z-20 bg-white h-10 w-10 rounded-full flex items-center justify-center shadow-lg"
      >
        <IoChevronBackOutline className="h-6 w-6 text-gray-800" />
      </button>
      <div className="flex flex-col">
        <div className="">
          <Image
            src={Logo}
            width="250"
            alt="Logo"
            className="mx-auto mb-3 text-center"
          />
        </div>
        <div className="mx-auto w-11/12 md:w-fit">
          <h2 className=" w-full text-left md:text-center font-bold text-3xl mb-5">
            Verify OTP
          </h2>
          <p className="w-full mb-5">
            Please enter the code we just sent to your email{" "}
            <span className="text-[--primary]">{truncateNumber(email, 6)}</span>
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 relative"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="text-center">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="w-full  max:w-10/12 justify-between">
                          <InputOTPSlot
                            index={0}
                            className="rounded-0 h-12 w-14 text-xl"
                          />
                          <InputOTPSlot
                            index={1}
                            className="rounded-0 h-12 w-14 text-xl"
                          />
                          <InputOTPSlot
                            index={2}
                            className="rounded-0 h-12 w-14 text-xl"
                          />
                          <InputOTPSlot
                            index={3}
                            className="rounded-0 h-12 w-14 text-xl"
                          />
                          <InputOTPSlot
                            index={4}
                            className="rounded-0 h-12 w-14 text-xl"
                          />
                          <InputOTPSlot
                            index={5}
                            className="rounded-0 h-12 w-14 text-xl"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    {serverError ? (
                      <FormDescription className="text-left text-red-600">
                        {serverError}
                      </FormDescription>
                    ) : (
                      <FormDescription className="text-left">
                        Enter OTP verification code sent to your email
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />

              <Button
                className="w-full text-lg text-white mb-10 hover:text-white py-5 bg-[--primary] hover:bg-[--primary-hover]"
                variant={"ghost"}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>

              {/* Resend OTP Button */}
              {isActive ? (
                <p className="w-full text-center text-sm text-gray-400">
                  Resend request after{" "}
                  <span className="text-[--primary] text-lg">{`${timeLeft}s`}</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-[--primary] text-left md:text-center w-full"
                >
                  <p className="w-full text-sm text-gray-400">
                    If you don&apos;t find the Otp that we&apos;ve sent try
                    checking spam, or <br className="hidden md:block" />
                    <Link href={""} className="font-bold text-[--primary]">
                      Send the code again
                    </Link>
                  </p>
                </button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OTPForm;
