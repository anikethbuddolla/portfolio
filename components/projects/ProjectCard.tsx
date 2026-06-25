import Link from "next/link";
import type { Project } from "@/lib/data";
import { TypeBadge, StatusBadge } from "./Badge";

type ProjectCardProps = {
  project: Project;
  active?: boolean;
};

export default function ProjectCard({ project, active }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-project-card
      className={`group card-hover flex flex-col rounded-xl border bg-white p-6 outline-none dark:bg-slate-900 ${
        active
          ? "border-accent ring-2 ring-accent/40"
          : "border-slate-200 dark:border-slate-800"
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <TypeBadge type={project.type} />
        <StatusBadge project={project} />
        {project.year && (
          <span className="ml-auto font-mono text-xs text-slate-500 dark:text-slate-400">
            {project.year}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {project.oneLiner}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {tech}
          </li>
        ))}
      </ul>
      <span className="mt-5 inline-flex items-center gap-1 font-mono text-sm font-medium text-accent">
        View case study
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
