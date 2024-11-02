import OTPForm from "@/components/Otp";
import { Suspense } from "react";

const ForgotInputOTPForm = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <OTPForm />
      </Suspense>
    </div>
  );
};

export default ForgotInputOTPForm;
