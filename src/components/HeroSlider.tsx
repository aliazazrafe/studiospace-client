
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    badge: "Your Creative Space Starts Here",
    title: "Find Your Perfect",
    highlight: "Creative Space",
    description:
      "Discover and book inspiring studios for photography, music, podcasts, dance and everything creative.",
    image: "/images/hero-studio.jpg",
    floatingImage: "/images/creative-lounge.jpg",
    studio: "Modern Studio",
    location: "Dhaka, Bangladesh",
    rating: "4.9",
  },
  {
    badge: "Create Something Amazing",
    title: "Bring Your Ideas",
    highlight: "To Life",
    description:
      "Explore professional photography and video studios designed to make your creative vision a reality.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    floatingImage: "/images/creative-lounge.jpg",
    studio: "Creative Workspace",
    location: "Dhaka, Bangladesh",
    rating: "4.9",
  },
  {
    badge: "Share Your Creative Space",
    title: "Your Studio,",
    highlight: "Your Opportunity",
    description:
      "List your creative studio, connect with talented creators and earn by sharing your workspace.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=85",
    floatingImage: "/images/creative-lounge.jpg",
    studio: "Music Studio",
    location: "Dhaka, Bangladesh",
    rating: "5.0",
  },
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [paused]);

  const slide = slides[activeSlide];

  return (
    <section
      className="w-full overflow-hidden bg-white text-slate-950 transition-colors duration-300 dark:bg-[#09090f] dark:text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:min-h-[calc(100svh-160px)] lg:grid-cols-2 lg:gap-12">
          {/* LEFT CONTENT */}
          <div className="w-full min-w-0">
            {/* BADGE */}
            <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 dark:border dark:border-orange-500/20 dark:bg-orange-500/10">
              <span className="shrink-0 text-orange-500 dark:text-orange-400">
                ✦
              </span>

              <span className="text-[11px] font-semibold text-orange-600 sm:text-xs dark:text-orange-400">
                {slide.badge}
              </span>
            </div>

            {/* TITLE */}
            <h1 className="mt-5 text-[30px] font-extrabold leading-[1.15] tracking-tight text-slate-950 sm:text-4xl md:text-[42px] lg:text-[46px] dark:text-white">
              {slide.title}
              <span className="mt-1 block text-orange-500 dark:text-orange-400">
                {slide.highlight}
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-4 max-w-[500px] text-sm leading-7 text-slate-500 lg:text-base dark:text-slate-400">
              {slide.description}
            </p>

            {/* BUTTONS */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/studios"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/10 transition hover:bg-orange-600"
              >
                Explore Studios →
              </Link>

              <Link
                href="/add-studio"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-orange-500 hover:text-orange-500 dark:border-slate-700 dark:bg-[#191923] dark:text-slate-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
              >
                Host Your Space
              </Link>
            </div>

            {/* STATISTICS */}
            <div className="mt-8 grid max-w-[560px] grid-cols-3 border-t border-gray-200 pt-5 dark:border-slate-800">
              <div className="flex min-w-0 items-center gap-2 border-r border-gray-200 pr-2 dark:border-slate-800">
                <span className="text-xl text-orange-500">▦</span>
                <div className="min-w-0">
                  <h3 className="text-base font-extrabold sm:text-lg">
                    500+
                  </h3>
                  <p className="text-[10px] text-slate-500 sm:text-xs dark:text-slate-400">
                    Creative Spaces
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-center justify-center gap-2 border-r border-gray-200 px-2 dark:border-slate-800">
                <span className="text-xl text-orange-500">♟</span>
                <div className="min-w-0">
                  <h3 className="text-base font-extrabold sm:text-lg">
                    2k+
                  </h3>
                  <p className="text-[10px] text-slate-500 sm:text-xs dark:text-slate-400">
                    Happy Creators
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-center justify-end gap-2 pl-2">
                <span className="text-xl text-orange-500">★</span>
                <div className="min-w-0">
                  <h3 className="text-base font-extrabold sm:text-lg">
                    4.9
                  </h3>
                  <p className="text-[10px] text-slate-500 sm:text-xs dark:text-slate-400">
                    User Rating
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative mx-auto w-full min-w-0 max-w-[620px] lg:max-w-none">
            {/* DECORATIVE CIRCLES */}
            <div className="absolute -right-2 -top-2 h-20 w-20 rounded-full bg-orange-500/10 sm:h-32 sm:w-32" />
            <div className="absolute -bottom-2 -left-2 h-20 w-20 rounded-full bg-orange-500/10 sm:h-28 sm:w-28" />

            {/* MAIN IMAGE */}
            <div className="relative h-[260px] w-full overflow-hidden rounded-2xl shadow-xl shadow-slate-200/60 sm:h-[360px] sm:rounded-[26px] md:h-[420px] lg:h-[min(65vh,480px)] dark:shadow-black/40">
              <Image
                key={slide.image}
                src={slide.image}
                alt={slide.studio}
                fill
                priority={activeSlide === 0}
                unoptimized={slide.image.startsWith("http")}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {/* FLOATING STUDIO CARD */}
              <div className="absolute bottom-3 left-3 right-3 flex min-w-0 items-center gap-3 rounded-xl border border-white/60 bg-white/95 p-3 shadow-lg backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 dark:border-slate-700/70 dark:bg-[#191923]/95">
                {/* FLOATING IMAGE */}
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full sm:h-12 sm:w-12">
                  <Image
                    src={slide.floatingImage}
                    alt="Creative lounge"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                {/* STUDIO INFO */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-xs font-bold text-slate-950 sm:text-sm dark:text-white">
                    {slide.studio}
                  </h3>

                  <p className="mt-1 truncate text-[10px] text-slate-500 sm:text-xs dark:text-slate-400">
                    📍 {slide.location}
                  </p>
                </div>

                {/* RATING */}
                <div className="shrink-0 text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
                  <span className="text-orange-500">★</span>{" "}
                  {slide.rating}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDER PAGINATION */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((item, index) => (
            <button
              key={item.studio}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "w-7 bg-orange-500"
                  : "w-2.5 bg-orange-500/30 hover:bg-orange-500/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
