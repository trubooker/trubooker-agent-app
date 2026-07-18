import { api } from "../../apiSlice";

const announcementConfig = api.enhanceEndpoints({
  addTagTypes: ["Announcement"],
});
const announcement = announcementConfig.injectEndpoints({
  endpoints: (builder) => ({
    getAnnouncements: builder.query({
      query: () => ({
        url: `/fetch-announcement`,
        method: "GET",
      }),
      providesTags: ["Announcement"],
    }),
  }),
});

export const { useGetAnnouncementsQuery } = announcement;
