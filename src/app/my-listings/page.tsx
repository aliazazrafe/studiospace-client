
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
    image:
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=500",
    status: "Active",
  },
  {
    id: 2,
    title: "Podcast Recording Studio",
    category: "Podcast Rooms",
    location: "Gulshan, Dhaka",
    price: 1500,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500",
    status: "Active",
  },
  {
    id: 3,
    title: "Music Recording Studio",
    category: "Music Suites",
    location: "Banani, Dhaka",
    price: 1800,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500",
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

    setStudios((prev) =>
      prev.filter((studio) => studio.id !== deleteId)
    );

    setDeleteId(null);
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gray-50 px-3 py-5 text-gray-900 sm:px-6 sm:py-7">
      <div className="mx-auto w-full max-w-7xl">

        {/* Back to Studios */}
        <Link
          href="/studios"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-black"
        >
          ← Back to Studios
        </Link>

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 sm:text-sm">
              Host Dashboard
            </p>

            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              My Studio Listings
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Manage your creative spaces.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex w-fit items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            + Add Studio
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-3 gap-2 sm:gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-5">
            <p className="text-xs font-medium text-gray-500 sm:text-sm">
              Total Listings
            </p>

            <h2 className="mt-2 text-xl font-bold sm:text-3xl">
              {studios.length}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-5">
            <p className="text-xs font-medium text-gray-500 sm:text-sm">
              Active
            </p>

            <h2 className="mt-2 text-xl font-bold text-green-600 sm:text-3xl">
              {studios.filter((s) => s.status === "Active").length}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-5">
            <p className="text-xs font-medium text-gray-500 sm:text-sm">
              Pending
            </p>

            <h2 className="mt-2 text-xl font-bold text-amber-600 sm:text-3xl">
              {studios.filter((s) => s.status === "Pending").length}
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {["All", "Active", "Pending"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === item
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-500"
              }`}
            >
              {item}
              {item === "All" && ` (${studios.length})`}
            </button>
          ))}
        </div>

        {/* Studio Cards */}
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredStudios.map((studio) => (
              <div
                key={studio.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Studio Image */}
                <div className="relative h-44 w-full sm:h-52 md:h-40">
                  <img
                    src={studio.image}
                    alt={studio.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Studio Information */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {studio.category}
                    </span>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        studio.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {studio.status}
                    </span>
                  </div>

                  <h3 className="mt-3 line-clamp-2 text-base font-bold leading-snug sm:text-lg">
                    {studio.title}
                  </h3>

                  <p className="mt-2 truncate text-sm text-gray-500">
                    📍 {studio.location}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <p className="text-base font-bold">
                      ৳{studio.price.toLocaleString("en-BD")}
                      <span className="ml-1 text-xs font-normal text-gray-500">
                        /hr
                      </span>
                    </p>

                    <span className="text-sm font-semibold text-amber-600">
                      ★ {studio.rating}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                      href={`/studios/edit/${studio.id}`}
                      className="rounded-lg border border-gray-300 px-3 py-2.5 text-center text-sm font-semibold transition hover:bg-gray-100"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => setDeleteId(studio.id)}
                      className="rounded-lg border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center sm:py-14">
            <h3 className="text-lg font-bold">
              No listings found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Add a studio to get started.
            </p>

            <Link
              href="/add-studio"
              className="mt-5 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Add Studio
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-5">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl sm:p-6"
          >
            <h2
              id="delete-title"
              className="text-lg font-bold sm:text-xl"
            >
              Delete this listing?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete this studio?
              This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
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
