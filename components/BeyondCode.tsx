import Section from "./Section";
import { interests } from "@/lib/data";

export default function BeyondCode() {
  return (
    <Section id="interests" title="Beyond the Code">
      <div className="reveal-item rounded-xl border border-slate-200 bg-white p-6 card-hover dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <p className="mb-5 text-lg text-slate-600 dark:text-slate-300">
          Outside of code, here&apos;s what I&apos;m into:
        </p>
        <ul className="flex flex-wrap gap-3">
          {interests.map((interest) => (
            <li
              key={interest.label}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <span aria-hidden className="text-base">
                {interest.emoji}
              </span>
              {interest.label}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
