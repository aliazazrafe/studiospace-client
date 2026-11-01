
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type Studio = {
  id: number;
  title: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  status: "Active" | "Pending";
  description: string;
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
    description:
      "A professional photography studio with modern equipment and beautiful lighting facilities.",
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
    description:
      "A comfortable podcast recording space with professional microphones and sound equipment.",
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
    description:
      "A modern music recording studio for musicians, singers and creators.",
  },
];

const categories = [
  "Photo Studios",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
  "Sound Stages",
  "Other",
];

export default function EditStudioPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);
  const studio = initialStudios.find((item) => item.id === id);

  const [title, setTitle] = useState(studio?.title ?? "");
  const [category, setCategory] = useState(studio?.category ?? "Photo Studios");
  const [location, setLocation] = useState(studio?.location ?? "");
  const [price, setPrice] = useState(String(studio?.price ?? ""));
  const [image, setImage] = useState(studio?.image ?? "");
  const [description, setDescription] = useState(
    studio?.description ?? ""
  );
  const [status, setStatus] = useState<"Active" | "Pending">(
    studio?.status ?? "Active"
  );
  const [message, setMessage] = useState("");

  if (!studio) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Studio Not Found
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            The studio you are trying to edit does not exist.
          </p>
          <Link
            href="/my-listings"
            className="mt-5 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Back to My Listings
          </Link>
        </div>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Number(price) <= 0 || !Number.isFinite(Number(price))) {
      setMessage("Please enter a valid hourly price.");
      return;
    }

    // Frontend demo only. Backend update will be connected later.
    setMessage("Your changes are ready. Backend connection is coming next.");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 sm:px-6">
      <div className="mx-auto max-w-4xl">

        {/* Back Button */}
        <Link
          href="/my-listings"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-black"
        >
          ← Back to My Listings
        </Link>

        {/* Page Heading */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Host Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            Edit Studio
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Update your studio information and keep your listing fresh.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* Studio Title */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Studio Name
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter studio name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-900"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="e.g. Dhanmondi, Dhaka"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Price per Hour (৳)
              </label>
              <input
                type="number"
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Enter hourly price"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Listing Status
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "Active" | "Pending")
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-gray-900"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Studio Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                placeholder="Paste your image URL"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
              />

              {image && (
                <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={image}
                    alt="Studio preview"
                    className="h-52 w-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Studio Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                placeholder="Describe your studio and its facilities..."
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900"
              />
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
              {message}
            </div>
          )}

          {/* Buttons */}
          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.push("/my-listings")}
              className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Update Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
