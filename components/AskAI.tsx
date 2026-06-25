"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// The panel holds the chat UI, message state, and streaming logic. Loading it
// lazily keeps all of that out of the initial bundle — it only downloads the
// first time someone opens the assistant.
const AskAIPanel = dynamic(() => import("./AskAIPanel"), { ssr: false });

export default function AskAI() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ask my AI assistant"
        className="ask-ai-fab group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-accent/30 bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40 active:translate-y-0 sm:bottom-6 sm:right-6"
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a9 9 0 0 0-9 9 8.96 8.96 0 0 0 1.64 5.18L3 21l3.82-1.64A9 9 0 1 0 12 3Z" />
          <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
        </svg>
        <span className="hidden sm:inline">Ask my AI</span>
      </button>
      {open && <AskAIPanel onClose={() => setOpen(false)} />}
    </>
  );
}
