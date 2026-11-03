
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/Footer";
import ThemeProvider from "../components/ThemeProvider";
import Toaster from "../components/Toaster";

export const metadata: Metadata = {
  title: "StudioSpace",
  description: "Find and book creative studio spaces.",
};

function NavbarFallback() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-12 xl:px-16">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-xl font-black text-white sm:h-11 sm:w-11">
            ◈
          </div>

          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Studio
            <span className="text-orange-500">
              Space
            </span>
          </span>
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="h-9 w-20 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider>
          <Toaster />

          <div className="flex min-h-screen flex-col">
            <Suspense fallback={<NavbarFallback />}>
              <Navbar />
            </Suspense>

            <main className="flex-1 bg-[#f8fafc] transition-colors duration-300 dark:bg-slate-950">
              {children}
            </main>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
