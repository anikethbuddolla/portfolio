"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const progress = max > 0 ? el.scrollTop / max : 0;
      const bar = barRef.current;
      // Write straight to the DOM — no React re-render per frame, and
      // transform/scaleX composites on the GPU (unlike animating width).
      if (bar) bar.style.transform = `scaleX(${progress})`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[55] h-0.5 bg-transparent"
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-accent transition-transform duration-150 ease-out"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
