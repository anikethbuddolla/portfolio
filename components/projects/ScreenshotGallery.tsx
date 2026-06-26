"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Screenshot } from "@/lib/data";

export default function ScreenshotGallery({
  screenshots,
}: {
  screenshots: Screenshot[];
}) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % screenshots.length)),
    [screenshots.length],
  );
  const prev = useCallback(
    () =>
      setOpen((i) =>
        i === null ? i : (i - 1 + screenshots.length) % screenshots.length,
      ),
    [screenshots.length],
  );

  useEffect(() => {
    if (open === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  if (screenshots.length === 0) return null;

  return (
    <>
      <div
        className={`grid gap-4 ${screenshots.length > 1 ? "sm:grid-cols-2" : ""}`}
      >
        {screenshots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-950 text-left transition-shadow hover:shadow-lg dark:border-slate-800"
          >
            <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-900 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <Image
              src={shot.src}
              alt={shot.alt}
              width={1600}
              height={1000}
              unoptimized={shot.src.endsWith(".svg")}
              className="h-auto w-full transition-transform group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot viewer"
          onClick={close}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          >
            ✕
          </button>

          {screenshots.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous screenshot"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:left-4"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next screenshot"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:right-4"
              >
                ›
              </button>
            </>
          )}

          <figure
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full w-full max-w-5xl flex-col items-center"
          >
            <Image
              src={screenshots[open].src}
              alt={screenshots[open].alt}
              width={1600}
              height={1000}
              unoptimized={screenshots[open].src.endsWith(".svg")}
              className="h-auto max-h-[78vh] w-auto max-w-full rounded-lg object-contain"
            />
            <figcaption className="mt-3 px-10 text-center text-sm text-white/60">
              {screenshots[open].alt}
              {screenshots.length > 1 && (
                <span className="ml-2 whitespace-nowrap">
                  ({open + 1}/{screenshots.length})
                </span>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
