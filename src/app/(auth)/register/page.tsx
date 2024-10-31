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
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { countries, states } from "@/constants";

export default function RegisterComponent() {
  const RegisterFormSchema = z.object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(10, {
        message: "Too long, max of 10 characters",
      }),
    lastName: z.string().min(1, { message: "First name is required" }).max(10, {
      message: "Too long, max of 10 characters",
    }),
    state: z.string().min(1, { message: "First name is required" }),
    telephone: z.string({ message: "Phone number is required" }),
    telCode: z.string({ message: "tel code is required" }),
    email: z
      .string()
      .email({ message: "Email is invalid" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be 6 chracters or more" })
      .max(15, { message: "Password too long" }),
    iagree: z.boolean(),
  });
  // .refine((data) => data.password === data.confirmPassword, {
  //   message: "Passwords must match",
  //   path: ["confirmPassword"],
  // });

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
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

  const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
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
    form.setValue("firstName", "");
    form.setValue("lastName", "");
    form.setValue("email", "");
    form.setValue("telCode", "");
    form.setValue("iagree", false);
    form.setValue("state", "");
    form.setValue("telephone", "");
    form.setValue("password", "");
    setTimeout(() => {
      router.push(`/otp?phone=${values.telephone}`);
    }, 1000);
  };
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="lg:mx-auto w-full px-5 pt-10 pb-24 lg:w-8/12">
        <h2 className=" w-full text-center font-bold text-3xl my-10">
          Create An Account
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid gap-4">
              <div className="grid grid-rows-1 lg:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Enter first name"
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Enter last name"
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

              <div className="">
                <FormLabel>Phone number</FormLabel>
                <div className="flex items-center border h-12 mt-2 border-input rounded-lg">
                  <FormField
                    control={form.control}
                    name="telCode"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-none shadow-none ">
                              <SelectValue
                                placeholder="+234"
                                className="placeholder:text-gray-100 "
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="">
                            {countries?.map((country, i) => (
                              <SelectItem
                                className=""
                                key={i}
                                value={country?.telCode}
                              >
                                <div className="flex space-x-2 ">
                                  <Image
                                    alt={country.telCode}
                                    src={country?.flag}
                                    width="20"
                                    height="10"
                                  />
                                  <p>{country?.telCode}</p>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="234*******"
                            {...field}
                            className="border-none outline-none w-full shadow-none h-6 text-base py-4 placeholder:text-sm"
                          />
                        </FormControl>
                        {telephoneError && (
                          <FormMessage>{telephoneError}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue
                              placeholder="Choose State"
                              className="placeholder:text-gray-100"
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
              <FormField
                control={form.control}
                name="iagree"
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
                        I agree to terms & conditions and privacy policy
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-y-4 mt-10">
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl text-white bg-[--primary] hover:bg-[--primary-hover]"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Sign Up"}
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
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
