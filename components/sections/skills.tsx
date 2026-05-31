"use client";

import { useState } from "react";
import Marquee from "react-fast-marquee";
import { RiReactjsLine } from "react-icons/ri";
import {
  SiMongodb,
  SiExpress,
  SiRedux,
  SiNumpy,
  SiTypescript,
  SiNextdotjs,
} from "react-icons/si";
import { FaNodeJs, FaBootstrap, FaHtml5, FaCss3Alt, FaPython } from "react-icons/fa";
import { DiMysql } from "react-icons/di";
import { IoLogoJavascript } from "react-icons/io";
import { AnimateIn } from "@/components/ui/animate-in";
import { SectionLabel } from "@/components/ui/section-label";

const SKILLS = [
  { name: "React",      icon: RiReactjsLine,   color: "#22d3ee" },
  { name: "MongoDB",    icon: SiMongodb,        color: "#22c55e" },
  { name: "Node.js",    icon: FaNodeJs,         color: "#4ade80" },
  { name: "JavaScript", icon: IoLogoJavascript, color: "#facc15" },
  { name: "TypeScript", icon: SiTypescript,     color: "#60a5fa" },
  { name: "Python",     icon: FaPython,         color: "#fbbf24" },
  { name: "Bootstrap",  icon: FaBootstrap,      color: "#a78bfa" },
  { name: "Express",    icon: SiExpress,        color: "#f59e0b" },
  { name: "HTML5",      icon: FaHtml5,          color: "#f97316" },
  { name: "CSS3",       icon: FaCss3Alt,        color: "#38bdf8" },
  { name: "Redux",      icon: SiRedux,          color: "#c084fc" },
  { name: "NumPy",      icon: SiNumpy,          color: "#60a5fa" },
  { name: "MySQL",      icon: DiMysql,          color: "#fb923c" },
  { name: "Next.js",    icon: SiNextdotjs,      color: "#e5e7eb" },
];

function SkillCard({
  name,
  icon: Icon,
  color,
}: {
  name: string;
  icon: React.ElementType;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "148px",
        padding: "28px 16px 22px",
        margin: "0 8px",
        borderRadius: "14px",
        border: `1px solid ${hovered ? color + "55" : "rgba(255,255,255,0.06)"}`,
        background: hovered ? `${color}14` : "rgba(255,255,255,0.025)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "14px",
        cursor: "default",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 36px ${color}22` : "none",
        flexShrink: 0,
      }}
    >
      <Icon
        style={{
          fontSize: "52px",
          color: hovered ? color : "rgba(255,255,255,0.4)",
          transition: "color 0.25s ease",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "11px",
          color: hovered ? color : "rgba(255,255,255,0.38)",
          fontWeight: 600,
          letterSpacing: "0.06em",
          transition: "color 0.25s ease",
          textAlign: "center",
        }}
      >
        {name}
      </span>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-32">
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <AnimateIn>
          <SectionLabel index="03" label="Skills" />
          <h2 className="font-serif text-[clamp(36px,5vw,72px)] leading-[1] tracking-tight mt-4">
            Tools I <span className="grad-text italic">reach for</span>.
          </h2>
        </AnimateIn>
      </div>

      <div className="px-6 container mx-auto max-w-6xl">
        <Marquee speed={50} pauseOnHover gradient={false}>
          {SKILLS.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}