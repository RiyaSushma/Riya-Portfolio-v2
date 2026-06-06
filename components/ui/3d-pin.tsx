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
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const enter = () => {
    setHovered(true);
    onHoverChange?.(true);
  };
  const leave = () => {
    setHovered(false);
    onHoverChange?.(false);
    setRotate({ x: 0, y: 0 });
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotate({
      x: -((y / rect.height) - 0.5) * 12,
      y: ((x / rect.width) - 0.5) * 12,
    });
  };

  return (
    <div
      style={{ position: "relative", perspective: "2000px" }}
      onMouseMove={handleMove}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {/* ── Floating label — always visible above the card ── */}
      <div
        style={{
          position: "absolute",
          top: "-118px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "rgba(8, 6, 17, 0.96)",
            border: "1px solid rgba(255,255,255,0.16)",
            color: "#fff",
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            padding: "6px 18px",
            borderRadius: "9999px",
            boxShadow: hovered
              ? `0 0 24px ${accentColor}70, 0 0 8px ${accentColor}40, inset 0 0 0 1px ${accentColor}30`
              : "0 2px 8px rgba(0,0,0,0.5)",
            transition: "box-shadow 0.35s ease",
          }}
        >
          {title}
        </span>
      </div>

      {/* ── Pin stem + glowing dot — hover only ── */}
      <AnimatePresence>
        {hovered && (
          <>
            {/* Blurred glow behind the stem */}
            <motion.div
              key="stem-glow"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "-100px",
                width: "4px",
                height: "100px",
                background: `linear-gradient(to bottom, ${accentColor}, transparent 90%)`,
                transform: "translateX(-50%)",
                transformOrigin: "top",
                filter: "blur(3px)",
                zIndex: 27,
              }}
            />

            {/* Sharp 1 px stem */}
            <motion.div
              key="stem"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "-100px",
                width: "1px",
                height: "100px",
                background: `linear-gradient(to bottom, ${accentColor}, ${accentColor}55 85%, transparent)`,
                transform: "translateX(-50%)",
                transformOrigin: "top",
                zIndex: 28,
              }}
            />

            {/* Glowing dot at the base of the stem */}
            <motion.div
              key="dot"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [1, 1.45, 1] }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                left: "50%",
                top: "-7px",
                width: "12px",
                height: "12px",
                borderRadius: "9999px",
                background: accentColor,
                transform: "translateX(-50%)",
                zIndex: 30,
                boxShadow: `
                  0 0 0 3px ${accentColor}28,
                  0 0 16px ${accentColor},
                  0 0 40px ${accentColor}90,
                  0 0 80px ${accentColor}50
                `,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* ── Card tilt + lift ── */}
      <motion.div
        animate={{
          rotateX: hovered ? rotate.x : 0,
          rotateY: hovered ? rotate.y : 0,
          y: hovered ? -14 : 0,
          scale: hovered ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 340, damping: 20 }}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: hovered
            ? `0 36px 72px rgba(0,0,0,.55), 0 0 0 1px ${accentColor}25`
            : "0 8px 24px rgba(0,0,0,.25)",
          transition: "box-shadow 0.35s ease",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
