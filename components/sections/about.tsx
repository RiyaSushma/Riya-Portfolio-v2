"use client";

import { useRef, useState, useEffect } from "react";
import { about } from "@/lib/data";
import { AnimateIn } from "@/components/ui/animate-in";
import { SectionLabel } from "@/components/ui/section-label";

// ── Syntax token type ───────────────────────────────────────────────────────
type Token = { text: string; color: string };

// Code tokens with VS Code–style dark theme colors
const CODE_TOKENS: Token[] = [
  { text: "const ", color: "#a78bfa" },         // keyword → violet
  { text: "riya", color: "#eeeaff" },            // identifier
  { text: " = {", color: "#c4badb" },
  { text: "\n", color: "" },
  { text: "  role:", color: "#f472b6" },         // key → pink
  { text: "      ", color: "" },
  { text: '"Full-Stack Dev + ML tinkerer"', color: "#86efac" }, // string → green
  { text: ",", color: "#6b7280" },
  { text: "\n", color: "" },
  { text: "  education:", color: "#f472b6" },
  { text: " ", color: "" },
  { text: '"B.Tech, Computer Science"', color: "#86efac" },
  { text: ",", color: "#6b7280" },
  { text: "\n", color: "" },
  { text: "  stack:", color: "#f472b6" },
  { text: "     [", color: "#c4badb" },
  { text: '"Angular"', color: "#fbbf24" },       // array strings → amber
  { text: ", ", color: "#6b7280" },
  { text: '"React"', color: "#fbbf24" },
  { text: ", ", color: "#6b7280" },
  { text: '"Python"', color: "#fbbf24" },
  { text: ", ", color: "#6b7280" },
  { text: '"Node"', color: "#fbbf24" },
  { text: "]", color: "#c4badb" },
  { text: ",", color: "#6b7280" },
  { text: "\n", color: "" },
  { text: "  loves:", color: "#f472b6" },
  { text: "     [", color: "#c4badb" },
  { text: '"clean APIs"', color: "#fbbf24" },
  { text: ", ", color: "#6b7280" },
  { text: '"great UX"', color: "#fbbf24" },
  { text: ", ", color: "#6b7280" },
  { text: '"fast UIs"', color: "#fbbf24" },
  { text: "]", color: "#c4badb" },
  { text: ",", color: "#6b7280" },
  { text: "\n", color: "" },
  { text: "  currently:", color: "#f472b6" },
  { text: " ", color: "" },
  { text: '"shipping & job-hunting"', color: "#86efac" },
  { text: ",", color: "#6b7280" },
  { text: "\n", color: "" },
  { text: "};", color: "#c4badb" },
];

// Pre-compute start/end character index for each token
const TOKEN_RANGES = (() => {
  let pos = 0;
  return CODE_TOKENS.map((t) => {
    const start = pos;
    const end = pos + t.text.length;
    pos = end;
    return { ...t, start, end };
  });
})();

const TOTAL_CHARS = TOKEN_RANGES[TOKEN_RANGES.length - 1].end;
const LINE_COUNT = 7; // "const riya = {", 5 keys, "};"

// ── Code Block ──────────────────────────────────────────────────────────────
function CodeBlock() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [charCount, setCharCount] = useState(0);
  const [started, setStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  // Trigger on scroll-into-view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Typing interval: +3 chars every 18ms ≈ ~1.6s total
  useEffect(() => {
    if (!started) return;
    timerRef.current = setInterval(() => {
      setCharCount((c) => {
        const next = Math.min(c + 3, TOTAL_CHARS);
        if (next >= TOTAL_CHARS) clearInterval(timerRef.current);
        return next;
      });
    }, 18);
    return () => clearInterval(timerRef.current);
  }, [started]);

  const done = charCount >= TOTAL_CHARS;

  return (
    <div
      ref={wrapRef}
      className="rounded-2xl overflow-hidden border border-[var(--line)]"
      style={{ background: "#080611" }}
    >
      {/* Fake macOS title bar */}
      <div
        className="flex items-center gap-2 px-5 py-3.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0c0918" }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        <span
          className="ml-4 tracking-wider"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "11px",
            color: "var(--muted)",
          }}
        >
          riya.ts
        </span>
      </div>

      {/* Editor body */}
      <div className="p-7">
        <pre
          style={{
            fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
            fontSize: "13.5px",
            lineHeight: "1.9",
            overflowX: "auto",
          }}
        >
          <div className="flex">
            {/* Gutter: line numbers */}
            <div
              className="select-none text-right leading-[1.9]"
              style={{
                paddingRight: "20px",
                marginRight: "20px",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                color: "#3d3553",
                minWidth: "28px",
              }}
            >
              {Array.from({ length: LINE_COUNT }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code area with incremental reveal */}
            <div style={{ flex: 1 }}>
              {TOKEN_RANGES.map((token, i) => {
                if (charCount <= token.start) return null;
                const visible = token.text.slice(0, charCount - token.start);
                return (
                  <span key={i} style={{ color: token.color || "var(--ink-2)" }}>
                    {visible}
                  </span>
                );
              })}

              {/* Blinking block cursor */}
              {!done && (
                <span
                  style={{
                    display: "inline-block",
                    width: "2px",
                    height: "0.85em",
                    background: "var(--violet)",
                    borderRadius: "1px",
                    verticalAlign: "middle",
                    marginLeft: "1px",
                    animation: "cursorBlink 1s steps(1) infinite",
                  }}
                />
              )}
            </div>
          </div>
        </pre>
      </div>
    </div>
  );
}

// ── About Section ───────────────────────────────────────────────────────────
export function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateIn className="mb-16">
          <SectionLabel index="01" label="About" />
          <h2 className="font-serif text-[clamp(36px,5vw,72px)] leading-[1] tracking-tight mt-4">
            A <span className="grad-text italic">builder</span>, not a typer.
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          {/* Left: text + stats */}
          <AnimateIn delay={0.1} className="space-y-8">
            <div className="space-y-5">
              {about.body.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-[var(--muted)]">
                  {p}
                </p>
              ))}
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3">
              {about.stats.map((s) => (
                <div key={s.label} className="surface-card p-5">
                  <div className="mono-label mb-2">{s.label}</div>
                  <div className="font-serif italic text-2xl grad-text">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="surface-card p-5 space-y-4">
              <div className="mono-label">Certifications</div>
              <div className="flex items-start gap-3">
                <span
                  className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--violet)" }}
                />
                <div>
                  <p className="text-sm text-[var(--ink-2)] leading-snug">
                    Generative AI &amp; Machine Learning
                  </p>
                  <p
                    className="mt-0.5 uppercase tracking-wider"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "10px",
                      color: "var(--muted)",
                    }}
                  >
                    IIT Guwahati
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span
                  className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--pink)" }}
                />
                <div>
                  <p className="text-sm text-[var(--ink-2)] leading-snug">
                    Python for Data Science
                  </p>
                  <p
                    className="mt-0.5 uppercase tracking-wider"
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "10px",
                      color: "var(--muted)",
                    }}
                  >
                    IBM
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right: typing code block */}
          <div className="lg:sticky lg:top-28">
            <AnimateIn delay={0.25}>
              <CodeBlock />
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
