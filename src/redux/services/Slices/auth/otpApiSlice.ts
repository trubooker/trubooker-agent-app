import { api } from "../../apiSlice";

interface OtpProp {
  code: string;
}

interface resetOtpProp {
  reference: string;
}

export const userOtpApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    Otp: builder.mutation<OtpProp, OtpProp>({
      query: (body) => ({
        url: "/auth/otp/verify-otp",
        method: "POST",
        body,
      }),
    }),
    ResendOtp: builder.mutation<OtpProp, any>({
      query: () => ({
        url: "/auth/resend-otp",
        method: "POST",
      }),
    }),
    ResetOtp: builder.mutation<resetOtpProp, resetOtpProp>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useOtpMutation, useResendOtpMutation, useResetOtpMutation } =
  userOtpApiSlice;
