
import Link from "next/link";
import HeroSlider from "../components/HeroSlider";

type Studio = {
  _id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  images?: string[];
  rating?: number;
  reviews?: number;
};

type StudiosResponse = {
  success: boolean;
  studios?: Studio[];
};

const fallbackImages: Record<string, string> = {
  "Photo Studio":
    "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&auto=format&fit=crop",
  "Podcast Room":
    "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&auto=format&fit=crop",
  "Music Suite":
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&auto=format&fit=crop",
  "Art Workshop":
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&auto=format&fit=crop",
  "Sound Stage":
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&auto=format&fit=crop",
};

const defaultImage =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop";

// Fetch featured studios from MongoDB
async function getFeaturedStudios(): Promise<Studio[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is missing.");
    return [];
  }

  try {
    const response = await fetch(
      `${apiUrl.replace(/\/$/, "")}/api/studios?limit=6`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      console.error(
        "Failed to load featured studios:",
        response.status
      );
      return [];
    }

    const data: StudiosResponse = await response.json();

    if (!data.success || !Array.isArray(data.studios)) {
      return [];
    }

    return data.studios
      .filter(
        (studio) =>
          typeof studio._id === "string" &&
          /^[a-f\d]{24}$/i.test(studio._id)
      )
      .slice(0, 6);
  } catch (error) {
    console.error("Featured studios error:", error);
    return [];
  }
}

const categories = [
  {
    title: "Photography Studios",
    subtitle: "Capture Every Moment",
    route: "Photo Studios",
    image:
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&auto=format&fit=crop",
  },
  {
    title: "Podcast Rooms",
    subtitle: "Share Your Voice",
    route: "Podcast Rooms",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&auto=format&fit=crop",
  },
  {
    title: "Music Studios",
    subtitle: "Create Your Sound",
    route: "Music Suites",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&auto=format&fit=crop",
  },
  {
    title: "Art Workshops",
    subtitle: "Bring Ideas to Life",
    route: "Art Workshops",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&auto=format&fit=crop",
  },
  {
    title: "Sound Stages",
    subtitle: "Professional Production",
    route: "Sound Stages",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&auto=format&fit=crop",
  },
  {
    title: "Other Creative Spaces",
    subtitle: "Discover More Spaces",
    route: "All Studios",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop",
  },
];

const steps = [
  {
    icon: "🔍",
    number: "STEP 01",
    title: "Discover Spaces",
    description:
      "Explore photography studios, podcast rooms, music suites and creative workspaces to find your ideal studio.",
  },
  {
    icon: "🕒",
    number: "STEP 02",
    title: "Select Shoot Hours",
    description:
      "Choose your preferred date, starting time and booking duration based on your creative needs.",
  },
  {
    icon: "📅",
    number: "STEP 03",
    title: "Book Instantly",
    description:
      "Review studio details and transparent pricing, then submit your booking request quickly and easily.",
  },
  {
    icon: "🎬",
    number: "STEP 04",
    title: "Create & Produce",
    description:
      "Visit your reserved studio, use the creative space and bring your production ideas to life.",
  },
];

const features = [
  {
    icon: "🛡️",
    title: "Liability Protection",
    description:
      "Learn about studio policies, booking responsibilities, and safety guidelines before reserving your creative workspace.",
  },
  {
    icon: "✅",
    title: "Verified Profiles",
    description:
      "Explore host information and studio details to make more informed decisions when choosing a creative space.",
  },
  {
    icon: "🎛️",
    title: "Equipment Safety",
    description:
      "Review available studio amenities and follow equipment handling guidelines for a safe creative experience.",
  },
  {
    icon: "🎧",
    title: "24/7 Host Support",
    description:
      "Find guidance on communicating with hosts, managing reservations, and getting assistance with booking-related questions.",
  },
];

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Photographer",
    initials: "SA",
    review:
      "Finding a photography space for my projects has become much easier. I love how simple the studio discovery process is.",
  },
  {
    name: "Rahim Hasan",
    role: "Content Creator",
    initials: "RH",
    review:
      "StudioSpace makes it easier to discover creative spaces. It is a convenient concept for creators like me.",
  },
  {
    name: "Nusrat Jahan",
    role: "Studio Owner",
    initials: "NJ",
    review:
      "I love the idea of connecting studio owners with people who need creative spaces. It makes discovering opportunities easier.",
  },
];

export default async function Home() {
  const featuredStudios = await getFeaturedStudios();

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-[#09090f] dark:text-white">

      {/* HERO SLIDER */}
      <HeroSlider />

      {/* FEATURED STUDIOS */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                Explore Our Collection
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Featured Studios
              </h2>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Discover amazing creative spaces for your next project.
              </p>
            </div>

            <Link
              href="/studios"
              className="w-fit rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold transition hover:bg-gray-900 hover:text-white dark:border-gray-700 dark:hover:bg-white dark:hover:text-gray-900"
            >
              Explore All Studios →
            </Link>
          </div>

          {featuredStudios.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-12 text-center dark:border-gray-800 dark:bg-[#15151e]">
              <h3 className="text-lg font-bold">
                Featured studios are currently unavailable
              </h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Please try again later or explore all studios.
              </p>

              <Link
                href="/studios"
                className="mt-5 inline-block rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Explore Studios →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {featuredStudios.map((studio) => {
                const image =
                  studio.images?.find(
                    (item) =>
                      typeof item === "string" &&
                      item.trim().length > 0
                  ) ||
                  fallbackImages[studio.category] ||
                  defaultImage;

                return (
                  <article
                    key={studio._id}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-[#15151e] dark:shadow-black/20"
                  >
                    <div className="relative h-52 overflow-hidden sm:h-56">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt={studio.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-900">
                        {studio.category}
                      </span>
                    </div>

                    <div className="p-5">
                      {typeof studio.rating === "number" && (
                        <div className="mb-2 text-sm font-semibold">
                          <span className="text-yellow-500">★ </span>
                          {studio.rating.toFixed(1)}

                          {typeof studio.reviews === "number" && (
                            <span className="ml-1 font-normal text-gray-500 dark:text-gray-400">
                              ({studio.reviews} reviews)
                            </span>
                          )}
                        </div>
                      )}

                      <h3 className="text-base font-bold sm:text-lg">
                        {studio.name}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        📍 {studio.location}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                        <p className="text-lg font-bold">
                          ৳{Number(studio.price).toLocaleString("en-BD")}
                          <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                            /hour
                          </span>
                        </p>

                        <Link
                          href={`/studios/${studio._id}`}
                          className="text-xs font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400"
                        >
                          View Details →
                        </Link>
                      </div>

                      {/* BOOK NOW BUTTON */}
                      <Link
                        href={`/studios/${studio._id}`}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                      >
                        📅 Book Now
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/studios"
              className="inline-block rounded-lg bg-gray-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Browse All Studios →
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8 lg:py-20 dark:bg-[#101018]"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Simple Booking Process
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              How StudioSpace Works
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
              Finding and booking your perfect creative space is easier
              than ever. Follow these four simple steps to start creating.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-[#191923]"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900 text-3xl dark:bg-[#292936]">
                  {step.icon}
                </div>

                <span className="mt-5 inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-bold text-gray-700 dark:bg-[#292936] dark:text-gray-300">
                  {step.number}
                </span>

                <h3 className="mt-4 text-base font-bold">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/studios"
              className="inline-block rounded-lg bg-orange-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Explore Studios →
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
                Explore Your Creativity
              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Browse by Category
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400">
                Find the perfect creative space for photography,
                music, podcasting and more.
              </p>
            </div>

            <Link
              href="/studios"
              className="w-fit rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold transition hover:bg-gray-900 hover:text-white dark:border-gray-700 dark:hover:bg-white dark:hover:text-gray-900"
            >
              View All Categories →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={`/studios?category=${encodeURIComponent(
                  category.route
                )}`}
                className="group relative h-56 overflow-hidden rounded-2xl sm:h-64 lg:h-72"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-xs text-gray-200">
                    {category.subtitle}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-xs font-semibold text-orange-300">
                    Explore Studios →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOST GUARANTEE */}
      <section
        id="host-guarantee"
        className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8 lg:py-20 dark:bg-[#101018]"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Creator Confidence
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Host Guarantee & Creator Support
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
              Discover important safety information, host details,
              equipment guidelines and support resources to help
              you plan your next creative project with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-[#191923]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 text-2xl transition group-hover:bg-orange-500 dark:bg-[#292936]">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-base font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-6 text-gray-500 dark:text-gray-400">
            StudioSpace encourages transparent communication and
            responsible studio usage. Specific protection,
            verification and support arrangements depend on
            available platform features and individual studio policies.
          </p>
        </div>
      </section>

      {/* BECOME A HOST */}
      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-gray-900 p-6 text-white sm:p-10 lg:grid-cols-2 lg:p-14 dark:bg-[#191923]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-400">
                Grow With StudioSpace
              </p>

              <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                Turn Your Creative Space Into an Opportunity
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-300">
                Have a photography studio, podcast room, music space
                or creative workspace? List your space on StudioSpace
                and connect with creators looking for the perfect place.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/add-studio"
                  className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  List Your Studio →
                </Link>

                <Link
                  href="/about"
                  className="rounded-lg border border-gray-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-gray-900"
                >
                  Learn More
                </Link>
              </div>

              <div className="mt-9 grid grid-cols-2 gap-5 border-t border-gray-700 pt-7">
                <div>
                  <h3 className="text-xl font-bold">Easy</h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Listing Process
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold">Flexible</h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Space Management
                  </p>
                </div>
              </div>
            </div>

            <div className="h-60 overflow-hidden rounded-2xl sm:h-80 lg:h-full lg:min-h-[400px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&auto=format&fit=crop"
                alt="Creative studio workspace"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8 lg:py-20 dark:bg-[#101018]">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Community Feedback
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              What People Say
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
              Discover what creators and studio owners think
              about their StudioSpace experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-[#191923]"
              >
                <div className="text-xl tracking-widest text-yellow-500">
                  ★★★★★
                </div>

                <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-gray-300">
                  &quot;{testimonial.review}&quot;
                </p>

                <div className="mt-7 flex items-center gap-4 border-t border-gray-100 pt-6 dark:border-gray-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white dark:bg-orange-500">
                    {testimonial.initials}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold">
                      {testimonial.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-7 text-center text-xs text-gray-500 dark:text-gray-400">
            Sample testimonials for demonstration purposes.
          </p>
        </div>
      </section>

    </main>
  );
}
