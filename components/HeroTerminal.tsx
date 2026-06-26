// Decorative terminal mockup that anchors the hero's right side. Static (the
// blinking cursor is the only motion) and aria-hidden — the real info lives in
// the hero text — so it ships zero JS and adds no screen-reader noise. Stays
// dark in both themes, the way a real terminal does.
export default function HeroTerminal() {
  return (
    <div
      aria-hidden
      className="hero-item w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-xl ring-1 ring-black/20"
      style={{ animationDelay: "150ms" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-xs text-slate-500">
          aniketh@portfolio: ~
        </span>
      </div>

      {/* Body */}
      <div className="space-y-2.5 p-5 font-mono text-sm leading-relaxed">
        <p>
          <span className="text-emerald-400">$</span>{" "}
          <span className="text-slate-200">whoami</span>
        </p>
        <p className="text-slate-400">
          Aniketh — software intern{" "}
          <span className="text-indigo-400">@ Child Poverty Action Lab</span>
        </p>

        <p className="pt-1">
          <span className="text-emerald-400">$</span>{" "}
          <span className="text-slate-200">cat stack.txt</span>
        </p>
        <p className="text-cyan-400">TypeScript · React · Next.js · Python</p>

        <p className="pt-1">
          <span className="text-emerald-400">$</span>{" "}
          <span className="text-slate-200">./status</span>
        </p>
        <p className="text-slate-400">
          building software &amp; AI to solve real problems
          <span className="term-cursor ml-1 inline-block h-4 w-2 translate-y-0.5 bg-slate-300" />
        </p>
      </div>
    </div>
  );
}
