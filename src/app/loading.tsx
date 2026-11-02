
export default function Loading() {
  return (
    <main className="flex min-h-[75vh] w-full items-center justify-center bg-white px-4">
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center text-center"
      >
        {/* Animated Loading Spinner */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl font-bold text-orange-500">
            S
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="mt-6 text-xl font-bold tracking-tight text-gray-900">
          Studio<span className="text-orange-500">Space</span>
        </h1>

        {/* Loading Message */}
        <p className="mt-2 text-sm text-gray-500">
          Preparing your creative experience...
        </p>

        {/* Animated Dots */}
        <div className="mt-5 flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500" />

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-orange-400"
            style={{ animationDelay: "150ms" }}
          />

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-orange-300"
            style={{ animationDelay: "300ms" }}
          />
        </div>

        {/* Screen Reader Text */}
        <span className="sr-only">
          Loading StudioSpace page content
        </span>
      </div>
    </main>
  );
}
