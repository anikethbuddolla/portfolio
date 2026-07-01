"use client";

import { useEffect, useState } from "react";

const SPEED_MS = 70; // per character

export default function TypedName({ text }: { text: string }) {
  // Start fully typed: the SSR HTML and the first (hydration-matching) client
  // render both contain the real name, which keeps it as the LCP element and
  // visible to search engines and no-JS visitors.
  const [count, setCount] = useState(text.length);
  const [done, setDone] = useState(true);

  useEffect(() => {
    // Respect reduced motion: leave the full name in place, no typing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let intervalId: number | undefined;
    function start() {
      setCount(0);
      setDone(false);
      let i = 0;
      intervalId = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          window.clearInterval(intervalId);
          setDone(true);
        }
      }, SPEED_MS);
    }

    // Defer the typing loop to idle so it stays out of the hydration /
    // Total-Blocking-Time window. The full name is already painted (it's the
    // LCP text); the animation just replays once the main thread is free.
    const ric =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : null;
    const handle = ric ? ric(start) : window.setTimeout(start, 200);

    return () => {
      if (ric) window.cancelIdleCallback(handle);
      else clearTimeout(handle);
      if (intervalId) window.clearInterval(intervalId);
    };
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
