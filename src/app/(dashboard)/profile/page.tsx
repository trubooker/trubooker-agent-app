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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IoPersonOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
// import { Bounce, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { countries, states } from "@/constants";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { IoKeyOutline } from "react-icons/io5";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa";
import fetchToken from "@/lib/auth";
import { ReloadIcon } from "@radix-ui/react-icons";
import Goback from "@/components/Goback";
import PasswordUpdate from "@/components/PasswordUpdate";

const FormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  state: z.string().optional(),
  telephone: z.string().optional(),
  telCode: z.string().optional(),
  email: z.string().email().optional(),
  // password: z
  //   .string()
  //   .min(6, { message: "Password must be 6 chracters or more" })
  //   .max(15, { message: "Password too long" }),
  // newPassword: z
  //   .string()
  //   .min(6, { message: "Password must be 6 chracters or more" })
  //   .max(15, { message: "Password too long" }),
  // confirmNewPassword: z.string().min(0),
});
// .refine((data) => data.newPassword === data.confirmNewPassword, {
//   message: "Passwords must match",
//   path: ["confirmPassword"],
// });

const Profile = () => {
  const [previewSrc, setPreviewSrc] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [telephoneError, setTelephoneError] = useState("");
  const handleFileChange = async (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];

      // Check if the file type is valid
      if (validImageTypes.includes(file.type)) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreviewSrc(reader.result as string);
        };

        reader.readAsDataURL(file);
        setSelectedFile(file);
      } else {
        toast.error("Please upload a valid image file (JPEG, JPG, or PNG)");
        setPreviewSrc("");
      }
    } else {
      setPreviewSrc("");
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const router = useRouter();
  const userData: any = {};

  // const { data: userData, refetch } = useGetCurrentUserQuery(null);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      console.log("Form submitted:", {
        ...data,
        selectedFile,
      });

      // const formdata = new FormData();
      // selectedFile && formdata.append("profile_picture", selectedFile);
      // formdata.append("first_name", data.firstName);
      // formdata.append("last_name", data.lastName);

      // const token = await fetchToken();
      // const headers = {
      //   Authorization: `Bearer ${token?.data?.token}`,
      //   Accept: "application/json",
      // };
      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/user/update-profile`,
      //   {
      //     method: "POST",
      //     headers,
      //     body: formdata,
      //   }
      // );

      // const resdata = await res.json();
      // if (resdata?.status == "success") {
      //   setLoading(false);
      //   // refetch();
      // }
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Goback name={"Profile"} />
      <div className="flex flex-col pt-4 justify-center w-full lg:w-8/12 gap-y-10">
        <div className="text-center w-full">
          <Avatar className="w-56 h-56 mx-auto">
            {userData?.data?.attributes?.profile_picture || previewSrc ? (
              <AvatarImage
                src={
                  previewSrc
                    ? previewSrc
                    : userData?.data?.attributes?.profile_picture
                }
              />
            ) : (
              <AvatarImage
                src={
                  "https://images.pexels.com/photos/20594698/pexels-photo-20594698/free-photo-of-raised-arm-with-tattoo-over-antenna.png?auto=compress&cs=tinysrgb&w=400&lazy=load"
                }
              />
            )}
            <div className="font-bold lg:text-2xl">
              <label
                htmlFor="fileInput"
                className="bg-white p-5 border border-gray-600 rounded-full flex justify-center items-center  cursor-pointer absolute right-[34%] bottom-[32%]"
              >
                <FaCamera className="text-3xl lg:text-2xl" />
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <AvatarFallback>
              <IoPersonOutline />
            </AvatarFallback>
          </Avatar>
          <p className="mt-5 font-bold text-xl">John Smith</p>
          <small>Joined 2016</small>
        </div>
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
                            placeholder="John"
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
                            placeholder="Doe"
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
              </div>
              <div className="grid grid-rows-1 lg:grid-cols-2 gap-4 items-end">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            // disabled
                            id="email"
                            type="email"
                            placeholder="admin@yea.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mx-auto w-full text-center">
                  <Button
                    variant="default"
                    type="submit"
                    className="w-full h-14 bg-[--primary] hover:bg-[--primary-hover] text-white hover:text-white font-bold"
                  >
                    {loading ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
        <PasswordUpdate />
      </div>
    </div>
  );
};

export default Profile;
