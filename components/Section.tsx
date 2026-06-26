type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

const OVERLINES: Record<string, string> = {
  about: "01 — Profile",
  experience: "02 — Experience",
  projects: "03 — Selected Work",
  resume: "04 — Résumé",
  contact: "05 — Get in touch",
};

export default function Section({
  id,
  title,
  children,
  className = "",
}: SectionProps) {
  const overline = OVERLINES[id];
  return (
    <section
      id={id}
      className={`mx-auto max-w-5xl px-6 py-12 sm:py-14 ${className}`}
    >
      <div className="reveal mb-10 border-b border-slate-200 pb-5 dark:border-slate-800">
        {overline && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {overline}
          </p>
        )}
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
