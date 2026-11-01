

"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

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

type StudioFormData = {
  title: string;
  category: string;
  location: string;
  price: string;
  capacity: string;
  description: string;
};

export default function AddStudioPage() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<StudioFormData>({
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
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
    setMessage("");
  };

  const toggleAmenity = (amenity: string) => {
    if (isLoading) return;

    setSelectedAmenities((previous) =>
      previous.includes(amenity)
        ? previous.filter((item) => item !== amenity)
        : [...previous, amenity]
    );
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isLoading) return;

    setMessage("");

    if (
      !formData.title.trim() ||
      !formData.category ||
      !formData.location.trim() ||
      !formData.price ||
      !formData.capacity ||
      !formData.description.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const price = Number(formData.price);
    const capacity = Number(formData.capacity);

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    if (!Number.isInteger(capacity) || capacity <= 0) {
      toast.error("Capacity must be a positive whole number.");
      return;
    }

    if (formData.description.trim().length < 20) {
      toast.warning("Description must be at least 20 characters long.");
      return;
    }

    if (imageUrl.trim()) {
      try {
        const url = new URL(imageUrl.trim());

        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("Invalid image URL");
        }
      } catch {
        toast.error("Please enter a valid image URL.");
        return;
      }
    }

    setIsLoading(true);

    try {
      // Demo delay. Replace with a real API request later.
      await new Promise<void>((resolve) =>
        setTimeout(resolve, 1200)
      );

      setMessage(
        "Studio listing is in demo mode. No studio has been saved to the database."
      );

      toast.info("Studio listing is not connected to the backend yet.", {
        description:
          "Your information is ready, but no listing has been created.",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full min-w-0 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gray-50 px-4 py-7 text-gray-900 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-4xl">

        {/* Back Button */}
        <Link
          href="/studios"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-orange-500 sm:mb-6"
        >
          ← Back to Studios
        </Link>

        {/* Page Header */}
        <div className="mb-7 sm:mb-9">
          <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-orange-500 sm:text-sm sm:tracking-[0.2em]">
            Become a Host
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            List Your Creative Studio
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
            Share your creative space with photographers,
            artists, musicians and creators.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:space-y-8 sm:p-6 md:p-8"
        >
          {/* Basic Information */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-5 sm:text-xl">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold"
                >
                  Studio Name *
                </label>

                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  placeholder="e.g. Professional Photography Studio"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold"
                >
                  Category *
                </label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={isLoading}
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
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-semibold"
                >
                  Location *
                </label>

                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* Pricing and Capacity */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-5 sm:text-xl">
              Pricing & Capacity
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold"
                >
                  Price Per Hour (৳) *
                </label>

                <input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  min="1"
                  placeholder="e.g. 1500"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="capacity"
                  className="mb-2 block text-sm font-semibold"
                >
                  Maximum Capacity *
                </label>

                <input
                  id="capacity"
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  min="1"
                  step="1"
                  placeholder="e.g. 10 people"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* Description */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-5 sm:text-xl">
              Studio Description
            </h2>

            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold"
            >
              Tell us about your studio *
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={isLoading}
              required
              rows={5}
              minLength={20}
              placeholder="Describe your studio, facilities, equipment and what makes it special..."
              className={`${inputClass} resize-y`}
            />
          </section>

          <div className="h-px bg-gray-100" />

          {/* Amenities */}
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
                  className={`flex min-w-0 items-center gap-2 rounded-xl border p-3 text-xs font-medium transition sm:text-sm ${
                    isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                  } ${
                    selectedAmenities.includes(amenity)
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-200 text-gray-700 hover:border-orange-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    disabled={isLoading}
                    className="h-4 w-4 shrink-0 accent-orange-500"
                  />

                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </section>

          <div className="h-px bg-gray-100" />

          {/* Image */}
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
              onChange={(e) => {
                setImageUrl(e.target.value);
                setMessage("");
              }}
              disabled={isLoading}
              placeholder="https://example.com/studio-image.jpg"
              aria-label="Studio image URL"
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

          {/* Demo Message */}
          {message && (
            <p
              role="status"
              className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm leading-6 text-gray-700 sm:p-4"
            >
              {message}
            </p>
          )}

          {/* Submit Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end sm:pt-6">
            <Link
              href="/studios"
              className={`rounded-xl border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50 ${
                isLoading ? "pointer-events-none opacity-50" : ""
              }`}
              aria-disabled={isLoading}
              tabIndex={isLoading ? -1 : undefined}
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className="flex items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 sm:px-7"
            >
              {isLoading ? (
                <>
                  <span
                    aria-hidden="true"
                    className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                  />
                  <span>Creating Listing...</span>
                </>
              ) : (
                "Create Studio Listing →"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
