
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const API = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");
const statuses = ["All", "Confirmed", "Pending", "Completed", "Cancelled"] as const;
type Status = (typeof statuses)[number];

type Booking = {
  id: string;
  studioId: string;
  name: string;
  category: string;
  location: string;
  image: string;
  description: string;
  startAt: string;
  endAt: string;
  status: Status;
  price: number | null;
};

type RawBooking = {
  _id?: string;
  id?: string;
  studioId?: string | {
    _id?: string; name?: string; category?: string;
    location?: string; images?: string[]; image?: string;
    description?: string;
  };
  studio?: {
    _id?: string; name?: string; category?: string;
    location?: string; images?: string[]; image?: string;
    description?: string;
  };
  studioName?: string;
  category?: string;
  location?: string;
  image?: string;
  description?: string;
  startAt?: string;
  endAt?: string;
  status?: string;
  totalPrice?: number | null;
  price?: number;
};

const date = (v: string) => {
  const d = new Date(v);
  return isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Dhaka"
  });
};

const time = (v: string) => {
  const d = new Date(v);
  return isNaN(d.getTime()) ? "N/A" : d.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Dhaka"
  });
};

const duration = (b: Booking) => {
  const h = (new Date(b.endAt).getTime() - new Date(b.startAt).getTime()) / 3600000;
  return Number.isFinite(h) && h > 0
    ? `${Number(h.toFixed(2))} ${h === 1 ? "Hour" : "Hours"}`
    : "N/A";
};

const money = (n: number | null) =>
  n === null || !Number.isFinite(n) ? "N/A" : `৳${n.toLocaleString("en-BD")}`;

const badge: Record<string, string> = {
  Confirmed: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  Completed: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
};

const card = "rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#191923]";
const muted = "text-gray-500 dark:text-gray-400";
const button = "rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800";
const primary = "rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-orange-500 dark:hover:bg-orange-600";

function normalize(b: RawBooking): Booking | null {
  const id = b._id || b.id;
  if (!id) return null;

  const s = typeof b.studioId === "object" ? b.studioId : b.studio;
  const startAt = b.startAt || "";
  const endAt = b.endAt || "";
  const hours = (new Date(endAt).getTime() - new Date(startAt).getTime()) / 3600000;
  const status = b.status?.toLowerCase();
  const normalizedStatus: Status =
    status === "confirmed" ? "Confirmed" :
    status === "completed" ? "Completed" :
    status === "cancelled" || status === "canceled" ? "Cancelled" : "Pending";

  const image = [...(s?.images || []), s?.image, b.image]
    .find((v) => typeof v === "string" && /^https?:\/\//.test(v)) || "";

  return {
    id, studioId: typeof b.studioId === "string" ? b.studioId : s?._id || "",
    name: s?.name || b.studioName || "Creative Studio",
    category: s?.category || b.category || "Studio",
    location: s?.location || b.location || "Location unavailable",
    image, description: s?.description || b.description || "",
    startAt, endAt, status: normalizedStatus,
    price: typeof b.totalPrice === "number" && Number.isFinite(b.totalPrice)
      ? b.totalPrice
      : typeof b.price === "number" && Number.isFinite(hours) && hours > 0
        ? Math.round(b.price * hours * 100) / 100 : null
  };
}

function StudioImage({ booking, className = "" }: {
  booking: Booking; className?: string;
}) {
  const [failed, setFailed] = useState("");
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-slate-100 to-orange-100 dark:from-gray-800 dark:to-gray-700 ${className}`}>
      {booking.image && failed !== booking.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={booking.image} alt={booking.name}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(booking.image)} />
      ) : (
        <div className="flex h-full min-h-32 flex-col items-center justify-center gap-2 p-4 text-center text-gray-500 dark:text-gray-300">
          <span className="text-4xl">📷</span>
          <span className="text-sm font-semibold">{booking.name}</span>
          <span className="text-xs">Studio image unavailable</span>
        </div>
      )}
    </div>
  );
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<Status>("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch(`${API}/api/bookings/my`, {
          credentials: "include", cache: "no-store", signal: controller.signal
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false)
          throw new Error(data.message || data.error || "Unable to load bookings.");

        const list: RawBooking[] = Array.isArray(data) ? data :
          Array.isArray(data.bookings) ? data.bookings :
          Array.isArray(data.data) ? data.data : [];

        if (!controller.signal.aborted) {
          setBookings(list.map(normalize).filter((b): b is Booking => b !== null));
          setError("");
        }
      } catch (e) {
        if (!controller.signal.aborted)
          setError(e instanceof Error ? e.message : "Unable to load bookings.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void load();
    return () => controller.abort();
  }, [reload]);

  useEffect(() => {
    if (!selected && !cancelId) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !cancelling) {
        setSelected(null);
        setCancelId(null);
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [selected, cancelId, cancelling]);

  const filtered = useMemo(() => bookings.filter((b) =>
    (filter === "All" || b.status === filter) &&
    `${b.name} ${b.location}`.toLowerCase().includes(search.trim().toLowerCase())
  ), [bookings, filter, search]);

  const cancellingBooking = bookings.find((b) => b.id === cancelId);

  async function cancelBooking() {
    if (!cancellingBooking || cancelling || cancellingBooking.status !== "Pending") return;
    setCancelling(true);

    try {
      const res = await fetch(`${API}/api/bookings/${cancellingBooking.id}/cancel`, {
        method: "PATCH", credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false)
        throw new Error(data.message || data.error || "Unable to cancel booking.");

      const id = cancellingBooking.id;
      setBookings((old) => old.map((b) =>
        b.id === id ? { ...b, status: "Cancelled" } : b
      ));
      setSelected((b) => b?.id === id ? { ...b, status: "Cancelled" } : b);
      setCancelId(null);
      toast.success("Booking cancelled successfully.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to cancel booking.");
    } finally {
      setCancelling(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-3 py-6 text-gray-900 dark:bg-[#09090f] dark:text-white sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className={`mb-5 inline-block text-sm font-semibold ${muted}`}>
          ← Back to Home
        </Link>

        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-widest ${muted}`}>Your Activity</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">My Bookings</h1>
            <p className={`mt-2 text-sm ${muted}`}>Manage and track all your studio reservations.</p>
          </div>
          <Link href="/studios" className={primary}>+ Explore Studios</Link>
        </div>

        <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
          {[
            ["Total Bookings", bookings.length, "text-gray-900 dark:text-white"],
            ["Confirmed", bookings.filter(b => b.status === "Confirmed").length, "text-green-600 dark:text-green-400"],
            ["Pending", bookings.filter(b => b.status === "Pending").length, "text-amber-600 dark:text-amber-400"],
            ["Completed", bookings.filter(b => b.status === "Completed").length, "text-blue-600 dark:text-blue-400"],
            ["Cancelled", bookings.filter(b => b.status === "Cancelled").length, "text-red-600 dark:text-red-400"]
          ].map(([label, count, color]) => (
            <div key={String(label)} className={`${card} p-3 sm:p-4`}>
              <p className={`text-xs sm:text-sm ${muted}`}>{label}</p>
              <h2 className={`mt-2 text-2xl font-bold sm:text-3xl ${color}`}>{count}</h2>
            </div>
          ))}
        </div>

        <div className={`${card} mb-5 p-3 sm:p-4`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <input type="search" value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search studio or location..."
              aria-label="Search bookings"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white lg:max-w-sm" />

            <div className="flex gap-2 overflow-x-auto pb-1">
              {statuses.map((s) => (
                <button key={s} onClick={() => setFilter(s)}
                  aria-pressed={filter === s}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold sm:text-sm ${
                    filter === s ? "bg-gray-900 text-white dark:bg-orange-500" :
                    "border border-gray-200 bg-white text-gray-600 hover:border-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div role="status" className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-56 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
            ))}
            <span className="sr-only">Loading bookings...</span>
          </div>
        ) : error ? (
          <div className={`${card} px-5 py-12 text-center`}>
            <h2 className="text-lg font-bold">Unable to load your bookings</h2>
            <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
            <button className={`${primary} mt-5`} onClick={() => {
              setLoading(true); setError(""); setReload((n) => n + 1);
            }}>Try Again</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className={`${card} border-dashed px-5 py-12 text-center`}>
            <div className="text-4xl">📅</div>
            <h2 className="mt-3 text-lg font-bold">No bookings found</h2>
            <p className={`mt-2 text-sm ${muted}`}>
              {bookings.length ? "Try another search or status filter." :
                "You have not booked any studios yet."}
            </p>
            <Link href="/studios" className={`${primary} mt-5 inline-block`}>Explore Studios</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => (
              <article key={b.id} className={`${card} overflow-hidden shadow-sm transition hover:shadow-md dark:shadow-black/20`}>
                <div className="flex flex-col sm:flex-row">
                  <StudioImage booking={b} className="h-48 w-full shrink-0 sm:h-auto sm:min-h-64 sm:w-56 lg:w-64" />

                  <div className="min-w-0 flex-1 p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-xs font-semibold uppercase tracking-wide ${muted}`}>{b.category}</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge[b.status]}`}>{b.status}</span>
                    </div>

                    <h2 className="mt-2 text-lg font-bold sm:text-xl">{b.name}</h2>
                    <p className={`mt-1 text-sm ${muted}`}>📍 {b.location}</p>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                      {[
                        ["Booking Date", date(b.startAt)],
                        ["Booking Time", `${time(b.startAt)} - ${time(b.endAt)}`],
                        ["Duration", duration(b)]
                      ].map(([label, value]) => (
                        <div key={label}>
                          <p className={`text-xs ${muted}`}>{label}</p>
                          <p className="mt-1 font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-col justify-between gap-4 border-t border-gray-100 pt-4 dark:border-gray-800 sm:flex-row sm:items-center">
                      <div>
                        <p className={`text-xs ${muted}`}>Total Price</p>
                        <p className="mt-1 text-xl font-bold">{money(b.price)}</p>
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <button className={button} onClick={() => setSelected(b)}>View Details</button>
                        {b.status === "Pending" && (
                          <button onClick={() => setCancelId(b.id)}
                            className={`${button} border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30`}>
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 px-3 py-5"
          onClick={() => setSelected(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="booking-details-title"
            className={`${card} my-auto max-h-[90vh] w-full max-w-lg overflow-y-auto p-5 shadow-xl sm:p-6`}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={`text-xs font-semibold uppercase ${muted}`}>Booking Details</p>
                <h2 id="booking-details-title" className="mt-1 text-xl font-bold">{selected.name}</h2>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Close details"
                className={`${button} text-xl`}>×</button>
            </div>

            <StudioImage booking={selected} className="mt-5 h-48 w-full rounded-xl" />
            {selected.description && <p className={`mt-4 text-sm ${muted}`}>{selected.description}</p>}

            <div className="mt-5 space-y-3 rounded-xl bg-gray-50 p-4 text-sm dark:bg-gray-800">
              {[
                ["Booking ID", selected.id],
                ["Location", selected.location],
                ["Date", date(selected.startAt)],
                ["Time", `${time(selected.startAt)} - ${time(selected.endAt)}`],
                ["Duration", duration(selected)],
                ["Status", selected.status],
                ["Total Price", money(selected.price)]
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-gray-200 pb-2 last:border-0 dark:border-gray-700">
                  <span className={muted}>{label}</span>
                  <span className="break-all text-right font-semibold">{value}</span>
                </div>
              ))}
            </div>

            {/^[a-f\d]{24}$/i.test(selected.studioId) && (
              <Link href={`/studios/${selected.studioId}`}
                className={`${button} mt-5 block text-center`}>View Studio</Link>
            )}
            <button className={`${primary} mt-3 w-full`} onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}

      {cancellingBooking && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-3 py-5"
          onClick={() => !cancelling && setCancelId(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="cancel-title"
            className={`${card} w-full max-w-sm p-5 shadow-xl sm:p-6`}
            onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600 dark:bg-red-500/10">!</div>
            <h2 id="cancel-title" className="text-lg font-bold">Cancel this booking?</h2>
            <p className={`mt-2 text-sm leading-6 ${muted}`}>
              Are you sure you want to cancel this booking? This action will update its status in the database.
            </p>

            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-sm font-bold">{cancellingBooking.name}</p>
              <p className={`mt-2 text-xs ${muted}`}>📅 {date(cancellingBooking.startAt)}</p>
              <p className={`mt-1 text-xs ${muted}`}>🕒 {time(cancellingBooking.startAt)} - {time(cancellingBooking.endAt)}</p>
              <p className="mt-2 text-sm font-semibold">{money(cancellingBooking.price)}</p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button className={button} disabled={cancelling}
                onClick={() => setCancelId(null)}>Keep Booking</button>
              <button className={primary} disabled={cancelling}
                onClick={cancelBooking}>{cancelling ? "Cancelling..." : "Yes, Cancel"}</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
