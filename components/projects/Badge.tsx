import type { Project } from "@/lib/data";

export function TypeBadge({ type }: { type: Project["type"] }) {
  const isPersonal = type === "personal";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-xs font-medium ${
        isPersonal
          ? "bg-accent/10 text-accent dark:bg-accent/20"
          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
      }`}
    >
      {isPersonal ? "personal" : "work"}
    </span>
  );
}

export function StatusBadge({ project }: { project: Project }) {
  if (project.liveUrl) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-xs font-medium text-emerald-800 dark:text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        live
      </span>
    );
  }
  if (project.sourcePrivate) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2 py-0.5 font-mono text-xs font-medium text-amber-800 dark:text-amber-300">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        source private
      </span>
    );
  }
  return null;
}
