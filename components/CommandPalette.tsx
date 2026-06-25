"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { projects, profile } from "@/lib/data";

type Command = {
  id: string;
  label: string;
  hint: string;
  keywords?: string;
  run: (router: ReturnType<typeof useRouter>) => void;
};

function go(href: string) {
  return (router: ReturnType<typeof useRouter>) => router.push(href);
}

const navCommands: Command[] = [
  { id: "home", label: "Home", hint: "section", run: go("/") },
  { id: "about", label: "About", hint: "section", run: go("/#about") },
  {
    id: "experience",
    label: "Experience",
    hint: "section",
    run: go("/#experience"),
  },
  { id: "projects", label: "Projects", hint: "section", run: go("/#projects") },
  { id: "resume", label: "Resume", hint: "section", run: go("/#resume") },
  { id: "contact", label: "Contact", hint: "section", run: go("/#contact") },
];

const projectCommands: Command[] = projects.map((p) => ({
  id: `project-${p.slug}`,
  label: p.title,
  hint: p.type === "personal" ? "personal project" : "work project",
  keywords: `${p.tech.join(" ")} ${p.oneLiner}`,
  run: go(`/projects/${p.slug}`),
}));

const linkCommands: Command[] = [
  {
    id: "email",
    label: "Email me",
    hint: "external",
    keywords: profile.email,
    run: () => {
      window.location.href = `mailto:${profile.email}`;
    },
  },
  {
    id: "github",
    label: "GitHub",
    hint: "external",
    run: () => window.open(profile.github, "_blank", "noopener,noreferrer"),
  },
  ...(profile.linkedin
    ? [
        {
          id: "linkedin",
          label: "LinkedIn",
          hint: "external",
          run: () =>
            window.open(profile.linkedin, "_blank", "noopener,noreferrer"),
        },
      ]
    : []),
];

const ALL: Command[] = [...navCommands, ...projectCommands, ...linkCommands];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL;
    return ALL.filter((c) =>
      `${c.label} ${c.hint} ${c.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [query]);

  // Global ⌘K / Ctrl+K toggle, plus a custom event for the nav button.
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

  // Reset state each time it opens.
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      // Focus after paint.
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  function onListKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((i) =>
        i <= 0 ? Math.max(results.length - 1, 0) : i - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = results[selected];
      if (cmd) {
        setOpen(false);
        cmd.run(router);
      }
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="flex items-center gap-2 border-b border-slate-200 px-4 dark:border-slate-700">
          <span className="font-mono text-sm text-accent">&gt;</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onListKey}
            aria-label="Search sections, projects, and links"
            placeholder="Jump to a section, project, or link…"
            className="w-full bg-transparent py-4 font-mono text-sm outline-none placeholder:text-slate-500 dark:placeholder:text-slate-400"
          />
          <kbd className="rounded border border-slate-300 px-1.5 py-0.5 font-mono text-xs text-slate-500 dark:border-slate-600 dark:text-slate-400">
            esc
          </kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center font-mono text-sm text-slate-500 dark:text-slate-400">
              No matches
            </li>
          )}
          {results.map((cmd, i) => (
            <li key={cmd.id}>
              <button
                type="button"
                onMouseEnter={() => setSelected(i)}
                onClick={() => {
                  setOpen(false);
                  cmd.run(router);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left font-mono text-sm transition-colors ${
                  i === selected
                    ? "bg-accent text-white"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                <span>{cmd.label}</span>
                <span
                  className={`text-xs ${
                    i === selected
                      ? "text-white/70"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {cmd.hint}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
