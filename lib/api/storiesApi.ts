import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type SocialClass =
  | "peasant"
  | "knight"
  | "merchant"
  | "noble"
  | "cleric";

export type StoryRequest = {
  social_class: SocialClass;
  region: string;
  include_conflict?: boolean;
};

export type StoryResponse = {
  id: number;
  story: string;
  created_at: string;
};

export type StoriesListResponse = {
  items: StoryResponse[];
  total: number;
  skip: number;
  limit: number;
};

export const storiesApi = createApi({
  reducerPath: "storiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["Story"],
  endpoints: (builder) => ({
    getStories: builder.query<
      StoriesListResponse,
      { skip?: number; limit?: number }
    >({
      query: ({ skip = 0, limit = 10 }) => ({
        url: "/stories/",
        params: { skip, limit },
      }),
      providesTags: ["Story"],
    }),
    generateStory: builder.mutation<StoryResponse, StoryRequest>({
      query: (storyRequest) => ({
        url: "/generate-story",
        method: "POST",
        body: storyRequest,
      }),
      invalidatesTags: ["Story"],
    }),
  }),
});

export const { useGenerateStoryMutation, useGetStoriesQuery } = storiesApi;
