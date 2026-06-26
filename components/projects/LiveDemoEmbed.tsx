// Embeds a first-party, same-origin demo (from /public/demos) in a browser-style
// frame. Server component — just an iframe, no client JS. Lazy-loaded so it
// never blocks the case-study page's initial render.
export default function LiveDemoEmbed({
  url,
  label,
}: {
  url: string;
  label: string;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-sm dark:border-slate-800">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex-1 truncate rounded-md bg-slate-800 px-3 py-1 text-center font-mono text-xs text-slate-400">
          {label}
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-mono text-xs text-slate-400 transition-colors hover:text-accent"
        >
          Open ↗
        </a>
      </div>
      <iframe
        src={url}
        title={label}
        loading="lazy"
        className="h-[440px] w-full bg-white sm:h-[580px]"
      />
    </figure>
  );
}
