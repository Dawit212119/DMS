"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Loader2,
  AlertCircle,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
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
  password: string;
  confirmPassword: string;
};

function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  // Change the searchParams section to extract both userId and resetString
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const resetString = searchParams.get("resetString");
  // Remove this line
  //const [resetPassword, { isLoading }] = useResetPasswordMutation()

  // Update the onSubmit function to include userId and resetString in the API request
  const onSubmit = async (data: FormData) => {
    setError(null);

    if (!userId || !resetString) {
      setError(
        "Reset information is missing. Please use the link from your email."
      );
      return;
    }

    try {
      // TODO: API Request Implementation
      // Send the new password, userId, and resetString to the API
      // Example API call:
      const response = await fetch("http://localhost:8000/api/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          resetString,
          newPassword: data.password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reset password");
      }

      // For now, simulate a successful response
      console.log("Password reset data:", {
        userId,
        resetString,
        newPassword: data.password,
      });

      // Show success message
      setSuccess(true);

      // Redirect to sign-in page after 3 seconds
      setTimeout(() => {
        router.push("/sign-in");
      }, 3000);
    } catch (err: any) {
      setError(
        err?.message || "An error occurred while resetting your password"
      );
      console.log("Reset password error:", err);
    }
  };

  //const isProcessing = isSubmitting || isLoading
  const isProcessing = isSubmitting;
  const password = watch("password");

  // Update the component to disable the form when userId or resetString is missing
  // Change the return statement to conditionally render different content based on parameters

  // Replace the current return statement with this updated version
  return (
    <div className="">
      <Card className="w-full max-w-md border-blue-600/20 bg-white shadow-lg px-8">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 flex gap-2 items-center">
            <Link href={"/sign-in"}>
              <ArrowLeft />
            </Link>
            <span>Reset Password</span>
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your new password below
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Display error message when parameters are missing */}
          {!userId || !resetString ? (
            <div className="mb-4 flex items-center gap-2 rounded-md border border-red-400 bg-red-100 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span>
                Reset information is missing. Please use the link from your
                email.
              </span>
            </div>
          ) : (
            <>
              {/* Display other error message */}
              {error && (
                <div className="mb-4 flex items-center gap-2 rounded-md border border-red-400 bg-red-100 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              {/* Display success message */}
              {success && (
                <div className="mb-4 flex items-center gap-2 rounded-md border border-green-400 bg-green-100 px-4 py-3 text-sm text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  <span>
                    Password reset successful! Redirecting to sign in...
                  </span>
                </div>
              )}

              {!success && (
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-800">
                      New Password
                    </Label>
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
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm font-medium text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-800">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className={cn(
                          "border-gray-300 pl-10 focus-visible:border-blue-600 focus-visible:ring-blue-600",
                          errors.confirmPassword
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        )}
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm font-medium text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">
                      Password must contain:
                    </p>
                    <ul className="list-inside list-disc space-y-1 text-xs text-gray-500">
                      <li>At least 6 characters</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting password...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              )}
            </>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 border-t border-gray-200 p-6 pt-4">
          <div className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ResetPassword;
