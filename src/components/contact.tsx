"use client";

import Link from "next/link";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import React from "react";
import { useSendSupportMessageMutation } from "@/redux/services/Slices/contactSupportApiSlice";
import toast from "react-hot-toast";

const Contact = () => {
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const contactFormSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .email({ message: "Email is invalid" })
      .min(1, { message: "Email is required" }),
    phoneNumber: z
      .string()
      .min(1, { message: "Required Field" })
      .min(10, { message: "Number must be atleast 10 digits" })
      .max(20, { message: "Number not more than 20 digits" }),
    message: z.string().min(10, { message: "Message is required" }),
    subject: z.string().min(10, { message: "Message is required" }),
  });

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {},
  });
  const [support, { isLoading }] = useSendSupportMessageMutation();
  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      await support({ ...values })
        .unwrap()
        .then((res) => {
          toast.success(`${res?.data?.message}`);
        });
    } catch (error: any) {
      console.log(error);

      toast.error(`${error?.data?.message}`);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="border-none shadow-none my-5">
            <CardHeader className="px-0">
              <CardTitle className="text-lg text-gray-500 pb-3">
                Contact support
              </CardTitle>
              <CardDescription>
                Still need help? Reach out to us directly.
              </CardDescription>
            </CardHeader>
            <CardContent className="border-none px-0 rounded-lg">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Esther"
                            className="h-10"
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
                            placeholder="Adebisi"
                            className="h-10"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="esyadebisi@gmail.coms"
                            className="h-10"
                            {...field}
                          />
                        </FormControl>
                        {emailError && <FormMessage>{emailError}</FormMessage>}
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
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
                        {phoneError && <FormMessage>{phoneError}</FormMessage>}
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="123, Test street, Abuja"
                            className="h-10"
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Drop a message..."
                            className="h-20 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[--primary] hover:bg-[--primary-hover] text-white py-2 px-4 rounded-md"
                >
                  {isLoading ? "Sending..." : "Send request"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default Contact;
