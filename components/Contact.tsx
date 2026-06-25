import Section from "./Section";
import { profile } from "@/lib/data";

type ContactItem = { label: string; value: string; href?: string };

const contacts: ContactItem[] = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: "@anikethbuddolla", href: profile.github },
  profile.linkedin
    ? { label: "LinkedIn", value: "in/anikethbuddolla", href: profile.linkedin }
    : { label: "LinkedIn", value: "Coming soon" },
];

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
        I&apos;m always open to interesting projects and conversations. Reach out
        through any of the links below.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {contacts.map((contact) =>
          contact.href ? (
            <li key={contact.label}>
              <a
                href={contact.href}
                target={
                  contact.href.startsWith("mailto:") ? undefined : "_blank"
                }
                rel="noopener noreferrer"
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-accent dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="text-sm font-semibold text-accent">
                  {contact.label}
                </span>
                <span className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {contact.value}
                </span>
              </a>
            </li>
          ) : (
            <li key={contact.label}>
              <div className="flex flex-col rounded-xl border border-dashed border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {contact.label}
                </span>
                <span className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {contact.value}
                </span>
              </div>
            </li>
          ),
        )}
      </ul>
    </Section>
  );
}
