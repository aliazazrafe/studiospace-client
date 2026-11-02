
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#faf9f6] px-4 py-12 dark:bg-gray-950 sm:px-6">
      <div className="mx-auto w-full max-w-2xl text-center">
        {/* Studio Illustration */}
        <div className="relative mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/10 sm:h-48 sm:w-48">
          <div className="absolute -left-2 top-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-lg dark:bg-gray-800">
            🎬
          </div>

          <div className="absolute -right-3 bottom-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-lg dark:bg-gray-800">
            🎤
          </div>

          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-orange-500 text-5xl text-white shadow-xl shadow-orange-500/20 sm:h-28 sm:w-28">
            📷
          </div>
        </div>

        {/* Error Number */}
        <p className="text-sm font-bold uppercase tracking-[4px] text-orange-500">
          Lost Your Creative Space?
        </p>

        <h1 className="mt-3 text-7xl font-black tracking-tight text-gray-900 dark:text-white sm:text-8xl">
          4<span className="text-orange-500">0</span>4
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Oops! This Studio Is Missing
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
          The page you are looking for may have been moved,
          removed, or never existed. Don&apos;t worry — your
          next creative space is just a click away.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 sm:w-auto"
          >
            ← Back to Home
          </Link>

          <Link
            href="/studios"
            className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition hover:border-orange-400 hover:text-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white sm:w-auto"
          >
            Explore Studios →
          </Link>
        </div>

        {/* Bottom Message */}
        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            StudioSpace — Find Your Space. Create Your Story.
          </p>
        </div>
      </div>
    </main>
  );
}
