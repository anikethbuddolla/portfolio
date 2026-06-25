import Section from "./Section";
import { education, leadership, awards, spokenLanguages } from "@/lib/data";

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
      {children}
    </h3>
  );
}

function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  );
}

export default function Resume() {
  return (
    <Section id="resume" title="Résumé">
      <div className="max-w-3xl space-y-10">
        {/* Education */}
        <div>
          <GroupHeading>Education</GroupHeading>
          <div className="space-y-4">
            {education.map((ed, i) => (
              <div
                key={i}
                className="reveal-item rounded-xl border border-slate-200 bg-white p-5 card-hover dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-semibold">{ed.school}</h4>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {ed.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {ed.credential}
                </p>
                {ed.details && (
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {ed.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Community Service */}
        <div>
          <GroupHeading>Leadership &amp; Community Service</GroupHeading>
          <div className="space-y-4">
            {leadership.map((l, i) => (
              <div
                key={i}
                className="reveal-item rounded-xl border border-slate-200 bg-white p-5 card-hover dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-semibold">{l.org}</h4>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {l.period}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  {l.role}
                </p>
                {l.detail && (
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {l.detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div>
          <GroupHeading>Awards</GroupHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            {awards.map((a, i) => (
              <div
                key={i}
                className="reveal-item flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 card-hover dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <TrophyIcon />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {a.name}
                  </p>
                  {a.year && (
                    <p className="mt-0.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {a.year}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <GroupHeading>Languages Spoken</GroupHeading>
          <ul className="flex flex-wrap gap-2">
            {spokenLanguages.map((l) => (
              <li
                key={l}
                className="reveal-item inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 card-hover dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <span className="text-accent">
                  <GlobeIcon />
                </span>
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
