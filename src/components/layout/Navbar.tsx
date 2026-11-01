
"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:h-20 sm:px-6 md:px-10 lg:h-[88px] lg:px-16">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2 sm:gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-xl font-black text-white sm:h-11 sm:w-11 sm:rounded-xl sm:text-2xl">
            ◈
          </div>

          <span className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Studio<span className="text-orange-500">Space</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-2 text-base font-medium transition hover:text-orange-500 ${
                link.href === "/"
                  ? "border-b-2 border-orange-500 font-semibold text-orange-500"
                  : "text-slate-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/login"
            className="text-base font-semibold text-slate-800 transition hover:text-orange-500"
          >
            Log In
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Get Started →
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-2xl text-slate-800 transition hover:bg-gray-100 lg:hidden"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition hover:bg-orange-50 hover:text-orange-500 ${
                  link.href === "/"
                    ? "bg-orange-50 text-orange-500"
                    : "text-slate-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-3 flex flex-col gap-3 border-t border-gray-100 pt-4">
            <Link
              href="/login"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-gray-100"
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
          </div>
        </div>
      )}
    </header>
  );
}
