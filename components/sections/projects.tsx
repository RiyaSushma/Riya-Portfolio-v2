"use client";

import { useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { SectionLabel } from "@/components/ui/section-label";
import { PinContainer } from "@/components/ui/3d-pin";

const CONTAINER_WIDTH = 1320;
const CARD_WIDTH = 420;
const GAP = 20;

const PROJECTS = [
  {
    num: "01",
    title: "RAG Analysis Tool",
    category: "AI / Python",
    year: "2025",
    description:
      "Retrieval-augmented document Q&A with PDF and web ingestion, FAISS vector search, and LLM-powered responses. Fully Dockerized Flask backend.",
    longDescription:
      "Built a full RAG pipeline where users can upload PDFs or provide URLs to web pages. The system chunks and embeds documents using FAISS for vector similarity search, then routes queries to an LLM (OpenAI / local) to generate grounded answers with source citations. The Flask backend is containerized with Docker and exposes a REST API consumed by a minimal React frontend. Key challenges: chunking strategy for long docs, efficient re-indexing on upload, and latency management across the embed → retrieve → generate chain.",
    stack: ["Python", "Flask", "FAISS", "Docker", "LLM APIs"],
    accent: "#a78bfa",
    github: "#",
    image: "/projects/movie_recommendation.png",
  },
  {
    num: "02",
    title: "Food Ordering App",
    category: "Full-Stack",
    year: "2025",
    description:
      "Production-grade platform with JWT auth, cart management, and Redux state. RESTful API with Express and MongoDB.",
    longDescription:
      "A full-stack food ordering platform featuring user registration and JWT-based authentication, a dynamic restaurant and menu browser, real-time cart with Redux Toolkit, and order placement with status tracking. The Express + MongoDB backend handles auth middleware, order persistence, and RESTful CRUD. Frontend is built with React and styled for mobile-first UX.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Redux"],
    accent: "#f472b6",
    github: "#",
    image: "/projects/insta-clone.png",
  },
  {
    num: "03",
    title: "Text Sentiment Analysis",
    category: "ML",
    year: "2024",
    description:
      "Real-time sentiment dashboard for Reddit posts and free-form text. NLP models classify intent, emotion and toxicity in under a second.",
    longDescription:
      "A Streamlit dashboard that ingests live Reddit posts via PRAW and classifies them across three dimensions — sentiment, emotion, and toxicity score — using scikit-learn pipelines trained on labeled social data. Users can also paste free-form text for instant analysis. Models are serialized with joblib for sub-100ms inference on CPU.",
    stack: ["Python", "NLP", "Streamlit", "scikit-learn", "PRAW", "TextBlob"],
    accent: "#c4b5fd",
    github: "#",
    image: "/projects/text-sentiment-analysis.png",
  },
  {
    num: "04",
    title: "DSA Visualizer",
    category: "Frontend",
    year: "2024",
    description:
      "An interactive canvas that animates sorting and graph algorithms step-by-step — built to teach myself and help others understand CS fundamentals.",
    longDescription:
      "A browser-based visualizer that renders sorting algorithms (bubble, merge, quick, heap) and graph traversals (BFS, DFS, Dijkstra) frame by frame on an HTML5 Canvas. Each step is logged in a side panel with the variable state at that instant. Built entirely in vanilla JavaScript — the animation loop is driven by requestAnimationFrame.",
    stack: ["JavaScript", "Canvas API", "Algorithms"],
    accent: "#2dd4bf",
    github: "#",
    image: "/projects/text-sentiment-analysis-ss.png",
  },
];

// ── Project Detail Modal ──────────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof PROJECTS)[0];
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.80)",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          backdropFilter: "blur(8px)",
        }}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#0f0d1a",
            border: `1px solid ${project.accent}30`,
            borderRadius: "20px",
            padding: "clamp(24px, 4vw, 36px)",
            maxWidth: "640px",
            width: "100%",
            position: "relative",
            boxShadow: `0 40px 100px -20px ${project.accent}28`,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: "18px", right: "18px",
              width: "32px", height: "32px", borderRadius: "9999px",
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.6)", cursor: "pointer",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>

          <div className="flex items-start justify-between gap-4 mb-5 pr-8">
            <div>
              <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--muted)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px" }}>
                {project.category} · {project.year}
              </p>
              <h2 className="font-serif text-white font-normal" style={{ fontSize: "clamp(20px, 3vw, 28px)", lineHeight: 1.1 }}>
                {project.title}
              </h2>
            </div>
            <a
              href={project.github}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
              style={{ background: `${project.accent}18`, border: `1px solid ${project.accent}40`, color: project.accent, fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", letterSpacing: "0.06em", whiteSpace: "nowrap" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.73.5.86 5.37.86 11.64c0 4.91 3.18 9.07 7.59 10.54.55.1.75-.24.75-.53v-1.85c-3.09.67-3.74-1.49-3.74-1.49-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.67.08-.67 1.11.08 1.69 1.14 1.69 1.14.99 1.69 2.6 1.2 3.23.92.1-.72.39-1.2.7-1.48-2.47-.28-5.06-1.23-5.06-5.49 0-1.21.43-2.2 1.14-2.98-.11-.28-.49-1.41.11-2.94 0 0 .93-.3 3.05 1.14a10.5 10.5 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.6 1.53.22 2.66.11 2.94.71.78 1.14 1.77 1.14 2.98 0 4.27-2.6 5.21-5.07 5.48.4.34.76 1.02.76 2.05v3.04c0 .3.2.64.76.53 4.4-1.47 7.58-5.63 7.58-10.54C23.14 5.37 18.27.5 12 .5Z" />
              </svg>
              Get Code
            </a>
          </div>

          <div style={{ height: "1px", background: `linear-gradient(90deg, ${project.accent}50, transparent)`, marginBottom: "20px" }} />

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.75 }}>
              {project.longDescription}
            </p>
          </div>

          <div>
            <p style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", color: "var(--muted)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "10px" }}>Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", padding: "5px 12px", borderRadius: "9999px", background: `${project.accent}14`, border: `1px solid ${project.accent}35`, color: project.accent, letterSpacing: "0.06em" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


// ── PinCard ───────────────────────────────────────────────────────────────────
function PinCard({
  project,
  onOpenModal,
}: {
  project: (typeof PROJECTS)[0];
  onOpenModal: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="h-full flex items-center justify-center"
      style={{
        width: `${CARD_WIDTH}px`,
        flexShrink: 0,
        paddingInline: "12px",
        paddingRight: "10px",
      }}
    >
      <div
        className="relative cursor-pointer w-full"
        style={{ maxWidth: "420px", width: "100%" }}
        onClick={onOpenModal}
      >
        <PinContainer
          title="Read More"
          accentColor={project.accent}
          onHoverChange={setHovered}
        >
          {/* Card body */}
          <div
            style={{
              background: "#0e0c1a",
              borderRadius: "18px",
              border: `1px solid ${hovered ? project.accent + "55" : project.accent + "22"}`,
              height: "460px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transformStyle: "preserve-3d",
              boxShadow: hovered
                ? `0 40px 80px ${project.accent}30`
                : "0 8px 24px rgba(0,0,0,.55)",
              transition: "border-color 0.3s ease, box-shadow 0.4s ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                opacity: hovered ? 1 : 0,
                transition: "opacity .4s ease",
                background: `radial-gradient(circle at center, ${project.accent}22, transparent 70%)`,
              }}
            />

            {/* Accent top strip */}
            <div style={{ height: "2px", background: `linear-gradient(90deg, ${project.accent}, transparent 70%)`, flexShrink: 0 }} />

            {/* Image */}
            <div
              className="relative flex-shrink-0"
              style={{
                height: "240px",
                transform: hovered ? "translateZ(40px)" : "translateZ(0px)",
                transition: "transform .4s ease",
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top"
                sizes={`${CARD_WIDTH}px`}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, #0e0c1a 100%)" }} />
              <div style={{ position: "absolute", bottom: "10px", left: "14px", right: "14px", display: "flex", justifyContent: "space-between", zIndex: 2 }}>
                <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "9px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em" }}>
                  {project.num} / {String(PROJECTS.length).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "9px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {project.category} · {project.year}
                </span>
              </div>
            </div>

            {/* Text content */}
            <div className="flex flex-col flex-1" style={{ padding: "14px 16px 16px" }}>
              <h3
                className="font-serif text-white font-normal tracking-tight mb-1.5"
                style={{
                  fontSize: "clamp(17px, 2.2vw, 26px)",
                  lineHeight: 1.1,
                  transform: hovered ? "translateZ(60px)" : "translateZ(0px)",
                  transition: "transform .4s ease",
                }}
              >
                {project.title}
              </h3>
              <p
                style={
                  {
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.52)",
                    lineHeight: 1.6,
                    flex: 1,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  } as React.CSSProperties
                }
              >
                {project.description}
              </p>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "10px 0 8px" }} />

              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {project.stack.slice(0, 3).map((s) => (
                    <span key={s} style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "8.5px", padding: "2px 8px", borderRadius: "9999px", background: `${project.accent}12`, border: `1px solid ${project.accent}28`, color: project.accent, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      {s}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "8.5px", padding: "2px 8px", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.07em" }}>
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>
                <a
                  href={project.github}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-shrink-0 hover:scale-110 transition-transform duration-200"
                  style={{ width: "32px", height: "32px", borderRadius: "9999px", background: `${project.accent}15`, border: `1px solid ${project.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", color: project.accent }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </PinContainer>
      </div>
    </div>
  );
}

// ── Projects Section ──────────────────────────────────────────────────────────
export function Projects() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [maxTranslate, setMaxTranslate] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activeProject, setActiveProject] =
    useState<(typeof PROJECTS)[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -maxTranslate]
  );

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (v) => {
      setCurrentIdx(
        Math.round(
          v * (PROJECTS.length - 1)
        )
      );
    }
  );

  useLayoutEffect(() => {
    const calculate = () => {
      if (!trackRef.current) return;

      const trackWidth =
        trackRef.current.scrollWidth;

      const visibleWidth =
        Math.min(
          window.innerWidth,
          CONTAINER_WIDTH
        );

      setMaxTranslate(
        Math.max(
          trackWidth - visibleWidth,
          0
        )
      );
    };

    calculate();

    window.addEventListener(
      "resize",
      calculate
    );

    return () =>
      window.removeEventListener(
        "resize",
        calculate
      );
  }, []);

  return (
    <>
      <section
        id="projects"
        ref={outerRef}
        style={{
          height: `${PROJECTS.length * 120}vh`,
        }}
        className="relative bg-[#050508]"
      >
        <div
          className="
            sticky
            top-0
            h-screen
            overflow-hidden
            flex
            flex-col
          "
        >
          <div className="pt-28 pb-10">
            <div
              className="mx-auto px-6"
              style={{
                maxWidth:
                  `${CONTAINER_WIDTH}px`,
              }}
            >
              <SectionLabel
                index="04"
                label="Selected Work"
              />

              <div className="flex items-end justify-between mt-4">
                <h2
                  className="
                    font-serif
                    text-white
                    font-normal
                    leading-none
                  "
                  style={{
                    fontSize:
                      "clamp(48px,6vw,88px)",
                  }}
                >
                  Things I&apos;ve{" "}
                  <span
                    style={{
                      color:
                        "var(--accent-primary)",
                    }}
                  >
                    built.
                  </span>
                </h2>

                <div
                  style={{
                    fontFamily:
                      "var(--font-jetbrains-mono)",
                    fontSize: "11px",
                    color:
                      "rgba(255,255,255,.45)",
                    letterSpacing:
                      ".18em",
                  }}
                >
                  {String(
                    currentIdx + 1
                  ).padStart(2, "0")}
                  {" / "}
                  {String(
                    PROJECTS.length
                  ).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center overflow-hidden">
            <div
              className="
                mx-auto
                w-full
              "
              style={{
                maxWidth:
                  `${CONTAINER_WIDTH}px`,
              }}
            >
              <motion.div
                ref={trackRef}
                style={{
                  x,
                  display: "flex",
                  gap: `${GAP}px`,
                }}
              >
                {PROJECTS.map(
                  (project) => (
                    <PinCard
                      key={project.num}
                      project={project}
                      onOpenModal={() =>
                        setActiveProject(
                          project
                        )
                      }
                    />
                  )
                )}
              </motion.div>
            </div>
          </div>

          <div className="pb-8">
            <div
              className="mx-auto px-6"
              style={{
                maxWidth:
                  `${CONTAINER_WIDTH}px`,
              }}
            >
              <div
                style={{
                  height: "2px",
                  background:
                    "rgba(255,255,255,.08)",
                  borderRadius:
                    "9999px",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    scaleX:
                      scrollYProgress,
                    transformOrigin:
                      "left",
                    height: "100%",
                    background:
                      "linear-gradient(90deg,#a78bfa,#f472b6)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() =>
              setActiveProject(
                null
              )
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}