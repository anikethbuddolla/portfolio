import Section from "./Section";
import ProjectsGrid from "./projects/ProjectsGrid";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ProjectsGrid projects={projects} />
    </Section>
  );
}
