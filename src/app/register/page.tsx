
"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    if (!agreeTerms) {
      setMessage("Please agree to the Terms and Conditions.");
      return;
    }

    setMessage(
      "Registration form submitted! Backend connection is coming next."
    );
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-3 py-6 text-gray-900 sm:px-5 sm:py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl sm:rounded-2xl md:grid-cols-2">

        {/* Left Side - Image */}
        <div className="relative hidden min-h-[750px] md:block">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200"
            alt="Creative workspace"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white lg:p-10">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              StudioSpace<span className="text-gray-300">.</span>
            </Link>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-300 lg:text-sm">
                Join Our Community
              </p>

              <h1 className="text-3xl font-bold leading-tight lg:text-4xl">
                Your Creative
                <br />
                Journey Starts Here.
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-gray-200">
                Join StudioSpace to discover amazing studios, connect with
                creative people and turn your ideas into reality.
              </p>
            </div>

            <p className="text-xs text-gray-300">
              © 2026 StudioSpace. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="flex items-center justify-center px-4 py-7 sm:px-8 sm:py-10 md:px-8 lg:px-12">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-6 inline-block text-2xl font-bold tracking-tight md:hidden"
            >
              StudioSpace<span className="text-gray-400">.</span>
            </Link>

            {/* Back Button */}
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black sm:mb-6"
            >
              ← Back to Home
            </Link>

            {/* Heading */}
            <div className="mb-6 sm:mb-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 sm:text-sm">
                Get Started
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Create Your Account
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500 sm:mt-3">
                Join StudioSpace and discover your creative space.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 sm:px-4"
                />
              </div>

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
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 sm:px-4"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 pr-16 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 sm:px-4"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-black sm:right-4"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="mt-1 text-xs text-gray-400">
                  Password must contain at least 6 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 pr-16 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 sm:px-4"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-black sm:right-4"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-gray-900"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-gray-600 sm:text-sm"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-gray-900 hover:underline"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-gray-900 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {/* Message */}
              {message && (
                <div
                  role="status"
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm leading-5 text-gray-700"
                >
                  {message}
                </div>
              )}

              {/* Create Account */}
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-900 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99]"
              >
                Create Account
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-gray-500 sm:mt-7">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-gray-900 transition hover:underline"
              >
                Sign In
              </Link>
            </p>

            <div className="mt-6 border-t border-gray-100 pt-5 text-center sm:mt-7">
              <p className="text-xs text-gray-400">
                © 2026 StudioSpace. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
