import { api } from "../apiSlice";

const userApiConfig = api.enhanceEndpoints({ addTagTypes: ["User"] });
const userApi = userApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => `/user`,
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetCurrentUserQuery } = userApi;
