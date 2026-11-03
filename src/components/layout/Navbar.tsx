
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

type AuthUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

type SessionResponse = {
  user?: AuthUser | null;
  session?: {
    id: string;
  } | null;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const checkSession = useCallback(async (signal?: AbortSignal) => {
    setAuthLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/get-session`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          signal,
        }
      );

      if (!response.ok) {
        throw new Error("Session check failed");
      }

      const data: SessionResponse | null =
        await response.json();

      if (!signal?.aborted) {
        setUser(data?.user ?? null);
      }
    } catch (error) {
      if (signal?.aborted) return;

      // Network errors should not be treated as a confirmed logout.
      setUser(null);

      if (error instanceof Error) {
        console.error("Session check:", error.message);
      }
    } finally {
      if (!signal?.aborted) {
        setAuthLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    void checkSession(controller.signal);

    return () => controller.abort();
  }, [pathname, checkSession]);

  useEffect(() => {
    const onFocus = () => {
      void checkSession();
    };

    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, [checkSession]);

  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href ||
        pathname.startsWith(`${href}/`);

  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/sign-out`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error("Sign out failed");
      }

      setUser(null);
      closeMenu();

      toast.success("Signed out successfully!");

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Sign out failed. Please try again.");
    } finally {
      setSigningOut(false);
    }
  };

  const avatarInitial =
    user?.name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 text-slate-900 backdrop-blur-xl transition-colors dark:border-slate-800 dark:bg-slate-950/95 dark:text-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-12 xl:px-16">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-xl font-black text-white sm:h-11 sm:w-11">
            ◈
          </div>

          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Studio
            <span className="text-orange-500">Space</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                isActive(link.href) ? "page" : undefined
              }
              className={`border-b-2 py-2 text-sm font-semibold transition-colors xl:text-base ${
                isActive(link.href)
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-slate-600 hover:text-orange-500 dark:text-slate-300 dark:hover:text-orange-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={isDark ? "Light mode" : "Dark mode"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-lg text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            {mounted ? (isDark ? "☀️" : "🌙") : "🌙"}
          </button>

          {authLoading ? (
            <div className="h-10 w-36 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
          ) : user ? (
            <div className="flex items-center gap-3">

              {/* User Profile */}
              <div className="flex items-center gap-2">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-9 w-9 rounded-full border border-orange-200 object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                    {avatarInitial}
                  </div>
                )}

                <span className="max-w-28 truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {user.name}
                </span>
              </div>

              {/* Sign Out */}
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="rounded-xl border border-orange-200 px-4 py-2.5 text-sm font-semibold text-orange-600 transition hover:bg-orange-50 disabled:opacity-60 dark:border-orange-500/30 dark:text-orange-400 dark:hover:bg-orange-500/10"
              >
                {signingOut ? "Signing Out..." : "Sign Out"}
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-700 transition hover:text-orange-500 dark:text-slate-200 dark:hover:text-orange-400"
              >
                Log In
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Get Started →
              </Link>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">

          <button
            type="button"
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label={
              isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-lg transition hover:bg-orange-50 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            {mounted ? (isDark ? "☀️" : "🌙") : "🌙"}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-2xl text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 shadow-lg dark:border-slate-800 dark:bg-slate-950 lg:hidden"
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={
                  isActive(link.href) ? "page" : undefined
                }
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                    : "text-slate-700 hover:bg-slate-100 hover:text-orange-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-orange-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">

            {authLoading ? (
              <div className="h-10 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
            ) : user ? (
              <>
                {/* Mobile Profile */}
                <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                      {avatarInitial}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="rounded-xl bg-orange-500 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-orange-600 disabled:opacity-60"
                >
                  {signingOut ? "Signing Out..." : "Sign Out"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Log In
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="rounded-xl bg-orange-500 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  Get Started →
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
