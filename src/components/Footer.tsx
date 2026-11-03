
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const hostLinks = [
  { label: "Add Your Studio", href: "/add-studio" },
  { label: "My Listings", href: "/my-listings" },
  { label: "My Bookings", href: "/my-bookings" },
];

const categories = [
  { label: "Photo Studios", value: "Photo Studios" },
  { label: "Sound Stages", value: "Sound Stages" },
  { label: "Podcast Rooms", value: "Podcast Rooms" },
  { label: "Music Suites", value: "Music Suites" },
  { label: "Art Workshops", value: "Art Workshops" },
];

const socialClass =
  "flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-400 transition hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400";

interface NewsletterResponse {
  success?: boolean;
  message?: string;
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (subscribing) return;

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(normalizedEmail) ||
      normalizedEmail.length > 254
    ) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      toast.error("Newsletter service is not configured.");
      return;
    }

    setSubscribing(true);

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
        data.message || "Successfully subscribed to our newsletter!"
      );

      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);

      toast.error(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#080b13] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-5 lg:gap-8">
          {/* Brand and Mission */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="2.4" />
                  <path d="M12 2.5 16.5 7l-1 5H8.5l-1-5L12 2.5Z" />
                  <path d="m21 7-1.7 6.1-4.8 2.2-3.5-6 3.7-3.5L21 7Z" />
                  <path d="m19 19-6.1 1.7-4.3-3.2 3.5-6 5 1.5L19 19Z" />
                  <path d="m5 19-1.7-6.1 3.2-4.3 6 3.5-1.5 5L5 19Z" />
                  <path d="M3 7 9.1 5.3l4.3 3.2-3.5 6-5-1.5L3 7Z" />
                </svg>
              </span>

              <span className="text-lg font-bold tracking-tight text-white">
                Studio<span className="text-orange-500">Space</span>
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-xs leading-6 text-gray-400 sm:text-[13px]">
              Our mission is to connect creators with inspiring,
              accessible creative spaces. Discover and book studios
              for photography, filmmaking, podcasts, music, and
              art projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-400 transition hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Host Links */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">
              For Hosts
            </h3>

            <ul className="space-y-2">
              {hostLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-400 transition hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">
              Popular Categories
            </h3>

            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 lg:grid-cols-1">
              {categories.map((category) => (
                <li key={category.value}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(
                      category.value
                    )}`}
                    className="text-xs text-gray-400 transition hover:text-orange-400"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-6 grid gap-4 border-t border-white/10 pt-5 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-8">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Stay Inspired
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-400">
              Subscribe for new studios, creative tips, and
              exclusive updates.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <label
              htmlFor="footer-newsletter-email"
              className="sr-only"
            >
              Email address
            </label>

            <input
              id="footer-newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              autoComplete="email"
              maxLength={254}
              required
              disabled={subscribing}
              className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={subscribing}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {subscribing ? (
                <>
                  <span
                    className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    aria-hidden="true"
                  />
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
                  <svg
                    width="15"
                    height="15"
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
        </div>

        {/* Bottom Footer */}
        <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <p className="text-[11px] text-gray-500">
              © 2026 StudioSpace. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/terms"
                className="text-[11px] text-gray-500 transition hover:text-orange-400"
              >
                Terms
              </Link>

              <Link
                href="/privacy"
                className="text-[11px] text-gray-500 transition hover:text-orange-400"
              >
                Privacy
              </Link>

              <Link
                href="/contact"
                className="text-[11px] text-gray-500 transition hover:text-orange-400"
              >
                Support
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={socialClass}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={socialClass}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={socialClass}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.79-1.52 2.98 0 3.58 1.96 3.58 4.5v5.27Z" />
              </svg>
            </a>

            {/* New X Logo */}
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className={socialClass}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.064-6.932Zm-1.29 19.49h2.039L6.486 3.24H4.298l13.313 17.403Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
