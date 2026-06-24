"use client";

export default function CommandPaletteButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("command-palette:open"))}
      aria-label="Open search"
      className="inline-flex h-11 items-center gap-2 rounded-md border border-slate-300 px-3 text-xs text-slate-500 transition-colors hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-400"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span className="hidden font-mono sm:inline">Search</span>
      <kbd className="hidden rounded border border-slate-300 px-1 font-mono dark:border-slate-600 sm:inline">
        ⌘K
      </kbd>
    </button>
  );
}
