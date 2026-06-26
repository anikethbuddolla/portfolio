"use client";

import { useEffect, useState } from "react";

// Short status that cycles in the hero terminal. Kept deliberately light —
// one timer, a text swap every couple seconds. Holds on the first phrase
// under reduced-motion.
const PHRASES = ["coding", "building", "shipping", "vibing"];

export default function TerminalStatus() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setI((n) => (n + 1) % PHRASES.length),
      2200,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <span>
      <span className="text-slate-400">currently </span>
      <span className="text-emerald-400">{PHRASES[i]}</span>
      <span className="term-cursor ml-1 inline-block h-4 w-2 translate-y-0.5 bg-slate-300 align-middle" />
    </span>
  );
}
