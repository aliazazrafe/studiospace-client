
"use client";

import { useState } from "react";

type Props = {
  images: string[];
  studioName: string;
};

export default function StudioGallery({
  images,
  studioName,
}: Props) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);

  const photos = images.filter(Boolean);
  const index = Math.min(active, Math.max(photos.length - 1, 0));
  const current = photos[index];

  const changeImage = (direction: number) => {
    setActive((prev) =>
      (prev + direction + photos.length) % photos.length
    );
  };

  return (
    <div className="w-full">
      <div className="relative h-[260px] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 sm:h-[400px] lg:h-[480px]">
        {current && !failed.includes(current) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current}
            alt={`${studioName} - Image ${index + 1}`}
            className="h-full w-full object-cover"
            onError={() =>
              setFailed((prev) => [...prev, current])
            }
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
            Studio image unavailable
          </div>
        )}

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => changeImage(-1)}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-2 text-xl text-white transition hover:bg-black/70"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() => changeImage(1)}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-2 text-xl text-white transition hover:bg-black/70"
            >
              ›
            </button>

            <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">
              {index + 1} / {photos.length}
            </div>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {photos.map((photo, i) => (
            <button
              key={`${photo}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={index === i}
              className={`h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                index === i
                  ? "border-orange-500"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {!failed.includes(photo) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo}
                  alt={`${studioName} thumbnail ${i + 1}`}
                  className="h-full w-full object-cover"
                  onError={() =>
                    setFailed((prev) => [...prev, photo])
                  }
                />
              ) : (
                <span className="flex h-full items-center justify-center bg-slate-100 text-xs text-slate-500 dark:bg-slate-800">
                  No image
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
