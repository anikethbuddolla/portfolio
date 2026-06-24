import Section from "./Section";
import { experience, skills } from "@/lib/data";

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-6">
        {experience.map((job, i) => (
          <div
            key={`${job.company}-${i}`}
            className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold">
                {job.role} <span className="text-accent">@ {job.company}</span>
              </h3>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {job.period}
              </span>
            </div>
            {job.location && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {job.location}
              </p>
            )}
            <ul className="mt-4 space-y-2">
              {job.bullets.map((b, j) => (
                <li
                  key={j}
                  className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Skills live inside Experience */}
      <div className="mt-12">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent">
          Skills
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {group.category}
              </h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
