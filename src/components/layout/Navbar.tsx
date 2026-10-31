

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-[88px] max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-2xl font-black text-white">
            ◈
          </div>

          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Studio<span className="text-orange-500">Space</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 lg:flex">
          <Link href="/" className="border-b-2 border-orange-500 py-2 text-base font-semibold text-orange-500">
            Home
          </Link>

          <Link href="/studios" className="py-2 text-base font-medium text-slate-700 transition hover:text-orange-500">
            Explore Studios
          </Link>

          <Link href="/about" className="py-2 text-base font-medium text-slate-700 transition hover:text-orange-500">
            About
          </Link>

          <Link href="/contact" className="py-2 text-base font-medium text-slate-700 transition hover:text-orange-500">
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <Link
            href="/login"
            className="hidden text-base font-semibold text-slate-800 transition hover:text-orange-500 sm:block"
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

      </div>
    </header>
  );
}
