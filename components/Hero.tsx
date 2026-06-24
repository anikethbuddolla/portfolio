import Link from "next/link";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
      {/* subtle corporate background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-accent/5 to-transparent"
      />
      <div className="relative mx-auto flex max-w-5xl flex-col justify-center px-6 py-24 sm:py-32">
        <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
          <span className="h-px w-8 bg-accent" />
          {profile.title}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {profile.bio}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="#projects"
            className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
          >
            View my work
          </Link>
          <Link
            href="#contact"
            className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-200"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
