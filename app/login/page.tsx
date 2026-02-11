"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/lib/queries";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const loginMutation = useLogin();

  useEffect(() => {
    if (token) router.replace("/dashboard");
  }, [token, router]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement)?.value?.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;
    if (!username || !password) return;
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => router.replace("/dashboard"),
      }
    );
  }

  if (token) return null;

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4 bg-muted/30"
      role="main"
      aria-label="Login"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle id="login-title">Sign in</CardTitle>
          <CardDescription id="login-desc">
            Use any user from DummyJSON (e.g. emilys / emilyspass).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid gap-4"
            noValidate
            aria-labelledby="login-title"
            aria-describedby="login-desc"
          >
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="emilys"
                disabled={loginMutation.isPending}
                aria-required="true"
                aria-invalid={loginMutation.isError ? "true" : undefined}
                aria-describedby={loginMutation.isError ? "login-error" : undefined}
                className="focus-visible:ring-2"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                disabled={loginMutation.isPending}
                aria-required="true"
                aria-invalid={loginMutation.isError ? "true" : undefined}
                className="focus-visible:ring-2"
              />
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
