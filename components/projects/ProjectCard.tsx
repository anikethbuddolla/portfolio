import Link from "next/link";
import Image from "next/image";
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
      className={`group reveal-item card-hover flex flex-col overflow-hidden rounded-xl border bg-white outline-none dark:bg-slate-900 ${
        active
          ? "border-accent ring-2 ring-accent/40"
          : "border-slate-200 dark:border-slate-800"
      }`}
    >
      {/* Thumbnail (or a branded placeholder when there's no image yet) */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-slate-200 dark:border-slate-800">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={`${project.title} preview`}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/10 via-slate-100 to-slate-200 dark:via-slate-800 dark:to-slate-900">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {project.inProgress ? "In progress" : project.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
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
      </div>
    </Link>
  );
}
