import Image from "next/image";
import Section from "./Section";
import { profile } from "@/lib/data";

export default function About() {
  // Two-column (portrait + bio) once a licensed photo is set; bio-only until then.
  const hasPortrait = Boolean(profile.image);

  return (
    <Section id="about" title="About">
      <div
        className={
          hasPortrait
            ? "grid items-start gap-8 sm:grid-cols-[auto_1fr]"
            : ""
        }
      >
        {hasPortrait && (
          <div className="reveal-item mx-auto w-full max-w-[14rem] sm:mx-0">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 -z-10 rounded-3xl bg-accent/15 blur-2xl"
              />
              <div className="overflow-hidden rounded-2xl border border-slate-200/70 shadow-lg ring-1 ring-black/5 dark:border-white/10 dark:ring-white/10">
                <Image
                  src={profile.image}
                  alt={`Portrait of ${profile.name}`}
                  width={577}
                  height={581}
                  sizes="(min-width: 640px) 224px, 224px"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        <div className="reveal-item max-w-3xl rounded-xl border border-slate-200 bg-white p-6 card-hover dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {profile.about}
          </p>
        </div>
      </div>
    </Section>
  );
}
