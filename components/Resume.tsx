import Section from "./Section";
import { education, leadership, awards, spokenLanguages } from "@/lib/data";

function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
      {children}
    </h3>
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
                className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
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
                className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-semibold">
                    {l.role}{" "}
                    <span className="font-normal text-slate-500 dark:text-slate-400">
                      · {l.org}
                    </span>
                  </h4>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {l.period}
                  </span>
                </div>
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
          <ul className="space-y-2">
            {awards.map((a, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-2 last:border-0 dark:border-slate-800"
              >
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {a.name}
                </span>
                {a.year && (
                  <span className="shrink-0 font-mono text-xs text-slate-500 dark:text-slate-400">
                    {a.year}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Languages */}
        <div>
          <GroupHeading>Languages</GroupHeading>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {spokenLanguages.join(" · ")}
          </p>
        </div>
      </div>
    </Section>
  );
}
