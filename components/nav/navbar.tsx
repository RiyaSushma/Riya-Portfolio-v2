"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { nav } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  useEffect(() => {
    const sections = nav.map((n) => n.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close mobile menu on scroll
  useMotionValueEvent(scrollY, "change", () => {
    if (menuOpen) setMenuOpen(false);
  });

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "py-3 bg-[rgba(5,5,8,0.85)] backdrop-blur-xl"
          : "py-5"
      )}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto px-3 py-3 flex items-center justify-between rounded-[100px] border border-[var(--line)] bg-[var(--surface)]">
        {/* Logo / Brand */}
        <a
          href="#top"
          onClick={(e) => handleNav(e, "#top")}
          className="flex items-center gap-3 group"
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-serif italic font-semibold"
            style={{ background: "var(--grad)", color: "#050508" }}
          >
            R
          </span>
          <span className="font-mono text-[13px] text-[var(--ink-2)] tracking-wider hidden sm:inline">
            riya.dev
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
          {nav.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNav(e, href)}
                className={cn(
                  "relative px-4 py-2 text-sm rounded-full transition-colors duration-200",
                  isActive
                    ? "text-[var(--ink)]"
                    : "text-[var(--muted)] hover:text-[var(--ink-2)]"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[var(--surface-2)] border border-[var(--line-strong)]"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {label}
              </a>
            );
          })}
        </nav>

        {/* Right side: CTA + hamburger */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={(e) => handleNav(e, "#contact")}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--line-strong)] text-sm text-[var(--dark-grey)] hover:text-[var(--ink)] hover:border-[var(--violet)] transition-all duration-200 bg-[var(--ink)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase">Available</span>
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--line-strong)] transition-all duration-200"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <motion.line
                x1="2" y1="5" x2="16" y2="5"
                animate={menuOpen ? { x1: 3, y1: 3, x2: 15, y2: 15 } : { x1: 2, y1: 5, x2: 16, y2: 5 }}
                transition={{ duration: 0.2 }}
              />
              <motion.line
                x1="2" y1="9" x2="16" y2="9"
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.line
                x1="2" y1="13" x2="16" y2="13"
                animate={menuOpen ? { x1: 3, y1: 15, x2: 15, y2: 3 } : { x1: 2, y1: 13, x2: 16, y2: 13 }}
                transition={{ duration: 0.2 }}
              />
            </motion.svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="md:hidden"
          >
            <div className="max-w-6xl mx-auto px-3 pt-2">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 flex flex-col gap-1">
                {nav.map(({ label, href }) => {
                  const id = href.replace("#", "");
                  const isActive = active === id;
                  return (
                    <a
                      key={href}
                      href={href}
                      onClick={(e) => handleNav(e, href)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm transition-all duration-200 flex items-center gap-3",
                        isActive
                          ? "bg-[var(--surface-2)] border border-[var(--line-strong)] text-[var(--ink)]"
                          : "text-[var(--muted)] hover:text-[var(--ink-2)] hover:bg-[var(--surface-2)]"
                      )}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--violet)] flex-shrink-0" />
                      )}
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
