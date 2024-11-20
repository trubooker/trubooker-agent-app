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
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const LoginFormSchema = z.object({
    email: z
      .string()
      .email({ message: "Email is invalid" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be 6 chracters or more" })
      .max(15, { message: "Password too long" }),
  });

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {},
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/login`, values);

      if (response.status === 200) {
        form.setValue("email", "");
        form.setValue("password", "");
        setLoading(false);
        router.push("/dashboard");
      }
    } catch (error: any) {
      setLoading(false);
      if (error?.status === 400) {
        setEmailError(error.response?.data?.message?.email[0]);
        setPasswordError(error.response?.data?.message?.password[0]);
      }
      if (error.status === 401) {
        toast.error(error?.response?.data?.message);
      }
      if (error?.status === 500) {
        toast.error("Internal Server Error");
      }
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="lg:mx-auto pt-10 pb-24 px-5 w-full lg:w-4/12">
        <h2 className=" w-full text-center font-bold text-3xl my-10">
          Let&apos;s sign you in!
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      {emailError && <FormMessage>{emailError}</FormMessage>}
                    </FormItem>
                  )}
                />
              </div>

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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Link
                href="/forgotpassword"
                prefetch={true}
                className="w-full text-end"
              >
                <span className="text-sm text-[--primary]">
                  Forget password?
                </span>
              </Link>
              <div className="flex flex-col gap-y-4 mt-10">
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl text-white bg-[--primary] hover:bg-[--primary-hover]"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Log in"}
                </Button>
                <Link
                  href=""
                  className="shadow-md py-3 w-full justify-center hover:bg-blue-50 rounded-lg flex items-center px-4"
                >
                  <div className="flex gap-x-2">
                    <FcGoogle className="w-6 h-6" />
                    <p className="w-full text-center font-medium">
                      Continue with Google
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
