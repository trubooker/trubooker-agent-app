"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  code: z.string().min(6, {
    message: "Enter OTP code sent to your email. Check spam as well",
  }),
});

const TransactionPinForm = ({ values }: any) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const onSubmit = async (pin: z.infer<typeof FormSchema>) => {
    const formData = {
      ...values,
      transaction_pin: pin.code,
    };

    console.log("formData: ", formData);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 relative"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="text-center mx-1">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="w-full  max:w-10/12 justify-between">
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="rounded-0 h-12 w-14 text-xl"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            className="w-full text-lg text-white mb-10 hover:text-white py-5 bg-[--primary] hover:bg-[--primary-hover]"
            variant={"ghost"}
            type="submit"
          >
            Enter
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TransactionPinForm;
