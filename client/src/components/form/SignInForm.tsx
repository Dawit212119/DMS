"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSigninUserMutation } from "@/state/features/authApi";
import { Mail, Lock, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FormData = {
  email: string;
  password: string;
};

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
      console.log("response data", responseData);
      router.push("/");
    } catch (err: any) {
      setError(err?.data?.message || "An error occurred during sign in");
      console.log("response", err);
    }
  };

  const isProcessing = isSubmitting || isLoading;

  return (
    <div className="">
      <Card className="w-full max-w-md border-blue-600/20 bg-white shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 flex gap-2 items-center">
            <Link href={"/"}>
              <ArrowLeft />
            </Link>
            <span>Sign in</span>
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Display error message */}
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-md border border-red-400 bg-red-100 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-800">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className={cn(
                    "border-gray-300 pl-10 focus-visible:border-blue-600 focus-visible:ring-blue-600",
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  )}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-sm font-medium text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-800">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={cn(
                    "border-gray-300 pl-10 focus-visible:border-blue-600 focus-visible:ring-blue-600",
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  )}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-sm font-medium text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 border-t border-gray-200 p-6 pt-4">
          <div className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signin;
