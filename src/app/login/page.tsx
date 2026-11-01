
"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isLoading) return;

    setMessage("");

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter your email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      // Temporary demo delay.
      // Replace this with the real login API request later.
      await new Promise<void>((resolve) =>
        setTimeout(resolve, 1200)
      );

      setMessage(
        "Login is currently in demo mode. Backend authentication is not connected yet."
      );

      toast.info("Login is not connected to the backend yet.", {
        description:
          "Authentication will be available after backend integration.",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-3 py-6 text-gray-900 sm:px-5 sm:py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg sm:rounded-2xl md:grid-cols-2">

        {/* Left Side - Image */}
        <div className="relative hidden min-h-[650px] md:block">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200"
            alt="Creative studio workspace"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white lg:p-10">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              StudioSpace
              <span className="text-gray-300">.</span>
            </Link>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
                Create Something Amazing
              </p>

              <h1 className="text-3xl font-bold leading-tight lg:text-4xl">
                Find Your Space.
                <br />
                Create Your Story.
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-gray-200">
                Discover inspiring creative spaces and bring
                your ideas to life with StudioSpace.
              </p>
            </div>

            <p className="text-xs text-gray-300">
              © 2026 StudioSpace. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center px-4 py-8 sm:px-8 sm:py-10 md:px-8 lg:px-12">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-7 inline-block text-2xl font-bold tracking-tight md:hidden"
            >
              StudioSpace
              <span className="text-gray-400">.</span>
            </Link>

            {/* Back to Home */}
            <Link
              href="/"
              className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black"
            >
              ← Back to Home
            </Link>

            {/* Heading */}
            <div className="mb-7 sm:mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 sm:text-sm">
                Welcome Back
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Enter your details to access your StudioSpace
                account.
              </p>
            </div>

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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                  }}
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="shrink-0 text-xs font-semibold text-gray-600 transition hover:text-black sm:text-sm"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setMessage("");
                    }}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-16 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    disabled={isLoading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-black disabled:opacity-50"
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
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  disabled={isLoading}
                  className="h-4 w-4 accent-gray-900 disabled:opacity-50"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>

              {/* Demo Message */}
              {message && (
                <div
                  role="status"
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm leading-6 text-gray-600"
                >
                  {message}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-gray-900 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    />
                    <span>Signing In...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Register Link */}
            <p className="mt-7 text-center text-sm text-gray-500 sm:mt-8">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-gray-900 transition hover:underline"
              >
                Create Account
              </Link>
            </p>

            {/* Footer */}
            <div className="mt-7 border-t border-gray-100 pt-5 text-center sm:mt-8">
              <p className="text-xs leading-5 text-gray-400">
                By signing in, you agree to our Terms of
                Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
