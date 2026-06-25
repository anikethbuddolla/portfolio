// Pure-CSS scroll progress bar — no client JavaScript. A scroll-driven
// animation (animation-timeline: scroll(root)) maps scroll position straight
// to the bar's scaleX, so this renders as a plain server component and ships
// zero JS. Browsers without scroll-driven timelines (Safari/Firefox) simply
// don't show the bar, degrading gracefully — same approach as the reveals.
export default function ScrollProgress() {
  return <div className="scroll-progress bg-accent" aria-hidden />;
}
