"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = (
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000"
  ).replace(/\/$/, "");

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-[13px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500";

  const labelClass =
    "mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-200";

  const passwordChecks = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "Uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "Lowercase letter",
      valid: /[a-z]/.test(password),
    },
  ];

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isLoading) return;

    setMessage("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhotoURL = photoURL.trim();

    if (
      !cleanName ||
      !cleanEmail ||
      !cleanPhotoURL ||
      !password ||
      !confirmPassword
    ) {
      const error = "Please fill in all required fields.";
      setMessage(error);
      toast.error(error);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const url = new URL(cleanPhotoURL);

      if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error("Invalid URL");
      }
    } catch {
      toast.error("Please enter a valid photo URL.");
      return;
    }

    if (!passwordChecks.every((check) => check.valid)) {
      toast.error(
        "Password must have 8 characters, uppercase and lowercase letters."
      );
      return;
    }

    if (password.length > 128) {
      toast.error("Password is too long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      toast.warning("Please agree to the Terms and Conditions.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/sign-up/email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            password,
            image: cleanPhotoURL,
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage =
          data?.message ||
          data?.error?.message ||
          "Registration failed. Please try again.";

        setMessage(errorMessage);
        toast.error(errorMessage);
        return;
      }

      toast.success("Account created successfully!");

      router.replace("/login");
      router.refresh();
    } catch {
      const errorMessage =
        "Cannot connect to the authentication server.";

      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/sign-in/social`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            provider: "google",
            callbackURL: window.location.origin + "/",
            errorCallbackURL: window.location.origin + "/register",
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.url) {
        throw new Error(data?.message || "Google Sign-In failed.");
      }

      const redirectURL = new URL(data.url);

      if (
        redirectURL.protocol !== "https:" ||
        redirectURL.hostname !== "accounts.google.com"
      ) {
        throw new Error("Unexpected Google redirect URL.");
      }

      window.location.assign(redirectURL.toString());
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Google Sign-In failed.";

      setMessage(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-3 py-5 text-gray-900 dark:bg-gray-950 dark:text-gray-100 sm:px-5">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 md:grid-cols-[0.85fr_1.15fr]">

        {/* Left Image */}
        <div className="relative hidden min-h-[660px] md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200"
            alt="Creative workspace"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 flex h-full flex-col justify-between p-7 text-white">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight"
            >
              Studio
              <span className="text-orange-400">Space</span>
            </Link>

            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-300">
                Join Our Community
              </p>

              <h1 className="text-2xl font-bold leading-tight lg:text-3xl">
                Your Creative
                <br />
                Journey Starts Here.
              </h1>

              <p className="mt-3 max-w-xs text-xs leading-6 text-gray-200">
                Join StudioSpace to discover amazing studios,
                connect with creative people, and turn your
                ideas into reality.
              </p>
            </div>

            <p className="text-[10px] text-gray-300">
              © 2026 StudioSpace. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Register Form */}
        <div className="flex items-center justify-center px-5 py-6 sm:px-8">
          <div className="w-full max-w-sm">

            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-4 inline-block text-xl font-bold md:hidden"
            >
              Studio
              <span className="text-orange-500">Space</span>
            </Link>

            {/* Back to Home */}
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-gray-500 transition hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
            >
              ← Back to Home
            </Link>

            {/* Heading */}
            <div className="mb-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-500">
                Get Started
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                Create Your Account
              </h2>

              <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Join StudioSpace and discover your creative space.
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-3">

              {/* Name */}
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  disabled={isLoading}
                  required
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isLoading}
                  required
                  className={inputClass}
                />
              </div>

              {/* Photo URL */}
              <div>
                <label htmlFor="photoURL" className={labelClass}>
                  Profile Photo URL
                </label>

                <input
                  id="photoURL"
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  disabled={isLoading}
                  required
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    required
                    className={`${inputClass} pr-16`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-orange-500 dark:text-gray-400"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {/* Compact Password Rules */}
                {password && (
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    {passwordChecks.map((check) => (
                      <span
                        key={check.label}
                        className={`text-[10px] ${
                          check.valid
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-400"
                        }`}
                      >
                        {check.valid ? "✓" : "○"} {check.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className={labelClass}
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    required
                    className={`${inputClass} pr-16`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-orange-500 dark:text-gray-400"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {confirmPassword && (
                  <p
                    className={`mt-1 text-[10px] ${
                      password === confirmPassword
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {password === confirmPassword
                      ? "✓ Passwords match"
                      : "Passwords do not match"}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={isLoading}
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-orange-500"
                />

                <label
                  htmlFor="terms"
                  className="text-[11px] leading-5 text-gray-600 dark:text-gray-300"
                >
                  I agree to the StudioSpace Terms and Conditions
                  and Privacy Policy.
                </label>
              </div>

              {/* Error */}
              {message && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                >
                  {message}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                    />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
              <span className="text-[10px] text-gray-400">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 text-xs font-semibold text-gray-700 transition hover:border-orange-400 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  fill="#4285F4"
                  d="M21.35 12.22c0-.74-.07-1.45-.19-2.14H12v4.05h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.7 2.92-4.2 2.92-7.28Z"
                />
                <path
                  fill="#34A853"
                  d="M12 21.5c2.62 0 4.82-.87 6.43-2.36l-3.14-2.44c-.87.58-1.98.93-3.29.93-2.53 0-4.67-1.71-5.44-4.01H3.33v2.52A9.5 9.5 0 0 0 12 21.5Z"
                />
                <path
                  fill="#FBBC05"
                  d="M6.56 13.62a5.71 5.71 0 0 1 0-3.24V7.86H3.33a9.5 9.5 0 0 0 0 8.28l3.23-2.52Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 6.37c1.42 0 2.69.49 3.69 1.46l2.77-2.77A9.08 9.08 0 0 0 12 2.5a9.5 9.5 0 0 0-8.67 5.36l3.23 2.52c.77-2.3 2.91-4.01 5.44-4.01Z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Login Link */}
            <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-orange-500 hover:underline"
              >
                Sign In
              </Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}