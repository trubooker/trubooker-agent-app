"use client";

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
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Img from "@/public/forgotPassword.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import React from "react";
import ResponseModal from "@/components/ResponseModal";

const LoginFormSchema = z.object({
  phone: z.string().min(1, { message: "Required" }),
});

export default function ForgotPassword() {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {},
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    setLoading(true);
    const form = {
      phone: data?.phone,
    };

    try {
      router.push(`/forgotpassword/otp?phone=${data?.phone}`);
      // const response = await axios.post(`/api/forget-password`, form);

      // if (response.status === 200) {
      //   setLoading(false);
      //   setSuccessMessage("Password reset link sent to your email");
      //   setIsModalOpen(true);
      // }
    } catch (error: any) {
      // setLoading(false);
      // setServerError(error.response?.data?.message?.email[0]);
      // setErrorMessage(error.response?.data?.message);
      // setIsModalOpen(true);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="h-full mt-24 w-full flex flex-col justify-center">
      {isModalOpen && (
        <ResponseModal
          successMessage={successMessage || undefined}
          errorMessage={errorMessage || undefined}
          onClose={handleCloseModal}
          content="Classes"
          content2="Close"
          classname="hidden"
        />
      )}

      <button
        onClick={handleBack}
        className="text-gray-500 fixed top-7 left-8 z-20 bg-white h-10 w-10 rounded-full flex items-center justify-center shadow-lg"
      >
        <IoChevronBackOutline className="h-6 w-6 text-gray-800" />
      </button>
      <div className="flex flex-col">
        <div className="">
          <Image
            src={Img}
            width="250"
            alt="Logo"
            className="mx-auto mb-3 text-center"
          />
        </div>
        <div className="mx-auto w-11/12 md:w-fit">
          <h2 className=" w-full text-left md:text-center font-bold text-3xl mb-5">
            Forgot password?
          </h2>
          <p className="w-full text-sm mb-5">
            Don&apos;t worry, it occurs. please enter the phone number linked to
            your account
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="phone"
                          type="number"
                          placeholder="Enter Phone Number"
                          className="h-14 w-full"
                          {...field}
                        />
                      </FormControl>
                      {serverError && <FormMessage>{serverError}</FormMessage>}
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full text-lg text-white mb-10 hover:text-white py-5 bg-[--primary] hover:bg-[--primary-hover]"
                  variant={"ghost"}
                  type="submit"
                >
                  {loading ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Submiting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <p className="text-muted-foreground mt-3">
            Go back to{" "}
            <Link href="/login" prefetch={true}>
              <strong>Login</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
