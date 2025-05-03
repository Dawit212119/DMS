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
interface UserProjectsResponse {
  success: boolean;
  data: Project[];
}
export const userProjectsApi = createApi({
  reducerPath: "userProjectAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/user",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserProjects: builder.query<UserProjectsResponse, void>({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetUserProjectsQuery } = userProjectsApi;
export const { resetApiState } = userProjectsApi.util;
