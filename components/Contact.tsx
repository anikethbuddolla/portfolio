import Section from "./Section";
import { profile } from "@/lib/data";

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.21.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.81 0-1.28.47-2.33 1.23-3.15-.12-.3-.53-1.51.12-3.15 0 0 1.01-.32 3.3 1.2a11.6 11.6 0 0 1 3-.4c1.02 0 2.05.13 3 .4 2.29-1.52 3.3-1.2 3.3-1.2.65 1.64.24 2.85.12 3.15.77.82 1.23 1.87 1.23 3.15 0 4.51-2.81 5.5-5.49 5.79.43.36.81 1.09.81 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

type ContactItem = {
  label: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
};

const contacts: ContactItem[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: <MailIcon />,
  },
  {
    label: "GitHub",
    value: "@anikethbuddolla",
    href: profile.github,
    icon: <GitHubIcon />,
  },
  profile.linkedin
    ? {
        label: "LinkedIn",
        value: "in/anikethbuddolla",
        href: profile.linkedin,
        icon: <LinkedInIcon />,
      }
    : { label: "LinkedIn", value: "Coming soon", icon: <LinkedInIcon /> },
];

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
        I&apos;m always open to interesting projects and conversations. Reach out
        through any of the links below.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {contacts.map((contact) => {
          const inner = (
            <>
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                  contact.href
                    ? "bg-accent/10 text-accent"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                }`}
              >
                {contact.icon}
              </span>
              <div className="min-w-0">
                <span
                  className={`block text-sm font-semibold ${
                    contact.href
                      ? "text-slate-900 dark:text-slate-100"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {contact.label}
                </span>
                <span
                  className={`block truncate text-sm ${
                    contact.href
                      ? "text-slate-600 dark:text-slate-300"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {contact.value}
                </span>
              </div>
            </>
          );
          return (
            <li key={contact.label}>
              {contact.href ? (
                <a
                  href={contact.href}
                  target={
                    contact.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 card-hover dark:border-slate-800 dark:bg-slate-900"
                >
                  {inner}
                </a>
              ) : (
                <div className="flex items-center gap-4 rounded-xl border border-dashed border-slate-200 bg-white p-5 card-hover dark:border-slate-800 dark:bg-slate-900">
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
