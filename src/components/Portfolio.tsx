"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useInView from "./useInView";
import { PROJECTS } from "../data/siteData";
import { supabase, type Project } from "../lib/supabase";

type DisplayProject = {
  id?: string;
  slug?: string;
  title: string;
  tag: string;
  desc: string;
  techs: string[];
  color: string;
  metrics: { label: string; value: string }[];
  fromDB?: boolean;
};

function ProjectCard({
  project,
  index,
}: {
  project: DisplayProject;
  index: number;
}) {
  const { ref, visible } = useInView();

  const cardContent = (
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
        cursor: project.slug ? "pointer" : "default",
        textDecoration: "none",
        display: "block",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-h)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${project.color}, ${project.color}66)`,
        }}
      />
      <div style={{ padding: "28px 28px 24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
          {project.slug && (
            <span style={{ color: "var(--text3)", fontSize: 12 }}>
              Voir le détail →
            </span>
          )}
        </div>
        <h3
          style={{
            color: "var(--text)",
            fontSize: 23,
            fontWeight: 800,
            margin: "4px 0 14px",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            color: "var(--text2)",
            fontSize: 14.5,
            lineHeight: 1.7,
            marginBottom: 22,
          }}
        >
          {project.desc}
        </p>
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          {project.metrics.map((m) => (
            <div
              key={m.label}
              style={{
                flex: 1,
                background: "var(--surface)",
                borderRadius: 10,
                padding: 12,
                textAlign: "center",
                border: "1px solid var(--border)",
              }}
            >
              <strong
                style={{
                  display: "block",
                  color: "var(--text)",
                  fontSize: 17,
                  fontWeight: 800,
                }}
              >
                {m.value}
              </strong>
              <small style={{ color: "var(--text3)", fontSize: 11 }}>
                {m.label}
              </small>
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

  if (project.slug) {
    return (
      <Link
        href={`/portfolio/${project.slug}`}
        style={{ textDecoration: "none" }}
      >
        {cardContent}
      </Link>
    );
  }
  return cardContent;
}

const COLORS = [
  "#F59E0B",
  "#8B5CF6",
  "#10B981",
  "#2196F3",
  "#EC4899",
  "#F97316",
];

function dbProjectToDisplay(p: Project, index: number): DisplayProject {
  let metrics: { label: string; value: string }[] = [];
  try {
    metrics = (p.metrics || []).map((m: string) => {
      const [label, value] = m.split(":");
      return { label: label?.trim() || "", value: value?.trim() || "" };
    });
  } catch {}
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    tag: (p.tags?.[0] || "PROJET").toUpperCase(),
    desc: p.short_desc || "",
    techs: p.tags || [],
    color: COLORS[index % COLORS.length],
    metrics,
    fromDB: true,
  };
}

export default function Portfolio() {
  const { ref, visible } = useInView();
  const [dbProjects, setDbProjects] = useState<DisplayProject[]>([]);

  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0)
          setDbProjects(
            data.map((p, i) => dbProjectToDisplay(p as Project, i)),
          );
      });
  }, []);

  const staticProjects: DisplayProject[] = PROJECTS.map((p) => ({
    ...p,
    tag: p.tag,
    desc: p.desc,
    techs: p.techs,
  }));
  const allProjects = dbProjects.length > 0 ? dbProjects : staticProjects;

  return (
    <section id="portfolio" style={{ padding: "50px 24px" }}>
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
              color: "var(--text)",
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
          {allProjects.map((p, i) => (
            <ProjectCard key={p.id || p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
