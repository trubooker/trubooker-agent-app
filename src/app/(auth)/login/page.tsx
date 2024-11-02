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
  // const toggleConfirmPasswordVisibility = () => {
  //   setShowConfirmPassword(!showConfirmPassword);
  // };

  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
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
    //       router.push("/auth/login")
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

    form.setValue("email", "");
    form.setValue("password", "");
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
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Log in"}
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
