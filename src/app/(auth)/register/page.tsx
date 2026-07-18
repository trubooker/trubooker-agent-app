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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";

const RegisterFormSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    dob: z.string().min(1, { message: "Date of birth is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Email is invalid" }),
    phone: z
      .string()
      .min(1, { message: "Phone number is required" })
      .regex(/^\+?[0-9]{10,15}$/, { message: "Phone number is invalid" }),
    password: z
      .string()
      .min(6, { message: "Password must be 6 characters or more" }),
    passwordConfirmation: z.string(),
    role: z.string().min(1, { message: "Role is required" }),
    referralCode: z.string().optional(),
    city: z.string().min(1, { message: "City is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    gender: z.string().min(1, { message: "Gender is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    iagree: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms & conditions",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });

type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

export default function RegisterComponent() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
      role: "",
      referralCode: "",
      city: "",
      address: "",
      gender: "",
      country: "",
      iagree: false,
    },
  });

  const router = useRouter();
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>(
    {}
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: RegisterFormValues) => {
    setServerErrors({});
    setLoading(true);

    // Build the payload exactly as the backend expects it
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      fullName: `${values.firstName} ${values.lastName}`.trim(),
      dob: values.dob,
      email: values.email,
      phone: values.phone,
      password: values.password,
      role: values.role,
      referralCode: values.referralCode ?? "",
      city: values.city,
      address: values.address,
      gender: values.gender,
      country: values.country,
    };

    try {
      const response = await axios.post(`/api/register`, payload);

      if (response.status === 200 || response.status === 201) {
        form.reset();
        router.push(`/otp?email=${encodeURIComponent(values.email)}`);
      }
    } catch (error: any) {
      // Expects backend errors shaped like { message: { email: ["..."], phone: ["..."] } }
      const message = error?.response?.data?.message;
      if (message && typeof message === "object") {
        setServerErrors(message);
      } else if (typeof message === "string") {
        setServerErrors({ general: [message] });
      } else {
        setServerErrors({ general: ["Something went wrong. Please try again."] });
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldError = (name: string) =>
    serverErrors[name]?.length ? (
      <ul className="list-disc list-inside">
        {serverErrors[name].map((err, i) => (
          <li key={i}>{err}</li>
        ))}
      </ul>
    ) : null;

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="lg:mx-auto w-full px-5 pt-10 pb-24 lg:w-8/12">
        <h2 className="w-full text-center font-bold text-3xl my-10">
          Create An Account
        </h2>

        {serverErrors.general && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {serverErrors.general.join(" ")}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              {/* First / Last name */}
              <div className="grid grid-rows-1 lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email / Phone */}
              <div className="grid grid-rows-1 lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                      {fieldError("email") && (
                        <FormMessage>{fieldError("email")}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+2348012345678"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      {fieldError("phone") && (
                        <FormMessage>{fieldError("phone")}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              {/* DOB / Gender */}
              <div className="grid grid-rows-1 lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Role / Referral code */}
              <div className="grid grid-rows-1 lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="driver">Driver</SelectItem>
                          <SelectItem value="agent">Agent</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="referralCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referral Code (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter referral code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City / Country */}
              <div className="grid grid-rows-1 lg:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="text-xs font-semibold underline absolute right-4 top-5"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                    {fieldError("password") && (
                      <FormMessage>{fieldError("password")}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              {/* Confirm password */}
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Re-enter password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((s) => !s)}
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

              {/* Terms */}
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
                      <FormLabel className="text-gray-600 flex items-center gap-x-1 mt-0.5">
                        <span>I agree to</span>
                        <Link className="text-[--primary]" href="/privacypolicy">
                          terms & conditions and privacy policy
                        </Link>
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