
"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

interface NewsletterResponse {
  success: boolean;
  message: string;
}

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) return;

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      toast.error("Newsletter service is not configured.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${apiUrl.replace(/\/$/, "")}/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: normalizedEmail,
          }),
        }
      );

      const data: NewsletterResponse = await response.json();

      if (!response.ok) {
        toast.error(
          data.message || "Subscription failed. Please try again."
        );
        return;
      }

      toast.success(
        data.message || "Successfully subscribed!"
      );

      setEmail("");
    } catch (error) {
      console.error("Newsletter error:", error);

      toast.error(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubscribe}
      className="flex w-full flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>

      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email address"
        autoComplete="email"
        required
        maxLength={254}
        disabled={loading}
        className="
          min-w-0 flex-1 rounded-lg
          border border-white/15
          bg-white/10 px-4 py-2.5
          text-sm text-white
          placeholder:text-gray-400
          outline-none transition
          focus:border-orange-500
          focus:ring-2 focus:ring-orange-500/20
          disabled:opacity-60
        "
      />

      <button
        type="submit"
        disabled={loading}
        className="
          inline-flex items-center justify-center
          gap-2 rounded-lg bg-orange-500
          px-5 py-2.5 text-sm font-semibold
          text-white transition
          hover:bg-orange-600
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading ? (
          <>
            <span
              className="
                h-4 w-4 animate-spin
                rounded-full border-2
                border-white/40 border-t-white
              "
            />
            Subscribing...
          </>
        ) : (
          <>
            Subscribe
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
