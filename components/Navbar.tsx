import Link from "next/link";
import { profile } from "@/lib/data";
import CommandPaletteButton from "./CommandPaletteButton";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-xs font-bold text-white">
            {initials(profile.name)}
          </span>
          <span className="truncate font-semibold tracking-tight">
            {profile.name}
          </span>
        </Link>
        <div className="flex items-center gap-2 md:gap-5">
          <ul className="hidden gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-accent dark:hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <CommandPaletteButton />
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
