export const profile = {
  name: "Aniketh Buddolla",
  title: "Full-Stack & AI Engineer",
  bio: "Full-stack software engineer who ships fast, accessible web apps in TypeScript and Next.js — and builds the AI agents and tooling around them. I work hands-on with the Claude API, Claude Code, and MCP to design and ship custom agents, and I'm currently building production software at CPAL.",
  about:
    "I work across the stack, from interface to deployment, and I care most about shipping software that's correct, fast, and maintainable. A growing share of my work is applied AI — building agents and developer tooling with the Claude API, Claude Code, and the Model Context Protocol, and figuring out where automation genuinely helps versus where it just adds noise. I'm happiest turning a vague problem into a small, well-built system that solves it.",
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
  /** Add anonymized raster images (png/jpg) to /public/projects/ and list them here */
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
      "A fast, accessible portfolio built agentically with Claude Code — with detailed case studies and a command palette.",
    context:
      "I needed a single, credible home for my work that loads instantly and is trivial to update.",
    role: "Sole designer and developer — from information architecture to deployment.",
    approach: [
      "Built on the Next.js App Router with fully static rendering for instant loads and zero hosting cost on Vercel.",
      "Drove the build agentically with Claude Code — scaffolding, the command palette, accessibility fixes, and Lighthouse passes.",
      "Centralized all content in a single typed data file, so adding a project is a one-object edit rather than a component change.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Claude Code", "Vercel"],
    outcome:
      "Scores 100 on desktop Lighthouse (96 on mobile) and ships as static HTML; adding a project is a one-object edit.",
    screenshots: [],
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
    screenshots: [],
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
    screenshots: [],
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
    screenshots: [],
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
    category: "AI & Agents",
    items: [
      "Claude API",
      "Claude Code",
      "MCP (Model Context Protocol)",
      "Agent design",
      "Prompt engineering",
      "RAG",
    ],
  },
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

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
};

// PLACEHOLDER — replace with your real roles and accomplishments.
export const experience: ExperienceItem[] = [
  {
    company: "CPAL",
    role: "Full-Stack & AI Engineer",
    period: "20XX — Present",
    location: "Remote",
    bullets: [
      "Replace with a specific thing you built or owned — ideally with a measurable result.",
      "Add another concrete accomplishment (a system you shipped, a problem you solved, the impact).",
    ],
  },
  {
    company: "Previous Company",
    role: "Your Role",
    period: "20XX — 20XX",
    bullets: ["Replace with a real accomplishment from this role."],
  },
];

export type EducationItem = {
  school: string;
  credential: string;
  period: string;
  details?: string;
};

// PLACEHOLDER — replace with your real education.
export const education: EducationItem[] = [
  {
    school: "Your University",
    credential: "B.S. in Computer Science",
    period: "20XX — 20XX",
    details: "Optional: honors, relevant coursework, or activities.",
  },
];

// PLACEHOLDER — list certifications, or empty this array to hide the section.
export const certifications: string[] = [
  "Add a certification (e.g., AWS Certified Developer) — or remove this list.",
];

// PLACEHOLDER — a one- or two-line résumé summary.
export const resumeSummary =
  "One- or two-line professional summary for the top of your résumé — who you are and what you do best.";
