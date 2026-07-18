import OTPForm from "@/components/Otp";
import ResetPasswordOTPForm from "@/components/ResetPasswordOtp";
import { Suspense } from "react";

const ForgotInputOTPForm = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <ResetPasswordOTPForm />
      </Suspense>
    </div>
  );
};

export default ForgotInputOTPForm;
