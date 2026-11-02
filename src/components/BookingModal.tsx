
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type BookingModalProps = {
  studioName: string;
  hourlyRate: number;
};

function getLocalDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function BookingModal({
  studioName,
  hourlyRate,
}: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    if (isOpen) {
      setToday(getLocalDate());
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const calculateMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const durationMinutes =
    startTime && endTime
      ? calculateMinutes(endTime) - calculateMinutes(startTime)
      : 0;

  const totalHours =
    durationMinutes > 0 ? durationMinutes / 60 : 0;

  const totalPrice = totalHours * hourlyRate;

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

    if (
      date === getLocalDate() &&
      calculateMinutes(startTime) <=
        new Date().getHours() * 60 + new Date().getMinutes()
    ) {
      toast.error("Please select a future start time.");
      return;
    }

    toast.info(
      "Booking preview is ready. Online booking will be available after backend integration."
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setDate("");
          setStartTime("");
          setEndTime("");
          setIsOpen(true);
        }}
        className="mt-4 block w-full rounded-xl bg-gray-900 py-3 text-center text-sm font-semibold text-white transition hover:bg-orange-500 sm:mt-5 sm:py-3.5"
      >
        Book Workspace Now →
      </button>

      <p className="mt-3 text-center text-xs text-gray-500">
        Select your preferred booking date and time.
      </p>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-6 backdrop-blur-sm"
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
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl dark:bg-gray-900 sm:p-7"
          >
            {/* HEADER */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
                  Studio Reservation
                </p>

                <h2
                  id="booking-modal-title"
                  className="mt-2 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl"
                >
                  Book Your Studio
                </h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {studioName}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close booking modal"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-600 transition hover:bg-orange-100 hover:text-orange-600 dark:bg-gray-800 dark:text-gray-300"
              >
                ✕
              </button>
            </div>

            {/* BOOKING FORM */}
            <form onSubmit={handleBooking} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="booking-date"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  Booking Date
                </label>

                <input
                  id="booking-date"
                  type="date"
                  required
                  min={today || undefined}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="booking-start"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Start Time
                  </label>

                  <input
                    id="booking-start"
                    type="time"
                    required
                    value={startTime}
                    onChange={(event) =>
                      setStartTime(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-end"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    End Time
                  </label>

                  <input
                    id="booking-end"
                    type="time"
                    required
                    value={endTime}
                    onChange={(event) =>
                      setEndTime(event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              {/* PRICE SUMMARY */}
              <div className="rounded-xl border border-orange-100 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/10">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Booking Summary
                </h3>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-3 text-gray-600 dark:text-gray-300">
                    <span>Hourly Rate</span>
                    <span className="font-semibold">
                      ৳{hourlyRate.toLocaleString("en-BD")}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 text-gray-600 dark:text-gray-300">
                    <span>Total Hours</span>
                    <span className="font-semibold">
                      {totalHours.toLocaleString("en-BD", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      hours
                    </span>
                  </div>

                  <div className="border-t border-orange-200 pt-3 dark:border-orange-500/20">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold text-gray-900 dark:text-white">
                        Total Price
                      </span>

                      <span className="text-xl font-bold text-orange-600">
                        ৳{totalPrice.toLocaleString("en-BD")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                This is a booking preview. No reservation or payment
                will be processed until online booking is connected.
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 sm:flex-1"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={totalHours <= 0 || !date}
                  className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
                >
                  Preview Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
