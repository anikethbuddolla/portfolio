"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// The panel holds the heavy UI, the data.ts imports, and the filtering logic.
// Loading it lazily keeps all of that out of the initial bundle — it only
// downloads/evaluates the first time the palette is opened.
const CommandPalettePanel = dynamic(() => import("./CommandPalettePanel"), {
  ssr: false,
});

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  // Global ⌘K / Ctrl+K toggle, plus a custom event for the nav button.
  // Registering the listeners is deferred to idle time so it stays out of the
  // initial hydration/Total-Blocking-Time window — the palette isn't needed
  // until the user actually reaches for it.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    function register() {
      window.addEventListener("keydown", onKey);
      window.addEventListener("command-palette:open", onOpen);
    }

    // Safari historically lacked requestIdleCallback — fall back to a short
    // timeout there. typeof keeps TS from treating the API as always present.
    const ric =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : null;
    const handle = ric ? ric(register) : window.setTimeout(register, 200);

    return () => {
      if (ric) window.cancelIdleCallback(handle);
      else clearTimeout(handle);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("command-palette:open", onOpen);
    };
  }, []);

  if (!open) return null;
  return <CommandPalettePanel onClose={() => setOpen(false)} />;
}
