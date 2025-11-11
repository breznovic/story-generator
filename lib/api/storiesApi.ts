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
  story_text: string;
  created_at: string;
};

export interface GenerateStoryResponse {
  id: number;
  story: string;
  created_at: string;
}

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
    generateStory: builder.mutation<GenerateStoryResponse, StoryRequest>({
      query: (storyRequest) => ({
        url: "/generate-story",
        method: "POST",
        body: storyRequest,
      }),
      invalidatesTags: ["Story"],
    }),
    deleteStory: builder.mutation<
      { message: string; deleted_id: number },
      number
    >({
      query: (storyId) => ({
        url: `/stories/${storyId}`,
        method: "DELETE",
      }),

      onQueryStarted: async (storyId, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          storiesApi.util.updateQueryData(
            "getStories",
            { skip: 0, limit: 10 },
            (draft) => {
              if (draft?.items) {
                draft.items = draft.items.filter(
                  (story) => story.id !== storyId
                );
                draft.total -= 1;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Story"],
    }),
  }),
});

export const {
  useGenerateStoryMutation,
  useGetStoriesQuery,
  useDeleteStoryMutation,
} = storiesApi;
