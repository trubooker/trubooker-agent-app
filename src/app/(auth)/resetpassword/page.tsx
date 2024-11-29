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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
// import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const reference = searchParams.get("reference");
  const ResetPasswordFormSchema = z
    .object({
      password: z
        .string()
        .min(6, { message: "Password must be 6 chracters or more" }),
      password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Passwords must match",
      path: ["password_confirmation"],
    });

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {},
  });

  const handleBack = () => {
    router.back();
  };
  const [isLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [telephoneError, setTelephoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showpassword_confirmation, setShowpassword_confirmation] =
    useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglepassword_confirmationVisibility = () => {
    setShowpassword_confirmation(!showpassword_confirmation);
  };

  const onSubmit = async (values: z.infer<typeof ResetPasswordFormSchema>) => {
    setLoading(true);
    const data = {
      password_confirmation: values.password_confirmation,
      password: values.password,
      email: String(email),
      reference: String(reference),
    };

    try {
      const response = await axios.post(`/api/resetPassword`, data);
      if (response.status === 200) {
        setLoading(false);
        console.log(response);
        toast.success(String(response?.data?.message));
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (error: any) {
      toast.error(`error occured!`);
      // setTimeout(() => {
      //   router.back;
      // }, 3000);
    }

    form.setValue("password", "");
    form.setValue("password_confirmation", "");
  };
  return (
    <div className="h-screen flex flex-col justify-center">
      <button
        onClick={handleBack}
        className="text-gray-500 fixed top-7 left-8 z-20 bg-white h-10 w-10 rounded-full flex items-center justify-center shadow-lg"
      >
        <IoChevronBackOutline className="h-6 w-6 text-gray-800" />
      </button>
      <div className="lg:mx-auto w-full px-5 pt-10 pb-24 lg:w-8/12">
        <h2 className=" w-full text-center font-bold text-3xl my-10">
          Reset your password
        </h2>
        <p className="w-full mb-5 text-center">
          Your new password must be unique from the previously used.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="text-xs font-semibold underline absolute right-4 top-5"
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                      </FormControl>
                      {passwordError && (
                        <FormMessage>{passwordError}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="confirmPpassword"
                            type={
                              showpassword_confirmation ? "text" : "password"
                            }
                            placeholder="Re-enter password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={togglepassword_confirmationVisibility}
                            className="text-xs underline absolute top-5 right-4 font-semibold"
                          >
                            {showpassword_confirmation ? "Hide" : "Show"}
                          </button>
                        </div>
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
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
