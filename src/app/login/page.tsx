
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = (
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000"
  ).replace(/\/$/, "");

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-orange-500/20";

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isLoading) return;

    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/sign-in/email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: cleanEmail,
            password,
            rememberMe,
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage =
          data?.message ||
          data?.error?.message ||
          "Invalid email or password.";

        setMessage(errorMessage);
        toast.error(errorMessage);
        return;
      }

      const sessionResponse = await fetch(
        `${API_URL}/api/auth/get-session`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      if (!sessionResponse.ok) {
        throw new Error(
          "Login succeeded, but session verification failed."
        );
      }

      const session = await sessionResponse.json();

      if (!session?.user) {
        const errorMessage =
          "Login succeeded, but no active session was found. Please check authentication cookie settings.";

        setMessage(errorMessage);
        toast.error("Session verification failed.");
        return;
      }

      toast.success("Login successful!");

      router.replace("/");
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Cannot connect to the authentication server.";

      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-3 py-6 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100 sm:px-5 sm:py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2">

        {/* Left Image Section */}
        <div className="relative hidden min-h-[650px] md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200"
            alt="Creative studio workspace"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white lg:p-10">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight transition hover:opacity-80"
            >
              StudioSpace
              <span className="text-orange-400">.</span>
            </Link>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                Create Something Amazing
              </p>

              <h1 className="text-3xl font-bold leading-tight lg:text-4xl">
                Find Your Space.
                <br />
                Create Your Story.
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-gray-200">
                Discover inspiring creative spaces and bring your
                ideas to life with StudioSpace.
              </p>
            </div>

            <p className="text-xs text-gray-300">
              © 2026 StudioSpace. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="flex items-center justify-center px-4 py-8 sm:px-8 sm:py-10 lg:px-12">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-6 inline-block text-2xl font-bold md:hidden"
            >
              StudioSpace
              <span className="text-orange-500">.</span>
            </Link>

            {/* Back to Home */}
            <div className="mb-7">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-lg text-sm font-medium text-gray-500 transition hover:text-orange-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
              >
                <span className="text-lg transition-transform group-hover:-translate-x-1">
                  ←
                </span>
                Back to Home
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                Welcome Back
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Enter your details to access your StudioSpace account.
              </p>
            </div>

            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setMessage("");
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isLoading}
                  required
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold"
                  >
                    Password
                  </label>

                  <span
                    className="text-xs font-medium text-gray-400 dark:text-gray-500"
                    title="Password recovery is not configured yet."
                  >
                    Forgot Password?
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setMessage("");
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={isLoading}
                    required
                    className={`${inputClass} pr-20`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    disabled={isLoading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 transition hover:text-orange-500 dark:text-gray-400"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                  disabled={isLoading}
                  className="h-4 w-4 accent-orange-500"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              {/* Error Message */}
              {message && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                >
                  {message}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />

              <span className="text-xs text-gray-400">
                OR CONTINUE WITH
              </span>

              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Google Login - Not Configured */}
            <button
              type="button"
              disabled
              title="Google Sign-In is not configured yet."
              className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-500 opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.75 7.18l7.73 6C44.43 38.03 46.98 31.89 46.98 24.55z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59A14.41 14.41 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.2A23.91 23.91 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.92-2.13 15.89-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>

              Google Sign-In (Coming Soon)
            </button>

            {/* Register Link */}
            <p className="mt-7 text-center text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-orange-500 hover:underline"
              >
                Create Account
              </Link>
            </p>

            {/* Terms */}
            <div className="mt-7 border-t border-gray-100 pt-5 text-center dark:border-gray-800">
              <p className="text-xs leading-5 text-gray-400 dark:text-gray-500">
                By signing in, you agree to our Terms of Service
                and Privacy Policy.
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
