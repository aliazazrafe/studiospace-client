
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

export default async function StudioDetailsPage({ params }: Props) {
  const { id } = await params;

  const studio = studios.find((item) => item.id === Number(id));

  if (!studio) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/studios"
        className="mb-6 inline-block text-sm font-medium text-gray-600 hover:text-black"
      >
        ← Back to Studios
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {studio.name}
        </h1>

        <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600">
          <span>📍 {studio.location}</span>
          <span>⭐ {studio.rating} ({studio.reviews} reviews)</span>
          <span>{studio.category}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 gap-3 overflow-hidden rounded-2xl md:grid-cols-3">
        <div className="relative h-72 md:col-span-2 md:h-[420px]">
          <Image
            src={studio.images[0]}
            alt={studio.name}
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
          {studio.images.slice(1).map((image, index) => (
            <div
              key={index}
              className="relative h-48 md:h-[204px]"
            >
              <Image
                src={image}
                alt={`${studio.name} ${index + 2}`}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Studio Information */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900">
            About this studio
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            {studio.description}
          </p>

          <div className="my-8 border-t border-gray-200" />

          <h2 className="text-2xl font-bold text-gray-900">
            What this studio offers
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {studio.amenities.map((item) => (
              <div key={item} className="text-gray-700">
                ✓ {item}
              </div>
            ))}
          </div>

          <div className="my-8 border-t border-gray-200" />

          <h2 className="text-2xl font-bold text-gray-900">
            Hosted by
          </h2>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-xl">
              👤
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                StudioSpace Host
              </h3>
              <p className="text-sm text-gray-500">
                Studio owner
              </p>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <aside className="h-fit rounded-2xl border border-gray-200 p-6 shadow-lg">
          <p className="text-2xl font-bold text-gray-900">
            ৳{studio.price}
            <span className="text-sm font-normal text-gray-500">
              {" "} / hour
            </span>
          </p>

          <div className="mt-5 rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-800">
              Booking information
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Choose your preferred date and time to book this studio.
            </p>
          </div>

          <Link
            href="/login"
            className="mt-5 block w-full rounded-xl bg-gray-900 py-3 text-center font-semibold text-white transition hover:bg-orange-500"
          >
            Book This Studio
          </Link>

          <p className="mt-3 text-center text-xs text-gray-500">
            Login required to continue booking.
          </p>
        </aside>
      </div>
    </main>
  );
}
