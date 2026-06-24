import Section from "./Section";
import { profile } from "@/lib/data";

export default function About() {
  return (
    <Section id="about" title="About">
      <p className="max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
        {profile.about}
      </p>
    </Section>
  );
}
