import Section from "./Section";
import { education, certifications, resumeSummary } from "@/lib/data";

export default function Resume() {
  return (
    <Section id="resume" title="Résumé">
      <div className="max-w-3xl space-y-10">
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {resumeSummary}
        </p>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((ed, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-semibold">{ed.credential}</h4>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {ed.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {ed.school}
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

        {certifications.length > 0 && (
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
              Certifications
            </h3>
            <ul className="space-y-2">
              {certifications.map((c, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-slate-600 dark:text-slate-300"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
