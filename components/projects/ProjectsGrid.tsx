import type { Project } from "@/lib/data";
import ProjectCard from "./ProjectCard";

// A plain grid — no filtering or keyboard nav. With only a handful of projects,
// the whole set fits on screen at once, so a filter UI added chrome without
// aiding discovery. Dropping it also makes this a zero-JS server component.
export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
