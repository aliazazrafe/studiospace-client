
"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useTheme } from "next-themes";

type Studio = {
  _id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  images?: string[];
};

type StudiosResponse = {
  success: boolean;
  studios: Studio[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const categories = [
  "All Studios",
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

const fallbackImage =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD").format(price);

function StudiosPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [studios, setStudios] = useState<Studio[]>([]);
  const [search, setSearch] = useState(
    () => searchParams.get("search") ?? ""
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const colors = {
    page: isDark ? "#020617" : "#f8fafc",
    card: isDark ? "#0f172a" : "#ffffff",
    cardBorder: isDark ? "#334155" : "#e2e8f0",
    heading: isDark ? "#f8fafc" : "#0f172a",
    text: isDark ? "#cbd5e1" : "#475569",
    muted: isDark ? "#94a3b8" : "#64748b",
    input: isDark ? "#0f172a" : "#ffffff",
    inputText: isDark ? "#f8fafc" : "#0f172a",
    filter: isDark ? "#1e293b" : "#ffffff",
    filterText: isDark ? "#e2e8f0" : "#475569",
    divider: isDark ? "#334155" : "#f1f5f9",
    badge: isDark ? "#431407" : "#fff7ed",
    badgeBorder: isDark ? "#7c2d12" : "#fed7aa",
  };

  const categoryFromUrl = searchParams.get("category");

  const selectedCategory =
    categoryFromUrl &&
    categories.includes(categoryFromUrl)
      ? categoryFromUrl
      : "All Studios";

  const updateUrl = (
    searchValue: string,
    categoryValue: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    const trimmedSearch = searchValue.trim();

    if (trimmedSearch) {
      params.set("search", trimmedSearch);
    } else {
      params.delete("search");
    }

    if (categoryValue === "All Studios") {
      params.delete("category");
    } else {
      params.set("category", categoryValue);
    }

    const query = params.toString();

    router.replace(
      query ? `${pathname}?${query}` : pathname,
      { scroll: false }
    );
  };

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStudios() {
      setLoading(true);
      setError("");

      if (!apiUrl) {
        setError("Backend API URL is not configured.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${apiUrl.replace(/\/$/, "")}/api/studios?limit=100`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load studios.");
        }

        const data: StudiosResponse =
          await response.json();

        if (
          !data.success ||
          !Array.isArray(data.studios)
        ) {
          throw new Error(
            "Invalid studio API response."
          );
        }

        setStudios(data.studios);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchStudios();

    return () => controller.abort();
  }, [apiUrl, retryCount]);

  const handleCategoryChange = (category: string) => {
    updateUrl(search, category);
  };

  const handleClearSearch = () => {
    setSearch("");
    updateUrl("", selectedCategory);
  };

  const clearFilters = () => {
    setSearch("");
    updateUrl("", "All Studios");
  };

  const filteredStudios = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return studios.filter((studio) => {
      const categoryText =
        studio.category.toLowerCase();

      const matchesCategory =
        selectedCategory === "All Studios" ||
        studio.category === selectedCategory ||
        (selectedCategory === "Photo Studios" &&
          categoryText === "photo studio") ||
        (selectedCategory === "Sound Stages" &&
          categoryText === "sound stage") ||
        (selectedCategory === "Podcast Rooms" &&
          categoryText === "podcast room") ||
        (selectedCategory === "Music Suites" &&
          categoryText === "music suite") ||
        (selectedCategory === "Art Workshops" &&
          categoryText === "art workshop");

      const matchesSearch =
        studio.name.toLowerCase().includes(searchText) ||
        studio.location.toLowerCase().includes(searchText) ||
        categoryText.includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [studios, search, selectedCategory]);

  return (
    <main
      className="min-h-screen w-full overflow-x-hidden transition-colors duration-300"
      style={{
        backgroundColor: colors.page,
        color: colors.heading,
      }}
    >
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

        {/* PAGE HEADING */}
        <div className="mb-8 text-center sm:mb-10">
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[1.5px] text-orange-500"
            style={{
              backgroundColor: colors.badge,
              borderColor: colors.badgeBorder,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            Discover Your Space
          </div>

          <h1
            className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-[36px]"
            style={{ color: colors.heading }}
          >
            Explore Creative{" "}
            <span className="text-orange-500">
              Studios
            </span>
          </h1>

          <p
            className="mx-auto mt-3 max-w-xl text-xs leading-6 sm:text-sm"
            style={{ color: colors.text }}
          >
            Discover inspiring spaces for photography,
            music, podcasting and your next creative project.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mx-auto mb-6 max-w-2xl">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              updateUrl(search, selectedCategory);
            }}
            className="flex items-center gap-3 rounded-2xl border px-4 shadow-sm transition-colors focus-within:border-orange-500"
            style={{
              backgroundColor: colors.input,
              borderColor: colors.cardBorder,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-slate-400"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by studio name, category or location..."
              aria-label="Search studios"
              className="w-full min-w-0 bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400"
              style={{
                color: colors.inputText,
                backgroundColor: "transparent",
              }}
            />

            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search"
                className="shrink-0 text-xs font-semibold text-orange-500 hover:text-orange-600"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* CATEGORY FILTER */}
        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
            {categories.map((category) => {
              const active =
                selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    handleCategoryChange(category)
                  }
                  aria-pressed={active}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 sm:px-5 ${
                    active
                      ? "border-orange-500 bg-orange-500 text-white shadow-sm"
                      : "hover:border-orange-400 hover:text-orange-500"
                  }`}
                  style={
                    active
                      ? undefined
                      : {
                          backgroundColor: colors.filter,
                          borderColor: colors.cardBorder,
                          color: colors.filterText,
                        }
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULTS HEADER */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              className="text-base font-bold sm:text-lg"
              style={{ color: colors.heading }}
            >
              Available Studios
            </h2>

            <p
              className="mt-1 text-xs"
              style={{ color: colors.muted }}
            >
              Find the perfect place for your next project
            </p>
          </div>

          <span
            className="rounded-full border px-3 py-1.5 text-xs font-medium"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
              color: colors.text,
            }}
          >
            {loading
              ? "Loading..."
              : error
                ? "Unavailable"
                : `${filteredStudios.length} studios found`}
          </span>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div
            className="rounded-2xl border px-5 py-16 text-center shadow-sm"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
            }}
          >
            <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-[3px] border-orange-100 border-t-orange-500" />

            <p
              className="text-sm font-medium"
              style={{ color: colors.text }}
            >
              Loading studios from database...
            </p>

            <p
              className="mt-2 text-xs"
              style={{ color: colors.muted }}
            >
              Please wait while we find your spaces
            </p>
          </div>
        ) : error ? (
          /* ERROR STATE */
          <div
            className="rounded-2xl border px-5 py-14 text-center shadow-sm"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
            }}
          >
            <h2
              className="text-lg font-bold"
              style={{ color: colors.heading }}
            >
              Unable to Load Studios
            </h2>

            <p className="mt-2 text-sm text-red-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                setRetryCount((count) => count + 1)
              }
              className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Try Again
            </button>
          </div>
        ) : filteredStudios.length > 0 ? (
          /* STUDIO CARDS */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:gap-6">
            {filteredStudios.map((studio) => (
              <article
                key={studio._id}
                className="group min-w-0 overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.cardBorder,
                }}
              >
                {/* IMAGE */}
                <div
                  className="relative h-44 overflow-hidden sm:h-44 lg:h-48"
                  style={{
                    backgroundColor: colors.filter,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      studio.images?.[0] ||
                      fallbackImage
                    }
                    alt={studio.name}
                    loading="lazy"
                    onError={(event) => {
                      const image = event.currentTarget;

                      if (image.src !== fallbackImage) {
                        image.src = fallbackImage;
                      }
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span
                    className="absolute left-3 top-3 max-w-[85%] truncate rounded-full border px-3 py-1.5 text-[10px] font-bold text-orange-500 shadow-sm"
                    style={{
                      backgroundColor: colors.card,
                      borderColor: colors.cardBorder,
                    }}
                  >
                    {studio.category}
                  </span>
                </div>

                {/* CARD CONTENT */}
                <div className="p-4">
                  <p
                    className="mb-2 truncate text-xs"
                    style={{ color: colors.muted }}
                  >
                    📍 {studio.location}
                  </p>

                  <h3
                    className="mb-4 line-clamp-1 text-base font-bold"
                    style={{ color: colors.heading }}
                  >
                    {studio.name}
                  </h3>

                  <div
                    className="flex flex-wrap items-center justify-between gap-3 border-t pt-3"
                    style={{
                      borderColor: colors.divider,
                    }}
                  >
                    <div>
                      <p className="text-base font-extrabold text-orange-500">
                        ৳{formatPrice(studio.price)}

                        <span
                          className="ml-1 text-[11px] font-normal"
                          style={{
                            color: colors.muted,
                          }}
                        >
                          /hour
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-3.5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-orange-600"
                    >
                      View Details
                      <span className="ml-1.5">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div
            className="rounded-2xl border px-5 py-14 text-center shadow-sm"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
            }}
          >
            <div className="mb-3 text-3xl">
              🔍
            </div>

            <h2
              className="text-lg font-bold"
              style={{ color: colors.heading }}
            >
              No Studios Found
            </h2>

            <p
              className="mt-2 text-sm"
              style={{ color: colors.muted }}
            >
              Try searching with another name or category.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 px-4 py-16 text-center text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300">
          Loading studios...
        </main>
      }
    >
      <StudiosPageContent />
    </Suspense>
  );
}
