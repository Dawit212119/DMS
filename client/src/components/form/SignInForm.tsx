"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSigninUserMutation } from "@/state/features/authApi";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};
let token;
function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [signinUser, { isLoading }] = useSigninUserMutation();
  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const responseData = await signinUser(data).unwrap();

      token = localStorage.setItem("token", responseData?.token);
      console.log("Login successful:", responseData);
      router.push("/Reports");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-3">
      <h1 className="font-semibold text-center my-7 text-3xl">Sign in</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            className="p-3 border rounded-xl"
            {...register("email", { required: "Email is required" })}
          />
        </div>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className="p-3 border rounded-xl"
            {...register("password", { required: "Password is required" })}
          />
        </div>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          className="bg-slate-700 p-3 uppercase hover:opacity-95 rounded-xl text-white disabled:opacity-80"
          disabled={isSubmitting}
        >
          {isSubmitting || isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>

      <p className="mt-5">
        Don’t have an account?{" "}
        <span className="text-blue-700">
          <Link href="/sign-up">Sign Up</Link>
        </span>
      </p>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

export default Signin;
