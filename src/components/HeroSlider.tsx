
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent Swiper hydration issues.
  if (!mounted) {
    return (
      <div className="w-full overflow-hidden bg-white transition-colors duration-300 dark:bg-[#09090f]">
        <div className="mx-auto h-[420px] w-full max-w-[1440px] animate-pulse rounded-2xl bg-gray-100 sm:h-[520px] dark:bg-[#191923]" />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-white text-slate-950 transition-colors duration-300 dark:bg-[#09090f] dark:text-white">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop={true}
        speed={900}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-7 px-4 py-8 sm:gap-9 sm:px-6 sm:py-10 md:px-10 lg:min-h-[calc(100svh-88px)] lg:grid-cols-2 lg:gap-12 lg:px-16 lg:py-8">

              {/* LEFT CONTENT */}
              <div className="w-full min-w-0">

                {/* BADGE */}
                <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 transition-colors dark:border dark:border-orange-500/20 dark:bg-orange-500/10">
                  <span className="shrink-0 text-orange-500 dark:text-orange-400">
                    ✦
                  </span>

                  <span className="text-[11px] font-semibold text-orange-600 sm:text-xs dark:text-orange-400">
                    {slide.badge}
                  </span>
                </div>

                {/* TITLE */}
                <h1 className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-tight text-slate-950 sm:mt-5 sm:text-4xl md:text-[42px] lg:text-[46px] dark:text-white">
                  {slide.title}

                  <span className="block text-orange-500 dark:text-orange-400">
                    {slide.highlight}
                  </span>
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-3 max-w-[500px] text-sm leading-6 text-slate-500 sm:mt-4 sm:leading-7 lg:text-base dark:text-slate-400">
                  {slide.description}
                </p>

                {/* BUTTONS */}
                <div className="mt-5 flex w-full flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:items-center">

                  <Link
                    href="/studios"
                    className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600 sm:px-7 dark:shadow-orange-500/10"
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
                <div className="mt-7 grid max-w-[560px] grid-cols-3 border-t border-gray-200 pt-5 sm:mt-8 dark:border-slate-800">

                  {/* CREATIVE SPACES */}
                  <div className="flex min-w-0 flex-col gap-1 border-r border-gray-200 pr-2 min-[420px]:flex-row min-[420px]:items-center min-[420px]:gap-2 sm:pr-3 dark:border-slate-800">
                    <span className="text-lg text-orange-500 sm:text-xl dark:text-orange-400">
                      ▦
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-base font-extrabold text-slate-950 sm:text-lg dark:text-white">
                        500+
                      </h3>

                      <p className="text-[10px] leading-4 text-slate-500 sm:text-xs dark:text-slate-400">
                        Creative Spaces
                      </p>
                    </div>
                  </div>

                  {/* HAPPY CREATORS */}
                  <div className="flex min-w-0 flex-col items-center gap-1 border-r border-gray-200 px-1 min-[420px]:flex-row min-[420px]:justify-center min-[420px]:gap-2 sm:px-2 dark:border-slate-800">
                    <span className="text-lg text-orange-500 sm:text-xl dark:text-orange-400">
                      ♟
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-base font-extrabold text-slate-950 sm:text-lg dark:text-white">
                        2k+
                      </h3>

                      <p className="text-[10px] leading-4 text-slate-500 sm:text-xs dark:text-slate-400">
                        Happy Creators
                      </p>
                    </div>
                  </div>

                  {/* USER RATING */}
                  <div className="flex min-w-0 flex-col items-end gap-1 pl-2 min-[420px]:flex-row min-[420px]:justify-end min-[420px]:gap-2 sm:pl-3">
                    <span className="text-lg text-orange-500 sm:text-xl dark:text-orange-400">
                      ★
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-base font-extrabold text-slate-950 sm:text-lg dark:text-white">
                        4.9
                      </h3>

                      <p className="text-[10px] leading-4 text-slate-500 sm:text-xs dark:text-slate-400">
                        User Rating
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative mx-auto w-full min-w-0 max-w-[620px] lg:max-w-none">

                {/* DECORATIVE CIRCLES */}
                <div className="absolute -right-2 -top-2 h-20 w-20 rounded-full bg-orange-50 sm:-right-4 sm:-top-4 sm:h-32 sm:w-32 dark:bg-orange-500/10" />

                <div className="absolute -bottom-2 -left-2 h-20 w-20 rounded-full bg-orange-50 sm:-bottom-4 sm:-left-4 sm:h-28 sm:w-28 dark:bg-orange-500/10" />

                {/* IMAGE CONTAINER */}
                <div className="relative h-[260px] w-full overflow-hidden rounded-2xl shadow-xl shadow-slate-200/60 sm:h-[360px] sm:rounded-[26px] md:h-[420px] lg:h-[min(65vh,480px)] dark:shadow-black/40">

                  <Image
                    src={slide.image}
                    alt={slide.studio}
                    fill
                    priority={index === 0}
                    unoptimized={slide.image.startsWith("http")}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />

                  {/* FLOATING STUDIO CARD */}
                  <div className="absolute bottom-3 left-3 right-3 flex min-w-0 items-center gap-2 rounded-xl border border-white/60 bg-white/95 p-2.5 shadow-lg backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:gap-3 sm:p-3 dark:border-slate-700/70 dark:bg-[#191923]/95 dark:shadow-black/30">

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
                      <span className="text-orange-500 dark:text-orange-400">
                        ★
                      </span>{" "}
                      {slide.rating}
                    </div>

                  </div>
                </div>
              </div>

            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
