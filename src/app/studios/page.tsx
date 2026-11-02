
"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  "All Studios",
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

const studios = [
  {
    id: 1,
    title: "Professional Photography Studio",
    category: "Photo Studios",
    location: "Dhanmondi, Dhaka",
    price: 1200,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Podcast Recording Studio",
    category: "Podcast Rooms",
    location: "Gulshan, Dhaka",
    price: 1500,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Music Recording Studio",
    category: "Music Suites",
    location: "Banani, Dhaka",
    price: 1800,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Creative Workshop Space",
    category: "Art Workshops",
    location: "Uttara, Dhaka",
    price: 1000,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Professional Sound Stage",
    category: "Sound Stages",
    location: "Mohakhali, Dhaka",
    price: 2500,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Modern Photo Studio",
    category: "Photo Studios",
    location: "Mirpur, Dhaka",
    price: 1300,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop",
  },
];

function StudiosPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  const categoryFromUrl = searchParams.get("category");

  const selectedCategory =
    categoryFromUrl && categories.includes(categoryFromUrl)
      ? categoryFromUrl
      : "All Studios";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "All Studios") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    const query = params.toString();

    router.replace(
      query ? `${pathname}?${query}` : pathname,
      { scroll: false }
    );
  };

  const clearFilters = () => {
    setSearch("");
    handleCategoryChange("All Studios");
  };

  const filteredStudios = useMemo(() => {
    return studios.filter((studio) => {
      const matchesCategory =
        selectedCategory === "All Studios" ||
        studio.category === selectedCategory;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        studio.title.toLowerCase().includes(searchText) ||
        studio.location.toLowerCase().includes(searchText) ||
        studio.category.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#faf9f6]">
      <section className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* PAGE HEADING */}
        <div className="mb-7 text-center sm:mb-9">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-orange-500 sm:text-xs sm:tracking-[2.5px]">
            Discover Your Space
          </p>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Explore Creative Studios
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
            Discover inspiring spaces for photography, music,
            podcasting and your next creative project.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mx-auto mb-6 w-full max-w-xl sm:mb-7">
          <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 shadow-sm transition focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 sm:rounded-full sm:px-4">
            <span className="text-lg text-gray-400">⌕</span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search studio name or location..."
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:py-3.5"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="shrink-0 px-2 text-sm font-semibold text-gray-400 hover:text-orange-500"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="mb-7 sm:mb-8">
          <div className="flex gap-2 overflow-x-auto pb-3 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                aria-pressed={selectedCategory === category}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition sm:px-5 sm:py-2.5 sm:text-sm ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-700 hover:border-orange-400 hover:text-orange-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-bold text-gray-900 sm:text-lg">
            Available Studios
          </h2>

          <p className="text-xs text-gray-500 sm:text-sm">
            {filteredStudios.length} studios found
          </p>
        </div>

        {/* STUDIO CARDS */}
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {filteredStudios.map((studio) => (
              <article
                key={studio.id}
                className="group min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden bg-gray-100 sm:h-48 md:h-52">
                  <img
                    src={studio.image}
                    alt={studio.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 max-w-[85%] truncate rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-orange-600 shadow sm:text-xs">
                    {studio.category}
                  </span>
                </div>

                {/* CARD CONTENT */}
                <div className="p-4 sm:p-4 md:p-5">
                  <div className="mb-2 flex min-w-0 items-center justify-between gap-2">
                    <span className="min-w-0 truncate text-xs text-gray-500 sm:text-sm">
                      📍 {studio.location}
                    </span>

                    <span className="shrink-0 text-xs font-semibold text-gray-800 sm:text-sm">
                      ⭐ {studio.rating}
                    </span>
                  </div>

                  <h3 className="mb-3 line-clamp-1 text-base font-bold text-gray-900 sm:text-lg">
                    {studio.title}
                  </h3>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
                    <p className="text-base font-bold text-orange-600 sm:text-lg">
                      ৳{studio.price}
                      <span className="text-xs font-normal text-gray-500 sm:text-sm">
                        /hour
                      </span>
                    </p>

                    <Link
                      href={`/studios/${studio.id}`}
                      className="rounded-lg bg-gray-900 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-500 sm:px-4 sm:text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="rounded-xl bg-white px-4 py-12 text-center shadow-sm sm:px-5 sm:py-14">
            <div className="mb-3 text-4xl">🔍</div>

            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              No Studios Found
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Try searching with another name or category.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#faf9f6] px-4 py-16 text-center text-sm text-gray-600">
          Loading studios...
        </main>
      }
    >
      <StudiosPageContent />
    </Suspense>
  );
}
