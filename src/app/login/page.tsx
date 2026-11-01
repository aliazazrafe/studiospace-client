


"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("Login functionality will be connected with the backend soon.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 text-gray-900">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl md:grid-cols-2">

        {/* Left Side - Image */}
        <div className="relative hidden min-h-[650px] md:block">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200"
            alt="Creative studio workspace"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              StudioSpace<span className="text-gray-300">.</span>
            </Link>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">
                Create Something Amazing
              </p>

              <h1 className="text-4xl font-bold leading-tight">
                Find Your Space.
                <br />
                Create Your Story.
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-gray-200">
                Discover inspiring creative spaces and bring your ideas to
                life with StudioSpace.
              </p>
            </div>

            <p className="text-xs text-gray-300">
              © 2026 StudioSpace. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-10 md:px-12">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-8 inline-block text-2xl font-bold tracking-tight md:hidden"
            >
              StudioSpace<span className="text-gray-400">.</span>
            </Link>

            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black"
            >
              ← Back to Home
            </Link>

            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                Welcome Back
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                Enter your details to access your StudioSpace account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

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
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-gray-600 transition hover:text-black"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-16 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-black"
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
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 accent-gray-900"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>

              {/* Message */}
              {message && (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
                  {message}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-900 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Sign In
              </button>
            </form>

            {/* Register Link */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-gray-900 transition hover:underline"
              >
                Create Account
              </Link>
            </p>

            <div className="mt-8 border-t border-gray-100 pt-5 text-center">
              <p className="text-xs text-gray-400">
                By signing in, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
