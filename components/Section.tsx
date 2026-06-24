type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({
  id,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`mx-auto max-w-5xl px-6 py-16 sm:py-20 ${className}`}>
      <h2 className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
