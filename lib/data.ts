export const profile = {
  name: "Aniketh Buddolla",
  title: "Student Developer · AI & Software",
  about:
    "Hi, my name is Aniketh Buddolla, and I am a senior at Westside High School in Houston, Texas. My interests include artificial intelligence, software engineering, and chemical engineering. I started coding at a young age and have since developed a wide variety of projects while expanding my technical skills. I'm passionate about exploring how technology and engineering can solve real-world problems, particularly in areas such as environmental innovation and sustainable energy.",
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
  /** What YOU specifically did (optional — omit for solo projects) */
  role?: string;
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
  /** Project is still being built — shows an "in progress" badge */
  inProgress?: boolean;
};

export const projects: Project[] = [
  {
    slug: "design-system-lab",
    title: "Design System Lab",
    type: "work",
    year: "2026",
    oneLiner:
      'A personal "About Me" site built entirely from Adobe\'s Spectrum design system during a Code2College internship at CPAL.',
    context:
      "Built as a hands-on project in the Code2College internship at Child Poverty Action Lab (CPAL): learn a professional design system (Adobe Spectrum) by using it to tell a personal story.",
    approach: [
      "Composed the whole page from Adobe Spectrum components — cards, badges, progress bars, dividers — instead of custom CSS, to learn the system's constraints.",
      "Added vanilla-JavaScript interactivity with no framework: a typing animation, a light/dark theme toggle, and an interactive music player.",
      "Used IntersectionObserver for scroll-triggered animations and wrote semantic, accessible HTML (ARIA roles, proper heading hierarchy).",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Adobe Spectrum"],
    outcome:
      "A polished single-page site (~4,000 lines) plus a written reflection on designing within a design system's constraints.",
    screenshots: [],
    liveUrl: "/demos/design-system-lab/index.html",
  },
  {
    slug: "practice-studio",
    title: "Practice Studio",
    type: "work",
    year: "2026",
    oneLiner:
      "A terminal-based metronome and practice logger for musicians, built for violin practice.",
    context:
      "I wanted a focused practice tool that runs right in the terminal — a metronome, intonation drones, a session timer, and a streak log to stay accountable.",
    approach: [
      "Built the terminal UI with React 19 and OpenTUI on the Bun runtime, in TypeScript.",
      "Wrote a synthesized audio engine that generates WAV click tracks and seamless intonation drones, with a graceful terminal-bell fallback.",
      "Added a tempo trainer that auto-accelerates the metronome, plus persistent session logging with a consecutive-day streak counter.",
    ],
    tech: ["TypeScript", "Bun", "React", "OpenTUI"],
    outcome:
      "A complete, polished CLI tool (~1,500 lines) with tap-tempo, scale and drone references, and auto-seasonal themes.",
    screenshots: [],
    repoUrl: "https://github.com/anikethbuddolla/practice-studio",
  },
  {
    slug: "environmental-impact-tracker",
    title: "Environmental Impact Tracker",
    type: "personal",
    year: "2026",
    inProgress: true,
    oneLiner: "Currently in progress.",
    context: "Currently in progress.",
    role: "Currently in progress.",
    approach: ["Currently in progress."],
    tech: ["Currently in progress"],
    outcome: "Currently in progress.",
    screenshots: [],
  },
  {
    slug: "gita-app",
    title: "Gita App",
    type: "personal",
    year: "2026",
    inProgress: true,
    oneLiner: "Currently in progress.",
    context: "Currently in progress.",
    role: "Currently in progress.",
    approach: ["Currently in progress."],
    tech: ["Currently in progress"],
    outcome: "Currently in progress.",
    screenshots: [],
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
    items: ["Claude API", "Claude Code", "Cursor", "GitHub Copilot"],
  },
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS", "R", "Java"],
  },
  {
    category: "Frameworks",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "SvelteKit",
      "React Native",
      "Tailwind CSS",
      "Express",
    ],
  },
  {
    category: "Tools",
    items: ["VS Code", "Git", "Docker", "Vercel", "Figma", "npm", "MySQL"],
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
    role: "Student Developer",
    period: "20XX — Present",
    location: "Houston, TX",
    bullets: [
      "Replace with a specific thing you built or owned — ideally with a measurable result.",
      "Add another concrete accomplishment (a system you shipped, a problem you solved, the impact).",
    ],
  },
];

export type EducationItem = {
  school: string;
  credential: string;
  period: string;
  details?: string;
};

export const education: EducationItem[] = [
  {
    school: "Westside High School",
    credential: "High School Diploma",
    period: "Expected 2026",
    details: "Houston, Texas. Add honors, relevant coursework, or activities.",
  },
];

// PLACEHOLDER — list certifications, or empty this array to hide the section.
export const certifications: string[] = [
  "Add a certification — or remove this list.",
];

// PLACEHOLDER — a one- or two-line résumé summary.
export const resumeSummary =
  "One- or two-line résumé summary — who you are and what you do best.";
