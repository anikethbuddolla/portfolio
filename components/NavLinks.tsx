"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", id: "", label: "Home" },
  { href: "/#about", id: "about", label: "About" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#projects", id: "projects", label: "Projects" },
  { href: "/#resume", id: "resume", label: "Resume" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [active, setActive] = useState("");

  useEffect(() => {
    if (pathname !== "/") {
      setActive("__none__");
      return;
    }
    setActive("");
    const ids = ["about", "experience", "projects", "resume", "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
          setActive(topmost.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <ul className="hidden gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
      {links.map((link) => {
        const isActive = pathname === "/" && link.id === active;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`nav-link transition-colors hover:text-accent dark:hover:text-accent ${
                isActive ? "is-active text-accent dark:text-accent" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
