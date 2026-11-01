
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

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

export default function StudiosPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Studios");

  const filteredStudios = useMemo(() => {
    return studios.filter((studio) => {
      const matchesCategory =
        selectedCategory === "All Studios" ||
        studio.category === selectedCategory;

      const searchText = search.toLowerCase();

      const matchesSearch =
        studio.title.toLowerCase().includes(searchText) ||
        studio.location.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#faf9f6]">
      {/* Main Container */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">

        {/* Page Heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[2.5px] text-orange-500">
            Discover Your Space
          </p>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Explore Creative Studios
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            Discover inspiring spaces for photography, music,
            podcasting and your next creative project.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mb-7 max-w-xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search studio name or location..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                selectedCategory === category
                  ? "bg-orange-500 text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-orange-400 hover:text-orange-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Available Studios
          </h2>

          <p className="text-xs text-gray-500 sm:text-sm">
            {filteredStudios.length} studios found
          </p>
        </div>

        {/* Studio Cards */}
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <article
                key={studio.id}
                className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100 sm:h-52">
                  <img
                    src={studio.image}
                    alt={studio.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1.5 text-[10px] font-semibold text-orange-600 shadow">
                    {studio.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-gray-500 sm:text-sm">
                      📍 {studio.location}
                    </span>

                    <span className="shrink-0 text-xs font-semibold text-gray-800 sm:text-sm">
                      ⭐ {studio.rating}
                    </span>
                  </div>

                  <h3 className="mb-3 line-clamp-1 text-base font-bold text-gray-900">
                    {studio.title}
                  </h3>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <p className="text-base font-bold text-orange-600">
                      ৳{studio.price}
                      <span className="text-xs font-normal text-gray-500">
                        /hour
                      </span>
                    </p>

                    <Link
                      href={`/studios/${studio.id}`}
                      className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-500 sm:px-4 sm:text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white px-5 py-14 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              No Studios Found
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Try searching with another name or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All Studios");
              }}
              className="mt-5 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
