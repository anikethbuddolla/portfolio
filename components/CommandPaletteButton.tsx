"use client";

export default function CommandPaletteButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("command-palette:open"))}
      aria-label="Open command palette"
      className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-2.5 py-1.5 font-mono text-xs text-slate-500 transition-colors hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-400"
    >
      <span className="hidden sm:inline">Search</span>
      <kbd className="rounded border border-slate-300 px-1 dark:border-slate-600">
        ⌘K
      </kbd>
    </button>
  );
}
