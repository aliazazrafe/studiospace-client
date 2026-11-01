
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const studios = [
  {
    id: 1,
    name: "Professional Photography Studio",
    category: "Photo Studios",
    location: "Dhanmondi, Dhaka, Bangladesh",
    price: 1200,
    rating: 4.9,
    reviews: 28,
    description:
      "A beautiful and fully equipped photography studio for professional photoshoots, product photography, portraits, and creative projects.",
    images: [
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=1200",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200",
    ],
    amenities: [
      "Professional Lighting",
      "Air Conditioning",
      "Free Wi-Fi",
      "Changing Room",
      "Parking",
      "Photography Equipment",
    ],
  },
  {
    id: 2,
    name: "Podcast Recording Studio",
    category: "Podcast Rooms",
    location: "Gulshan, Dhaka, Bangladesh",
    price: 1500,
    rating: 4.8,
    reviews: 24,
    description:
      "A professional podcast recording space with a comfortable setup for interviews, voice recording, and content creation.",
    images: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200",
    ],
    amenities: [
      "Studio Microphones",
      "Soundproof Room",
      "Air Conditioning",
      "Free Wi-Fi",
      "Recording Equipment",
      "Comfortable Seating",
    ],
  },
  {
    id: 3,
    name: "Music Recording Studio",
    category: "Music Suites",
    location: "Banani, Dhaka, Bangladesh",
    price: 1800,
    rating: 4.7,
    reviews: 19,
    description:
      "A creative music production studio suitable for recording vocals, instruments, mixing, and music production.",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200",
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200",
    ],
    amenities: [
      "Professional Microphones",
      "Mixing Console",
      "Soundproof Room",
      "Musical Instruments",
      "Air Conditioning",
      "Free Wi-Fi",
    ],
  },
  {
    id: 4,
    name: "Creative Workshop Space",
    category: "Art Workshops",
    location: "Uttara, Dhaka, Bangladesh",
    price: 1000,
    rating: 4.8,
    reviews: 16,
    description:
      "An inspiring creative space for art workshops, painting sessions, creative classes, and collaborative projects.",
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=1200",
    ],
    amenities: [
      "Workshop Tables",
      "Art Supplies",
      "Natural Lighting",
      "Air Conditioning",
      "Free Wi-Fi",
      "Storage Space",
    ],
  },
  {
    id: 5,
    name: "Professional Sound Stage",
    category: "Sound Stages",
    location: "Mohakhali, Dhaka, Bangladesh",
    price: 2500,
    rating: 4.9,
    reviews: 32,
    description:
      "A spacious professional sound stage for video production, commercial shoots, music videos, and creative filming.",
    images: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200",
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=1200",
    ],
    amenities: [
      "Large Shooting Space",
      "Professional Lighting",
      "Sound Equipment",
      "Air Conditioning",
      "Parking",
      "Changing Room",
    ],
  },
  {
    id: 6,
    name: "Modern Photo Studio",
    category: "Photo Studios",
    location: "Mirpur, Dhaka, Bangladesh",
    price: 1300,
    rating: 4.6,
    reviews: 14,
    description:
      "A modern photography space for portraits, fashion photography, product shoots, and creative photography sessions.",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=1200",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200",
    ],
    amenities: [
      "Photography Lighting",
      "Backdrop Setup",
      "Air Conditioning",
      "Free Wi-Fi",
      "Changing Room",
      "Parking",
    ],
  },
];

type Props = {
  params: Promise<{ id: string }>;
};

// Dynamic params are read inside the Suspense boundary.
async function StudioDetailsContent({ params }: Props) {
  const { id } = await params;

  const studio = studios.find(
    (item) => item.id === Number(id)
  );

  if (!studio) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* BACK BUTTON */}
        <Link
          href="/studios"
          className="mb-5 inline-flex items-center text-sm font-semibold text-gray-600 transition hover:text-orange-500 sm:mb-6"
        >
          ← Back to Studios
        </Link>

        {/* STUDIO HEADING */}
        <div className="mb-5 sm:mb-6">
          <div className="mb-2 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
            {studio.category}
          </div>

          <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
            {studio.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-600 sm:text-sm">
            <span>📍 {studio.location}</span>

            <span className="font-medium text-gray-800">
              ⭐ {studio.rating} ({studio.reviews} reviews)
            </span>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-2xl sm:gap-3 md:grid-cols-3">

          {/* MAIN IMAGE */}
          <div className="relative h-[250px] overflow-hidden rounded-xl bg-gray-100 sm:h-[350px] md:col-span-2 md:h-[420px] md:rounded-l-2xl md:rounded-r-none">
            <Image
              src={studio.images[0]}
              alt={studio.name}
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>

          {/* SECONDARY IMAGES */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-1">
            {studio.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="relative h-32 overflow-hidden rounded-xl bg-gray-100 sm:h-44 md:h-[204px] md:rounded-l-none md:rounded-r-2xl"
              >
                <Image
                  src={image}
                  alt={`${studio.name} ${index + 2}`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:mt-10 lg:grid-cols-3 lg:gap-10">

          {/* LEFT CONTENT */}
          <div className="min-w-0 lg:col-span-2">

            {/* ABOUT */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                About this studio
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600 sm:mt-4 sm:text-base">
                {studio.description}
              </p>
            </section>

            <div className="my-6 border-t border-gray-200 sm:my-8" />

            {/* AMENITIES */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                What this studio offers
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {studio.amenities.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-gray-700 sm:text-base"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-50 text-sm font-bold text-orange-500">
                      ✓
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </section>

            <div className="my-6 border-t border-gray-200 sm:my-8" />

            {/* HOST */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Hosted by
              </h2>

              <div className="mt-4 flex items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xl sm:h-14 sm:w-14">
                  👤
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                    StudioSpace Host
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Studio owner
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* BOOKING CARD */}
          <aside className="h-fit w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-md sm:p-6 lg:sticky lg:top-28">
            <p className="text-2xl font-bold text-gray-900 sm:text-3xl">
              ৳{studio.price}
              <span className="text-sm font-normal text-gray-500">
                {" "}/ hour
              </span>
            </p>

            <div className="mt-4 rounded-xl border border-gray-200 p-3 sm:mt-5 sm:p-4">
              <p className="text-sm font-semibold text-gray-800">
                Booking information
              </p>

              <p className="mt-2 text-xs leading-6 text-gray-500 sm:text-sm">
                Choose your preferred date and time to book this studio.
              </p>
            </div>

            <Link
              href="/login"
              className="mt-4 block w-full rounded-xl bg-gray-900 py-3 text-center text-sm font-semibold text-white transition hover:bg-orange-500 sm:mt-5 sm:py-3.5"
            >
              Book This Studio →
            </Link>

            <p className="mt-3 text-center text-xs text-gray-500">
              Login required to continue booking.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

// Suspense boundary for Next.js 16 dynamic route.
export default function StudioDetailsPage(props: Props) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
            <div className="mt-6 h-[350px] animate-pulse rounded-2xl bg-gray-100" />
            <p className="mt-6 text-sm text-gray-500">
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
