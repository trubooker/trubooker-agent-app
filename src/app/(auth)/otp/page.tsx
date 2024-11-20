import OTPForm from "@/components/Otp";
import { Suspense } from "react";

const InputOTPForm = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <OTPForm />
      </Suspense>
    </div>
  );
};

export default InputOTPForm;
