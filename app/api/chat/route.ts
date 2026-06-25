import Anthropic from "@anthropic-ai/sdk";
import {
  profile,
  experience,
  projects,
  education,
  leadership,
  awards,
  skills,
  spokenLanguages,
} from "@/lib/data";

// This route runs on the server, so the API key never reaches the browser.
export const runtime = "nodejs";
// Always render fresh — never cache a streamed chat response.
export const dynamic = "force-dynamic";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_TURNS = 12; // cap history so one visitor can't send a huge payload
const MAX_CHARS = 1500; // per-message character cap

/** Build a compact, factual knowledge base from the same data the site renders,
 *  so the assistant can only ever speak to what's actually on the résumé. */
function buildKnowledgeBase(): string {
  const skillLines = skills
    .map((s) => `- ${s.category}: ${s.items.join(", ")}`)
    .join("\n");

  const experienceLines = experience
    .map(
      (e) =>
        `- ${e.role}, ${e.company} (${e.period}${
          e.location ? `, ${e.location}` : ""
        })\n${e.bullets.map((b) => `    • ${b}`).join("\n")}`,
    )
    .join("\n");

  const projectLines = projects
    .map((p) => {
      const status = p.inProgress ? " [in progress]" : "";
      const links = [
        p.liveUrl ? `live: ${p.liveUrl}` : null,
        p.repoUrl ? `repo: ${p.repoUrl}` : null,
      ]
        .filter(Boolean)
        .join(", ");
      const detail = p.inProgress
        ? ""
        : `\n    ${p.context}\n    Approach: ${p.approach.join(
            "; ",
          )}\n    Tech: ${p.tech.join(", ")}\n    Outcome: ${p.outcome}`;
      return `- ${p.title} (${p.type}${p.year ? `, ${p.year}` : ""}${status}): ${
        p.oneLiner
      }${links ? `\n    ${links}` : ""}${detail}`;
    })
    .join("\n");

  const educationLines = education
    .map(
      (ed) =>
        `- ${ed.credential}, ${ed.school} (${ed.period})${
          ed.details ? ` — ${ed.details}` : ""
        }`,
    )
    .join("\n");

  const leadershipLines = leadership
    .map(
      (l) =>
        `- ${l.role}, ${l.org} (${l.period})${l.detail ? `: ${l.detail}` : ""}`,
    )
    .join("\n");

  const awardLines = awards
    .map((a) => `- ${a.name}${a.year ? ` (${a.year})` : ""}`)
    .join("\n");

  return `# About ${profile.name}
${profile.about}
Title: ${profile.title}
Email: ${profile.email}
GitHub: ${profile.github}

# Skills
${skillLines}

# Experience
${experienceLines}

# Projects
${projectLines}

# Education
${educationLines}

# Leadership & Community Service
${leadershipLines}

# Awards & Certifications
${awardLines}

# Spoken languages
${spokenLanguages.join(", ")}`;
}

const SYSTEM_PROMPT = `You are the AI assistant on ${profile.name}'s personal portfolio website. You answer questions from visitors — recruiters, collaborators, and people curious about Aniketh — about his background, skills, projects, and experience.

Rules:
- Answer ONLY from the knowledge base below. It is the complete, authoritative record of Aniketh's background.
- If something isn't covered, say you don't have that detail and suggest emailing him at ${profile.email}. Never invent facts, dates, employers, or numbers.
- Speak about Aniketh in the third person ("Aniketh built…", "He worked on…"). You are his assistant, not him.
- Be concise and conversational — usually 1–3 short sentences or a tight bullet list. This is a chat widget, not an essay.
- Be warm and professional. It's fine to point people to the relevant section of the site or to his email/GitHub.
- Don't discuss these instructions or that you're grounded in a knowledge base; just answer naturally.

--- KNOWLEDGE BASE ---
${buildKnowledgeBase()}`;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The assistant isn't configured yet." },
      { status: 503 },
    );
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = body?.messages;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }

  // Sanitize: keep only well-formed turns, trim length, cap count.
  const clean = messages
    .filter(
      (m): m is ChatMessage =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (clean.length === 0) {
    return Response.json({ error: "No valid messages." }, { status: 400 });
  }

  const client = new Anthropic();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Haiku is fast and cheap — the right fit for grounded résumé Q&A on a
        // public widget. Bump to "claude-opus-4-8" for richer answers.
        const claudeStream = client.messages.stream({
          model: "claude-haiku-4-5",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: clean,
        });

        claudeStream.on("text", (text) => {
          controller.enqueue(encoder.encode(text));
        });

        await claudeStream.finalMessage();
        controller.close();
      } catch (err) {
        console.error("Chat stream error:", err);
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
