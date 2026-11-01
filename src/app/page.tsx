
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
    image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Podcast Recording Studio",
    category: "Podcast Rooms",
    location: "Gulshan, Dhaka",
    price: 1500,
    rating: 4.8,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Music Recording Studio",
    category: "Music Suites",
    location: "Banani, Dhaka",
    price: 1800,
    rating: 4.7,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Creative Workshop Space",
    category: "Art Workshops",
    location: "Uttara, Dhaka",
    price: 1000,
    rating: 4.8,
    reviews: 72,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Professional Sound Stage",
    category: "Sound Stages",
    location: "Mohakhali, Dhaka",
    price: 2500,
    rating: 4.9,
    reviews: 110,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Modern Photo Studio",
    category: "Photo Studios",
    location: "Mirpur, Dhaka",
    price: 1300,
    rating: 4.6,
    reviews: 65,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop",
  },
];

const categories = [
  {
    title: "Photography Studios",
    subtitle: "Capture Every Moment",
    image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=900&auto=format&fit=crop",
  },
  {
    title: "Podcast Rooms",
    subtitle: "Share Your Voice",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&auto=format&fit=crop",
  },
  {
    title: "Music Studios",
    subtitle: "Create Your Sound",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&auto=format&fit=crop",
  },
  {
    title: "Art Workshops",
    subtitle: "Bring Ideas to Life",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&auto=format&fit=crop",
  },
  {
    title: "Sound Stages",
    subtitle: "Professional Production",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&auto=format&fit=crop",
  },
  {
    title: "Other Creative Spaces",
    subtitle: "Discover More Spaces",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop",
  },
];

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
    <main className="min-h-screen bg-white">

      {/* 1. HERO SLIDER */}
      <HeroSlider />

      {/* 2. FEATURED STUDIOS */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                Explore Our Collection
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Featured Studios
              </h2>

              <p className="mt-3 text-gray-600">
                Discover amazing creative spaces for your next project.
              </p>
            </div>

            <Link
              href="/studios"
              className="w-fit rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              Explore All Studios →
            </Link>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featuredStudios.map((studio) => (
              <div
                key={studio.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={studio.image}
                    alt={studio.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-900">
                    {studio.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="mb-3 text-sm font-semibold text-gray-700">
                    <span className="text-yellow-500">★</span> {studio.rating}
                    <span className="ml-1 font-normal text-gray-500">
                      ({studio.reviews} reviews)
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900">
                    {studio.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    📍 {studio.location}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <p className="text-lg font-bold text-gray-900">
                      ৳{studio.price}
                      <span className="text-sm font-normal text-gray-500">
                        /hour
                      </span>
                    </p>

                    <Link
                      href={`/studios/${studio.id}`}
                      className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/studios"
              className="inline-block rounded-lg bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Browse All Studios →
            </Link>
          </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
              Simple Booking Process
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              How StudioSpace Works
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600">
              Finding and booking your perfect creative space is easier
              than ever. Just follow these three simple steps.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">

            {[
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
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900 text-3xl text-white">
                  {step.icon}
                </div>

                <span className="mt-6 inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-bold text-gray-700">
                  {step.number}
                </span>

                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-12 text-center">
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Get Started →
            </Link>
          </div>

        </div>
      </section>

      {/* 4. BROWSE BY CATEGORY */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                Explore Your Creativity
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                Browse by Category
              </h2>

              <p className="mt-3 max-w-xl text-base leading-7 text-gray-600">
                Find the perfect creative space for photography, music,
                podcasting and more.
              </p>
            </div>

            <Link
              href="/studios"
              className="w-fit rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              View All Categories →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.title}
                href="/studios"
                className="group relative h-72 overflow-hidden rounded-2xl"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 p-7">
                  <p className="text-sm font-medium text-gray-200">
                    {category.subtitle}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm font-semibold text-white">
                    Explore Studios →
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 5. WHY CHOOSE STUDIOSPACE */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
              Why Choose Us
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Why StudioSpace?
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600">
              We make finding and booking creative spaces simple,
              convenient and accessible for everyone.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 text-2xl">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. BECOME A HOST */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-12 overflow-hidden rounded-3xl bg-gray-900 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
                Grow With StudioSpace
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                Turn Your Creative Space Into an Opportunity
              </h2>

              <p className="mt-6 text-base leading-8 text-gray-300">
                Have a photography studio, podcast room, music space
                or creative workspace? List your space on StudioSpace
                and connect with creators looking for the perfect place.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/add-studio"
                  className="rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-gray-900 transition hover:bg-gray-200"
                >
                  List Your Studio →
                </Link>

                <Link
                  href="/about"
                  className="rounded-lg border border-gray-500 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-gray-900"
                >
                  Learn More
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-gray-700 pt-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Easy
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Listing Process
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Flexible
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Space Management
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&auto=format&fit=crop"
                alt="Creative studio workspace"
                className="h-full w-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
              Community Feedback
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              What People Say
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600">
              Discover what creators and studio owners think about
              their StudioSpace experience.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-2xl tracking-widest text-yellow-500">
                  ★★★★★
                </div>

                <p className="mt-5 text-sm leading-7 text-gray-600">
                  "{testimonial.review}"
                </p>

                <div className="mt-7 flex items-center gap-4 border-t border-gray-100 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
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
