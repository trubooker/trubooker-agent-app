import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import fetchToken from "@/lib/auth";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  prepareHeaders: async (headers) => {
    const token = await fetchToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token?.data?.token}`);
      headers.set("Content-Type", `application/json`);
      headers.set("Accept", `application/json`);
    }
    return headers;
  },
});

const CustomBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status == 401) {
    // window.location.href = "/";
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: CustomBaseQuery,
  tagTypes: ["User", "Teacher", "Withdraw"],
  keepUnusedDataFor: 30,
  endpoints: () => ({}),
});
