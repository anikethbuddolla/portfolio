export const profile = {
  name: "Aniketh Buddolla",
  title: "Full-Stack Software Engineer",
  bio: "I build fast, accessible web applications with a focus on clean architecture and great user experience. Currently turning ideas into production software at CPAL.",
  about:
    "I'm a software engineer who enjoys working across the stack — from designing intuitive interfaces to building reliable backend systems. I care about writing maintainable code, shipping thoughtfully, and continuously learning. Outside of work, I like exploring new tools, contributing to side projects, and staying curious about how things are built.",
  email: "aniketh.buddolla@gmail.com",
  github: "https://github.com/anikethbuddolla",
  linkedin: "https://www.linkedin.com/in/anikethbuddolla",
};

export type ProjectType = "personal" | "work";

export type Screenshot = {
  src: string;
  alt: string;
};

export type Project = {
  /** URL slug — used for /projects/[slug] */
  slug: string;
  title: string;
  type: ProjectType;
  year?: string;
  /** One sentence shown on the card and at the top of the detail page */
  oneLiner: string;
  /** The problem / why it existed */
  context: string;
  /** What YOU specifically did */
  role: string;
  /** Key technical decisions and tradeoffs (one bullet each) */
  approach: string[];
  tech: string[];
  /** Result — ideally with a number */
  outcome: string;
  screenshots: Screenshot[];
  /** Personal projects only */
  liveUrl?: string;
  /** Personal projects only */
  repoUrl?: string;
  /** Work projects: marks the source as unavailable under employer policy */
  sourcePrivate?: boolean;
};

/**
 * Example content — replace with your real projects.
 * Personal projects use liveUrl/repoUrl. Work projects use sourcePrivate
 * and anonymized screenshots (no links).
 */
export const projects: Project[] = [
  {
    slug: "portfolio",
    title: "Personal Portfolio",
    type: "personal",
    year: "2026",
    oneLiner:
      "A fast, accessible portfolio with detailed project case studies and a command palette.",
    context:
      "I needed a single, credible home for my work that loads instantly and is trivial to update.",
    role: "Sole designer and developer — from information architecture to deployment.",
    approach: [
      "Built on the Next.js App Router with fully static rendering for instant loads and zero hosting cost on Vercel.",
      "Centralized all content in a single typed data file, so adding a project is a one-object edit rather than a component change.",
      "Added a ⌘K command palette and j/k keyboard navigation to make browsing fast for power users.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    outcome:
      "Ships as static HTML with a 100 Lighthouse score; a new project takes about five minutes to add.",
    screenshots: [
      {
        src: "/projects/portfolio-1.svg",
        alt: "Portfolio home page showing the hero and project grid",
      },
    ],
    liveUrl: "https://anikethbuddolla.vercel.app",
    repoUrl: "https://github.com/anikethbuddolla/portfolio",
  },
  {
    slug: "markdown-notes",
    title: "Markdown Notes",
    type: "personal",
    year: "2025",
    oneLiner:
      "An offline-first notes app with live markdown preview and local-first persistence.",
    context:
      "I wanted a distraction-free notes tool that works without a network connection and never loses data.",
    role: "Designed and built the entire app, including the storage layer and editor.",
    approach: [
      "Used IndexedDB for local-first persistence so notes are always available offline and survive refreshes.",
      "Built an incremental markdown renderer that updates the preview without re-parsing the whole document.",
      "Kept the bundle tiny by avoiding heavyweight editor frameworks in favor of a focused custom textarea.",
    ],
    tech: ["React", "TypeScript", "IndexedDB", "Vite"],
    outcome:
      "Loads in under a second and works fully offline; used daily as my own scratchpad.",
    screenshots: [
      {
        src: "/projects/markdown-notes-1.svg",
        alt: "Markdown editor with live preview pane",
      },
      {
        src: "/projects/markdown-notes-2.svg",
        alt: "Notes list and search view",
      },
    ],
    liveUrl: "https://markdown-notes-demo.vercel.app",
    repoUrl: "https://github.com/anikethbuddolla/markdown-notes",
  },
  {
    slug: "analytics-platform",
    title: "Internal Analytics Platform",
    type: "work",
    year: "2025",
    oneLiner:
      "A real-time metrics platform used by internal teams to monitor product health.",
    context:
      "Teams lacked a shared view of key product metrics and relied on slow, manual reporting. The goal was a self-serve dashboard with near-real-time data.",
    role: "Led the frontend and owned the data-aggregation API; collaborated with two backend engineers.",
    approach: [
      "Designed a caching layer to keep dashboards responsive while serving frequently changing metrics.",
      "Built reusable, composable chart components so new dashboards could be assembled without custom code.",
      "Introduced incremental data loading so large date ranges render progressively instead of blocking.",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    outcome:
      "Cut time-to-insight from hours to seconds and was adopted by several internal teams.",
    screenshots: [
      {
        src: "/projects/analytics-platform-1.svg",
        alt: "Anonymized analytics dashboard with charts (sample data)",
      },
      {
        src: "/projects/analytics-platform-2.svg",
        alt: "Anonymized metric detail view (sample data)",
      },
    ],
    sourcePrivate: true,
  },
  {
    slug: "payments-reconciliation",
    title: "Payments Reconciliation Service",
    type: "work",
    year: "2024",
    oneLiner:
      "A backend service that reconciles large volumes of daily transactions across providers.",
    context:
      "Manual reconciliation was error-prone and could not keep up with transaction growth. The team needed an automated, auditable pipeline.",
    role: "Designed and implemented the reconciliation engine and its alerting.",
    approach: [
      "Modeled reconciliation as an idempotent batch pipeline so re-runs are always safe.",
      "Added structured discrepancy reporting so finance could investigate mismatches without engineering help.",
      "Containerized the service for reproducible deploys and straightforward horizontal scaling.",
    ],
    tech: ["Python", "PostgreSQL", "Docker", "AWS"],
    outcome:
      "Automated a previously manual process and surfaced discrepancies within minutes instead of days.",
    screenshots: [
      {
        src: "/projects/payments-reconciliation-1.svg",
        alt: "Anonymized reconciliation report (sample data)",
      },
    ],
    sourcePrivate: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frameworks",
    items: ["Next.js", "React", "Node.js", "Express", "Tailwind CSS"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "PostgreSQL", "Vercel", "GitHub Actions", "Figma"],
  },
];
