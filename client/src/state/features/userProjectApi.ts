import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: string;
  projectName: string;
  clientName: string;
  location: string;
  startDate: string;
  endDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface DeleteResponse {
  success: boolean;
  message: string;
}

interface UserProjectsResponse {
  success: boolean;
  data: Project[];
}

export const userProjectsApi = createApi({
  reducerPath: "userProjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/user",
    credentials: "include",
  }),
  tagTypes: ["Project"], // Optional: for broader cache management
  endpoints: (builder) => ({
    getUserProjects: builder.query<UserProjectsResponse, void>({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((project) => ({
                type: "Project" as const,
                id: project.id,
              })),
              { type: "Project", id: "LIST" },
            ]
          : [{ type: "Project", id: "LIST" }],
    }),

    deleteProject: builder.mutation<DeleteResponse, string>({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: "DELETE",
      }),
      // ✅ Optimistic update implementation
      async onQueryStarted(projectId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userProjectsApi.util.updateQueryData(
            "getUserProjects",
            undefined,
            (draft) => {
              draft.data = draft.data.filter(
                (project) => project.id !== projectId
              );
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // Rollback if delete fails
        }
      },
    }),
  }),
});

// Export hooks
export const { useGetUserProjectsQuery, useDeleteProjectMutation } =
  userProjectsApi;

export const { resetApiState } = userProjectsApi.util;
