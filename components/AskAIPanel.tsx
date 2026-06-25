"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What has Aniketh built?",
  "What are his strongest skills?",
  "Tell me about his internships.",
  "How can I contact him?",
];

const GREETING = `Hi! I'm ${profile.name.split(" ")[0]}'s AI assistant. Ask me about his projects, skills, or experience.`;

export default function AskAIPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Focus the input on mount; close on Escape.
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      abortRef.current?.abort();
    };
  }, [onClose]);

  // Keep the latest message in view as it streams.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, streaming]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    setError(null);
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }

      // Append an empty assistant message we fill in as chunks arrive.
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "assistant",
            content: copy[copy.length - 1].content + chunk,
          };
          return copy;
        });
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError((err as Error).message || "Something went wrong.");
      // Drop a trailing empty assistant bubble if the stream never started.
      setMessages((m) =>
        m.length && m[m.length - 1].role === "assistant" && !m[m.length - 1].content
          ? m.slice(0, -1)
          : m,
      );
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Chat with ${profile.name}'s AI assistant`}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-end sm:justify-end sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ask-ai-panel flex h-[85vh] w-full flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-white shadow-2xl dark:bg-slate-900/80 sm:h-[min(80vh,640px)] sm:max-w-md sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 px-5 py-4 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
              <span className="absolute inline-flex h-2 w-2 translate-x-3 -translate-y-3 rounded-full bg-emerald-400" />
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
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">Ask my AI</p>
              <p className="text-xs leading-tight text-slate-500 dark:text-slate-400">
                Grounded in Aniketh&apos;s résumé
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close assistant"
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
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
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
        >
          {/* Greeting bubble */}
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-2.5 text-sm leading-relaxed text-slate-700 dark:bg-white/[0.06] dark:text-slate-200">
              {GREETING}
            </div>
          </div>

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "rounded-tr-sm bg-accent text-white"
                    : "rounded-tl-sm bg-slate-100 text-slate-700 dark:bg-white/[0.06] dark:text-slate-200"
                }`}
              >
                {m.content || (
                  <span className="inline-flex gap-1">
                    <span className="ask-ai-dot h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                    <span className="ask-ai-dot h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                    <span className="ask-ai-dot h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                  </span>
                )}
              </div>
            </div>
          ))}

          {error && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
                {error}
              </div>
            </div>
          )}

          {/* Suggested prompts (only before the first question) */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-accent hover:text-accent dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-accent dark:hover:text-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-slate-200/70 px-3 py-3 dark:border-white/10"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about projects, skills, experience…"
            aria-label="Message"
            className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-accent dark:border-white/10 dark:bg-white/[0.04] dark:placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || streaming}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
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
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
