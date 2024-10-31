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
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
// import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";

export default function ResetPassword() {
  const ResetPasswordFormSchema = z
    .object({
      password: z
        .string()
        .min(6, { message: "Password must be 6 chracters or more" })
        .max(15, { message: "Password too long" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {},
  });

  const handleBack = () => {
    router.back();
  };
  const registerUser: any = [];
  const [isLoading] = useState(false);
  const router = useRouter();
  const [telephoneError, setTelephoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (values: z.infer<typeof ResetPasswordFormSchema>) => {
    const data = {};

    // await registerUser(data)
    //   .unwrap()
    //   .then(
    //     () => (
    //       toast.success(
    //         "Account created successfully! Check Your email for the verification link",
    //         {
    //           position: "top-center",
    //           autoClose: 2000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           transition: Bounce,
    //         }
    //       ),
    //       router.push("/auth/ResetPassword")
    //     )
    //   )
    //   .catch((error: any) => {
    //     toast.error(error.data.msg, {
    //       position: "top-center",
    //       autoClose: 2000,
    //       hideProgressBar: true,
    //     });
    //   });
    alert(values);

    form.setValue("password", "");
    form.setValue("confirmPassword", "");
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="confirmPpassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="text-xs underline absolute top-5 right-4 font-semibold"
                          >
                            {showConfirmPassword ? "Hide" : "Show"}
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
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
