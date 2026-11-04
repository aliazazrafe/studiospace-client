"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
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
};

const categories = [
  "All Studios",
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
  "Creative Workspaces",
  "Other Creative Spaces",
];

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
  "Creative Workspace":
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop",
  Other:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop",
};

const defaultImage =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD").format(price);

function getCategoryFallback(category: string) {
  return fallbackImages[category] ?? defaultImage;
}

function StudiosPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [studios, setStudios] = useState<Studio[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

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

        const data: StudiosResponse = await response.json();

        if (!data.success || !Array.isArray(data.studios)) {
          throw new Error("Invalid studio API response.");
        }

        setStudios(data.studios);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchStudios();

    return () => controller.abort();
  }, [apiUrl, retryCount]);

  const categoryFromUrl = searchParams.get("category");
  const selectedCategory =
    categoryFromUrl && categories.includes(categoryFromUrl)
      ? categoryFromUrl
      : "All Studios";

  function updateUrl(searchValue: string, categoryValue: string) {
    const params = new URLSearchParams(searchParams.toString());
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

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  const filteredStudios = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return studios.filter((studio) => {
      const categoryText = studio.category.toLowerCase();

      const categoryMatches =
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
          categoryText === "art workshop") ||
        (selectedCategory === "Creative Workspaces" &&
          categoryText === "creative workspace") ||
        (selectedCategory === "Other Creative Spaces" &&
          categoryText === "other");

      const searchMatches =
        studio.name.toLowerCase().includes(searchText) ||
        studio.location.toLowerCase().includes(searchText) ||
        categoryText.includes(searchText);

      return categoryMatches && searchMatches;
    });
  }, [studios, search, selectedCategory]);

  const pageBg = isDark
    ? "bg-slate-950 text-slate-50"
    : "bg-slate-50 text-slate-900";
  const cardBg = isDark
    ? "bg-slate-900 border-slate-700"
    : "bg-white border-slate-200";
  const mutedText = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <main className={`min-h-screen w-full overflow-x-hidden ${pageBg}`}>
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="mb-8 text-center">
          <p className="mb-3 inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-600 dark:border-orange-900 dark:bg-orange-950">
            Discover Your Space
          </p>

          <h1 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            Explore Creative <span className="text-orange-500">Studios</span>
          </h1>

          <p className={`mx-auto mt-3 max-w-xl text-sm leading-6 ${mutedText}`}>
            Discover inspiring spaces for photography, music, podcasting and
            your next creative project.
          </p>
        </header>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            updateUrl(search, selectedCategory);
          }}
          className={`mx-auto mb-6 flex max-w-2xl items-center gap-3 rounded-2xl border px-4 shadow-sm focus-within:border-orange-500 ${cardBg}`}
        >
          <span aria-hidden="true" className="text-slate-400">
            ⌕
          </span>

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by studio name, category or location..."
            aria-label="Search studios"
            className="w-full min-w-0 bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400"
          />

          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                updateUrl("", selectedCategory);
              }}
              className="text-xs font-semibold text-orange-500"
            >
              Clear
            </button>
          )}
        </form>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
          {categories.map((category) => {
            const active = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => updateUrl(search, category)}
                aria-pressed={active}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold ${
                  active
                    ? "border-orange-500 bg-orange-500 text-white"
                    : `${cardBg} hover:border-orange-400 hover:text-orange-500`
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">Available Studios</h2>
            <p className={`mt-1 text-xs ${mutedText}`}>
              Find the perfect place for your next project
            </p>
          </div>

          <span className={`rounded-full border px-3 py-1.5 text-xs ${cardBg}`}>
            {loading
              ? "Loading..."
              : error
                ? "Unavailable"
                : `${filteredStudios.length} studios found`}
          </span>
        </div>

        {loading ? (
          <div className={`rounded-2xl border px-5 py-16 text-center ${cardBg}`}>
            <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-[3px] border-orange-100 border-t-orange-500" />
            <p className={`text-sm ${mutedText}`}>
              Loading studios from database...
            </p>
          </div>
        ) : error ? (
          <div className={`rounded-2xl border px-5 py-14 text-center ${cardBg}`}>
            <h2 className="text-lg font-bold">Unable to Load Studios</h2>
            <p className="mt-2 text-sm text-red-500">{error}</p>

            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Try Again
            </button>
          </div>
        ) : filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {filteredStudios.map((studio) => {
              const savedImage = studio.images?.find(
                (image) =>
                  typeof image === "string" && image.trim().length > 0
              );

              const image =
                savedImage || getCategoryFallback(studio.category);

              return (
                <article
                  key={studio._id}
                  className={`group min-w-0 overflow-hidden rounded-2xl border shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${cardBg}`}
                >
                  <div className="relative h-44 overflow-hidden bg-slate-200 sm:h-44 lg:h-48">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={studio.name}
                      loading="lazy"
                      onError={(event) => {
                        const fallback = getCategoryFallback(studio.category);

                        if (event.currentTarget.src !== fallback) {
                          event.currentTarget.src = fallback;
                        }
                      }}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span
                      className={`absolute left-3 top-3 max-w-[85%] truncate rounded-full border px-3 py-1.5 text-[10px] font-bold text-orange-500 shadow-sm ${cardBg}`}
                    >
                      {studio.category}
                    </span>
                  </div>

                  <div className="p-4">
                    <p className={`mb-2 truncate text-xs ${mutedText}`}>
                      📍 {studio.location}
                    </p>

                    <h3 className="mb-4 line-clamp-1 text-base font-bold">
                      {studio.name}
                    </h3>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3 dark:border-slate-700">
                      <p className="text-base font-extrabold text-orange-500">
                        ৳{formatPrice(studio.price)}
                        <span className={`ml-1 text-[11px] font-normal ${mutedText}`}>
                          /hour
                        </span>
                      </p>

                      <Link
                        href={`/studios/${studio._id}`}
                        className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-3.5 py-2.5 text-xs font-semibold text-white hover:bg-orange-600"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={`rounded-2xl border px-5 py-14 text-center ${cardBg}`}>
            <div className="mb-3 text-3xl">🔍</div>
            <h2 className="text-lg font-bold">No Studios Found</h2>
            <p className={`mt-2 text-sm ${mutedText}`}>
              Try another search or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                updateUrl("", "All Studios");
              }}
              className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white"
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