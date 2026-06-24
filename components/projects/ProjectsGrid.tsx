"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project, ProjectType } from "@/lib/data";
import ProjectCard from "./ProjectCard";

type Filter = "all" | ProjectType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "personal", label: "Personal" },
  { value: "work", label: "Work" },
];

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [tech, setTech] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const allTech = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tech))).sort(),
    [projects],
  );

  const visible = useMemo(
    () =>
      projects.filter(
        (p) =>
          (filter === "all" || p.type === filter) &&
          (tech === null || p.tech.includes(tech)),
      ),
    [projects, filter, tech],
  );

  // Reset the keyboard cursor whenever the visible set changes.
  useEffect(() => {
    setActiveIndex(-1);
  }, [filter, tech]);

  // Prefetch detail pages so keyboard/click navigation is instant.
  useEffect(() => {
    projects.forEach((p) => router.prefetch(`/projects/${p.slug}`));
  }, [projects, router]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Don't hijack typing, or modifier combos (e.g. ⌘K for the palette).
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (visible.length === 0) return;

      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % visible.length);
      } else if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? visible.length - 1 : i - 1));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        router.push(`/projects/${visible[activeIndex].slug}`);
      } else if (e.key === "Escape") {
        setActiveIndex(-1);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, activeIndex, router]);

  // Keep the active card scrolled into view.
  useEffect(() => {
    if (activeIndex < 0 || !containerRef.current) return;
    const cards =
      containerRef.current.querySelectorAll<HTMLElement>("[data-project-card]");
    cards[activeIndex]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeIndex]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-slate-200 p-1 dark:border-slate-800">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`rounded-md px-3 py-1.5 font-mono text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-accent text-white"
                  : "text-slate-600 hover:text-accent dark:text-slate-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className="ml-auto font-mono text-xs text-slate-400">
          {visible.length} {visible.length === 1 ? "project" : "projects"} · press{" "}
          <kbd className="rounded border border-slate-300 px-1 dark:border-slate-700">
            j
          </kbd>{" "}
          <kbd className="rounded border border-slate-300 px-1 dark:border-slate-700">
            k
          </kbd>{" "}
          to navigate
        </span>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTech(null)}
          className={`rounded-full px-3 py-1 font-mono text-xs font-medium transition-colors ${
            tech === null
              ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          all tech
        </button>
        {allTech.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTech((cur) => (cur === t ? null : t))}
            className={`rounded-full px-3 py-1 font-mono text-xs font-medium transition-colors ${
              tech === t
                ? "bg-accent text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="font-mono text-sm text-slate-500">
          No projects match this filter.
        </p>
      ) : (
        <div ref={containerRef} className="grid gap-6 sm:grid-cols-2">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              active={i === activeIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}
