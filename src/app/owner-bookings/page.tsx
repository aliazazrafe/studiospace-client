"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

type BookingStatus =
  | "pending"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "completed";

type Booking = {
  _id?: string;
  id?: string;
  studioId?: string;
  studioName?: string;
  category?: string;
  location?: string;
  startAt: string;
  endAt: string;
  price?: number;
  totalPrice?: number | null;
  status: BookingStatus | string;
  studio?: {
    name?: string;
    category?: string;
    location?: string;
    images?: string[];
  };
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  bookings?: Booking[];
};

const filters = ["All", "Pending", "Confirmed", "Rejected", "Cancelled"] as const;
type Filter = (typeof filters)[number];

function getId(booking: Booking): string {
  return booking._id || booking.id || "";
}

function getStatusLabel(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
}

function formatTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  });
}

function formatMoney(value: number | null | undefined): string {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "N/A";
  }

  return `৳${value.toLocaleString("en-BD")}`;
}

function statusClass(status: string): string {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400";
    case "cancelled":
      return "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400";
    case "rejected":
      return "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    case "completed":
      return "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400";
    default:
      return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400";
  }
}

export default function OwnerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<Filter>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/bookings/owner`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data: ApiResponse = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message || data.error || "Unable to load booking requests."
        );
      }

      setBookings(Array.isArray(data.bookings) ? data.bookings : []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load booking requests."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBookings();
  }, [loadBookings]);

  async function confirmBooking(booking: Booking) {
    const id = getId(booking);

    if (!id || booking.status.toLowerCase() !== "pending" || updatingId) {
      return;
    }

    setUpdatingId(id);

    try {
      const response = await fetch(`${API_URL}/api/bookings/${id}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "confirmed" }),
      });

      const data: ApiResponse = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(data.message || data.error || "Unable to confirm booking.");
      }

      setBookings((current) =>
        current.map((item) =>
          getId(item) === id ? { ...item, status: "confirmed" } : item
        )
      );

      toast.success("Booking confirmed successfully.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Unable to confirm booking."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "All") return true;
    return getStatusLabel(booking.status) === filter;
  });

  const pendingCount = bookings.filter(
    (booking) => booking.status.toLowerCase() === "pending"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status.toLowerCase() === "confirmed"
  ).length;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 dark:bg-[#090914] dark:text-white sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/my-listings"
          className="mb-6 inline-flex text-sm font-semibold text-gray-600 hover:text-orange-500 dark:text-gray-300"
        >
          ← Back to My Listings
        </Link>

        <header className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Host Dashboard
          </p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            Booking Requests
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Review bookings made for your studios.
          </p>
        </header>

        <section className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#191923]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pending
            </p>
            <p className="mt-2 text-2xl font-bold text-amber-500">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#191923]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Confirmed
            </p>
            <p className="mt-2 text-2xl font-bold text-green-500">
              {confirmedCount}
            </p>
          </div>
        </section>

        <nav className="mb-5 flex gap-2 overflow-x-auto">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                filter === item
                  ? "bg-orange-500 text-white"
                  : "border border-gray-300 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {isLoading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500 dark:border-gray-800 dark:bg-[#191923]">
            Loading booking requests...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/30">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            <button
              type="button"
              onClick={() => void loadBookings()}
              className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white dark:bg-orange-500"
            >
              Try Again
            </button>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-12 text-center dark:border-gray-800 dark:bg-[#191923]">
            <h2 className="text-lg font-bold">No bookings found</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {bookings.length
                ? "There are no bookings under this status."
                : "You do not have any booking requests yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const id = getId(booking);
              const status = booking.status.toLowerCase();
              const studioName =
                booking.studio?.name || booking.studioName || "Studio";
              const category =
                booking.studio?.category || booking.category || "Studio";
              const location =
                booking.studio?.location || booking.location || "Location unavailable";
              const busy = updatingId === id;

              return (
                <article
                  key={id}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#191923] sm:p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {category}
                      </p>
                      <h2 className="mt-1 text-lg font-bold">{studioName}</h2>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        📍 {location}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                        status
                      )}`}
                    >
                      {getStatusLabel(status)}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-sm dark:border-gray-800 sm:grid-cols-4">
                    <div>
                      <p className="text-xs text-gray-500">Booking Date</p>
                      <p className="mt-1 font-semibold">
                        {formatDate(booking.startAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Start Time</p>
                      <p className="mt-1 font-semibold">
                        {formatTime(booking.startAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">End Time</p>
                      <p className="mt-1 font-semibold">
                        {formatTime(booking.endAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Price</p>
                      <p className="mt-1 font-semibold">
                        {formatMoney(booking.totalPrice ?? booking.price)}
                      </p>
                    </div>
                  </div>

                  {status === "pending" && (
                    <div className="mt-5 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
                      <button
                        type="button"
                        onClick={() => void confirmBooking(booking)}
                        disabled={busy || updatingId !== null}
                        className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {busy ? "Confirming..." : "Confirm Booking"}
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}