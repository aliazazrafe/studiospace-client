
"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  "Photo Studios",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
  "Sound Stages",
  "Other",
];

const availableAmenities = [
  "Wi-Fi",
  "Air Conditioning",
  "Parking",
  "Lighting Equipment",
  "Soundproof",
  "Restroom",
  "Photography Equipment",
  "Waiting Area",
];

export default function AddStudioPage() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    price: "",
    capacity: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("Your studio information is ready! Backend connection is coming next.");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 text-gray-900">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/studios"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
        >
          ← Back to Studios
        </Link>

        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Become a Host
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            List Your Creative Studio
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Share your creative space with photographers, artists,
            musicians and creators.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
        >
          {/* Basic Information */}
          <section>
            <h2 className="mb-5 text-xl font-semibold">
              Basic Information
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Studio Name *
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Professional Photography Studio"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Location *
                </label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* Pricing and Capacity */}
          <section>
            <h2 className="mb-5 text-xl font-semibold">
              Pricing & Capacity
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Price Per Hour (৳) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="e.g. 1500"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Maximum Capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="e.g. 10 people"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* Description */}
          <section>
            <h2 className="mb-5 text-xl font-semibold">
              Studio Description
            </h2>

            <label className="mb-2 block text-sm font-medium">
              Tell us about your studio *
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              minLength={20}
              placeholder="Describe your studio, facilities, equipment and what makes it special..."
              className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </section>

          <div className="h-px bg-gray-100" />

          {/* Amenities */}
          <section>
            <h2 className="mb-2 text-xl font-semibold">
              Studio Amenities
            </h2>

            <p className="mb-5 text-sm text-gray-500">
              Select everything available in your studio.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {availableAmenities.map((amenity) => (
                <label
                  key={amenity}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm transition ${
                    selectedAmenities.includes(amenity)
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="accent-indigo-600"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* Image */}
          <section>
            <h2 className="mb-2 text-xl font-semibold">
              Studio Image
            </h2>

            <p className="mb-5 text-sm text-gray-500">
              Add a public image URL of your studio.
            </p>

            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/studio-image.jpg"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
            />

            {imageUrl && (
              <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                <img
                  src={imageUrl}
                  alt="Studio preview"
                  className="h-56 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </section>

          {message && (
            <p
              role="status"
              className="rounded-xl bg-green-50 p-4 text-sm text-green-700"
            >
              {message}
            </p>
          )}

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/studios"
              className="rounded-xl border border-gray-300 px-6 py-3 text-center font-medium transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Create Studio Listing →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
