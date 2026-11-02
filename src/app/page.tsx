
import Link from "next/link";
import HeroSlider from "../components/HeroSlider";

const featuredStudios = [
  {
    id: 1,
    title: "Professional Photography Studio",
    category: "Photo Studios",
    location: "Dhanmondi, Dhaka",
    price: 1200,
    rating: 4.9,
    reviews: 120,
    image:
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Podcast Recording Studio",
    category: "Podcast Rooms",
    location: "Gulshan, Dhaka",
    price: 1500,
    rating: 4.8,
    reviews: 85,
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Music Recording Studio",
    category: "Music Suites",
    location: "Banani, Dhaka",
    price: 1800,
    rating: 4.7,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Creative Workshop Space",
    category: "Art Workshops",
    location: "Uttara, Dhaka",
    price: 1000,
    rating: 4.8,
    reviews: 72,
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Professional Sound Stage",
    category: "Sound Stages",
    location: "Mohakhali, Dhaka",
    price: 2500,
    rating: 4.9,
    reviews: 110,
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Modern Photo Studio",
    category: "Photo Studios",
    location: "Mirpur, Dhaka",
    price: 1300,
    rating: 4.6,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop",
  },
];

const categories = [
  {
    title: "Photography Studios",
    subtitle: "Capture Every Moment",
    image:
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&auto=format&fit=crop",
  },
  {
    title: "Podcast Rooms",
    subtitle: "Share Your Voice",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&auto=format&fit=crop",
  },
  {
    title: "Music Studios",
    subtitle: "Create Your Sound",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&auto=format&fit=crop",
  },
  {
    title: "Art Workshops",
    subtitle: "Bring Ideas to Life",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&auto=format&fit=crop",
  },
  {
    title: "Sound Stages",
    subtitle: "Professional Production",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&auto=format&fit=crop",
  },
  {
    title: "Other Creative Spaces",
    subtitle: "Discover More Spaces",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop",
  },
];

const categoryRoutes: Record<string, string> = {
  "Photography Studios": "Photo Studios",
  "Podcast Rooms": "Podcast Rooms",
  "Music Studios": "Music Suites",
  "Art Workshops": "Art Workshops",
  "Sound Stages": "Sound Stages",
  "Other Creative Spaces": "All Studios",
};

const features = [
  {
    icon: "🛡️",
    title: "Trusted Spaces",
    description:
      "Discover suitable creative spaces with clear information and details.",
  },
  {
    icon: "📅",
    title: "Easy Booking",
    description:
      "Find your preferred studio and submit your booking request easily.",
  },
  {
    icon: "💰",
    title: "Flexible Pricing",
    description:
      "Explore different studios and choose one that fits your budget.",
  },
  {
    icon: "🎧",
    title: "Customer Support",
    description:
      "Get assistance whenever you need help with your studio experience.",
  },
];

const steps = [
  {
    icon: "🔍",
    number: "STEP 01",
    title: "Find Your Studio",
    description:
      "Explore photography, podcast, music and creative studios to find the perfect space for your project.",
  },
  {
    icon: "📅",
    number: "STEP 02",
    title: "Book Your Space",
    description:
      "Choose your preferred date and time, review the studio details and complete your booking request.",
  },
  {
    icon: "✨",
    number: "STEP 03",
    title: "Start Creating",
    description:
      "Visit your booked studio, bring your ideas and turn your creative vision into reality.",
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

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* HERO */}
      <HeroSlider />

      {/* FEATURED STUDIOS */}
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 sm:text-sm">
                Explore Our Collection
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                Featured Studios
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600 sm:mt-3 sm:text-base">
                Discover amazing creative spaces for your next project.
              </p>
            </div>

            <Link
              href="/studios"
              className="w-fit rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white sm:px-5 sm:py-3"
            >
              Explore All Studios →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
            {featuredStudios.map((studio) => (
              <div
                key={studio.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl"
              >
                <div className="relative h-52 overflow-hidden sm:h-56">
                  <img
                    src={studio.image}
                    alt={studio.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 sm:left-4 sm:top-4">
                    {studio.category}
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="mb-2 text-sm font-semibold text-gray-700">
                    <span className="text-yellow-500">★</span>{" "}
                    {studio.rating}
                    <span className="ml-1 font-normal text-gray-500">
                      ({studio.reviews} reviews)
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                    {studio.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    📍 {studio.location}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <p className="text-base font-bold text-gray-900 sm:text-lg">
                      ৳{studio.price}
                      <span className="text-xs font-normal text-gray-500 sm:text-sm">
                        /hour
                      </span>
                    </p>

                    <Link
                      href={`/studios/${studio.id}`}
                      className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-gray-700 sm:px-4 sm:py-2.5 sm:text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:mt-10">
            <Link
              href="/studios"
              className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 sm:px-7 sm:py-3.5"
            >
              Browse All Studios →
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 sm:text-sm">
              Simple Booking Process
            </p>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              How StudioSpace Works
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-7">
              Finding and booking your perfect creative space is easier than
              ever. Just follow these three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl sm:p-7 lg:p-8"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 text-2xl text-white sm:h-16 sm:w-16 sm:rounded-2xl sm:text-3xl">
                  {step.icon}
                </div>

                <span className="mt-4 inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-bold text-gray-700 sm:mt-6">
                  {step.number}
                </span>

                <h3 className="mt-3 text-lg font-bold text-gray-900 sm:mt-4 sm:text-xl">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600 sm:mt-3 sm:leading-7">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:mt-12">
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 sm:px-7 sm:py-3.5"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 sm:text-sm">
                Explore Your Creativity
              </p>
              <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                Browse by Category
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600 sm:mt-3 sm:text-base sm:leading-7">
                Find the perfect creative space for photography, music,
                podcasting and more.
              </p>
            </div>

            <Link
              href="/studios"
              className="w-fit rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white sm:px-5 sm:py-3"
            >
              View All Categories →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={`/studios?category=${encodeURIComponent(
                  categoryRoutes[category.title] ?? "All Studios"
                )}`}
                className="group relative h-56 overflow-hidden rounded-xl sm:h-64 sm:rounded-2xl lg:h-72"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-7">
                  <p className="text-xs font-medium text-gray-200 sm:text-sm">
                    {category.subtitle}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-xs font-semibold text-white sm:mt-3 sm:text-sm">
                    Explore Studios →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 sm:text-sm">
              Why Choose Us
            </p>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              Why StudioSpace?
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-7">
              We make finding and booking creative spaces simple, convenient
              and accessible for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl sm:p-6 lg:p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-2xl sm:h-14 sm:w-14">
                  {feature.icon}
                </div>

                <h3 className="mt-4 text-base font-bold text-gray-900 sm:mt-6 sm:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600 sm:mt-3 sm:leading-7">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BECOME A HOST */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-7 overflow-hidden rounded-2xl bg-gray-900 p-5 sm:gap-10 sm:rounded-3xl sm:p-8 md:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14 xl:p-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 sm:text-sm">
                Grow With StudioSpace
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:mt-4 sm:text-3xl lg:text-4xl xl:text-5xl">
                Turn Your Creative Space Into an Opportunity
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-300 sm:mt-6 sm:text-base sm:leading-8">
                Have a photography studio, podcast room, music space or
                creative workspace? List your space on StudioSpace and
                connect with creators looking for the perfect place.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  href="/add-studio"
                  className="rounded-lg bg-white px-5 py-3 text-center text-sm font-bold text-gray-900 transition hover:bg-gray-200 sm:px-7 sm:py-3.5"
                >
                  List Your Studio →
                </Link>

                <Link
                  href="/about"
                  className="rounded-lg border border-gray-500 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-gray-900 sm:px-7 sm:py-3.5"
                >
                  Learn More
                </Link>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-4 border-t border-gray-700 pt-6 sm:mt-10 sm:gap-6 sm:pt-8">
                <div>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    Easy
                  </h3>
                  <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                    Listing Process
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    Flexible
                  </h3>
                  <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                    Space Management
                  </p>
                </div>
              </div>
            </div>

            <div className="h-56 overflow-hidden rounded-xl sm:h-72 sm:rounded-2xl lg:h-full lg:min-h-[400px]">
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
      <section className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 sm:text-sm">
              Community Feedback
            </p>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              What People Say
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-7">
              Discover what creators and studio owners think about their
              StudioSpace experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:gap-7">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl sm:p-7 lg:p-8"
              >
                <div className="text-xl tracking-widest text-yellow-500 sm:text-2xl">
                  ★★★★★
                </div>

                <p className="mt-4 text-sm leading-7 text-gray-600 sm:mt-5">
                  &quot;{testimonial.review}&quot;
                </p>

                <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-5 sm:mt-7 sm:gap-4 sm:pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white sm:h-12 sm:w-12 sm:text-sm">
                    {testimonial.initials}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
