
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

    setMessage(
      "Your studio information is ready! Backend connection is coming next."
    );
  };

  const inputClass =
    "w-full min-w-0 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gray-50 px-4 py-7 text-gray-900 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-4xl">

        {/* BACK BUTTON */}
        <Link
          href="/studios"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-orange-500 sm:mb-6"
        >
          ← Back to Studios
        </Link>

        {/* PAGE HEADER */}
        <div className="mb-7 sm:mb-9">
          <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-orange-500 sm:text-sm sm:tracking-[0.2em]">
            Become a Host
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            List Your Creative Studio
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
            Share your creative space with photographers, artists,
            musicians and creators.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:space-y-8 sm:p-6 md:p-8"
        >

          {/* BASIC INFORMATION */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-5 sm:text-xl">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold">
                  Studio Name *
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Professional Photography Studio"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Category *
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className={inputClass}
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
                <label className="mb-2 block text-sm font-semibold">
                  Location *
                </label>

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* PRICING AND CAPACITY */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-5 sm:text-xl">
              Pricing & Capacity
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <div>
                <label className="mb-2 block text-sm font-semibold">
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
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
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
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* DESCRIPTION */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-5 sm:text-xl">
              Studio Description
            </h2>

            <label className="mb-2 block text-sm font-semibold">
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
              className={`${inputClass} resize-y`}
            />
          </section>

          <div className="h-px bg-gray-100" />

          {/* AMENITIES */}
          <section>
            <h2 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">
              Studio Amenities
            </h2>

            <p className="mb-4 text-xs leading-5 text-gray-500 sm:mb-5 sm:text-sm">
              Select everything available in your studio.
            </p>

            <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:grid-cols-3 sm:gap-3">
              {availableAmenities.map((amenity) => (
                <label
                  key={amenity}
                  className={`flex min-w-0 cursor-pointer items-center gap-2 rounded-xl border p-3 text-xs font-medium transition sm:text-sm ${
                    selectedAmenities.includes(amenity)
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-200 text-gray-700 hover:border-orange-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="h-4 w-4 shrink-0 accent-orange-500"
                  />

                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* IMAGE */}
          <section>
            <h2 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">
              Studio Image
            </h2>

            <p className="mb-4 text-xs leading-5 text-gray-500 sm:mb-5 sm:text-sm">
              Add a public image URL of your studio.
            </p>

            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/studio-image.jpg"
              className={inputClass}
            />

            {imageUrl && (
              <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                <img
                  src={imageUrl}
                  alt="Studio preview"
                  className="h-48 w-full object-cover sm:h-64"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = "block";
                  }}
                />
              </div>
            )}
          </section>

          {/* SUCCESS MESSAGE */}
          {message && (
            <p
              role="status"
              className="rounded-xl bg-green-50 p-3 text-sm leading-6 text-green-700 sm:p-4"
            >
              {message}
            </p>
          )}

          {/* SUBMIT BUTTONS */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end sm:pt-6">
            <Link
              href="/studios"
              className="rounded-xl border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600 sm:px-7"
            >
              Create Studio Listing →
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
