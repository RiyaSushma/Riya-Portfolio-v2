"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { hero } from "@/lib/data";

const EASE = [0.22, 0.61, 0.36, 1] as const;

// ── Typewriter ──────────────────────────────────────────────────────────────
function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const word = words[wordIdx];
    if (!deleting) {
      if (text.length < word.length) {
        timeout.current = setTimeout(() => setText(word.slice(0, text.length + 1)), 75);
      } else {
        timeout.current = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (text.length > 0) {
        timeout.current = setTimeout(() => setText(word.slice(0, text.length - 1)), 38);
      } else {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      }
    }
    return () => clearTimeout(timeout.current);
  }, [text, deleting, wordIdx, words]);

  return (
    <span className="text-[var(--pink-soft)] border-r-2 border-[var(--pink-soft)] pr-0.5 animate-[blink_1s_steps(1)_infinite]">
      {text}
    </span>
  );
}

// ── Code block tokens ───────────────────────────────────────────────────────
type Token = { text: string; color: string };

const CODE_TOKENS: Token[] = [
  { text: "const ", color: "#a78bfa" },
  { text: "riya", color: "#eeeaff" },
  { text: " = {", color: "#c4badb" },
  { text: "\n", color: "" },
  { text: "  role:", color: "#f472b6" },
  { text: "      ", color: "" },
  { text: '"Full-Stack Dev + ML tinkerer"', color: "#86efac" },
  { text: ",", color: "#6b7280" },
  { text: "\n", color: "" },
  { text: "  education:", color: "#f472b6" },
  { text: " ", color: "" },
  { text: '"B.Tech, Computer Science"', color: "#86efac" },
  { text: ",", color: "#6b7280" },
  { text: "\n", color: "" },
  { text: "  stack:", color: "#f472b6" },
  { text: "     [", color: "#c4badb" },
  { text: '"Angular"', color: "#fbbf24" },
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
const LINE_COUNT = 7;

// ── Hero Code Block — types on mount ────────────────────────────────────────
function HeroCodeBlock() {
  const [charCount, setCharCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    const delay = setTimeout(() => {
      timerRef.current = setInterval(() => {
        setCharCount((c) => {
          const next = Math.min(c + 5, TOTAL_CHARS);
          if (next >= TOTAL_CHARS) clearInterval(timerRef.current);
          return next;
        });
      }, 16);
    }, 900);
    return () => {
      clearTimeout(delay);
      clearInterval(timerRef.current);
    };
  }, []);

  const done = charCount >= TOTAL_CHARS;

  return (
    <div
      className="rounded-2xl overflow-hidden border border-[var(--line)]"
      style={{ background: "#080611" }}
    >
      {/* macOS title bar */}
      <div
        className="flex items-center gap-2 px-5 py-3.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0c0918" }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        <span
          className="ml-4 tracking-wider"
          style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--muted)" }}
        >
          riya.ts
        </span>
        <span
          className="ml-auto"
          style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--muted-2)" }}
        >
          TypeScript
        </span>
      </div>

      {/* Editor body */}
      <div className="p-6">
        <pre
          style={{
            fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
            fontSize: "13px",
            lineHeight: "1.9",
          }}
        >
          <div className="flex">
            {/* Gutter */}
            <div
              className="select-none text-right leading-[1.9]"
              style={{
                paddingRight: "20px",
                marginRight: "20px",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                color: "#3d3553",
                minWidth: "24px",
              }}
            >
              {Array.from({ length: LINE_COUNT }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code area */}
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

              {/* Blinking cursor */}
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

      {/* Status bar */}
      <div
        className="flex items-center gap-4 px-5 py-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "#0a0816" }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "10px",
            color: "var(--muted-2)",
            letterSpacing: "0.05em",
          }}
        >
          Ln {LINE_COUNT}, Col {done ? 2 : 1}
        </span>
        <span
          className="ml-auto flex items-center gap-1.5"
          style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "#a78bfa" }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#a78bfa" }} />
          {done ? "ready" : "typing…"}
        </span>
      </div>
    </div>
  );
}

// ── Hero Section ─────────────────────────────────────────────────────────────
// Pure presentational component — scroll transforms are applied by TransitionZone.
export function Hero() {
  return (
    <section
      id="top"
      className="relative h-full flex items-center pt-24 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 75% 45%, rgba(236,72,153,0.25), transparent 30%)",
        }}
      />
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #7c3aed, transparent 65%)",
            top: "-150px",
            right: "-100px",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #ec4899, transparent 65%)",
            bottom: "-200px",
            left: "-100px",
            filter: "blur(80px)",
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">

          {/* ── Left: text content ── */}
          <div>

            {/* Greeting pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--line-strong)] bg-[var(--surface)] mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--violet)] animate-pulse" />
              <span className="font-mono text-xs text-[var(--muted)] tracking-widest uppercase">
                Hi there, I&apos;m
              </span>
            </motion.div>

            {/* Name */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                className="
                  font-serif
                  font-light
                  tracking-normal
                  leading-[0.82]
                  text-[clamp(90px,12vw,170px)]
                  "
              >
                <span className="text-[var(--ink)]">{hero.name}</span>
              </motion.h1>
            </div>

            {/* Typewriter role */}
            <motion.div
              className="flex items-center gap-3 font-mono text-[15px] text-[var(--muted)] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span>{"{"} role: </span>
              <Typewriter words={hero.roles} />
              <span>{"}"}</span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-[17px] text-[var(--ink-2)] leading-relaxed max-w-lg mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
            >
              {hero.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex items-center flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm text-[#050508] overflow-hidden group"
                style={{ background: "var(--grad)" }}
              >
                <span className="relative z-10">View Projects</span>
                <svg className="relative z-10 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm text-[var(--ink-2)] border border-[var(--line-strong)] hover:border-[var(--violet)] hover:text-[var(--ink)] transition-all duration-200"
              >
                Get in touch
              </a>

              {/* Social icons */}
              <div className="flex items-center gap-3 ml-1">
                <a
                  href={hero.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-xl border border-[var(--line)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--line-strong)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.73.5.86 5.37.86 11.64c0 4.91 3.18 9.07 7.59 10.54.55.1.75-.24.75-.53v-1.85c-3.09.67-3.74-1.49-3.74-1.49-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.67.08-.67 1.11.08 1.69 1.14 1.69 1.14.99 1.69 2.6 1.2 3.23.92.1-.72.39-1.2.7-1.48-2.47-.28-5.06-1.23-5.06-5.49 0-1.21.43-2.2 1.14-2.98-.11-.28-.49-1.41.11-2.94 0 0 .93-.3 3.05 1.14a10.5 10.5 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.6 1.53.22 2.66.11 2.94.71.78 1.14 1.77 1.14 2.98 0 4.27-2.6 5.21-5.07 5.48.4.34.76 1.02.76 2.05v3.04c0 .3.2.64.76.53 4.4-1.47 7.58-5.63 7.58-10.54C23.14 5.37 18.27.5 12 .5Z" />
                  </svg>
                </a>
                <a
                  href={hero.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl border border-[var(--line)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--line-strong)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.72C24 .77 23.21 0 22.23 0Z" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="mt-12 sm:mt-10 pt-8 sm:pt-6 border-t border-[var(--line)] grid grid-cols-3 gap-0 w-fit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {[
                { k: "Location", v: "Noida, IN" },
                { k: "Focus", v: "Full-stack" },
              ].map((item, i) => (
                <div key={i} className={i > 0 ? "pl-8 border-l border-[var(--line)] ml-8" : ""}>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)] mb-1.5">
                    {item.k}
                  </div>
                  <div className="font-serif italic text-xl text-[var(--ink)]">{item.v}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: blob photo + floating badges ── */}
          <motion.div
            className="relative hidden lg:block"
            style={{ aspectRatio: "1/1", width: "100%", maxWidth: "500px", marginLeft: "auto" }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
          >
            {/* Sparkle accents */}
            <span className="absolute pointer-events-none select-none text-ink" style={{ top: "4%", left: "18%", fontSize: "24px", animation: "sparkSpin 8s linear infinite, sparkDrift 6s ease-in-out infinite", zIndex: 2 }}>✦</span>
            <span className="absolute pointer-events-none select-none text-pink-300" style={{ top: "26%", left: "-8%", fontSize: "18px", animation: "sparkSpin 10s linear infinite reverse, sparkDrift 7s ease-in-out infinite", zIndex: 2 }}>✧</span>
            <span className="absolute pointer-events-none select-none text-violet-ink" style={{ bottom: "10%", left: "16%", fontSize: "28px", animation: "sparkSpin 12s linear infinite, sparkDrift 8s ease-in-out infinite", zIndex: 2 }}>✦</span>
            <span className="absolute pointer-events-none select-none text-pink-200" style={{ top: "60%", right: "6%", fontSize: "16px", animation: "sparkSpin 14s linear infinite reverse, sparkDrift 9s ease-in-out infinite", zIndex: 2 }}>✧</span>

            {/* Morphing blob shapes */}
            <div className="absolute inset-0" style={{ zIndex: 1 }}>
              <div className="hero-blob-violet" />
              <div className="hero-blob-pink" />
            </div>

            {/* Photo clipped to oval shape */}
            <div className="hero-photo-wrap">
              <Image src="/riya.avif" alt="Riya Gupta" fill className="object-cover object-top" priority />
            </div>

            {/* Badge A — Full-Stack, top right */}
            <div className="hero-chip hero-chip-a">
              <span className="hero-chip__icon" style={{ background: "linear-gradient(135deg, #7c3aed, #a78bfa)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
              </span>
              <span>
                Full-Stack<br/>
                <span className="hero-chip__sub">React · Node · SQL</span>
              </span>
            </div>

            {/* Badge B — Software Dev, left middle */}
            <div className="hero-chip hero-chip-b">
              <span className="hero-chip__icon" style={{ background: "linear-gradient(135deg, #be185d, #ec4899)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
                </svg>
              </span>
              <span>
                Software Dev<br/>
                <span className="hero-chip__sub">Python · C++ · Java</span>
              </span>
            </div>

            {/* Badge C — AI/ML, bottom right */}
            <div className="hero-chip hero-chip-c">
              <span className="hero-chip__icon" style={{ background: "linear-gradient(135deg, #22d3ee, #a78bfa)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M3 12h2"/><path d="M19 12h2"/><path d="M12 3v2"/><path d="M12 19v2"/>
                  <path d="m5.6 5.6 1.4 1.4"/><path d="m17 17 1.4 1.4"/>
                  <path d="m5.6 18.4 1.4-1.4"/><path d="m17 7 1.4-1.4"/>
                </svg>
              </span>
              <span>
                AI / ML<br/>
                <span className="hero-chip__sub">PyTorch · sklearn</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[var(--muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--violet)] to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
