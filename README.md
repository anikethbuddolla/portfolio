# Portfolio

A clean, responsive personal portfolio built with **Next.js 14** (App Router), **TypeScript**, and **Tailwind CSS**. Ready to deploy on Vercel.

## Sections

- **Hero** — name, title, and short bio
- **Projects** — card grid with title, description, tech stack, and GitHub/live links
- **Skills** — grouped by Languages, Frameworks, and Tools
- **About** — short bio paragraph
- **Contact** — email, GitHub, and LinkedIn links

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Customizing

All content lives in [`lib/data.ts`](lib/data.ts) — edit your name, bio, projects,
skills, and contact links there. No need to touch the components for content changes.

## Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the development server     |
| `npm run build` | Create a production build        |
| `npm run start` | Run the production build locally |
| `npm run lint`  | Run ESLint                       |

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — no extra configuration needed. Click **Deploy**.

Alternatively, with the [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm i -g vercel
vercel
```

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
