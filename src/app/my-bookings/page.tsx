
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Booking = {
  id: number;
  studioName: string;
  category: string;
  location: string;
  image: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: "Confirmed" | "Pending" | "Cancelled";
  description: string;
};

const initialBookings: Booking[] = [
  {
    id: 1,
    studioName: "Professional Photography Studio",
    category: "Photo Studios",
    location: "Dhanmondi, Dhaka",
    image:
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800",
    date: "2026-11-05",
    time: "10:00 AM - 12:00 PM",
    duration: 2,
    price: 2400,
    status: "Confirmed",
    description:
      "A professional photography studio with modern lighting and photography equipment.",
  },
  {
    id: 2,
    studioName: "Podcast Recording Studio",
    category: "Podcast Rooms",
    location: "Gulshan, Dhaka",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800",
    date: "2026-11-08",
    time: "02:00 PM - 04:00 PM",
    duration: 2,
    price: 3000,
    status: "Pending",
    description:
      "A comfortable podcast studio with professional microphones and sound equipment.",
  },
  {
    id: 3,
    studioName: "Music Recording Studio",
    category: "Music Suites",
    location: "Banani, Dhaka",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
    date: "2026-10-25",
    time: "11:00 AM - 02:00 PM",
    duration: 3,
    price: 5400,
    status: "Cancelled",
    description:
      "A modern music recording studio for musicians, singers and creators.",
  },
];

const filters = ["All", "Confirmed", "Pending", "Cancelled"];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesFilter =
        filter === "All" || booking.status === filter;

      const matchesSearch =
        booking.studioName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        booking.location
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [bookings, filter, search]);

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  const handleCancel = () => {
    if (cancelId === null) return;

    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === cancelId
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );

    setCancelId(null);
  };

  const statusStyle = (status: Booking["status"]) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
    }
  };

  const formatDate = (date: string) => {
    return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 px-3 py-6 text-gray-900 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">

        {/* Back to Home */}
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-black"
        >
          <span>←</span> Back to Home
        </Link>

        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Your Activity
            </p>

            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              My Bookings
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage and track all your studio reservations.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-fit"
          >
            + Explore Studios
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">
              Total Bookings
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              {bookings.length}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">Confirmed</p>
            <h2 className="mt-2 text-2xl font-bold text-green-600 sm:text-3xl">
              {confirmedCount}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">Pending</p>
            <h2 className="mt-2 text-2xl font-bold text-amber-600 sm:text-3xl">
              {pendingCount}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">Cancelled</p>
            <h2 className="mt-2 text-2xl font-bold text-red-600 sm:text-3xl">
              {cancelledCount}
            </h2>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-5 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search studio or location..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900 lg:max-w-sm"
            />

            <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
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

        {/* Booking List */}
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row">

                  {/* Studio Image */}
                  <div className="relative h-48 w-full shrink-0 sm:h-auto sm:min-h-64 sm:w-56 lg:w-64">
                    <img
                      src={booking.image}
                      alt={booking.studioName}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>

                  {/* Booking Information */}
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

                    {/* Booking Details */}
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-gray-400">
                          Booking Date
                        </p>
                        <p className="mt-1 font-semibold">
                          {formatDate(booking.date)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Booking Time
                        </p>
                        <p className="mt-1 font-semibold">
                          {booking.time}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Duration
                        </p>
                        <p className="mt-1 font-semibold">
                          {booking.duration} Hours
                        </p>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="mt-4 flex flex-col justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-xs text-gray-400">
                          Total Price
                        </p>
                        <p className="mt-1 text-xl font-bold">
                          ৳{booking.price.toLocaleString("en-BD")}
                        </p>
                      </div>

                      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-100 sm:w-auto"
                        >
                          View Details
                        </button>

                        {booking.status !== "Cancelled" && (
                          <button
                            onClick={() => setCancelId(booking.id)}
                            className="w-full rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 sm:w-auto"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
              <div className="mb-3 text-4xl">📅</div>

              <h3 className="text-lg font-bold">
                No bookings found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try another search or explore studios to make a booking.
              </p>

              <Link
                href="/studios"
                className="mt-5 inline-block rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Explore Studios
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-3 py-5 sm:px-4"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="my-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-4 shadow-xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Booking Details
                </p>

                <h2 className="mt-1 break-words text-lg font-bold sm:text-xl">
                  {selectedBooking.studioName}
                </h2>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="shrink-0 rounded-lg px-3 py-1 text-xl text-gray-500 transition hover:bg-gray-100"
                aria-label="Close booking details"
              >
                ×
              </button>
            </div>

            <img
              src={selectedBooking.image}
              alt={selectedBooking.studioName}
              className="mt-5 h-44 w-full rounded-xl object-cover sm:h-48"
            />

            <p className="mt-4 text-sm leading-6 text-gray-600">
              {selectedBooking.description}
            </p>

            <div className="mt-5 space-y-3 rounded-xl bg-gray-50 p-3 text-sm sm:p-4">
              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Booking ID</span>
                <span className="font-semibold">
                  #{selectedBooking.id}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Location</span>
                <span className="text-right font-semibold">
                  {selectedBooking.location}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Date</span>
                <span className="font-semibold">
                  {formatDate(selectedBooking.date)}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Time</span>
                <span className="text-right font-semibold">
                  {selectedBooking.time}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Duration</span>
                <span className="font-semibold">
                  {selectedBooking.duration} Hours
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Status</span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${statusStyle(
                    selectedBooking.status
                  )}`}
                >
                  {selectedBooking.status}
                </span>
              </div>

              <div className="flex justify-between gap-3 border-t border-gray-200 pt-3">
                <span className="font-semibold">Total Price</span>
                <span className="text-lg font-bold">
                  ৳{selectedBooking.price.toLocaleString("en-BD")}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBooking(null)}
              className="mt-5 w-full rounded-lg bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 py-5 sm:px-4"
          onClick={() => setCancelId(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold">
              Cancel this booking?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to cancel this studio booking? This
              action will change its status to Cancelled.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
              <button
                onClick={() => setCancelId(null)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-100 sm:w-auto"
              >
                Keep Booking
              </button>

              <button
                onClick={handleCancel}
                className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
