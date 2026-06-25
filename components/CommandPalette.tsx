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
  // This listener is tiny and is all that ships up front.
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
    window.addEventListener("keydown", onKey);
    window.addEventListener("command-palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("command-palette:open", onOpen);
    };
  }, []);

  if (!open) return null;
  return <CommandPalettePanel onClose={() => setOpen(false)} />;
}
