export const profile = {
  name: "Aniketh Buddolla",
  title: "Full-Stack Software Engineer",
  bio: "I build fast, accessible web applications with a focus on clean architecture and great user experience. Currently turning ideas into production software at CPAL.",
  about:
    "I'm a software engineer who enjoys working across the stack — from designing intuitive interfaces to building reliable backend systems. I care about writing maintainable code, shipping thoughtfully, and continuously learning. Outside of work, I like exploring new tools, contributing to side projects, and staying curious about how things are built.",
  email: "aniketh@cpal.org",
  github: "https://github.com/anikethbuddolla",
  linkedin: "https://www.linkedin.com/in/anikethbuddolla",
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "A clean, responsive personal portfolio built with the Next.js App Router and Tailwind CSS, deployed on Vercel.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    github: "https://github.com/anikethbuddolla/portfolio",
    live: "https://anikethbuddolla.vercel.app",
  },
  {
    title: "Task Manager API",
    description:
      "A RESTful API for managing tasks and teams with authentication, role-based access control, and PostgreSQL persistence.",
    tech: ["Node.js", "Express", "PostgreSQL", "JWT"],
    github: "https://github.com/anikethbuddolla/task-manager-api",
  },
  {
    title: "Analytics Dashboard",
    description:
      "An interactive dashboard that visualizes real-time metrics with charts, filtering, and CSV export for data exploration.",
    tech: ["React", "TypeScript", "Recharts", "Tailwind CSS"],
    github: "https://github.com/anikethbuddolla/analytics-dashboard",
    live: "https://analytics-demo.vercel.app",
  },
  {
    title: "DevTools CLI",
    description:
      "A command-line utility that automates common developer workflows — scaffolding, linting, and release tagging.",
    tech: ["Python", "Click", "GitHub Actions"],
    github: "https://github.com/anikethbuddolla/devtools-cli",
  },
];

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
