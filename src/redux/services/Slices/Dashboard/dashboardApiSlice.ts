import { api } from "../../apiSlice";

export const referralApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get referrals list (should be GET, not POST)
    getReferrals: builder.query({
      query: () => ({
        url: `/agent/referrals`,
        method: "GET",  // Changed from POST to GET
      }),
      providesTags: ["Referrals"],
    }),
    
    // Get referral dashboard stats (total earnings, total referrals, balance)
    getReferralDashboard: builder.query({
      query: () => ({
        url: `/agent/referrals/dashboard`,
        method: "GET",
      }),
      providesTags: ["ReferralDashboard"],
    }),
    
    // If you need a POST method for creating referrals (if applicable)
    createReferral: builder.mutation({
      query: (data) => ({
        url: `/agent/referrals`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Referrals", "ReferralDashboard"],
    }),
  }),
});

// Export hooks
export const { 
  useGetReferralsQuery, 
  useGetReferralDashboardQuery,
  useCreateReferralMutation 
} = referralApiSlice;