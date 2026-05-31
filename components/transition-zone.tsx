"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hero } from "@/components/sections/hero";
import { Focal } from "@/components/sections/focal";

// Single scroll container (350vh) drives both layers.
// scrollYProgress 0→1 spans 250vh of scroll (350vh - 100vh viewport).
//
// 0.00 → 0.28  Hero scales + fades  (~70vh of scroll)
// 0.30 → 1.00  Focal animates       (~178vh of scroll)
//
// The hero layer (z-50) covers focal (z-10) entirely at scale=1.
// As hero shrinks, focal is revealed — it was always underneath.

export function TransitionZone() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroScale   = useTransform(scrollYProgress, [0, 0.28], [1, 0.72]);
  const heroRadius  = useTransform(scrollYProgress, [0, 0.28], [0, 40]);
  const heroY       = useTransform(scrollYProgress, [0, 0.28], ["0%", "-4%"]);
  const heroOpacity = useTransform(scrollYProgress, [0.18, 0.30], [1, 0]);
  const heroShadow  = useTransform(
    scrollYProgress,
    [0, 0.06, 0.28],
    [
      "0px 0px 0px rgba(0,0,0,0)",
      "0px 24px 80px rgba(0,0,0,0.40)",
      "0px 60px 130px rgba(0,0,0,0.70)",
    ]
  );

  return (
    <div ref={containerRef} style={{ height: "350vh", position: "relative" }}>

      {/* ── Layer 1: Focal — always underneath at z-10 ────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 10,
          overflow: "hidden",
        }}
      >
        <Focal scrollYProgress={scrollYProgress} />
      </div>

      {/* ── Layer 2: Hero — covers focal entirely at scroll=0 ─────────── */}
      {/* marginTop: -100vh pulls it back to overlap layer 1 exactly       */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 50,
          marginTop: "-100vh",
        }}
      >
        {/* This motion.div IS the viewport layer that transforms.
            overflow:hidden + borderRadius = the "card shrinking" illusion. */}
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            scale: heroScale,
            borderRadius: heroRadius,
            y: heroY,
            opacity: heroOpacity,
            boxShadow: heroShadow,
          }}
        >
          <Hero />
        </motion.div>
      </div>

    </div>
  );
}
