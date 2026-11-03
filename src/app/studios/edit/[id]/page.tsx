
"use client";

import {
  Suspense,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

type Studio = {
  _id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  description: string;
  images?: string[];
  securityDeposit?: number;
  capacity?: number | null;
  amenities?: string[];
  ownerName?: string;
  ownerEmail?: string;
  status?: string;
};

type StudioResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  studio?: Studio;
};

type StudioForm = {
  name: string;
  category: string;
  location: string;
  price: string;
  securityDeposit: string;
  capacity: string;
  image: string;
  description: string;
  amenities: string;
};

const categories = [
  "Photo Studio",
  "Podcast Room",
  "Music Suite",
  "Art Workshop",
  "Sound Stage",
  "Other",
];

const inputClass =
  "w-full min-w-0 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-60";

function createForm(studio: Studio): StudioForm {
  return {
    name: studio.name ?? "",
    category: studio.category ?? "",
    location: studio.location ?? "",
    price: String(studio.price ?? ""),
    securityDeposit: String(studio.securityDeposit ?? 0),
    capacity:
      studio.capacity == null ? "" : String(studio.capacity),
    image: studio.images?.[0] ?? "",
    description: studio.description ?? "",
    amenities: (studio.amenities ?? []).join(", "),
  };
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function EditStudioContent() {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [form, setForm] = useState<StudioForm | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStudio() {
      try {
        if (!id || !/^[a-f\d]{24}$/i.test(id)) {
          throw new Error("Invalid studio ID.");
        }

        const response = await fetch(
          `${API_URL}/api/studios/${id}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
            signal: controller.signal,
          }
        );

        const data: StudioResponse = await response
          .json()
          .catch(() => ({}));

        if (!response.ok || data.success === false) {
          throw new Error(
            data.message ||
              data.error ||
              "Failed to load studio."
          );
        }

        if (!data.studio) {
          throw new Error("Studio not found.");
        }

        if (controller.signal.aborted) return;

        setStudio(data.studio);
        setForm(createForm(data.studio));
        setError("");
        setIsLoading(false);
      } catch (err) {
        if (controller.signal.aborted) return;

        const errorMessage =
          err instanceof Error
            ? err.message
            : "Unable to load studio.";

        setError(errorMessage);
        setIsLoading(false);
      }
    }

    void loadStudio();

    return () => {
      controller.abort();
    };
  }, [id]);

  const updateField = (field: keyof StudioForm, value: string) => {
    setForm((previous) =>
      previous
        ? {
            ...previous,
            [field]: value,
          }
        : previous
    );

    setMessage("");

    if (field === "image") {
      setImageError(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!studio || !form || isSaving) return;

    setMessage("");

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.location.trim() ||
      !form.price.trim() ||
      !form.description.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const price = Number(form.price);
    const securityDeposit = Number(form.securityDeposit || "0");
    const capacity = Number(form.capacity);

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Enter a valid hourly price.");
      return;
    }

    if (
      !Number.isFinite(securityDeposit) ||
      securityDeposit < 0
    ) {
      toast.error("Enter a valid security deposit.");
      return;
    }

    if (
      !form.capacity.trim() ||
      !Number.isSafeInteger(capacity) ||
      capacity <= 0
    ) {
      toast.error("Capacity must be a positive whole number.");
      return;
    }

    if (form.description.trim().length < 20) {
      toast.error("Description must be at least 20 characters.");
      return;
    }

    if (
      form.image.trim() &&
      !isValidHttpUrl(form.image.trim())
    ) {
      toast.error("Enter a valid public image URL.");
      return;
    }

    const amenities = Array.from(
      new Set(
        form.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      )
    );

    const images = form.image.trim()
      ? [
          form.image.trim(),
          ...(studio.images ?? []).slice(1),
        ]
      : (studio.images ?? []).slice(1);

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      location: form.location.trim(),
      price,
      securityDeposit,
      capacity,
      amenities,
      images,
      description: form.description.trim(),
    };

    setIsSaving(true);

    try {
      const response = await fetch(
        `${API_URL}/api/studios/${studio._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data: StudioResponse = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message ||
            data.error ||
            `Failed to update studio (${response.status}).`
        );
      }

      toast.success("Studio updated successfully!");

      router.push("/my-listings");
      router.refresh();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to update studio.";

      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="h-7 w-44 rounded bg-gray-200" />
          <div className="mt-8 h-12 w-64 rounded bg-gray-200" />
          <div className="mt-6 h-[500px] rounded-2xl bg-gray-200" />
        </div>
      </main>
    );
  }

  if (error || !studio || !form) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Unable to Edit Studio
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {error || "Studio not found."}
          </p>

          <Link
            href="/my-listings"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
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
        <Link
          href="/my-listings"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
        >
          ← Back to My Listings
        </Link>

        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Host Dashboard
          </p>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            Edit Studio
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update your studio information and keep your listing fresh.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 md:p-8"
        >
          {/* BASIC INFORMATION */}
          <section>
            <h2 className="mb-5 text-lg font-bold">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Studio Name *
                </label>

                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  disabled={isSaving}
                  required
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
                  value={form.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  disabled={isSaving}
                  required
                  className={inputClass}
                >
                  {!categories.includes(form.category) && (
                    <option value={form.category}>
                      {form.category}
                    </option>
                  )}

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
                  type="text"
                  value={form.location}
                  onChange={(event) =>
                    updateField("location", event.target.value)
                  }
                  disabled={isSaving}
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className="my-7 border-t border-gray-100" />

          {/* PRICING */}
          <section>
            <h2 className="mb-5 text-lg font-bold">
              Pricing & Capacity
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                  min="1"
                  step="any"
                  value={form.price}
                  onChange={(event) =>
                    updateField("price", event.target.value)
                  }
                  disabled={isSaving}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="securityDeposit"
                  className="mb-2 block text-sm font-semibold"
                >
                  Security Deposit (৳) *
                </label>

                <input
                  id="securityDeposit"
                  type="number"
                  min="0"
                  step="any"
                  value={form.securityDeposit}
                  onChange={(event) =>
                    updateField(
                      "securityDeposit",
                      event.target.value
                    )
                  }
                  disabled={isSaving}
                  required
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
                  min="1"
                  step="1"
                  value={form.capacity}
                  onChange={(event) =>
                    updateField("capacity", event.target.value)
                  }
                  disabled={isSaving}
                  required
                  placeholder="e.g. 10"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className="my-7 border-t border-gray-100" />

          {/* AMENITIES */}
          <section>
            <h2 className="mb-5 text-lg font-bold">
              Studio Amenities
            </h2>

            <label
              htmlFor="amenities"
              className="mb-2 block text-sm font-semibold"
            >
              Available Amenities
            </label>

            <input
              id="amenities"
              type="text"
              value={form.amenities}
              onChange={(event) =>
                updateField("amenities", event.target.value)
              }
              disabled={isSaving}
              placeholder="Wi-Fi, Air Conditioning, Lighting, Parking"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-gray-500">
              Separate each amenity with a comma.
            </p>
          </section>

          <div className="my-7 border-t border-gray-100" />

          {/* IMAGE */}
          <section>
            <h2 className="mb-5 text-lg font-bold">
              Studio Image
            </h2>

            <label
              htmlFor="image"
              className="mb-2 block text-sm font-semibold"
            >
              Public Studio Image URL
            </label>

            <input
              id="image"
              type="url"
              value={form.image}
              onChange={(event) =>
                updateField("image", event.target.value)
              }
              disabled={isSaving}
              placeholder="https://example.com/studio.jpg"
              className={inputClass}
            />

            {form.image.trim() &&
              isValidHttpUrl(form.image.trim()) &&
              !imageError && (
                <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={form.image}
                    src={form.image}
                    alt="Studio preview"
                    className="h-52 w-full object-cover sm:h-64"
                    onError={() => setImageError(true)}
                  />
                </div>
              )}

            {imageError && (
              <p className="mt-3 text-sm text-red-600">
                Image preview could not be loaded. Check the URL.
              </p>
            )}
          </section>

          <div className="my-7 border-t border-gray-100" />

          {/* DESCRIPTION */}
          <section>
            <h2 className="mb-5 text-lg font-bold">
              Studio Overview
            </h2>

            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold"
            >
              Detailed Description *
            </label>

            <textarea
              id="description"
              rows={6}
              minLength={20}
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              disabled={isSaving}
              required
              className={`${inputClass} resize-y`}
            />
          </section>

          <div className="my-7 border-t border-gray-100" />

          {/* OWNER INFORMATION */}
          <section>
            <h2 className="mb-5 text-lg font-bold">
              Host Information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="ownerName"
                  className="mb-2 block text-sm font-semibold"
                >
                  Host Name
                </label>

                <input
                  id="ownerName"
                  type="text"
                  value={studio.ownerName ?? ""}
                  readOnly
                  className={`${inputClass} bg-gray-50`}
                />
              </div>

              <div>
                <label
                  htmlFor="ownerEmail"
                  className="mb-2 block text-sm font-semibold"
                >
                  Host Email
                </label>

                <input
                  id="ownerEmail"
                  type="email"
                  value={studio.ownerEmail ?? ""}
                  readOnly
                  className={`${inputClass} bg-gray-50`}
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Host information cannot be changed from this form.
            </p>
          </section>

          {/* ERROR */}
          {message && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {message}
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.push("/my-listings")}
              disabled={isSaving}
              className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              aria-busy={isSaving}
              className="flex items-center justify-center gap-3 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Updating Studio...
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
