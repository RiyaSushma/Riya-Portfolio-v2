"use client";

import { useRef, useState, useEffect } from "react";
import { about } from "@/lib/data";
import { TOKEN_RANGES, TOTAL_CHARS, LINE_COUNT } from "@/lib/constants";
import { AnimateIn } from "@/components/ui/animate-in";
import { SectionLabel } from "@/components/ui/section-label";

// ── CountUp ─────────────────────────────────────────────────────────────────
function CountUp({
  end,
  suffix,
  label,
  visible,
}: {
  end: number;
  suffix: string;
  label: string;
  visible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let current = 0;
    const stepTime = Math.max(16, 1200 / end);
    const timer = setInterval(() => {
      current = Math.min(current + 1, end);
      setCount(current);
      if (current >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [visible, end]);

  return (
    <div className="text-center">
      <div className="font-serif italic text-2xl grad-text" aria-label={`${end}${suffix} ${label}`}>
        {count}{suffix}
      </div>
      <div className="mono-label mt-1.5">{label}</div>
    </div>
  );
}

// ── Metrics Card ─────────────────────────────────────────────────────────────
function MetricsCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="surface-card p-5 mt-5">
      <p className="mono-label mb-5">{"career_metrics"}</p>
      <div className="grid grid-cols-3 gap-3">
        <CountUp end={3}  suffix=""  label="Companies"     visible={visible} />
        <CountUp end={2}  suffix=""  label="Certifications" visible={visible} />
        <CountUp end={5} suffix="+" label="Technologies"  visible={visible} />
      </div>
    </div>
  );
}

// ── Code Block ──────────────────────────────────────────────────────────────
function CodeBlock() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [charCount, setCharCount] = useState(0);
  const [started, setStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

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
      role="img"
      aria-label="Code snippet showing Riya's profile as a JavaScript object"
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
            {/* Line numbers */}
            <div
              className="select-none text-right leading-[1.9]"
              style={{ paddingRight: "20px", marginRight: "20px", borderRight: "1px solid rgba(255,255,255,0.06)", color: "#3d3553", minWidth: "28px" }}
            >
              {Array.from({ length: LINE_COUNT }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code with incremental reveal */}
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
              {!done && (
                <span
                  style={{
                    display: "inline-block", width: "2px", height: "0.85em",
                    background: "var(--violet)", borderRadius: "1px",
                    verticalAlign: "middle", marginLeft: "1px",
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

            {/* Certifications */}
            <div className="surface-card p-5 space-y-4">
              <div className="mono-label">Certifications</div>
              <div className="flex items-start gap-3">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--violet)" }} />
                <div>
                  <p className="text-sm text-[var(--ink-2)] leading-snug">
                    Generative AI &amp; Machine Learning
                  </p>
                  <p className="mt-0.5 uppercase tracking-wider" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--muted)" }}>
                    IIT Guwahati
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--pink)" }} />
                <div>
                  <p className="text-sm text-[var(--ink-2)] leading-snug">
                    Python for Data Science
                  </p>
                  <p className="mt-0.5 uppercase tracking-wider" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--muted)" }}>
                    IBM
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right: code block + metrics card */}
          <div className="lg:sticky lg:top-28">
            <AnimateIn delay={0.25}>
              <CodeBlock />
              <MetricsCard />
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
