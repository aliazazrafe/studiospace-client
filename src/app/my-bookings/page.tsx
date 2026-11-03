
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { toast } from "sonner";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

type StudioInfo = {
  _id?: string;
  name?: string;
  category?: string;
  location?: string;
  images?: string[];
  image?: string;
  description?: string;
  price?: number;
};

type ApiBooking = {
  _id?: string;
  id?: string;
  studioId?: string | StudioInfo;
  studio?: StudioInfo;
  studioName?: string;
  category?: string;
  location?: string;
  image?: string;
  startAt?: string;
  endAt?: string;
  status?: string;
  totalPrice?: number | null;
  price?: number;
  description?: string;
};

type Booking = {
  id: string;
  studioId: string;
  studioName: string;
  category: string;
  location: string;
  image: string;
  description: string;
  startAt: string;
  endAt: string;
  status: BookingStatus;
  totalPrice: number | null;
};

const filters = [
  "All",
  "Confirmed",
  "Pending",
  "Completed",
  "Cancelled",
] as const;

type Filter = (typeof filters)[number];

function normalizeStatus(value?: string): BookingStatus {
  switch (value?.toLowerCase()) {
    case "confirmed":
      return "Confirmed";
    case "completed":
      return "Completed";
    case "cancelled":
    case "canceled":
      return "Cancelled";
    default:
      return "Pending";
  }
}

function validImageUrl(value: unknown): value is string {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }

  try {
    const url = new URL(value.trim());

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
}

function normalizeBooking(item: ApiBooking): Booking | null {
  const id = item._id ?? item.id;

  if (!id) return null;

  const populatedStudio =
    typeof item.studioId === "object"
      ? item.studioId
      : undefined;

  const studio = item.studio ?? populatedStudio;

  const studioId =
    typeof item.studioId === "string"
      ? item.studioId
      : studio?._id ?? "";

  const imageCandidates = [
    ...(Array.isArray(studio?.images)
      ? studio.images
      : []),
    studio?.image,
    item.image,
  ];

  const image =
    imageCandidates.find(validImageUrl) ?? "";

  const startAt = item.startAt ?? "";
  const endAt = item.endAt ?? "";

  const durationHours =
    (new Date(endAt).getTime() -
      new Date(startAt).getTime()) /
    3600000;

  const totalPrice =
    typeof item.totalPrice === "number" &&
    Number.isFinite(item.totalPrice)
      ? item.totalPrice
      : typeof item.price === "number" &&
          Number.isFinite(item.price) &&
          Number.isFinite(durationHours) &&
          durationHours > 0
        ? Math.round(
            item.price * durationHours * 100
          ) / 100
        : null;

  return {
    id: String(id),
    studioId: String(studioId),
    studioName:
      studio?.name ??
      item.studioName ??
      "Creative Studio",
    category:
      studio?.category ??
      item.category ??
      "Studio",
    location:
      studio?.location ??
      item.location ??
      "Location unavailable",
    image,
    description:
      studio?.description ??
      item.description ??
      "",
    startAt,
    endAt,
    status: normalizeStatus(item.status),
    totalPrice,
  };
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
}

function formatTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  });
}

function formatTimeRange(booking: Booking) {
  return `${formatTime(booking.startAt)} - ${formatTime(
    booking.endAt
  )}`;
}

function getDuration(booking: Booking) {
  const start = new Date(booking.startAt).getTime();
  const end = new Date(booking.endAt).getTime();

  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    end <= start
  ) {
    return null;
  }

  return (end - start) / 3600000;
}

function formatDuration(booking: Booking) {
  const duration = getDuration(booking);

  if (duration === null) return "Not available";

  const rounded = Number(duration.toFixed(2));

  return `${rounded} ${
    rounded === 1 ? "Hour" : "Hours"
  }`;
}

function formatPrice(value: number | null) {
  if (
    value === null ||
    !Number.isFinite(value)
  ) {
    return "Not available";
  }

  return `৳${value.toLocaleString("en-BD")}`;
}

function statusStyle(status: BookingStatus) {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-amber-100 text-amber-700";
    case "Completed":
      return "bg-blue-100 text-blue-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
  }
}

function BookingImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failedUrl, setFailedUrl] = useState<
    string | null
  >(null);

  const showImage =
    validImageUrl(src) && failedUrl !== src;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200 to-orange-100 ${className}`}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailedUrl(src)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-500"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
              />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>

          <span className="max-w-full break-words text-sm font-semibold text-slate-600">
            {alt}
          </span>

          <span className="text-xs text-slate-500">
            Studio image unavailable
          </span>
        </div>
      )}
    </div>
  );
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<
    Booking[]
  >([]);

  const [filter, setFilter] =
    useState<Filter>("All");

  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] = useState("");

  const [reloadKey, setReloadKey] =
    useState(0);

  const [cancelId, setCancelId] = useState<
    string | null
  >(null);

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [isCancelling, setIsCancelling] =
    useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBookings() {
      try {
        const response = await fetch(
          `${API_URL}/api/bookings/my`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
            signal: controller.signal,
          }
        );

        const data = await response
          .json()
          .catch(() => ({}));

        if (
          !response.ok ||
          data.success === false
        ) {
          throw new Error(
            data.message ||
              data.error ||
              `Unable to load bookings (${response.status}).`
          );
        }

        const rawBookings: ApiBooking[] =
          Array.isArray(data)
            ? data
            : Array.isArray(data.bookings)
              ? data.bookings
              : Array.isArray(data.data)
                ? data.data
                : [];

        const normalized = rawBookings
          .map(normalizeBooking)
          .filter(
            (item): item is Booking =>
              item !== null
          );

        if (controller.signal.aborted) return;

        setBookings(normalized);
        setError("");
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load bookings."
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadBookings();

    return () => controller.abort();
  }, [reloadKey]);

  const retry = useCallback(() => {
    setIsLoading(true);
    setError("");
    setReloadKey((previous) => previous + 1);
  }, []);

  const bookingToCancel =
    bookings.find(
      (booking) => booking.id === cancelId
    ) ?? null;

  const filteredBookings = useMemo(() => {
    const searchText = search
      .trim()
      .toLowerCase();

    return bookings.filter((booking) => {
      const matchesFilter =
        filter === "All" ||
        booking.status === filter;

      const matchesSearch =
        booking.studioName
          .toLowerCase()
          .includes(searchText) ||
        booking.location
          .toLowerCase()
          .includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [bookings, filter, search]);

  const confirmedCount = bookings.filter(
    (booking) =>
      booking.status === "Confirmed"
  ).length;

  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const completedCount = bookings.filter(
    (booking) =>
      booking.status === "Completed"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) =>
      booking.status === "Cancelled"
  ).length;

  const closeCancelModal = () => {
    if (isCancelling) return;
    setCancelId(null);
  };

  const handleCancel = async () => {
    if (!bookingToCancel || isCancelling) {
      return;
    }

    if (bookingToCancel.status !== "Pending") {
      toast.error(
        "Only pending bookings can be cancelled."
      );
      setCancelId(null);
      return;
    }

    setIsCancelling(true);

    try {
      const response = await fetch(
        `${API_URL}/api/bookings/${bookingToCancel.id}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response
        .json()
        .catch(() => ({}));

      if (
        !response.ok ||
        data.success === false
      ) {
        throw new Error(
          data.message ||
            data.error ||
            `Unable to cancel booking (${response.status}).`
        );
      }

      const bookingId = bookingToCancel.id;

      setBookings((previous) =>
        previous.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status: "Cancelled",
              }
            : booking
        )
      );

      setSelectedBooking((previous) =>
        previous?.id === bookingId
          ? {
              ...previous,
              status: "Cancelled",
            }
          : previous
      );

      setCancelId(null);

      toast.success(
        "Booking cancelled successfully."
      );
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Unable to cancel booking."
      );
    } finally {
      setIsCancelling(false);
    }
  };

  useEffect(() => {
    if (!cancelId && !selectedBooking) {
      return;
    }

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key !== "Escape") return;

      if (cancelId) {
        if (!isCancelling) {
          setCancelId(null);
        }
      } else {
        setSelectedBooking(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [
    cancelId,
    selectedBooking,
    isCancelling,
  ]);

  return (
    <main className="min-h-screen bg-gray-50 px-3 py-6 text-gray-900 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
        >
          ← Back to Home
        </Link>

        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Your Activity
            </p>

            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              My Bookings
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage and track all your
              studio reservations.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            + Explore Studios
          </Link>
        </div>

        {/* BOOKING STATISTICS */}
        <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
          {[
            {
              label: "Total Bookings",
              count: bookings.length,
              color: "text-gray-900",
            },
            {
              label: "Confirmed",
              count: confirmedCount,
              color: "text-green-600",
            },
            {
              label: "Pending",
              count: pendingCount,
              color: "text-amber-600",
            },
            {
              label: "Completed",
              count: completedCount,
              color: "text-blue-600",
            },
            {
              label: "Cancelled",
              count: cancelledCount,
              color: "text-red-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4"
            >
              <p className="text-xs text-gray-500 sm:text-sm">
                {stat.label}
              </p>

              <h2
                className={`mt-2 text-2xl font-bold sm:text-3xl ${stat.color}`}
              >
                {stat.count}
              </h2>
            </div>
          ))}
        </div>

        {/* SEARCH AND FILTER */}
        <div className="mb-5 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search studio or location..."
              aria-label="Search bookings"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-900 lg:max-w-sm"
            />

            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setFilter(item)
                  }
                  aria-pressed={
                    filter === item
                  }
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                    filter === item
                      ? "bg-gray-900 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-gray-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LOADING / ERROR / BOOKINGS */}
        {isLoading ? (
          <div
            role="status"
            className="space-y-4"
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-xl border border-gray-200 bg-gray-200"
              />
            ))}

            <span className="sr-only">
              Loading bookings...
            </span>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-white px-5 py-12 text-center">
            <h2 className="text-lg font-bold">
              Unable to load your bookings
            </h2>

            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={retry}
              className="mt-5 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.length > 0 ? (
              filteredBookings.map(
                (booking) => (
                  <article
                    key={booking.id}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <BookingImage
                        src={booking.image}
                        alt={
                          booking.studioName
                        }
                        className="h-48 w-full shrink-0 sm:h-auto sm:min-h-64 sm:w-56 lg:w-64"
                      />

                      <div className="min-w-0 flex-1 p-4 sm:p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            {booking.category}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <h2 className="mt-2 break-words text-lg font-bold sm:text-xl">
                          {booking.studioName}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          📍 {booking.location}
                        </p>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                          <div>
                            <p className="text-xs text-gray-400">
                              Booking Date
                            </p>

                            <p className="mt-1 font-semibold">
                              {formatDate(
                                booking.startAt
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-400">
                              Booking Time
                            </p>

                            <p className="mt-1 font-semibold">
                              {formatTimeRange(
                                booking
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-400">
                              Duration
                            </p>

                            <p className="mt-1 font-semibold">
                              {formatDuration(
                                booking
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-col justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center">
                          <div>
                            <p className="text-xs text-gray-400">
                              Total Price
                            </p>

                            <p className="mt-1 text-xl font-bold">
                              {formatPrice(
                                booking.totalPrice
                              )}
                            </p>
                          </div>

                          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedBooking(
                                  booking
                                )
                              }
                              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold hover:bg-gray-100 sm:w-auto"
                            >
                              View Details
                            </button>

                            {booking.status ===
                              "Pending" && (
                              <button
                                type="button"
                                onClick={() =>
                                  setCancelId(
                                    booking.id
                                  )
                                }
                                className="w-full rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 sm:w-auto"
                              >
                                Cancel Booking
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              )
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
                <div className="mb-3 text-4xl">
                  📅
                </div>

                <h3 className="text-lg font-bold">
                  No bookings found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {bookings.length === 0
                    ? "You have not booked any studios yet."
                    : "Try another search or status filter."}
                </p>

                <Link
                  href="/studios"
                  className="mt-5 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Explore Studios
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* BOOKING DETAILS MODAL */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-3 py-5"
          onClick={() =>
            setSelectedBooking(null)
          }
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-details-title"
            className="my-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Booking Details
                </p>

                <h2
                  id="booking-details-title"
                  className="mt-1 text-xl font-bold"
                >
                  {selectedBooking.studioName}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedBooking(null)
                }
                aria-label="Close details"
                className="rounded-lg px-3 py-1 text-xl text-gray-500 hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <BookingImage
              src={selectedBooking.image}
              alt={selectedBooking.studioName}
              className="mt-5 h-48 w-full rounded-xl"
            />

            {selectedBooking.description && (
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {selectedBooking.description}
              </p>
            )}

            <div className="mt-5 space-y-3 rounded-xl bg-gray-50 p-4 text-sm">
              {[
                [
                  "Booking ID",
                  selectedBooking.id,
                ],
                [
                  "Location",
                  selectedBooking.location,
                ],
                [
                  "Date",
                  formatDate(
                    selectedBooking.startAt
                  ),
                ],
                [
                  "Time",
                  formatTimeRange(
                    selectedBooking
                  ),
                ],
                [
                  "Duration",
                  formatDuration(
                    selectedBooking
                  ),
                ],
                [
                  "Status",
                  selectedBooking.status,
                ],
                [
                  "Total Price",
                  formatPrice(
                    selectedBooking.totalPrice
                  ),
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-gray-100 pb-2 last:border-0"
                >
                  <span className="shrink-0 text-gray-500">
                    {label}
                  </span>

                  <span className="break-all text-right font-semibold">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {selectedBooking.studioId &&
              /^[a-f\d]{24}$/i.test(
                selectedBooking.studioId
              ) && (
                <Link
                  href={`/studios/${selectedBooking.studioId}`}
                  className="mt-5 block rounded-lg border border-gray-300 py-3 text-center text-sm font-semibold hover:bg-gray-100"
                >
                  View Studio
                </Link>
              )}

            <button
              type="button"
              onClick={() =>
                setSelectedBooking(null)
              }
              className="mt-3 w-full rounded-lg bg-gray-900 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* CANCEL CONFIRMATION MODAL */}
      {bookingToCancel && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-3 py-5"
          onClick={closeCancelModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-booking-title"
            aria-describedby="cancel-booking-description"
            aria-busy={isCancelling}
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl sm:p-6"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
              !
            </div>

            <h2
              id="cancel-booking-title"
              className="text-lg font-bold"
            >
              Cancel this booking?
            </h2>

            <p
              id="cancel-booking-description"
              className="mt-2 text-sm leading-6 text-gray-500"
            >
              Are you sure you want to cancel
              this booking? This action will
              update its status in the database.
            </p>

            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-bold">
                {bookingToCancel.studioName}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                📅{" "}
                {formatDate(
                  bookingToCancel.startAt
                )}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                🕒{" "}
                {formatTimeRange(
                  bookingToCancel
                )}
              </p>

              <p className="mt-2 text-sm font-semibold">
                {formatPrice(
                  bookingToCancel.totalPrice
                )}
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeCancelModal}
                disabled={isCancelling}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold hover:bg-gray-100 disabled:opacity-50"
              >
                Keep Booking
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={isCancelling}
                className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
              >
                {isCancelling
                  ? "Cancelling..."
                  : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
