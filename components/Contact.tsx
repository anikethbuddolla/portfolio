import Section from "./Section";
import { profile } from "@/lib/data";

const contacts = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: "@anikethbuddolla", href: profile.github },
  { label: "LinkedIn", value: "in/anikethbuddolla", href: profile.linkedin },
];

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
        I&apos;m always open to interesting projects and conversations. Reach out
        through any of the links below.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {contacts.map((contact) => (
          <li key={contact.label}>
            <a
              href={contact.href}
              target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
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
        ))}
      </ul>
    </Section>
  );
}
