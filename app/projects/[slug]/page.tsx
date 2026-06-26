import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScreenshotGallery from "@/components/projects/ScreenshotGallery";
import LiveDemoEmbed from "@/components/projects/LiveDemoEmbed";
import { TypeBadge, StatusBadge } from "@/components/projects/Badge";
import { getProject, projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Case study`,
    description: project.oneLiner,
  };
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.21.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.81 0-1.28.47-2.33 1.23-3.15-.12-.3-.53-1.51.12-3.15 0 0 1.01-.32 3.3 1.2a11.6 11.6 0 0 1 3-.4c1.02 0 2.05.13 3 .4 2.29-1.52 3.3-1.2 3.3-1.2.65 1.64.24 2.85.12 3.15.77.82 1.23 1.87 1.23 3.15 0 4.51-2.81 5.5-5.49 5.79.43.36.81 1.09.81 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
    </svg>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
        {label}
      </h2>
      <div className="text-slate-600 dark:text-slate-300">{children}</div>
    </div>
  );
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  // A bundled, same-origin demo (path starts with "/") can be embedded live.
  const canEmbed = !!project.liveUrl && project.liveUrl.startsWith("/");

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/#projects"
          className="font-mono text-sm text-slate-500 transition-colors hover:text-accent"
        >
          ← back to projects
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <TypeBadge type={project.type} />
          <StatusBadge project={project} />
          {project.year && (
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
              {project.year}
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {project.oneLiner}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 font-mono text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              View live ↗
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 font-mono text-sm font-semibold text-slate-700 transition-colors hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-200"
            >
              <GitHubIcon />
              View code
            </a>
          )}
          {project.sourcePrivate && (
            <span className="inline-flex items-center rounded-lg border border-dashed border-slate-300 px-4 py-2 font-mono text-sm text-slate-500 dark:border-slate-700">
              Source private under employer policy
            </span>
          )}
        </div>

        {project.inProgress ? (
          <div className="mt-12 rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
            <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
              🚧 This project is currently in progress. A full write-up, tech
              stack, and screenshots are coming soon.
            </p>
          </div>
        ) : (
          <>
            {canEmbed ? (
              <figure className="mt-12">
                <LiveDemoEmbed
                  url={project.liveUrl!}
                  label={`${project.title} — live demo`}
                />
                <figcaption className="mt-3 text-center font-mono text-xs text-slate-500 dark:text-slate-400">
                  Live, interactive — try it right here, or open it in a new tab.
                </figcaption>
              </figure>
            ) : (
              project.screenshots.length > 0 && (
                <div className="mt-12">
                  <ScreenshotGallery screenshots={project.screenshots} />
                </div>
              )
            )}

            <div className="mt-12 space-y-10">
              <Field label="Context">
                <p className="leading-relaxed">{project.context}</p>
              </Field>

              {project.role && (
                <Field label="My role">
                  <p className="leading-relaxed">{project.role}</p>
                </Field>
              )}

              <Field label="Approach">
                <ul className="space-y-2">
                  {project.approach.map((point, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed">
                      <span className="select-none font-mono text-accent">
                        →
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Field>

              <Field label="Stack">
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </Field>

              <Field label="Outcome">
                <p className="leading-relaxed">{project.outcome}</p>
              </Field>
            </div>
          </>
        )}

        <nav className="mt-16 flex justify-between gap-4 border-t border-slate-200 pt-6 font-mono text-sm dark:border-slate-800">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="text-slate-500 transition-colors hover:text-accent"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="text-right text-slate-500 transition-colors hover:text-accent"
            >
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
      <Footer />
    </>
  );
}
