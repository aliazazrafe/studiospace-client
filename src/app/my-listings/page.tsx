
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
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
  images?: string[];
  rating?: number;
  status?: string;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  studios?: Studio[];
};

type Filter = "All" | "Active" | "Pending";

const fallbackImages: Record<string, string> = {
  "Photo Studio":
    "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=700",
  "Podcast Room":
    "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=700",
  "Music Suite":
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=700",
  "Art Workshop":
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700",
  "Sound Stage":
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700",
};

const defaultImage =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700";

function getStatus(studio: Studio): "Active" | "Pending" {
  return studio.status?.toLowerCase() === "pending"
    ? "Pending"
    : "Active";
}

function getImage(studio: Studio): string {
  return (
    studio.images?.find(
      (image) => typeof image === "string" && image.trim()
    ) ||
    fallbackImages[studio.category] ||
    defaultImage
  );
}

export default function MyListingsPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [filter, setFilter] = useState<Filter>("All");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudios = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/studios/my-listings`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data: ApiResponse = await response.json().catch(
        () => ({})
      );

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message ||
            data.error ||
            `Failed to load listings (${response.status}).`
        );
      }

      if (!Array.isArray(data.studios)) {
        throw new Error("Unexpected studio listings response.");
      }

      setStudios(data.studios);
      setError("");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to load your studios.";

      setError(message);
      setStudios([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Schedule loading outside the synchronous effect body.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadStudios();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadStudios]);

  // Close delete confirmation with Escape.
  useEffect(() => {
    if (deleteId === null) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && !isDeleting) {
        setDeleteId(null);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [deleteId, isDeleting]);

  const activeCount = studios.filter(
    (studio) => getStatus(studio) === "Active"
  ).length;

  const pendingCount = studios.filter(
    (studio) => getStatus(studio) === "Pending"
  ).length;

  const filteredStudios =
    filter === "All"
      ? studios
      : studios.filter((studio) => getStatus(studio) === filter);

  const selectedStudio =
    studios.find((studio) => studio._id === deleteId) || null;

  const closeDeleteModal = () => {
    if (!isDeleting) {
      setDeleteId(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedStudio || isDeleting) return;

    const studioId = selectedStudio._id;

    setIsDeleting(true);

    try {
      const response = await fetch(
        `${API_URL}/api/studios/${studioId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data: ApiResponse = await response.json().catch(
        () => ({})
      );

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message ||
            data.error ||
            `Failed to delete studio (${response.status}).`
        );
      }

      setStudios((previous) =>
        previous.filter((studio) => studio._id !== studioId)
      );

      setDeleteId(null);
      toast.success("Studio deleted successfully.");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to delete studio.";

      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError("");
    void loadStudios();
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gray-50 px-3 py-5 text-gray-900 sm:px-6 sm:py-7">
      <div className="mx-auto w-full max-w-7xl">
        <Link
          href="/studios"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-black"
        >
          ← Back to Studios
        </Link>

        {/* HEADER */}
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

        {/* STATISTICS */}
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
              {activeCount}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-5">
            <p className="text-xs font-medium text-gray-500 sm:text-sm">
              Pending
            </p>
            <h2 className="mt-2 text-xl font-bold text-amber-600 sm:text-3xl">
              {pendingCount}
            </h2>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {(["All", "Active", "Pending"] as Filter[]).map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === item
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-gray-500"
                }`}
              >
                {item}
                {item === "All" && ` (${studios.length})`}
              </button>
            )
          )}
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />
            <p className="mt-4 text-sm text-gray-500">
              Loading your studio listings...
            </p>
          </div>
        )}

        {/* ERROR */}
        {!isLoading && error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-white px-6 py-12 text-center"
          >
            <h2 className="text-lg font-bold text-gray-900">
              Unable to load your listings
            </h2>
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-5 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* STUDIO CARDS */}
        {!isLoading &&
          !error &&
          filteredStudios.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredStudios.map((studio) => {
                const status = getStatus(studio);

                return (
                  <div
                    key={studio._id}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <Link
                      href={`/studios/${studio._id}`}
                      className="block"
                    >
                      <div className="relative h-44 w-full overflow-hidden sm:h-52 md:h-40">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getImage(studio)}
                          alt={studio.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-300 hover:scale-105"
                        />
                      </div>
                    </Link>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-xs font-semibold uppercase tracking-wide text-gray-500">
                          {studio.category}
                        </span>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                            status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {status}
                        </span>
                      </div>

                      <Link href={`/studios/${studio._id}`}>
                        <h3 className="mt-3 line-clamp-2 text-base font-bold leading-snug hover:text-orange-600 sm:text-lg">
                          {studio.name}
                        </h3>
                      </Link>

                      <p className="mt-2 truncate text-sm text-gray-500">
                        📍 {studio.location}
                      </p>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <p className="text-base font-bold">
                          ৳
                          {Number(studio.price).toLocaleString(
                            "en-BD"
                          )}
                          <span className="ml-1 text-xs font-normal text-gray-500">
                            /hr
                          </span>
                        </p>

                        {typeof studio.rating === "number" && (
                          <span className="text-sm font-semibold text-amber-600">
                            ★ {studio.rating.toFixed(1)}
                          </span>
                        )}
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Link
                          href={`/studios/edit/${studio._id}`}
                          className="rounded-lg border border-gray-300 px-3 py-2.5 text-center text-sm font-semibold transition hover:bg-gray-100"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteId(studio._id)
                          }
                          disabled={isDeleting}
                          className="rounded-lg border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        {/* EMPTY STATE */}
        {!isLoading &&
          !error &&
          filteredStudios.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center sm:py-14">
              <h3 className="text-lg font-bold">
                {studios.length === 0
                  ? "No studio listings yet"
                  : "No listings found"}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {studios.length === 0
                  ? "Add your first studio to get started."
                  : "Try selecting another filter."}
              </p>

              {studios.length === 0 && (
                <Link
                  href="/add-studio"
                  className="mt-5 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Add Studio
                </Link>
              )}
            </div>
          )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {selectedStudio && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-5"
          onClick={closeDeleteModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            aria-describedby="delete-description"
            aria-busy={isDeleting}
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl font-bold text-red-600">
              !
            </div>

            <h2
              id="delete-title"
              className="text-lg font-bold sm:text-xl"
            >
              Delete this listing?
            </h2>

            <p
              id="delete-description"
              className="mt-2 text-sm leading-6 text-gray-500"
            >
              Are you sure you want to permanently delete this studio?
            </p>

            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-bold text-gray-900">
                {selectedStudio.name}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                📍 {selectedStudio.location}
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900">
                ৳
                {Number(selectedStudio.price).toLocaleString(
                  "en-BD"
                )}{" "}
                /hr
              </p>
            </div>

            <p className="mt-3 text-xs leading-5 text-red-600">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-100 disabled:opacity-50 sm:w-auto"
              >
                Keep Studio
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                aria-busy={isDeleting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60 sm:w-auto"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
