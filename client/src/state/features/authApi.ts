import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import build from "next/dist/build";

type FormData = {
  email: string;
  password: string;
};

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
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
  }),
});

export const { useSigninUserMutation, useSignupUserMutation } = authApi;
export default authApi;
