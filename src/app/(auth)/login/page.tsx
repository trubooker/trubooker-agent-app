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
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(6, { message: "Password must be 6 characters or more" }),
});

type LoginFormValues = z.infer<typeof LoginFormSchema>;

export default function Login() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setEmailError("");
    setPasswordError("");

    try {
      const response = await axios.post(`/api/login`, {
        email: values.email,
        password: values.password,
      });

      console.log(response)
      if (response.status === 200 && response.data?.success === true) {
        const user = response.data?.data?.user;

        form.reset();
        toast.success("Successfully logged in!");

        // Redirect based on role (adjust routes to your app)
        switch (user?.role) {
          case "driver":
            router.push("/dashboard");
            break;
          case "agent":
          default:
            router.push("/dashboard");
            break;
        }
      } else {
        toast.error(response.data?.message || "Login failed");
      }
    } catch (error: any) {
      const status = error.response?.status;
      const data = error.response?.data;

      // Validation errors (422) — field-level messages
      if (status === 422) {
        const errors = data?.message || data?.errors;

        if (errors && typeof errors === "object") {
          if (errors.email) {
            const msg = Array.isArray(errors.email)
              ? errors.email[0]
              : errors.email;
            setEmailError(msg);
          }
          if (errors.password) {
            const msg = Array.isArray(errors.password)
              ? errors.password[0]
              : errors.password;
            setPasswordError(msg);
          }
          if (!errors.email && !errors.password) {
            toast.error("Validation failed");
          }
        } else {
          toast.error(typeof errors === "string" ? errors : "Validation failed");
        }
      }
      // Unauthorized (401)
      else if (status === 401) {
        toast.error(data?.message || "Invalid email or password");

        if (data?.requiresVerification || data?.requires_verification) {
          router.push(`/otp?email=${encodeURIComponent(values.email)}`);
        }
      }
      // Bad request (400)
      else if (status === 400) {
        toast.error(data?.message || "Bad request");
      }
      // Server error (500)
      else if (status === 500) {
        toast.error("Server error. Please try again later.");
      }
      // Network error
      else if (error.code === "ERR_NETWORK") {
        toast.error("Network error. Please check your connection.");
      }
      // Anything else
      else {
        toast.error(data?.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="lg:mx-auto pt-10 pb-24 px-5 w-full lg:w-4/12">
        <h2 className="w-full text-center font-bold text-3xl my-10">
          Let&apos;s sign you in!
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      <FormMessage />
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
                  Forgot password?
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