"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PinContainerProps {
  children: React.ReactNode;
  title?: string;
  accentColor?: string;
  onHoverChange?: (hovered: boolean) => void;
}

export function PinContainer({
  children,
  title = "Read More",
  accentColor = "#a78bfa",
  onHoverChange,
}: PinContainerProps) {
  const [hovered, setHovered] = useState(false);

  const enter = () => { setHovered(true); onHoverChange?.(true); };
  const leave = () => { setHovered(false); onHoverChange?.(false); };

  return (
    <div
      style={{ position: "relative", perspective: "1200px" }}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {/* Badge */}
      <div
        style={{
          position: "absolute",
          top: "-14px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "#111",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            padding: "5px 14px",
            borderRadius: "9999px",
            boxShadow: `0 0 16px ${accentColor}40`,
          }}
        >
          {title}
        </span>
      </div>

      {/* Pin stem (blurred) + sharp stem + glowing dot */}
      <AnimatePresence>
        {hovered && (
          <>
            <motion.div
              key="stem-blur"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 90 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "-90px",
                width: "2px",
                transform: "translateX(-50%)",
                background: `linear-gradient(to bottom, ${accentColor}, transparent)`,
                zIndex: 28,
                filter: "blur(1.5px)",
              }}
            />
            <motion.div
              key="stem"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 90 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "-90px",
                width: "1px",
                transform: "translateX(-50%)",
                background: `linear-gradient(to bottom, ${accentColor}, transparent)`,
                zIndex: 29,
              }}
            />
            <motion.div
              key="dot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "-98px",
                width: "12px",
                height: "12px",
                borderRadius: "9999px",
                background: accentColor,
                transform: "translateX(-50%)",
                zIndex: 30,
                boxShadow: `0 0 24px ${accentColor}, 0 0 8px ${accentColor}`,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Tilt + lift */}
      <motion.div
        animate={{
          rotateX: hovered ? 8 : 0,
          y: hovered ? -12 : 0,
          scale: hovered ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
