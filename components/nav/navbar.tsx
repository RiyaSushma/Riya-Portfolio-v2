"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { nav } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
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

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
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

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => handleNav(e, "#contact")}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--line-strong)] text-sm text-[var(--dark-grey)] hover:text-[var(--ink)] hover:border-[var(--violet)] transition-all duration-200 bg-[var(--ink)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs tracking-widest uppercase">Available</span>
        </a>
      </div>
    </motion.header>
  );
}
