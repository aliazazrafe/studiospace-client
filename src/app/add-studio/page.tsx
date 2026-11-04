"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const categories = [
  { label: "Photo Studios", value: "Photo Studio" },
  { label: "Podcast Rooms", value: "Podcast Room" },
  { label: "Music Suites", value: "Music Suite" },
  { label: "Art Workshops", value: "Art Workshop" },
  { label: "Sound Stages", value: "Sound Stage" },
  { label: "Other", value: "Other" },
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
  name: string;
  category: string;
  location: string;
  price: string;
  securityDeposit: string;
  capacity: string;
  description: string;
  imageUrl: string;
};

type SessionResponse = {
  user?: {
    id?: string;
    name?: string;
    email?: string;
  } | null;
} | null;

type ApiResponse = {
  success?: boolean;
  message?: string;
  error?: string;
} | null;

const initialForm: StudioFormData = {
  name: "",
  category: "",
  location: "",
  price: "",
  securityDeposit: "",
  capacity: "",
  description: "",
  imageUrl: "",
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-60 read-only:bg-gray-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-orange-500 dark:focus:ring-orange-500/20 dark:read-only:bg-slate-800";

const labelClass =
  "mb-2 block text-sm font-semibold text-gray-800 dark:text-slate-200";

const helperClass = "text-sm text-gray-500 dark:text-slate-400";

const dividerClass = "h-px bg-gray-100 dark:bg-slate-800";

export default function AddStudioPage() {
  const router = useRouter();

  const [formData, setFormData] = useState(initialForm);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [hostName, setHostName] = useState("");
  const [hostEmail, setHostEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState("");
  const [previewError, setPreviewError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function loadSession() {
      try {
        const response = await fetch(`${API_URL}/api/auth/get-session`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });

        if (response.status === 401) {
          if (active) {
            setIsAuthenticated(false);
            setHostName("");
            setHostEmail("");
          }
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to check login session.");
        }

        const data: SessionResponse = await response.json();

        if (!active) return;

        const user = data?.user;

        if (user?.id) {
          setHostName(user.name || "");
          setHostEmail(user.email || "");
          setIsAuthenticated(true);
        } else {
          setHostName("");
          setHostEmail("");
          setIsAuthenticated(false);
        }
      } catch (error) {
        if (!active || controller.signal.aborted) return;

        setHostName("");
        setHostEmail("");
        setIsAuthenticated(false);
        console.error("Session check failed:", error);
      } finally {
        if (active) {
          setCheckingSession(false);
        }
      }
    }

    void loadSession();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setFilePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(selectedFile);
    setFilePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [selectedFile]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "imageUrl") {
      setPreviewError(false);
    }
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((previous) =>
      previous.includes(amenity)
        ? previous.filter((item) => item !== amenity)
        : [...previous, amenity]
    );
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setPreviewError(false);
    setFilePreview("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a JPG, PNG or WebP image.");
      event.target.value = "";
      setSelectedFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");
      event.target.value = "";
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview("");
    setPreviewError(false);

    const fileInput = document.getElementById(
      "studioImage"
    ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || checkingSession) return;

    if (!isAuthenticated) {
      toast.error("Please sign in before listing a studio.");
      return;
    }

    const name = formData.name.trim();
    const category = formData.category;
    const location = formData.location.trim();
    const description = formData.description.trim();
    const imageUrl = formData.imageUrl.trim();

    if (
      !name ||
      !category ||
      !location ||
      !formData.price ||
      !formData.securityDeposit ||
      !formData.capacity ||
      !description
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const price = Number(formData.price);
    const securityDeposit = Number(formData.securityDeposit);
    const capacity = Number(formData.capacity);

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Hourly price must be greater than zero.");
      return;
    }

    if (!Number.isFinite(securityDeposit) || securityDeposit < 0) {
      toast.error("Security deposit cannot be negative.");
      return;
    }

    if (!Number.isInteger(capacity) || capacity <= 0) {
      toast.error("Capacity must be a positive whole number.");
      return;
    }

    if (description.length < 20) {
      toast.error("Description must contain at least 20 characters.");
      return;
    }

    if (!imageUrl) {
      toast.error(
        "Please provide a public studio image URL before publishing."
      );
      return;
    }

    try {
      const parsedUrl = new URL(imageUrl);

      if (
        parsedUrl.protocol !== "http:" &&
        parsedUrl.protocol !== "https:"
      ) {
        throw new Error("Invalid image URL");
      }
    } catch {
      toast.error("Please provide a valid image URL.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name,
        category,
        location,
        price,
        securityDeposit,
        capacity,
        description,
        amenities: selectedAmenities,
        images: [imageUrl],
      };

      const response = await fetch(`${API_URL}/api/studios`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: ApiResponse = await response.json().catch(() => null);

      if (!response.ok || data?.success === false) {
        throw new Error(
          data?.message ||
            data?.error ||
            `Failed to create studio (${response.status}).`
        );
      }

      toast.success("Studio listing created successfully!");
      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      toast.error(message);
      console.error("Create studio error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 px-4 py-7 text-gray-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-4xl">
        <Link
          href="/studios"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-400"
        >
          ← Back to Studios
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400">
            Become a Host
          </p>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            List Your Creative Studio
          </h1>

          <p className={`mt-3 max-w-2xl leading-7 ${helperClass}`}>
            Share your creative space with photographers, artists,
            musicians and content creators.
          </p>
        </div>

        {!checkingSession && !isAuthenticated && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            You must be signed in to publish a studio.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-7 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7"
        >
          <section>
            <h2 className="mb-5 text-lg font-bold">
              Basic Information
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className={labelClass}>
                  Studio Name *
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Professional Photography Studio"
                  disabled={isLoading}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="category" className={labelClass}>
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
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className={labelClass}>
                  Location *
                </label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Dhanmondi, Dhaka"
                  disabled={isLoading}
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className={dividerClass} />

          <section>
            <h2 className="mb-5 text-lg font-bold">
              Pricing & Capacity
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="price" className={labelClass}>
                  Price Per Hour (৳) *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="1"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="1500"
                  disabled={isLoading}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="securityDeposit" className={labelClass}>
                  Security Deposit (৳) *
                </label>
                <input
                  id="securityDeposit"
                  name="securityDeposit"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  placeholder="2000"
                  disabled={isLoading}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="capacity" className={labelClass}>
                  Maximum Capacity *
                </label>
                <input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="1"
                  step="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="10"
                  disabled={isLoading}
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className={dividerClass} />

          <section>
            <h2 className="mb-2 text-lg font-bold">
              Host Information
            </h2>
            <p className={`mb-5 ${helperClass}`}>
              Your information is loaded automatically from your login
              session.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="hostName" className={labelClass}>
                  Host Name
                </label>
                <input
                  id="hostName"
                  value={checkingSession ? "Checking session..." : hostName}
                  readOnly
                  placeholder="Sign in required"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="hostEmail" className={labelClass}>
                  Host Email
                </label>
                <input
                  id="hostEmail"
                  value={checkingSession ? "Checking session..." : hostEmail}
                  readOnly
                  placeholder="Sign in required"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className={dividerClass} />

          <section>
            <h2 className="mb-5 text-lg font-bold">
              Studio Description
            </h2>
            <label htmlFor="description" className={labelClass}>
              Tell Us About Your Studio *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              minLength={20}
              placeholder="Describe your studio, equipment, facilities and what makes it special..."
              disabled={isLoading}
              required
              className={`${inputClass} resize-y`}
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
              Minimum 20 characters.
            </p>
          </section>

          <div className={dividerClass} />

          <section>
            <h2 className="mb-2 text-lg font-bold">
              Studio Amenities
            </h2>
            <p className={`mb-5 ${helperClass}`}>
              Select the facilities available at your studio.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {availableAmenities.map((amenity) => {
                const selected = selectedAmenities.includes(amenity);

                return (
                  <label
                    key={amenity}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition ${
                      selected
                        ? "border-orange-500 bg-orange-50 text-orange-700 dark:border-orange-500 dark:bg-orange-500/10 dark:text-orange-300"
                        : "border-gray-200 text-gray-700 hover:border-orange-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-orange-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleAmenity(amenity)}
                      disabled={isLoading}
                      className="h-4 w-4 accent-orange-500"
                    />
                    {amenity}
                  </label>
                );
              })}
            </div>
          </section>

          <div className={dividerClass} />

          <section>
            <h2 className="mb-2 text-lg font-bold">
              Studio Image
            </h2>
            <p className={`mb-5 ${helperClass}`}>
              Choose a local image for preview or provide a public URL.
              A public URL is required to publish your studio.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="studioImage" className={labelClass}>
                  Select Image for Preview
                </label>
                <input
                  id="studioImage"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  disabled={isLoading}
                  className="block w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-100 file:px-4 file:py-2 file:font-semibold file:text-orange-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:file:bg-orange-500/15 dark:file:text-orange-400"
                />
                <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
                  JPG, PNG or WebP. Maximum 5 MB.
                </p>
              </div>

              {selectedFile && (
                <>
                  <p className="break-all text-xs text-gray-500 dark:text-slate-400">
                    Selected: {selectedFile.name}
                  </p>
                  <button
                    type="button"
                    onClick={removeFile}
                    disabled={isLoading}
                    className="text-xs font-semibold text-red-500 hover:underline dark:text-red-400"
                  >
                    Remove Selected Image
                  </button>
                </>
              )}

              {selectedFile && filePreview && (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-slate-700 dark:bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={filePreview}
                    alt="Selected studio preview"
                    className="h-48 w-full rounded-lg object-cover sm:h-64"
                  />
                  <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
                    Preview only. This image will not be uploaded.
                  </p>
                </div>
              )}

              <div>
                <label htmlFor="imageUrl" className={labelClass}>
                  Public Studio Image URL *
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/studio.jpg"
                  disabled={isLoading}
                  required
                  className={inputClass}
                />
              </div>

              {!selectedFile &&
                formData.imageUrl.trim() &&
                !previewError && (
                  <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.imageUrl.trim()}
                      alt="Studio image preview"
                      onError={() => setPreviewError(true)}
                      className="h-48 w-full object-cover sm:h-64"
                    />
                  </div>
                )}

              {previewError && (
                <p className="text-sm text-red-500 dark:text-red-400">
                  Image preview could not be loaded.
                </p>
              )}

              <p className="text-xs leading-5 text-amber-700 dark:text-amber-400">
                Image selection provides a local preview only. Use a
                publicly accessible image URL to publish your studio.
              </p>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 dark:border-slate-800 sm:flex-row sm:justify-end">
            <Link
              href="/studios"
              className="rounded-xl border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isLoading || checkingSession || !isAuthenticated}
              aria-busy={isLoading}
              className="flex items-center justify-center rounded-xl bg-orange-500 px-7 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Creating Studio..."
                : checkingSession
                  ? "Checking Login..."
                  : "Create Studio Listing →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
