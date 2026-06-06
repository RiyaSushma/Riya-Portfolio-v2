"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/lib/data";
import { AnimateIn } from "@/components/ui/animate-in";
import { SectionLabel } from "@/components/ui/section-label";

// Brand colors for stack technology tags
const TECH_COLORS: Record<string, string> = {
  "Angular 18":    "#DD0031",
  "Angular":       "#DD0031",
  "TypeScript":    "#3178C6",
  "Node.js":       "#339933",
  "GCP":           "#4285F4",
  "Mixpanel":      "#9B6DD8",
  "Shopify API":   "#7AB55C",
  "Tailwind CSS":  "#06B6D4",
  "Laravel":       "#FF2D20",
  "Remix.js":      "#a78bfa",
  "Prisma":        "#5A67D8",
  "GraphQL":       "#E10098",
  "Docker":        "#2496ED",
  "PostgreSQL":    "#336791",
  "MongoDB":       "#47A248",
  "Python":        "#3776AB",
  "Flask":         "#c4badb",
};

function getBorderColor(type: string): string {
  return type === "Full-time" ? "var(--violet)" : "var(--pink)";
}

function getTagStyle(tech: string) {
  const color = TECH_COLORS[tech];
  if (color) {
    return {
      background: `${color}18`,
      borderColor: `${color}44`,
      color,
    };
  }
  return {
    background: "var(--surface-2)" as string,
    borderColor: "rgba(255,255,255,0.1)" as string,
    color: "var(--ink-2)" as string,
  };
}

export function Experience() {
  const [open, setOpen] = useState<string>(experiences[0].id);

  return (
    <section id="experience" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateIn className="mb-16">
          <SectionLabel index="02" label="Experience" />
          <h2 className="font-serif text-[clamp(36px,5vw,72px)] leading-[1] tracking-tight mt-4">
            Where I&apos;ve <span className="grad-text italic">shipped</span>.
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Company selector */}
          <AnimateIn
            delay={0.1}
            className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0"
          >
            {experiences.map((exp) => {
              const isOpen = open === exp.id;
              const accentColor = getBorderColor(exp.type);
              return (
                <button
                  key={exp.id}
                  onClick={() => setOpen(exp.id)}
                  style={{
                    borderLeft: `3px solid ${isOpen ? accentColor : "rgba(255,255,255,0.06)"}`,
                  }}
                  className={`text-left px-4 py-3 rounded-xl border transition-all duration-200 flex-shrink-0 lg:flex-shrink ${
                    isOpen
                      ? "bg-[var(--surface-2)] border-[var(--line-strong)] text-[var(--ink)]"
                      : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink-2)] hover:border-[var(--line-strong)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Company monogram */}
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-serif italic flex-shrink-0"
                      style={{
                        background: isOpen ? `${accentColor === "var(--violet)" ? "#a78bfa" : "#ec4899"}18` : "rgba(255,255,255,0.04)",
                        color: isOpen ? accentColor : "var(--muted)",
                        border: `1px solid ${isOpen ? (accentColor === "var(--violet)" ? "rgba(167,139,250,0.3)" : "rgba(236,72,153,0.3)") : "rgba(255,255,255,0.06)"}`,
                      }}
                    >
                      {exp.company[0]}
                    </span>
                    <div>
                      <div className="text-sm font-medium whitespace-nowrap">{exp.company}</div>
                      <div className="font-mono text-[10px] tracking-wider text-[var(--muted)] mt-0.5 uppercase">
                        {exp.type}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </AnimateIn>

          {/* Detail panel */}
          <AnimateIn delay={0.2}>
            <AnimatePresence mode="wait">
              {experiences
                .filter((e) => e.id === open)
                .map((exp) => {
                  const accentColor = getBorderColor(exp.type);
                  return (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                      className="surface-card overflow-hidden"
                    >
                      {/* Accent gradient strip at top */}
                      <div
                        style={{
                          height: "2px",
                          background: `linear-gradient(90deg, ${accentColor === "var(--violet)" ? "rgba(167,139,250,0.7)" : "rgba(236,72,153,0.7)"}, transparent 70%)`,
                        }}
                      />

                      <div className="p-5 sm:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="font-serif text-2xl text-[var(--ink)]">{exp.role}</h3>
                            <p className="text-[var(--violet)] text-sm mt-1">{exp.company}</p>
                            {/* Stat row */}
                            <p
                              className="mono-label mt-2"
                              style={{ color: accentColor === "var(--violet)" ? "var(--muted)" : "var(--muted)" }}
                            >
                              {exp.type}
                              {exp.stack.length > 0 && (
                                <> · {exp.stack.slice(0, 2).join(" · ")}</>
                              )}
                            </p>
                          </div>
                          <span className="font-mono text-xs text-[var(--muted)] bg-[var(--surface-2)] px-3 py-1.5 rounded-full border border-[var(--line)] whitespace-nowrap">
                            {exp.period}
                          </span>
                        </div>

                        <ul className="space-y-3 mb-8 mt-6">
                          {exp.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-[var(--ink-2)] leading-relaxed"
                            >
                              <span
                                className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                                style={{ background: accentColor === "var(--violet)" ? "var(--violet)" : "var(--pink)" }}
                              />
                              {h}
                            </li>
                          ))}
                        </ul>

                        {/* Brand-colored stack tags */}
                        <div className="flex flex-wrap gap-2 pt-6 border-t border-[var(--line)]">
                          {exp.stack.map((s) => {
                            const tagStyle = getTagStyle(s);
                            return (
                              <span
                                key={s}
                                className="font-mono text-[11px] px-3 py-1.5 rounded-full border"
                                style={tagStyle}
                              >
                                {s}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
