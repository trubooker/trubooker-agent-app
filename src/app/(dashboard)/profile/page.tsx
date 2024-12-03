"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IoPersonOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
// import { Bounce, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa";
import fetchToken from "@/lib/auth";
import { ReloadIcon } from "@radix-ui/react-icons";
import Goback from "@/components/Goback";
import PasswordUpdate from "@/components/PasswordUpdate";
import { useLoggedInUser } from "@/hooks/useLoggedUser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUpdateProfileMutation } from "@/redux/services/Slices/userApiSlice";

const FormSchema = z.object({
  first_name: z.any().optional(),
  last_name: z.any().optional(),
  city: z.any().optional(),
  address: z.any().optional(),
  country: z.any().optional(),
  gender: z.enum(["male", "female"]).optional(),
});

const Profile = () => {
  const { userData, userLoading, userRefetching } = useLoggedInUser();
  const [previewSrc, setPreviewSrc] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dobError, setDobError] = useState("");

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
  const [update] = useUpdateProfileMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const router = useRouter();

  useEffect(() => {
    if (userData) {
      form.reset({
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        city: userData?.city,
        address: userData?.address,
        country: userData?.country,
      });

      const DOB = new Date(userData?.dob);
      setSelectedDate(DOB);
    }
  }, [userData, form]);

  const genderString =
    userData?.gender === "male"
      ? "male"
      : userData?.gender === "female"
      ? "female"
      : undefined;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    try {
      if (selectedFile) {
        const formdata = new FormData();
        selectedFile && formdata.append("profile_image", selectedFile);

        const token = await fetchToken();
        const headers = {
          Authorization: `Bearer ${token?.data?.token}`,
          Accept: "application/json",
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/upload-profile-picture`,
          {
            method: "POST",
            headers,
            body: formdata,
          }
        );

        const resdata = await res.json();
        if (resdata?.status == "success") {
          userRefetching();
          setLoading(false);
        }
      }

      const dateString = selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : null;
      const formdata = {
        first_name: data.first_name || null,
        last_name: data.last_name || null,
        city: data.city || null,
        address: data.address || null,
        country: data.country || null,
        gender: data.gender || genderString,
        dob: dateString,
      };
      console.log("formdata: ", formdata);

      await update(formdata)
        .unwrap()
        .then((res) => {
          console.log(res);
          toast.success(`Updated Successfully!! ✅`);
          form.setValue("last_name", "");
          form.setValue("first_name", "");
          form.setValue("country", "");
          form.setValue("city", "");
          form.setValue("address", "");
        })
        .catch((err: any) => {
          console.log(err);
        });
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
            <AvatarImage
              src={previewSrc ? previewSrc : userData?.profile_image}
            />
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
          <p className="mt-5 font-bold text-xl">
            {userData?.first_name} {userData?.last_name}
          </p>
          <small>Joined {new Date(userData?.created_at).getFullYear()}</small>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          <Input id="first_name" type="text" {...field} />
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
                          <Input id="last_name" type="text" {...field} />
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
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input id="country" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input id="city" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-rows-1 lg:grid-cols-2 gap-4">
                <div>
                  <FormLabel htmlFor="dateInput">Date of Birth</FormLabel>
                  <div className="border border-gray-200 p-2 mt-2 rounded-lg flex flex-col">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date: Date | null) => setSelectedDate(date)}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="YYYY-MM-DD"
                      id="dateInput"
                      className="date-picker-input border-none w-full outline-none h-10 pl-3 text-base py-4 placeholder:text-sm"
                    />
                  </div>

                  {dobError ? (
                    <FormMessage className="mt-2 text-red-500">
                      {dobError}
                    </FormMessage>
                  ) : (
                    <FormDescription className="mt-2">
                      Input date of birth, not less than 18 years of age
                    </FormDescription>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <>
                          {userData ? (
                            <>
                              {userData?.gender === "male" ? (
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue="male"
                                  className="border grid grid-cols-2 p-4 mt-0 rounded-lg"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        className="border-muted-foreground h-5 w-5"
                                        value="male"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-base text-muted-foreground">
                                      Male
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        className="border-muted-foreground h-5 w-5"
                                        value="female"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-base text-muted-foreground">
                                      Female
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              ) : userData?.gender === "female" ? (
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={"female"}
                                  className="border grid grid-cols-2 p-4 mt-0 rounded-lg"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        className="border-muted-foreground h-5 w-5"
                                        value="male"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-base text-muted-foreground">
                                      Male
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        className="border-muted-foreground h-5 w-5"
                                        value="female"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-base text-muted-foreground">
                                      Female
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              ) : (
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="border grid grid-cols-2 p-4 mt-0 rounded-lg"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        className="border-muted-foreground h-5 w-5"
                                        value="male"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-base text-muted-foreground">
                                      Male
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        className="border-muted-foreground h-5 w-5"
                                        value="female"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-base text-muted-foreground">
                                      Female
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              )}
                            </>
                          ) : (
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="border grid grid-cols-2 p-4 mt-0 rounded-lg"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    className="border-muted-foreground h-5 w-5"
                                    value="male"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-base text-muted-foreground">
                                  Male
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem
                                    className="border-muted-foreground h-5 w-5"
                                    value="female"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-base text-muted-foreground">
                                  Female
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          )}
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="mx-auto w-full text-center">
                <Button
                  variant="default"
                  type="submit"
                  disabled={loading || userLoading}
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
          </form>
        </Form>
        <PasswordUpdate />
      </div>
    </div>
  );
};

export default Profile;
