"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useLogin } from "@/lib/queries";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type LoginFormValues = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { username: "", password: "" },
  });

  useEffect(() => {
    if (token) router.replace("/dashboard");
  }, [token, router]);

  function onSubmit({ username, password }: LoginFormValues) {
    const trimmed = username.trim();
    if (!trimmed || !password) return;
    loginMutation.mutate(
      { username: trimmed, password },
      {
        onSuccess: () => router.replace("/dashboard"),
      },
    );
  }

  if (token) return null;

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30"
      role="main"
      aria-label="Login"
    >
      <Image
        src="/assets/logo-text.png"
        alt="Cureocity"
        width={140}
        height={32}
        className="mb-6 h-8 w-auto object-contain"
        unoptimized
      />
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <CardTitle id="login-title">Sign in</CardTitle>
          <CardDescription id="login-desc"></CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4"
            noValidate
            aria-labelledby="login-title"
            aria-describedby="login-desc"
          >
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="emilys"
                disabled={loginMutation.isPending}
                aria-required="true"
                aria-invalid={
                  errors.username || loginMutation.isError ? "true" : undefined
                }
                aria-describedby={
                  errors.username
                    ? "username-error"
                    : loginMutation.isError
                      ? "login-error"
                      : undefined
                }
                className="focus-visible:ring-2"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p
                  id="username-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                disabled={loginMutation.isPending}
                aria-required="true"
                aria-invalid={
                  errors.password || loginMutation.isError ? "true" : undefined
                }
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className="focus-visible:ring-2"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.password.message}
                </p>
              )}
            </div>
            {loginMutation.isError && (
              <p
                id="login-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {loginMutation.error.message}
              </p>
            )}
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {loginMutation.isPending ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
