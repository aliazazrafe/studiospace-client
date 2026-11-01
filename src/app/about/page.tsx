
import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Discover Creative Spaces",
    description:
      "Explore photography studios, podcast rooms, music studios and creative spaces in one place.",
  },
  {
    number: "02",
    title: "Easy Booking",
    description:
      "Find the right studio, check the details and book your preferred space with ease.",
  },
  {
    number: "03",
    title: "Connect with Creators",
    description:
      "We help photographers, musicians, filmmakers and other creators find spaces for their work.",
  },
];

const benefits = [
  {
    icon: "⌕",
    title: "Easy Discovery",
    description:
      "Find creative studios according to your needs, location and budget.",
  },
  {
    icon: "◷",
    title: "Save Time",
    description:
      "Discover and compare different creative spaces from one platform.",
  },
  {
    icon: "◇",
    title: "More Opportunities",
    description:
      "Help studio owners connect with creators looking for professional spaces.",
  },
  {
    icon: "✓",
    title: "Simple Experience",
    description:
      "Enjoy a straightforward experience from discovering studios to booking.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-950 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gray-500 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-gray-600 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
              About StudioSpace
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Your Space.
              <br />
              Your Creativity.
              <br />
              <span className="text-gray-400">Your Story.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-300">
              StudioSpace is a creative studio rental platform designed to
              connect creators with the perfect spaces for their ideas.
              Discover, explore and find a place where creativity comes alive.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/studios"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-200"
              >
                Explore Studios
              </Link>

              <Link
                href="/register"
                className="rounded-lg border border-gray-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-gray-950"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200"
              alt="Modern creative studio workspace"
              className="h-[350px] w-full rounded-2xl object-cover shadow-2xl sm:h-[430px]"
            />

            <div className="absolute -bottom-5 -left-3 rounded-xl border border-gray-200 bg-white p-5 text-gray-900 shadow-xl sm:-left-6">
              <p className="text-sm font-medium text-gray-500">
                Made for creators
              </p>
              <p className="mt-1 text-xl font-bold">
                Create Without Limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
            Who We Are
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Making Creative Spaces Accessible
          </h2>

          <p className="mt-6 text-base leading-8 text-gray-600">
            Every great idea deserves the right environment. Whether you are
            a photographer looking for a professional studio, a podcaster
            searching for a recording room, or a musician needing a creative
            space, StudioSpace helps you discover a suitable place for your
            work.
          </p>

          <p className="mt-4 text-base leading-8 text-gray-600">
            We also help studio owners showcase their spaces and connect
            with people who need them. Our goal is to make finding and
            renting creative spaces easier for everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
              Our Mission
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Helping Ideas Find Their Perfect Space
            </h2>

            <p className="mt-6 text-base leading-8 text-gray-600">
              Our mission is to make creative spaces easier to discover and
              access. We want to bring studio owners and creators together
              through a simple and convenient platform.
            </p>

            <p className="mt-4 text-base leading-8 text-gray-600">
              From small creative projects to professional productions,
              StudioSpace aims to support every creator in turning ideas
              into reality.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000"
              alt="Creative team working together"
              className="h-[350px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
            What We Offer
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Everything Creators Need
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            A platform to discover different types of creative spaces
            according to your project.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-3xl font-bold text-gray-300">
                {feature.number}
              </p>

              <h3 className="mt-5 text-xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-950 px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
              Why StudioSpace
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Why Choose Us?
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              We make discovering and renting creative spaces simple and
              convenient.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-gray-700 bg-gray-900 p-6 transition hover:border-gray-400"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl text-gray-950">
                  {benefit.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Host */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1000"
            alt="Studio workspace"
            className="h-[350px] w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
            Become a Host
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Have a Creative Space?
            <br />
            Share It With the World.
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Own a photography studio, podcast room, music suite or creative
            workspace? List your space on StudioSpace and connect with
            creators who are looking for the right place to work.
          </p>

          <Link
            href="/add-studio"
            className="mt-7 inline-flex rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            List Your Studio
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-100 px-5 py-20 text-center sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Create Something Amazing?
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            Discover a space that matches your vision and take your next
            creative project to the next level.
          </p>

          <Link
            href="/studios"
            className="mt-8 inline-flex rounded-lg bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Find Your Studio →
          </Link>
        </div>
      </section>

    </main>
  );
}
