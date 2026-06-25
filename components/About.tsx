import Section from "./Section";
import { profile } from "@/lib/data";

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 card-hover dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {profile.about}
        </p>
      </div>
    </Section>
  );
}
