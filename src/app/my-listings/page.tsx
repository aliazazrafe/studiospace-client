
"use client";

import { useState } from "react";
import Link from "next/link";

type Studio = {
  id: number;
  title: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  status: "Active" | "Pending";
};

const initialStudios: Studio[] = [
  {
    id: 1,
    title: "Professional Photography Studio",
    category: "Photo Studios",
    location: "Dhanmondi, Dhaka",
    price: 1200,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=500",
    status: "Active",
  },
  {
    id: 2,
    title: "Podcast Recording Studio",
    category: "Podcast Rooms",
    location: "Gulshan, Dhaka",
    price: 1500,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500",
    status: "Active",
  },
  {
    id: 3,
    title: "Music Recording Studio",
    category: "Music Suites",
    location: "Banani, Dhaka",
    price: 1800,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500",
    status: "Pending",
  },
];

export default function MyListingsPage() {
  const [studios, setStudios] = useState<Studio[]>(initialStudios);
  const [filter, setFilter] = useState("All");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filteredStudios =
    filter === "All"
      ? studios
      : studios.filter((studio) => studio.status === filter);

  const handleDelete = () => {
    if (deleteId === null) return;
    setStudios((prev) => prev.filter((studio) => studio.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-gray-50 px-4 py-4 text-gray-900 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Back to Studios */}
        <div className="mb-3">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-black"
          >
            <span>←</span> Back to Studios
          </Link>
        </div>

        {/* Header */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Host Dashboard
            </p>

            <h1 className="text-2xl font-bold sm:text-3xl">
              My Studio Listings
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your creative spaces.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="shrink-0 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            + Add Studio
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-gray-200 bg-white px-3 py-3">
            <p className="text-xs text-gray-500 sm:text-sm">Total Listings</p>
            <h2 className="mt-1 text-2xl font-bold">{studios.length}</h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white px-3 py-3">
            <p className="text-xs text-gray-500 sm:text-sm">Active</p>
            <h2 className="mt-1 text-2xl font-bold text-green-600">
              {studios.filter((s) => s.status === "Active").length}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white px-3 py-3">
            <p className="text-xs text-gray-500 sm:text-sm">Pending</p>
            <h2 className="mt-1 text-2xl font-bold text-amber-600">
              {studios.filter((s) => s.status === "Pending").length}
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex gap-2">
          {["All", "Active", "Pending"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === item
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Studio Cards */}
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <div
                key={studio.id}
                className="flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="relative min-h-[175px] w-[38%] shrink-0">
                  <img
                    src={studio.image}
                    alt={studio.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-semibold uppercase text-gray-500">
                      {studio.category}
                    </span>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        studio.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {studio.status}
                    </span>
                  </div>

                  <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug">
                    {studio.title}
                  </h3>

                  <p className="mt-2 truncate text-sm text-gray-500">
                    📍 {studio.location}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="text-base font-bold">
                      ৳{studio.price.toLocaleString("en-BD")}
                      <span className="text-xs font-normal text-gray-500">
                        /hr
                      </span>
                    </p>

                    <span className="text-sm font-semibold text-amber-600">
                      ★ {studio.rating}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Link
                      href={`/studios/edit/${studio.id}`}
                      className="rounded-md border border-gray-300 px-3 py-2 text-center text-sm font-semibold transition hover:bg-gray-100"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => setDeleteId(studio.id)}
                      className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <h3 className="text-lg font-bold">No listings found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Add a studio to get started.
            </p>

            <Link
              href="/add-studio"
              className="mt-4 inline-block rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Add Studio
            </Link>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Delete this listing?</h2>

            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete this studio?
            </p>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
