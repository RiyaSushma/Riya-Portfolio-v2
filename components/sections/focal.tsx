"use client";

import { useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import { TOKEN_RANGES, TOTAL_CHARS, LINE_COUNT } from "@/lib/constants";

const MARQUEE_ROW_1 = "BUILDING · THE WEB · SHIPPING FAST · ML ENGINEER · ";
const MARQUEE_ROW_2 = "FULL-STACK DEV · CLEAN CODE · OPEN TO WORK · NEW DELHI · ";

export function Focal({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [p, setP] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const mapped = (latest - 0.3) / 0.7;
    setP(Math.max(0, Math.min(1, mapped)));
  });

  const codeOpacity   = Math.min(1, Math.max(0, (p - 0.22) * 5));
  const charCount     = Math.floor(Math.max(0, (p - 0.42) / 0.58) * TOTAL_CHARS);
  const labelOpacity  = Math.min(1, p * 5);
  const marqueeShift  = p * -45;
  const captionOpacity = Math.min(1, Math.max(0, (p - 0.68) * 4));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
      }}
    >
      {/* Marquee row 1 — scrolls LEFT */}
      <div
        style={{
          position: "absolute", top: "36%", left: 0, right: 0,
          overflow: "hidden", pointerEvents: "none", zIndex: 1,
          opacity: Math.min(1, p * 4),
        }}
        aria-hidden="true"
      >
        <div
          className="font-serif"
          style={{
            fontSize: "clamp(64px, 9vw, 120px)", whiteSpace: "nowrap",
            transform: `translateX(${marqueeShift}vw)`,
            letterSpacing: "-0.02em", lineHeight: 1, userSelect: "none",
            willChange: "transform",
            background: "linear-gradient(135deg, rgba(167,139,250,0.55) 0%, rgba(236,72,153,0.48) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}
        >
          {MARQUEE_ROW_1.repeat(5)}
        </div>
      </div>

      {/* Marquee row 2 — scrolls RIGHT */}
      <div
        style={{
          position: "absolute", top: "54%", left: 0, right: 0,
          overflow: "hidden", pointerEvents: "none", zIndex: 1,
          opacity: Math.min(1, p * 4),
        }}
        aria-hidden="true"
      >
        <div
          className="font-serif"
          style={{
            fontSize: "clamp(64px, 9vw, 120px)", whiteSpace: "nowrap",
            transform: `translateX(${-marqueeShift}vw)`,
            letterSpacing: "-0.02em", lineHeight: 1, userSelect: "none",
            willChange: "transform",
            background: "linear-gradient(135deg, rgba(236,72,153,0.48) 0%, rgba(167,139,250,0.55) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}
        >
          {MARQUEE_ROW_2.repeat(5)}
        </div>
      </div>

      {/* Wave line background */}
      <svg
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 1, opacity: Math.min(1, p * 4),
        }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="rgba(120,80,210,0.18)" strokeWidth="1" fill="none">
          <path d="M -100,100 Q 400,20  780,180 Q 1100,340 1540,220" />
          <path d="M -100,240 Q 400,160 780,320 Q 1100,480 1540,360" />
          <path d="M -100,380 Q 400,300 780,460 Q 1100,620 1540,500" />
          <path d="M -100,520 Q 400,440 780,600 Q 1100,760 1540,640" />
          <path d="M -100,660 Q 400,580 780,740 Q 1100,900 1540,780" />
          <path d="M -100,800 Q 400,720 780,880 Q 1100,1040 1540,920" />
        </g>
        <g stroke="rgba(160,100,240,0.08)" strokeWidth="1.5" fill="none">
          <path d="M -100,170 Q 400,90  780,250 Q 1100,410 1540,290" />
          <path d="M -100,450 Q 400,370 780,530 Q 1100,690 1540,570" />
          <path d="M -100,730 Q 400,650 780,810 Q 1100,970 1540,850" />
        </g>
      </svg>

      {/* Ambient glows */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 75% at 96% 52%, rgba(180,40,110,0.28) 0%, transparent 65%)", pointerEvents: "none", zIndex: 2 }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 60% at 2% 50%, rgba(80,40,160,0.18) 0%, transparent 70%)", pointerEvents: "none", zIndex: 2 }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at center, transparent 0%, rgba(5,5,8,0.55) 100%)", pointerEvents: "none", zIndex: 3 }} />

      {/* Center composition */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>

        {/* Scroll-driven code block */}
        <div style={{ opacity: codeOpacity, willChange: "opacity" }}>
          <div
            style={{
              width: "clamp(280px, 34vw, 420px)", borderRadius: "14px",
              overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", background: "#080611",
            }}
            role="img"
            aria-label="Code snippet introducing Riya"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0c0918" }}>
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
              <span style={{ marginLeft: "14px", fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", color: "var(--muted)", letterSpacing: "0.06em" }}>
                riya.ts
              </span>
            </div>

            <div style={{ padding: "16px 20px" }}>
              <pre style={{ fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace", fontSize: "12.5px", lineHeight: "1.85", margin: 0 }}>
                <div style={{ display: "flex" }}>
                  <div style={{ paddingRight: "16px", marginRight: "16px", borderRight: "1px solid rgba(255,255,255,0.06)", color: "#3d3553", minWidth: "18px", textAlign: "right", userSelect: "none", lineHeight: "1.85", flexShrink: 0 }}>
                    {Array.from({ length: LINE_COUNT }, (_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {TOKEN_RANGES.map((token, i) => {
                      if (charCount <= token.start) return null;
                      const visible = token.text.slice(0, charCount - token.start);
                      return (
                        <span key={i} style={{ color: token.color || "var(--ink-2)" }}>
                          {visible}
                        </span>
                      );
                    })}
                    {charCount > 0 && charCount < TOTAL_CHARS && (
                      <span
                        style={{
                          display: "inline-block", width: "2px", height: "0.85em",
                          background: "var(--violet)", borderRadius: "1px",
                          verticalAlign: "middle", marginLeft: "1px",
                          animation: "cursorBlink 0.8s steps(1) infinite",
                        }}
                      />
                    )}
                  </div>
                </div>
              </pre>
            </div>
          </div>
        </div>

        {/* Caption — replaced "this is me." with actionable statement */}
        <div
          style={{
            textAlign: "center", opacity: captionOpacity,
            transform: `translateY(${(1 - captionOpacity) * 8}px)`, transition: "none",
          }}
        >
          <p
            className="font-serif"
            style={{
              fontSize: "clamp(18px, 2.2vw, 26px)", fontStyle: "italic",
              color: "var(--ink)", letterSpacing: "-0.01em", marginBottom: "10px",
            }}
          >
            — open to full-time roles.
          </p>
          <p
            style={{
              fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px",
              color: "var(--muted)", letterSpacing: "0.22em", textTransform: "uppercase",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            }}
          >
            <span>Full-Stack Dev</span>
            <span style={{ color: "var(--violet)", fontSize: "8px" }}>·</span>
            <span>ML Engineer</span>
            <span style={{ color: "var(--pink)", fontSize: "8px" }}>·</span>
            <span>New Delhi</span>
          </p>
        </div>
      </div>

      {/* Top-left label */}
      <div style={{ position: "absolute", top: "36px", left: "44px", zIndex: 15, opacity: labelOpacity, transform: `translateX(${(1 - Math.min(1, labelOpacity)) * -20}px)` }}>
        <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--muted-2)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          R / 01 — In Focus
        </p>
      </div>

      {/* Top-right label */}
      <div style={{ position: "absolute", top: "36px", right: "44px", zIndex: 15, opacity: labelOpacity, transform: `translateX(${(1 - Math.min(1, labelOpacity)) * 20}px)`, textAlign: "right" }}>
        <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--muted-2)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Portfolio &apos;26
        </p>
      </div>

      {/* Bottom-right label */}
      <div style={{ position: "absolute", bottom: "36px", right: "44px", zIndex: 15, opacity: captionOpacity, textAlign: "right" }}>
        <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--muted-2)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Riya — Associate SWE
        </p>
      </div>

      {/* Scroll progress bar */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, height: "2px",
          width: `${p * 100}%`,
          background: "linear-gradient(90deg, #a78bfa, #ec4899)",
          zIndex: 20, willChange: "width",
        }}
        role="progressbar"
        aria-hidden="true"
      />

      {/* Side lines */}
      <div style={{ position: "absolute", left: "44px", top: "60px", bottom: "60px", width: "1px", background: "linear-gradient(to bottom, transparent, rgba(167,139,250,0.15) 30%, rgba(167,139,250,0.15) 70%, transparent)", opacity: labelOpacity, zIndex: 15 }} />
      <div style={{ position: "absolute", right: "44px", top: "60px", bottom: "60px", width: "1px", background: "linear-gradient(to bottom, transparent, rgba(236,72,153,0.15) 30%, rgba(236,72,153,0.15) 70%, transparent)", opacity: labelOpacity, zIndex: 15 }} />
    </div>
  );
}
