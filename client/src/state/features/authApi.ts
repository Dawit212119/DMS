import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type FormData = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    credentials: "include", // very important for sending cookies
  }),
  endpoints: (builder) => ({
    signinUser: builder.mutation<{ token: string; id: string }, FormData>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
    }),
    signupUser: builder.mutation<{ message: string }, FormData>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
    }),
    logoutUser: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSigninUserMutation,
  useSignupUserMutation,
  useGetMeQuery,
  useLogoutUserMutation,
} = authApi;
