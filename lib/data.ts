export const profile = {
  name: "Aniketh Buddolla",
  title: "Software Intern",
  about:
    "Hi, my name is Aniketh Buddolla, and I am a senior at Westside High School in Houston, Texas. My interests include artificial intelligence, software engineering, and chemical engineering. I started coding at a young age and have since developed a wide variety of projects while expanding my technical skills. I'm passionate about exploring how technology and engineering can solve real-world problems, particularly in areas such as environmental innovation and sustainable energy.",
  email: "aniketh.buddolla@gmail.com",
  github: "https://github.com/anikethbuddolla",
  linkedin: "",
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
    repoUrl: "https://github.com/anikethbuddolla/design-system-lab",
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
    category: "Programming Languages",
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

export const experience: ExperienceItem[] = [
  {
    company: "Child Poverty Action Lab",
    role: "Software Engineer Intern",
    period: "2026",
    location: "Dallas, TX",
    bullets: [
      "Built an interactive web display that maps 14 Dallas neighborhoods to analog clocks, using Census data to score each community's opportunity, with live weather and time-of-day lighting effects.",
      'Created a personal "About Me" web page using Adobe\'s professional design system, learning to build a clean, accessible, mobile-friendly page within an enterprise UI framework.',
      "Built a practice app for musicians that plays a metronome, tracks daily practice streaks, and generates its own click and tuning sounds from scratch.",
    ],
  },
  {
    company: "Child Poverty Action Lab",
    role: "Full Stack Intern",
    period: "2025",
    location: "Dallas, TX",
    bullets: [
      "Developed front-end components using JavaScript and R and collaborated using GitHub workflows.",
      "Built and debugged React components (map tooltips, data cards, filter drawers) for an interactive neighborhood safety dashboard using Next.js.",
      "Debugged spatial join logic in sf and leaflet to correctly assign police incident and parcel records to neighborhood, ZIP code, and school campus geographies.",
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
    school: "Westside High School — Houston, TX",
    credential: "High School Diploma",
    period: "Graduation 2027",
    details: "GPA 4.83 / 3.9 (weighted / unweighted) · Class Rank 5 of 611",
  },
];

export type LeadershipItem = {
  org: string;
  role: string;
  period: string;
  detail?: string;
};

export const leadership: LeadershipItem[] = [
  {
    org: "Student Council",
    role: "President (prev. Freshman VP, Club Liaison, Historian)",
    period: "2023 — Present",
    detail:
      "Led student initiatives and events; helped reopen the school library serving 3,000+ students; led the Homecoming Committee; led the International Festival Committee; started several clubs; created a digital archive of Student Council activities.",
  },
  {
    org: "FRC Robotics",
    role: "Member",
    period: "2023 — Present",
    detail:
      "Programmed robot subsystems in Java for autonomous and driver functionality; designed robot components using Onshape CAD software; assembled robot components using power tools; worked on performance improvements throughout the season; 2× State Finalist.",
  },
  {
    org: "Orchestra",
    role: "Varsity Violinist (Principal Second Violin)",
    period: "2017 — Present",
    detail:
      "Two-time UIL Sweepstakes award recipient; competed in UIL Solo & Ensemble; taught violin to 200+ children across underserved rural villages in India.",
  },
  {
    org: "Track & Field",
    role: "Varsity",
    period: "2024 — Present",
    detail: "Competed at the UIL District and Area levels.",
  },
  {
    org: "National Wildlife Federation — Earth Tomorrow Houston",
    role: "Member",
    period: "2023 — Present",
    detail:
      "Volunteered 40+ hours on conservation projects at Big Thicket National Preserve and Huntsville State Park (TX), including trash cleanups, tree planting, and habitat stewardship.",
  },
  {
    org: "KidsVikas Houston ALT",
    role: "Volunteer",
    period: "2024 — Present",
    detail:
      "Volunteered 60+ hours packing meals for children in need, assembling PB&J sandwiches and snack bags distributed to local food banks.",
  },
];

export type Award = {
  name: string;
  year?: string;
};

export const awards: Award[] = [
  { name: "Python Level 1 Certified — CodeHS", year: "2024" },
  { name: "Aerial Drone Competition Flight Excellence Award", year: "2024" },
  { name: "National Honor Society (NHS)", year: "2025" },
  { name: "UIL Orchestra Sweepstakes", year: "2025" },
  { name: "FIRST Robotics Competition State Finalist", year: "2025" },
  { name: "IT Specialist — Java Certification", year: "2026" },
  { name: "Student Council President", year: "2026" },
  { name: "FIRST Robotics Competition State Finalist", year: "2026" },
];

export const spokenLanguages = ["English", "Telugu"];
