"use client";

import useInView from "./useInView";
import { PROJECTS } from "../data/siteData";

function ProjectCard({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 18,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `all 0.6s ease ${index * 0.12}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <div
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${project.color}, ${project.color}66)`,
        }}
      />

      <div style={{ padding: "28px 28px 24px" }}>
        <span
          style={{
            color: project.color,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.1em",
            fontFamily: "var(--font-mono)",
          }}
        >
          {project.tag}
        </span>
        <h3 style={{ color: "#fff", fontSize: 23, fontWeight: 800, margin: "4px 0 14px" }}>
          {project.title}
        </h3>
        <p style={{ color: "var(--text2)", fontSize: 14.5, lineHeight: 1.7, marginBottom: 22 }}>
          {project.desc}
        </p>

        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          {project.metrics.map((m) => (
            <div
              key={m.label}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.025)",
                borderRadius: 10,
                padding: 12,
                textAlign: "center",
              }}
            >
              <strong style={{ display: "block", color: "#fff", fontSize: 17, fontWeight: 800 }}>
                {m.value}
              </strong>
              <small style={{ color: "var(--text3)", fontSize: 11 }}>{m.label}</small>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.techs.map((t) => (
            <span
              key={t}
              style={{
                background: `${project.color}12`,
                color: project.color,
                padding: "5px 12px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "var(--font-mono)",
                border: `1px solid ${project.color}30`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { ref, visible } = useInView();

  return (
    <section id="portfolio" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          ref={ref}
          style={{
            textAlign: "center",
            marginBottom: 56,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s ease",
          }}
        >
          <span
            style={{
              display: "block",
              color: "var(--blue)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              fontFamily: "var(--font-mono)",
              marginBottom: 10,
            }}
          >
            PORTFOLIO
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            Mes réalisations
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}