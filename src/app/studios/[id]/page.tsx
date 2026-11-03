
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingModal from "../../../components/BookingModal";
import StudioGallery from "../../../components/StudioGallery";

type Review = {
  _id?: string;
  id?: string;
  userName?: string;
  name?: string;
  rating?: number;
  comment?: string;
  createdAt?: string;
};

type Host = {
  name?: string;
  email?: string;
  image?: string;
};

type Studio = {
  _id: string;
  name: string;
  description?: string;
  category: string;
  location: string;
  price: number;
  images?: string[];
  amenities?: string[];
  ownerId?: string;
  capacity?: number;
  securityDeposit?: number;
  deposit?: number;
  rating?: number;
  reviews?: Review[];
  host?: Host;
  owner?: Host;
};

type Props = {
  params: Promise<{ id: string }>;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-BD").format(value);
}

function isStudio(value: unknown): value is Studio {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item._id === "string" &&
    typeof item.name === "string" &&
    typeof item.category === "string" &&
    typeof item.location === "string" &&
    typeof item.price === "number"
  );
}

async function getStudio(id: string): Promise<Studio | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is missing.");
  }

  const response = await fetch(
    `${apiUrl.replace(/\/$/, "")}/api/studios/${encodeURIComponent(id)}`,
    { cache: "no-store" }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to load studio: ${response.status}`
    );
  }

  const data: unknown = await response.json();

  let studioData: unknown = data;

  if (
    typeof data === "object" &&
    data !== null &&
    "studio" in data
  ) {
    studioData = data.studio;
  }

  if (!isStudio(studioData)) {
    throw new Error("Invalid studio API response.");
  }

  return studioData;
}

function SectionDivider() {
  return (
    <div className="my-7 border-t border-slate-200 dark:border-slate-800" />
  );
}

async function StudioDetailsContent({ params }: Props) {
  const { id } = await params;
  const studio = await getStudio(id);

  if (!studio) {
    notFound();
  }

  const images = Array.isArray(studio.images)
    ? studio.images.filter(
        (image) =>
          typeof image === "string" &&
          image.trim().length > 0
      )
    : [];

  const galleryImages =
    images.length > 0 ? images : [fallbackImage];

  const amenities = Array.isArray(studio.amenities)
    ? studio.amenities.filter(
        (item) =>
          typeof item === "string" &&
          item.trim().length > 0
      )
    : [];

  const reviews = Array.isArray(studio.reviews)
    ? studio.reviews
    : [];

  const host = studio.host ?? studio.owner;
  const deposit =
    studio.securityDeposit ?? studio.deposit;

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        <Link
          href="/studios"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-orange-500 dark:text-slate-400"
        >
          ← Back to Studios
        </Link>

        {/* HEADER */}
        <header className="mb-6">
          <span className="inline-flex rounded-full bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600 dark:bg-orange-950 dark:text-orange-400">
            {studio.category}
          </span>

          <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            {studio.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span>📍 {studio.location}</span>

            {typeof studio.rating === "number" && (
              <span className="font-semibold text-orange-500">
                ★ {studio.rating.toFixed(1)}
              </span>
            )}
          </div>
        </header>

        {/* IMAGE CAROUSEL */}
        <StudioGallery
          images={galleryImages}
          studioName={studio.name}
        />

        {/* CONTENT */}
        <div className="mt-9 grid grid-cols-1 items-start gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="min-w-0 lg:col-span-2">
            {/* DESCRIPTION */}
            <section>
              <h2 className="text-xl font-bold">
                About this studio
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                {studio.description ||
                  "No detailed description has been provided for this studio yet."}
              </p>
            </section>

            <SectionDivider />

            {/* SPECIFICATIONS */}
            <section>
              <h2 className="text-xl font-bold">
                Studio Specifications
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Specification
                  label="Studio Category"
                  value={studio.category}
                  icon="🎬"
                />

                <Specification
                  label="Location"
                  value={studio.location}
                  icon="📍"
                />

                <Specification
                  label="Hourly Rate"
                  value={`৳${formatPrice(studio.price)}`}
                  icon="৳"
                />

                <Specification
                  label="Capacity"
                  value={
                    typeof studio.capacity === "number"
                      ? `${studio.capacity} people`
                      : "Not specified"
                  }
                  icon="👥"
                />

                <Specification
                  label="Security Deposit"
                  value={
                    typeof deposit === "number"
                      ? `৳${formatPrice(deposit)}`
                      : "Not specified"
                  }
                  icon="🔒"
                />

                <Specification
                  label="Studio Type"
                  value="Creative Workspace"
                  icon="🏢"
                />
              </div>
            </section>

            <SectionDivider />

            {/* AMENITIES */}
            <section>
              <h2 className="text-xl font-bold">
                What this studio offers
              </h2>

              {amenities.length > 0 ? (
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {amenities.map((amenity, index) => (
                    <div
                      key={`${amenity}-${index}`}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600 dark:bg-orange-950">
                        ✓
                      </span>
                      {amenity}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Amenities have not been listed by the host yet.
                </p>
              )}
            </section>

            <SectionDivider />

            {/* HOST */}
            <section>
              <h2 className="text-xl font-bold">
                Meet your host
              </h2>

              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-2xl dark:bg-orange-950">
                  {host?.image ? (
                    <Image
                      src={host.image}
                      alt={host.name || "Studio host"}
                      fill
                      unoptimized
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <span>👤</span>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold">
                    {host?.name || "StudioSpace Host"}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Studio Owner
                  </p>

                  {host?.email && (
                    <p className="mt-1 break-all text-xs text-slate-500 dark:text-slate-400">
                      {host.email}
                    </p>
                  )}
                </div>
              </div>

              {!host?.name && (
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  The host&apos;s public profile is not available yet.
                </p>
              )}
            </section>

            <SectionDivider />

            {/* REVIEWS */}
            <section>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold">
                  Guest Reviews
                </h2>

                {typeof studio.rating === "number" && (
                  <span className="text-sm font-semibold text-orange-500">
                    ★ {studio.rating.toFixed(1)}
                  </span>
                )}
              </div>

              {reviews.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {reviews.map((review, index) => (
                    <article
                      key={review._id || review.id || index}
                      className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold">
                          {review.userName ||
                            review.name ||
                            "StudioSpace Guest"}
                        </h3>

                        {typeof review.rating === "number" && (
                          <span className="text-sm font-semibold text-orange-500">
                            ★ {review.rating.toFixed(1)}
                          </span>
                        )}
                      </div>

                      {review.comment && (
                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {review.comment}
                        </p>
                      )}

                      {review.createdAt &&
                        !Number.isNaN(
                          Date.parse(review.createdAt)
                        ) && (
                          <p className="mt-3 text-xs text-slate-400">
                            {new Date(
                              review.createdAt
                            ).toLocaleDateString("en-BD")}
                          </p>
                        )}
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-300 px-5 py-9 text-center dark:border-slate-700">
                  <div className="text-3xl">☆</div>

                  <h3 className="mt-3 text-sm font-semibold">
                    No reviews available yet
                  </h3>

                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Reviews will appear here when they are
                    available from the studio data.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* BOOKING SIDEBAR */}
          <aside className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6 lg:sticky lg:top-28">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-extrabold sm:text-3xl">
                ৳{formatPrice(studio.price)}
              </span>

              <span className="text-sm text-slate-500 dark:text-slate-400">
                / hour
              </span>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <h3 className="text-sm font-bold">
                Booking Information
              </h3>

              <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                Select a date, start time and end time to
                calculate your booking price.
              </p>

              {typeof deposit === "number" && (
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  Security Deposit: ৳{formatPrice(deposit)}
                </p>
              )}
            </div>

            <BookingModal
              studioId={studio._id}
              studioName={studio.name}
              hourlyRate={studio.price}
              securityDeposit={deposit}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}

function Specification({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-lg text-orange-600 dark:bg-orange-950">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function StudioDetailsPage(props: Props) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white px-4 py-12 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl animate-pulse">
            <div className="h-8 w-64 rounded-lg bg-slate-200 dark:bg-slate-800" />

            <div className="mt-6 h-80 rounded-2xl bg-slate-100 dark:bg-slate-900" />

            <p className="mt-5 text-sm text-slate-500">
              Loading studio details...
            </p>
          </div>
        </main>
      }
    >
      <StudioDetailsContent {...props} />
    </Suspense>
  );
}
