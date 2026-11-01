
"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

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
    image:
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=500",
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
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500",
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
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500",
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

// This component reads the dynamic route parameter.
function EditStudioContent() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);
  const studio = initialStudios.find((item) => item.id === id);

  const [title, setTitle] = useState(studio?.title ?? "");
  const [category, setCategory] = useState(
    studio?.category ?? "Photo Studios"
  );
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
  const [isLoading, setIsLoading] = useState(false);

  const inputClass =
    "w-full min-w-0 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-60";

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isLoading || !studio) return;

    setMessage("");

    if (
      !title.trim() ||
      !category ||
      !location.trim() ||
      !price.trim() ||
      !image.trim() ||
      !description.trim()
    ) {
      const error = "Please fill in all required fields.";
      setMessage(error);
      toast.error(error);
      return;
    }

    const hourlyPrice = Number(price);

    if (!Number.isFinite(hourlyPrice) || hourlyPrice <= 0) {
      const error = "Please enter a valid hourly price.";
      setMessage(error);
      toast.error(error);
      return;
    }

    if (description.trim().length < 20) {
      const error = "Description must be at least 20 characters long.";
      setMessage(error);
      toast.warning(error);
      return;
    }

    try {
      const url = new URL(image.trim());

      if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error("Invalid URL protocol");
      }
    } catch {
      const error = "Please enter a valid studio image URL.";
      setMessage(error);
      toast.error(error);
      return;
    }

    setIsLoading(true);

    try {
      // Temporary loading demonstration.
      // Replace this delay with a real update API request later.
      await new Promise<void>((resolve) =>
        setTimeout(resolve, 1200)
      );

      setMessage(
        "Studio update is in demo mode. No changes have been saved to the database."
      );

      toast.info(
        "Studio updates are not connected to the backend yet.",
        {
          description:
            "Your changes have not been saved. Backend integration is coming soon.",
        }
      );
    } catch {
      const error = "Something went wrong. Please try again.";
      setMessage(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!studio) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Studio Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            The studio you are trying to edit does not exist.
          </p>

          <Link
            href="/my-listings"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Back to My Listings
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gray-50 px-3 py-6 text-gray-900 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-4xl">

        {/* Back Button */}
        <Link
          href="/my-listings"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-black"
        >
          ← Back to My Listings
        </Link>

        {/* Page Heading */}
        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 sm:text-sm">
            Host Dashboard
          </p>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            Edit Studio
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
            Update your studio information and keep your listing fresh.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 md:p-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

            {/* Studio Title */}
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold"
              >
                Studio Name *
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setMessage("");
                }}
                disabled={isLoading}
                required
                placeholder="Enter studio name"
                className={inputClass}
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold"
              >
                Category *
              </label>

              <select
                id="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setMessage("");
                }}
                disabled={isLoading}
                required
                className={inputClass}
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
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-semibold"
              >
                Location *
              </label>

              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setMessage("");
                }}
                disabled={isLoading}
                required
                placeholder="e.g. Dhanmondi, Dhaka"
                className={inputClass}
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-semibold"
              >
                Price per Hour (৳) *
              </label>

              <input
                id="price"
                type="number"
                min="1"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setMessage("");
                }}
                disabled={isLoading}
                required
                placeholder="Enter hourly price"
                className={inputClass}
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-semibold"
              >
                Listing Status
              </label>

              <select
                id="status"
                value={status}
                onChange={(e) => {
                  setStatus(
                    e.target.value as "Active" | "Pending"
                  );
                  setMessage("");
                }}
                disabled={isLoading}
                className={inputClass}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold"
              >
                Studio Image URL *
              </label>

              <input
                id="image"
                type="url"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setMessage("");
                }}
                disabled={isLoading}
                required
                placeholder="Paste your image URL"
                className={inputClass}
              />

              {image && (
                <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={image}
                    alt="Studio preview"
                    className="h-44 w-full object-cover sm:h-64"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = "block";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold"
              >
                Studio Description *
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setMessage("");
                }}
                disabled={isLoading}
                required
                minLength={20}
                rows={5}
                placeholder="Describe your studio and its facilities..."
                className={`${inputClass} resize-y`}
              />
            </div>
          </div>

          {/* Demo Message */}
          {message && (
            <div
              role="status"
              className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm leading-6 text-gray-700 sm:p-4"
            >
              {message}
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.push("/my-listings")}
              disabled={isLoading}
              className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className="flex items-center justify-center gap-3 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                  />
                  <span>Updating Studio...</span>
                </>
              ) : (
                "Update Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

// Suspense boundary for Next.js 16 useParams().
export default function EditStudioPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 px-4 py-8">
          <div className="mx-auto max-w-4xl animate-pulse">
            <div className="h-8 w-48 rounded bg-gray-200" />
            <div className="mt-6 h-[480px] rounded-2xl bg-gray-200" />
          </div>
        </main>
      }
    >
      <EditStudioContent />
    </Suspense>
  );
}
