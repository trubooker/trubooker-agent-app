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
import axios from "axios";

export default function RegisterComponent() {
  const RegisterFormSchema = z
    .object({
      first_name: z.string().min(1, { message: "First name is required" }),
      last_name: z.string().min(1, { message: "last name is required" }),
      city: z.string().min(1, { message: "City is required" }),
      email: z
        .string()
        .email({ message: "Email is invalid" })
        .min(1, { message: "Email is required" }),
      phone: z.string({ message: "Phone number is required" }),
      password: z
        .string()
        .min(6, { message: "Password must be 6 characters or more" }),
      iagree: z.boolean(),
      // referral_code: z.string().optional(),
      password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Passwords must match",
      path: ["password_confirmation"],
    });

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {},
  });

  const router = useRouter();
  const [phoneError, setPhoneError] = useState("");
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
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
    // const code =
    // values.referral_code === undefined ? null : values.referral_code;
    // const formdata = { ...values, referral_code: code };
    // console.log(formdata);

    setPhoneError("");
    setEmailError("");
    setPasswordError("");
    const formdata = { ...values };
    setLoading(true);
    try {
      const response = await axios.post(`/api/register`, formdata);

      // if (response.status === 200) {
      if (response.status === 200) {
        form.setValue("first_name", "");
        form.setValue("last_name", "");
        form.setValue("email", "");
        // form.setValue("referral_code", "");
        form.setValue("iagree", false);
        form.setValue("city", "");
        form.setValue("phone", "");
        form.setValue("password", "");
        form.setValue("password_confirmation", "");
        setLoading(false);
        setTimeout(() => {
          router.push(`/otp?email=${values?.email}`);
        }, 1000);
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setPhoneError(
        error.response?.data?.message?.phone?.map((err: any, index: number) => (
          <div key={index}>
            <ul className="list-disc list-inside">
              <li>{err}</li>
            </ul>
          </div>
        ))
      );
      setEmailError(
        error.response?.data?.message?.email?.map((err: any, index: number) => (
          <div key={index}>
            <ul className="list-disc list-inside">
              <li>{err}</li>
            </ul>
          </div>
        ))
      );
      setPasswordError(
        error.response?.data?.message?.password?.map(
          (err: any, index: number) => (
            <div key={index}>
              <ul className="list-disc list-inside">
                <li>{err}</li>
              </ul>
            </div>
          )
        )
      );
    }
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
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            id="first_name"
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
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            id="last_name"
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
              <div className="grid grid-rows-1 lg:grid-cols-2 gap-4">
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
                        {!emailError ? <FormMessage /> : ""}
                        {emailError && <FormMessage>{emailError}</FormMessage>}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="234*******"
                            {...field}
                          />
                        </FormControl>
                        {!phoneError ? <FormMessage /> : ""}
                        {phoneError && <FormMessage>{phoneError}</FormMessage>}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* <div className="grid grid-rows-1 lg:grid-cols-2 gap-4"> */}
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          id="city"
                          type="text"
                          placeholder="Enter City"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="referral_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Referral Code (optional)</FormLabel>
                        <FormControl>
                          <Input
                            id="referral_code"
                            type="text"
                            placeholder="Enter referral code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
              {/* </div> */}
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
                      <FormMessage />
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
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Sign Up"}
                </Button>
                {/* <Link
                  href=""
                  className="shadow-md py-3 w-full justify-center hover:bg-blue-50 rounded-lg flex items-center px-4"
                >
                  <div className="flex gap-x-2">
                    <FcGoogle className="w-6 h-6" />
                    <p className="w-full text-center font-medium">
                      Continue with Google
                    </p>
                  </div>
                </Link> */}
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
