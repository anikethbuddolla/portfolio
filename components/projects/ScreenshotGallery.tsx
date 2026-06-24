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
      <div className="grid gap-4 sm:grid-cols-2">
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
            className="absolute right-4 top-4 rounded-md p-2 font-mono text-sm text-white/70 hover:text-white"
          >
            esc ✕
          </button>
          <figure
            onClick={(e) => e.stopPropagation()}
            className="max-h-full w-full max-w-5xl"
          >
            <Image
              src={screenshots[open].src}
              alt={screenshots[open].alt}
              width={1600}
              height={1000}
              unoptimized={screenshots[open].src.endsWith(".svg")}
              className="h-auto w-full rounded-lg"
            />
            <figcaption className="mt-3 text-center font-mono text-sm text-white/60">
              {screenshots[open].alt}
              {screenshots.length > 1 && (
                <span className="ml-2">
                  ({open + 1}/{screenshots.length} · ← → to browse)
                </span>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
