
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
    <main className="min-h-screen overflow-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-[#09090f] dark:text-white">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-950 text-white dark:bg-[#05050b]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-gray-500 blur-3xl sm:h-72 sm:w-72 dark:bg-orange-500/30" />
          <div className="absolute -bottom-32 right-0 h-64 w-64 rounded-full bg-gray-600 blur-3xl sm:h-96 sm:w-96 dark:bg-orange-600/20" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:gap-12 sm:px-8 sm:py-20 md:grid-cols-2 md:py-24 lg:py-28">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 sm:mb-4 sm:text-sm sm:tracking-[0.25em] dark:text-orange-400">
              About StudioSpace
            </p>

            <h1 className="text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Your Space.
              <br />
              Your Creativity.
              <br />
              <span className="text-gray-400 dark:text-orange-400">
                Your Story.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-300 sm:mt-6 sm:text-base sm:leading-8">
              StudioSpace is a creative studio rental platform designed to
              connect creators with the perfect spaces for their ideas.
              Discover, explore and find a place where creativity comes alive.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link
                href="/studios"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-200 dark:bg-orange-500 dark:text-white dark:hover:bg-orange-600"
              >
                Explore Studios
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-lg border border-gray-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-gray-950 dark:border-gray-700 dark:hover:border-orange-400 dark:hover:bg-orange-500/10 dark:hover:text-orange-400"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="relative mt-2 px-1 pb-5 sm:mt-0 sm:px-3 sm:pb-6 md:px-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200"
              alt="Modern creative studio workspace"
              className="h-64 w-full rounded-xl object-cover shadow-2xl sm:h-80 sm:rounded-2xl lg:h-[430px]"
            />

            <div className="absolute -bottom-1 left-2 rounded-lg border border-gray-200 bg-white p-3 text-gray-900 shadow-xl sm:bottom-0 sm:left-0 sm:rounded-xl sm:p-5 dark:border-gray-700 dark:bg-[#191923] dark:text-white">
              <p className="text-xs font-medium text-gray-500 sm:text-sm dark:text-gray-400">
                Made for creators
              </p>

              <p className="mt-1 text-base font-bold sm:text-xl">
                Create Without Limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="bg-white px-4 py-14 sm:px-8 sm:py-20 dark:bg-[#09090f]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 sm:text-sm dark:text-orange-400">
              Who We Are
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl dark:text-white">
              Making Creative Spaces Accessible
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600 sm:mt-6 sm:text-base sm:leading-8 dark:text-gray-400">
              Every great idea deserves the right environment. Whether you are
              a photographer looking for a professional studio, a podcaster
              searching for a recording room, or a musician needing a creative
              space, StudioSpace helps you discover a suitable place for your
              work.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8 dark:text-gray-400">
              We also help studio owners showcase their spaces and connect
              with people who need them. Our goal is to make finding and
              renting creative spaces easier for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="bg-gray-50 px-4 py-14 sm:px-8 sm:py-20 dark:bg-[#101018]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 sm:text-sm dark:text-orange-400">
              Our Mission
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl dark:text-white">
              Helping Ideas Find Their Perfect Space
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600 sm:mt-6 sm:text-base sm:leading-8 dark:text-gray-400">
              Our mission is to make creative spaces easier to discover and
              access. We want to bring studio owners and creators together
              through a simple and convenient platform.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8 dark:text-gray-400">
              From small creative projects to professional productions,
              StudioSpace aims to support every creator in turning ideas
              into reality.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl sm:rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000"
              alt="Creative team working together"
              loading="lazy"
              className="h-64 w-full object-cover sm:h-80 md:h-[350px]"
            />
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="bg-white px-4 py-14 sm:px-8 sm:py-20 dark:bg-[#09090f]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 text-center sm:mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 sm:text-sm dark:text-orange-400">
              What We Offer
            </p>

            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-4xl dark:text-white">
              Everything Creators Need
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
              A platform to discover different types of creative spaces
              according to your project.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.number}
                className="rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl sm:p-7 dark:border-gray-800 dark:bg-[#191923] dark:hover:border-orange-500/30 dark:hover:shadow-black/30"
              >
                <p className="text-2xl font-bold text-gray-300 sm:text-3xl dark:text-orange-400">
                  {feature.number}
                </p>

                <h3 className="mt-4 text-lg font-bold text-gray-900 sm:mt-5 sm:text-xl dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gray-950 px-4 py-14 text-white sm:px-8 sm:py-20 dark:bg-[#101018]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 sm:text-sm dark:text-orange-400">
              Why StudioSpace
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-4xl">
              Why Choose Us?
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
              We make discovering and renting creative spaces simple and
              convenient.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-gray-700 bg-gray-900 p-5 transition hover:border-gray-400 sm:p-6 dark:border-gray-800 dark:bg-[#191923] dark:hover:border-orange-500/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-2xl text-gray-950 sm:h-12 sm:w-12 dark:bg-orange-500 dark:text-white">
                  {benefit.icon}
                </div>

                <h3 className="mt-4 text-base font-bold sm:mt-5 sm:text-lg">
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

      {/* BECOME A HOST */}
      <section className="bg-white px-4 py-14 sm:px-8 sm:py-20 dark:bg-[#09090f]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl sm:rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1000"
              alt="Studio workspace"
              loading="lazy"
              className="h-64 w-full object-cover sm:h-80 md:h-[350px]"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 sm:text-sm dark:text-orange-400">
              Become a Host
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl dark:text-white">
              Have a Creative Space?
              <br />
              Share It With the World.
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600 sm:mt-6 sm:text-base sm:leading-8 dark:text-gray-400">
              Own a photography studio, podcast room, music suite or creative
              workspace? List your space on StudioSpace and connect with
              creators who are looking for the right place to work.
            </p>

            <Link
              href="/add-studio"
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 sm:mt-7 sm:w-auto dark:bg-orange-500 dark:hover:bg-orange-600"
            >
              List Your Studio
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gray-100 px-4 py-14 text-center sm:px-8 sm:py-20 dark:bg-[#101018]">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-4xl dark:text-white">
            Ready to Create Something Amazing?
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600 sm:mt-5 sm:text-base dark:text-gray-400">
            Discover a space that matches your vision and take your next
            creative project to the next level.
          </p>

          <Link
            href="/studios"
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700 sm:mt-8 sm:w-auto dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            Find Your Studio →
          </Link>
        </div>
      </section>

    </main>
  );
}
