
"use client";

import { useState } from "react";
import Image from "next/image";

type StudioGalleryProps = {
  images: string[];
  studioName: string;
};

export default function StudioGallery({
  images,
  studioName,
}: StudioGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = images.length;

  if (total === 0) {
    return null;
  }

  const currentIndex = activeIndex % total;

  const nextImage = () => {
    setActiveIndex((index) => (index + 1) % total);
  };

  const previousImage = () => {
    setActiveIndex((index) => (index - 1 + total) % total);
  };

  return (
    <section aria-label={`${studioName} photo gallery`}>
      <div className="relative h-[260px] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 sm:h-[380px] lg:h-[480px]">
        <Image
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`${studioName} - photo ${currentIndex + 1}`}
          fill
          priority={currentIndex === 0}
          unoptimized
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="object-cover"
        />

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous studio image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-slate-900 shadow-md transition hover:bg-orange-500 hover:text-white"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next studio image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-slate-900 shadow-md transition hover:bg-orange-500 hover:text-white"
            >
              ›
            </button>

            <div className="absolute bottom-4 right-4 rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white">
              {currentIndex + 1} / {total}
            </div>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show studio image ${index + 1}`}
              aria-pressed={index === currentIndex}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-28 ${
                index === currentIndex
                  ? "border-orange-500"
                  : "border-transparent opacity-65 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${studioName} thumbnail ${index + 1}`}
                fill
                unoptimized
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
