import Link from "next/link";
import { profile } from "@/lib/data";
import TypedName from "./TypedName";
import HeroTerminal from "./HeroTerminal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
      {/* subtle background: soft aurora + fading dot-grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="aurora-1 absolute -top-24 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="aurora-2 absolute -top-10 right-[-6rem] h-64 w-[34rem] rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/10" />
        <div className="dot-grid absolute inset-0 text-slate-300/50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] dark:text-slate-700/40" />
      </div>

      <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-6 py-24 sm:py-32 lg:grid-cols-[1.4fr_0.9fr]">
        {/* Text column */}
        <div>
          <h1
            className="hero-item max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl"
            style={{ animationDelay: "0ms" }}
          >
            <TypedName text={profile.name} />
          </h1>
          <p
            className="hero-item mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300"
            style={{ animationDelay: "180ms" }}
          >
            High school senior in Houston building software and AI projects.
          </p>
          {/* Current role — concrete credibility, scannable above the fold */}
          <p
            className="hero-item mt-5 text-sm text-slate-500 dark:text-slate-400"
            style={{ animationDelay: "210ms" }}
          >
            Software Engineer Intern{" "}
            <span className="text-slate-700 dark:text-slate-300">
              @ Child Poverty Action Lab
            </span>
          </p>
          <div
            className="hero-item mt-8 flex flex-wrap gap-4"
            style={{ animationDelay: "270ms" }}
          >
            <Link
              href="#projects"
              className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 active:translate-y-0"
            >
              View my work
            </Link>
            <Link
              href="#contact"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-md active:translate-y-0 dark:border-slate-700 dark:text-slate-200"
            >
              Get in touch
            </Link>
          </div>
        </div>

        {/* Terminal card — anchors the right side */}
        <div className="relative">
          {/* soft accent glow behind the frame */}
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-3xl bg-accent/20 blur-3xl"
          />
          <HeroTerminal />
        </div>
      </div>
    </section>
  );
}
