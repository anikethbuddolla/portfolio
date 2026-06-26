"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/", id: "home", label: "Home" },
  { href: "/#about", id: "about", label: "About" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#projects", id: "projects", label: "Projects" },
  { href: "/#resume", id: "resume", label: "Resume" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    if (pathname !== "/") {
      setActive("__none__");
      return;
    }
    setActive("home");
    const ids = ["home", "about", "experience", "projects", "resume", "contact"];
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

  // Slide the indicator under whichever link is active. Only runs on active
  // change / resize (no per-frame work), so the layout read stays cheap.
  useEffect(() => {
    function measure() {
      const el = itemRefs.current[active];
      if (!el) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active, pathname]);

  return (
    <ul className="relative hidden gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
      {links.map((link) => {
        const isActive = pathname === "/" && link.id === active;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              ref={(el) => {
                itemRefs.current[link.id] = el;
              }}
              className={`nav-link transition-colors hover:text-accent dark:hover:text-accent ${
                isActive ? "is-active text-accent dark:text-accent" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
      <span
        aria-hidden
        className="nav-indicator text-accent"
        style={{
          transform: `translateX(${indicator.left}px)`,
          width: indicator.width,
          opacity: indicator.opacity,
        }}
      />
    </ul>
  );
}
