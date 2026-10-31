
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[calc(100svh-88px)] overflow-hidden bg-white">

      <section className="mx-auto grid min-h-[calc(100svh-88px)] max-w-[1440px] grid-cols-1 items-center gap-8 px-6 py-8 sm:px-10 lg:grid-cols-2 lg:gap-12 lg:px-16 lg:py-6">

        {/* LEFT CONTENT */}
        <div className="w-full">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5">
            <span className="text-orange-500">✦</span>
            <span className="text-xs font-semibold text-orange-600">
              Your Creative Space Starts Here
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-950 sm:text-4xl lg:text-[46px]">
            Find Your Perfect
            <span className="block text-orange-500">
              Creative Space
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-[500px] text-sm leading-7 text-slate-500 lg:text-base">
            Discover and book inspiring studios for photography,
            music, podcasts, dance and everything creative.
          </p>

          {/* Search */}
          <form
            action="/studios"
            className="mt-5 flex max-w-[560px] items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm"
          >
            <span className="pl-4 text-lg text-slate-500">⌕</span>

            <input
              type="text"
              name="search"
              placeholder="Search studios..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />

            <button
              type="submit"
              className="rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Search
            </button>
          </form>

          {/* Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-3">

            <Link
              href="/studios"
              className="rounded-full bg-orange-500 px-7 py-3 text-sm font-bold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600"
            >
              Explore Studios →
            </Link>

            <button
              type="button"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-orange-500 hover:text-orange-500"
            >
              ▶ Watch Video
            </button>

          </div>

          {/* Statistics */}
          <div className="mt-8 grid max-w-[560px] grid-cols-3 border-t border-gray-200 pt-5">

            <div className="flex items-center gap-2 border-r border-gray-200 pr-2">
              <span className="text-xl text-orange-500">▦</span>
              <div>
                <h3 className="text-lg font-extrabold text-slate-950">500+</h3>
                <p className="text-xs text-slate-500">Creative Spaces</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 border-r border-gray-200 px-2">
              <span className="text-xl text-orange-500">♟</span>
              <div>
                <h3 className="text-lg font-extrabold text-slate-950">2k+</h3>
                <p className="text-xs text-slate-500">Happy Creators</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pl-2">
              <span className="text-xl text-orange-500">★</span>
              <div>
                <h3 className="text-lg font-extrabold text-slate-950">4.9</h3>
                <p className="text-xs text-slate-500">User Rating</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative mx-auto w-full max-w-[620px] lg:max-w-none">

          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-orange-50"></div>
          <div className="absolute -bottom-4 -left-4 h-28 w-28 rounded-full bg-orange-50"></div>

          <div className="relative h-[320px] w-full overflow-hidden rounded-[26px] shadow-xl sm:h-[400px] lg:h-[min(65vh,480px)]">

            <Image
              src="/images/hero-studio.jpg"
              alt="Modern creative studio"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            {/* Floating Card */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl bg-white/95 p-3 shadow-lg backdrop-blur-sm">

              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/images/creative-lounge.jpg"
                  alt="Creative lounge"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-slate-950">
                  Modern Studio
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  📍 Dhaka, Bangladesh
                </p>
              </div>

              <div className="text-sm font-bold text-slate-900">
                <span className="text-orange-500">★</span> 4.9
              </div>

            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
