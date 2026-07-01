"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Vercel's analytics + speed-insights inject their own scripts and do a little
// main-thread work. None of it contributes to content, so we hold it back until
// the browser is idle — keeping it out of the hydration / Total-Blocking-Time
// window without losing any real-user metrics.
export default function DeferredAnalytics() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ric =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : null;
    const handle = ric
      ? ric(() => setReady(true))
      : window.setTimeout(() => setReady(true), 400);

    return () => {
      if (ric) window.cancelIdleCallback(handle);
      else clearTimeout(handle);
    };
  }, []);

  if (!ready) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
