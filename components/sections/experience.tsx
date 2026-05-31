"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/lib/data";
import { AnimateIn } from "@/components/ui/animate-in";
import { SectionLabel } from "@/components/ui/section-label";

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
            {experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setOpen(exp.id)}
                className={`text-left px-4 py-3 rounded-xl border transition-all duration-200 flex-shrink-0 lg:flex-shrink ${
                  open === exp.id
                    ? "bg-[var(--surface-2)] border-[var(--violet)] text-[var(--ink)]"
                    : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink-2)] hover:border-[var(--line-strong)]"
                }`}
              >
                <div className="text-sm font-medium whitespace-nowrap">{exp.company}</div>
                <div className="font-mono text-[10px] tracking-wider text-[var(--muted)] mt-0.5 uppercase">
                  {exp.type}
                </div>
              </button>
            ))}
          </AnimateIn>

          {/* Detail panel */}
          <AnimateIn delay={0.2}>
            <AnimatePresence mode="wait">
              {experiences
                .filter((e) => e.id === open)
                .map((exp) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                    className="surface-card p-8"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <h3 className="font-serif text-2xl text-[var(--ink)]">{exp.role}</h3>
                        <p className="text-[var(--violet)] text-sm mt-1">{exp.company}</p>
                      </div>
                      <span className="font-mono text-xs text-[var(--muted)] bg-[var(--surface-2)] px-3 py-1.5 rounded-full border border-[var(--line)] whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {exp.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-[var(--ink-2)] leading-relaxed"
                        >
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--pink)] flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-[var(--line)]">
                      {exp.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[11px] px-3 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--line)] text-[var(--ink-2)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
