"use client";

import { useEffect, useRef, useState } from "react";

// Fades + rises its children into view the first time they scroll onto screen.
// Uses IntersectionObserver, so it works in every browser (the previous CSS
// scroll-timeline reveal only ran in Chrome/Edge). The hidden starting state
// lives in CSS gated behind the `js` class on <html>, so content stays fully
// visible when JavaScript is unavailable.
export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: show immediately, no animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect(); // reveal once, then stop observing
        }
      },
      // Fire as the section's top edge rises ~10% into the viewport.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-up ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
