"use client";

import { useState } from "react";

// Web3Forms access key. This is PUBLIC by design — it only lets people send
// you messages, so it's safe to commit. Get yours free (no account, just
// verify your email) at https://web3forms.com, then paste it below.
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
  "c0ffe5b9-ce7a-459b-9ebf-ffacc0835e49";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // Safety net: never report a false "sent" if the key was never set.
    if (!ACCESS_KEY || ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
      setStatus("error");
      setError(
        "The form isn't configured yet. Please email me directly in the meantime.",
      );
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "New message from your portfolio",
          from_name: "Portfolio contact form",
          ...data,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error(json.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setError(
        (err as Error).message ||
          "Couldn't send your message. Please email me directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="reveal-item flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-8 text-center card-hover dark:border-slate-800 dark:bg-slate-900">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <p className="text-lg font-semibold">Message sent!</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          Send another
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-accent dark:border-white/10 dark:bg-white/[0.04] dark:placeholder:text-slate-500";

  return (
    <form
      onSubmit={onSubmit}
      className="reveal-item flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 card-hover dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Honeypot — Web3Forms drops any submission where this is filled in. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Name
          </span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What would you like to talk about?"
          className={`${inputClass} resize-y`}
        />
      </label>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
      >
        {status === "submitting" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
