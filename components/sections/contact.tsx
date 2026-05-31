"use client";

import { hero } from "@/lib/data";
import { AnimateIn } from "@/components/ui/animate-in";
import { SectionLabel } from "@/components/ui/section-label";

export function Contact() {
  return (
    <section id="contact" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateIn className="mb-16">
          <SectionLabel index="05" label="Contact" />
          <h2 className="font-serif text-[clamp(36px,5vw,72px)] leading-[1] tracking-tight mt-4">
            Let&apos;s <span className="grad-text italic">talk</span>.
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <div
            className="rounded-2xl border overflow-hidden relative"
            style={{
              borderColor: "var(--line)",
              background: "var(--bg-2)",
            }}
          >
            {/* Inner gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(600px 400px at 100% 0%, rgba(236,72,153,0.12), transparent 60%), radial-gradient(600px 500px at 0% 100%, rgba(124,58,237,0.15), transparent 60%)",
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
              {/* Left */}
              <div className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[var(--line)]">
                <p className="text-[var(--ink-2)] text-lg leading-relaxed mb-8 max-w-sm">
                  I&apos;m open to full-time roles and interesting freelance work. The fastest way to
                  reach me is email.
                </p>

                <a
                  href={`mailto:${hero.email}`}
                  className="inline-flex items-center gap-3 font-serif italic text-2xl text-[var(--ink)] border-b border-[var(--line-strong)] pb-1 hover:text-[var(--pink-soft)] hover:border-[var(--pink-soft)] transition-all duration-200"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  {hero.email}
                </a>

                <div className="flex gap-3 mt-8">
                  <a
                    href={hero.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-11 h-11 rounded-xl border border-[var(--line)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] hover:-translate-y-0.5 transition-all duration-200"
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
                    className="w-11 h-11 rounded-xl border border-[var(--line)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.72C24 .77 23.21 0 22.23 0Z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right: form */}
              <form
                className="p-10 lg:p-14 flex flex-col gap-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const btn = (e.currentTarget as HTMLFormElement).querySelector(
                    "button[type='submit'] span"
                  );
                  if (btn) btn.textContent = "Sent ✓";
                }}
              >
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)]">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      className="bg-transparent border-0 border-b border-[var(--line)] text-[var(--ink)] placeholder:text-[var(--muted-2)] py-2.5 text-sm outline-none focus:border-[var(--pink-soft)] transition-colors duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)]">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="bg-transparent border-0 border-b border-[var(--line)] text-[var(--ink)] placeholder:text-[var(--muted-2)] py-2.5 text-sm outline-none focus:border-[var(--pink-soft)] transition-colors duration-200"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)]">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell me about your project..."
                    required
                    rows={4}
                    className="bg-transparent border-0 border-b border-[var(--line)] text-[var(--ink)] placeholder:text-[var(--muted-2)] py-2.5 text-sm outline-none focus:border-[var(--pink-soft)] transition-colors duration-200 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="self-start inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-semibold text-sm text-[#050508] overflow-hidden relative group"
                  style={{ background: "var(--grad)" }}
                >
                  <span>Send message</span>
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 5 7 7-7 7" />
                  </svg>
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
                </button>
              </form>
            </div>
          </div>
        </AnimateIn>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-xs text-[var(--muted)] tracking-wider">
            © 2026 · Riya G. · Designed &amp; built from scratch.
          </p>
          <p className="font-serif italic text-base text-[var(--ink-2)]">Made with ☕ in New Delhi.</p>
        </div>
      </div>
    </section>
  );
}
