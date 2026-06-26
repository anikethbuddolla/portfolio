"use client";

import { useEffect, useLayoutEffect, useState } from "react";

// useLayoutEffect on the client (so we can rewind to zero *before* the browser
// paints, avoiding a flash of the full name), but a no-op on the server.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SPEED_MS = 70; // per character

export default function TypedName({ text }: { text: string }) {
  // Start fully typed: the SSR HTML and the first (hydration-matching) client
  // render both contain the real name, which keeps it as the LCP element and
  // visible to search engines and no-JS visitors.
  const [count, setCount] = useState(text.length);
  const [done, setDone] = useState(true);

  useIsoLayoutEffect(() => {
    // Respect reduced motion: leave the full name in place, no typing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setCount(0);
    setDone(false);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, SPEED_MS);
    return () => window.clearInterval(id);
  }, [text]);

  return (
    <span className="relative inline-block whitespace-nowrap">
      {/* Animated text — hidden from assistive tech so it isn't announced
          letter by letter; the sr-only sibling carries the full name. */}
      <span aria-hidden>{text.slice(0, count)}</span>
      <span
        aria-hidden
        className={`type-caret bg-accent ${done ? "type-caret--done" : ""}`}
      />
      <span className="sr-only">{text}</span>
    </span>
  );
}
