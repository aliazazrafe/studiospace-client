
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type BookingModalProps = {
  studioId: string;
  studioName: string;
  hourlyRate: number;
  securityDeposit?: number;
};

type BookingResponse = {
  success?: boolean;
  message?: string;
};

function getLocalDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function calculateMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function createBookingDateTime(date: string, time: string) {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

export default function BookingModal({
  studioId,
  studioName,
  hourlyRate,
  securityDeposit,
}: BookingModalProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [today, setToday] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen || isSubmitting) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isSubmitting]);

  const durationMinutes =
    startTime && endTime
      ? calculateMinutes(endTime) - calculateMinutes(startTime)
      : 0;

  const totalHours =
    durationMinutes > 0 ? durationMinutes / 60 : 0;

  const rentalPrice = totalHours * hourlyRate;

  const deposit =
    typeof securityDeposit === "number"
      ? securityDeposit
      : 0;

  const estimatedTotal = rentalPrice + deposit;

  const openModal = () => {
    setDate("");
    setStartTime("");
    setEndTime("");
    setToday(getLocalDate());
    setIsOpen(true);
  };

  const closeModal = () => {
    if (!isSubmitting) {
      setIsOpen(false);
    }
  };

  const handleBooking = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!date || !startTime || !endTime) {
      toast.error("Please fill in all booking details.");
      return;
    }

    if (date < getLocalDate()) {
      toast.error("Please select a valid booking date.");
      return;
    }

    if (durationMinutes <= 0) {
      toast.error("End time must be after start time.");
      return;
    }

    const startDate = createBookingDateTime(date, startTime);
    const endDate = createBookingDateTime(date, endTime);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime())
    ) {
      toast.error("Invalid booking date or time.");
      return;
    }

    if (startDate <= new Date()) {
      toast.error("Please select a future start time.");
      return;
    }

    if (endDate <= startDate) {
      toast.error("End time must be after start time.");
      return;
    }

    if (!studioId) {
      toast.error("Studio ID is missing.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      toast.error("Backend API URL is not configured.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${apiUrl.replace(/\/$/, "")}/api/bookings`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studioId,
            startAt: startDate.toISOString(),
            endAt: endDate.toISOString(),
          }),
        }
      );

      const data: BookingResponse = await response.json();

      if (!response.ok || data.success !== true) {
        if (response.status === 401) {
          throw new Error(
            "Please login before booking a studio."
          );
        }

        if (response.status === 409) {
          throw new Error(
            "This studio is already booked for the selected time."
          );
        }

        throw new Error(
          data.message || "Failed to create booking."
        );
      }

      toast.success(
        data.message || "Booking created successfully!"
      );

      setIsOpen(false);
      setDate("");
      setStartTime("");
      setEndTime("");

      router.push("/my-bookings");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="mt-5 block w-full rounded-xl bg-orange-500 py-3.5 text-center text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
      >
        Book Workspace Now →
      </button>

      <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
        Choose your preferred booking date and time.
      </p>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            aria-busy={isSubmitting}
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-5 text-slate-900 shadow-2xl dark:bg-slate-900 dark:text-white sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
                  Studio Reservation
                </p>

                <h2
                  id="booking-modal-title"
                  className="mt-2 text-xl font-bold sm:text-2xl"
                >
                  Book Your Studio
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {studioName}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                aria-label="Close booking modal"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition hover:bg-orange-100 hover:text-orange-600 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-300"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleBooking}
              className="mt-6 space-y-4"
            >
              <div>
                <label
                  htmlFor="booking-date"
                  className="mb-2 block text-sm font-semibold"
                >
                  Booking Date
                </label>

                <input
                  id="booking-date"
                  type="date"
                  required
                  min={today || undefined}
                  value={date}
                  disabled={isSubmitting}
                  onChange={(event) =>
                    setDate(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-500 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="booking-start"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Start Time
                  </label>

                  <input
                    id="booking-start"
                    type="time"
                    required
                    value={startTime}
                    disabled={isSubmitting}
                    onChange={(event) =>
                      setStartTime(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-500 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-end"
                    className="mb-2 block text-sm font-semibold"
                  >
                    End Time
                  </label>

                  <input
                    id="booking-end"
                    type="time"
                    required
                    value={endTime}
                    disabled={isSubmitting}
                    onChange={(event) =>
                      setEndTime(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-500 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-orange-100 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/10">
                <h3 className="text-sm font-bold">
                  Booking Summary
                </h3>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-600 dark:text-slate-300">
                      Hourly Rate
                    </span>

                    <span className="font-semibold">
                      ৳{hourlyRate.toLocaleString("en-BD")}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-slate-600 dark:text-slate-300">
                      Total Hours
                    </span>

                    <span className="font-semibold">
                      {totalHours.toLocaleString("en-BD", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      hours
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-slate-600 dark:text-slate-300">
                      Studio Rental
                    </span>

                    <span className="font-semibold">
                      ৳{rentalPrice.toLocaleString("en-BD")}
                    </span>
                  </div>

                  {typeof securityDeposit === "number" && (
                    <div className="flex justify-between gap-3">
                      <span className="text-slate-600 dark:text-slate-300">
                        Security Deposit
                      </span>

                      <span className="font-semibold">
                        ৳{deposit.toLocaleString("en-BD")}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-orange-200 pt-3 dark:border-orange-500/20">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold">
                        Estimated Total
                      </span>

                      <span className="text-xl font-bold text-orange-600">
                        ৳{estimatedTotal.toLocaleString("en-BD")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                Your booking will be submitted for host
                approval. No online payment is processed here.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800 sm:flex-1"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    totalHours <= 0 ||
                    !date
                  }
                  className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
                >
                  {isSubmitting
                    ? "Booking..."
                    : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
