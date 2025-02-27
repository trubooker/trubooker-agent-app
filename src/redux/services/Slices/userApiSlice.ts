import { current } from "@reduxjs/toolkit";
import { api } from "../apiSlice";

const userApiConfig = api.enhanceEndpoints({ addTagTypes: ["User"] });
const userApi = userApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => `/user`,
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: `/user/update`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    createTransactionPin: builder.mutation({
      query: ({
        pin,
        pin_confirmation,
      }: {
        pin: number;
        pin_confirmation: number;
      }) => ({
        url: `/transaction-pin/create`,
        method: "POST",
        body: { pin, pin_confirmation },
      }),
      invalidatesTags: ["User"],
    }),

    updatePassword: builder.mutation({
      query: ({ current_password, password, password_confirmation }: any) => ({
        url: `/password-update`,
        method: "POST",
        body: { current_password, password, password_confirmation },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
  useCreateTransactionPinMutation,
  useUpdatePasswordMutation,
} = userApi;
