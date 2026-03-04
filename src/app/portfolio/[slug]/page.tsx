import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import type { Project } from "../../../lib/supabase";
import ImageGallery from "../../../components/ImageGallery";

async function getProject(slug: string): Promise<Project | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
  );
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  return data as Project | null;
}

const COLORS = [
  "#F59E0B",
  "#8B5CF6",
  "#10B981",
  "#2196F3",
  "#EC4899",
  "#F97316",
];

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const colorIndex =
    project.slug
      .split("")
      .reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0) %
    COLORS.length;
  const color = COLORS[colorIndex];

  const metrics: { label: string; value: string }[] = (
    project.metrics || []
  ).map((m: string) => {
    const [label, value] = m.split(":");
    return { label: label?.trim() || "", value: value?.trim() || "" };
  });

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        padding: "100px 24px 60px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Retour */}
        <Link
          href="/#portfolio"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "var(--text3)",
            textDecoration: "none",
            fontSize: 14,
            marginBottom: 40,
            transition: "color 0.2s",
          }}
        >
          ← Retour aux réalisations
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <span
            style={{
              color,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.1em",
              fontFamily: "var(--font-mono)",
            }}
          >
            {(project.tags?.[0] || "PROJET").toUpperCase()}
          </span>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: "-0.02em",
              margin: "8px 0 16px",
            }}
          >
            {project.title}
          </h1>
          {project.short_desc && (
            <p style={{ color: "var(--text2)", fontSize: 18, lineHeight: 1.7 }}>
              {project.short_desc}
            </p>
          )}
        </div>

        {/* Image cover */}
        {project.cover_url && (
          <div
            style={{
              borderRadius: 18,
              overflow: "hidden",
              marginBottom: 40,
              border: "1px solid var(--border)",
            }}
          >
            <img
              src={project.cover_url}
              alt={project.title}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        )}

        {/* Métriques */}
        {metrics.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(metrics.length, 4)}, 1fr)`,
              gap: 14,
              marginBottom: 40,
            }}
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "20px 16px",
                  textAlign: "center",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    color: "var(--text)",
                    fontSize: 24,
                    fontWeight: 800,
                  }}
                >
                  {m.value}
                </strong>
                <small style={{ color: "var(--text3)", fontSize: 12 }}>
                  {m.label}
                </small>
              </div>
            ))}
          </div>
        )}

        {/* Contenu principal */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 280px",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* Description longue */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 18,
              padding: 32,
            }}
          >
            <h2
              style={{
                color: "var(--text)",
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              À propos du projet
            </h2>
            <div
              style={{
                color: "var(--text2)",
                fontSize: 15,
                lineHeight: 1.8,
                whiteSpace: "pre-wrap",
              }}
            >
              {project.long_desc || project.short_desc}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Infos */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: 24,
              }}
            >
              <h3
                style={{
                  color: "var(--text)",
                  fontSize: 14,
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                Informations
              </h3>
              {project.client && (
                <div style={{ marginBottom: 12 }}>
                  <small style={{ color: "var(--text3)", fontSize: 12 }}>
                    Client
                  </small>
                  <p
                    style={{
                      color: "var(--text)",
                      fontSize: 14,
                      margin: "2px 0 0",
                    }}
                  >
                    {project.client}
                  </p>
                </div>
              )}
              {project.date && (
                <div style={{ marginBottom: 12 }}>
                  <small style={{ color: "var(--text3)", fontSize: 12 }}>
                    Date
                  </small>
                  <p
                    style={{
                      color: "var(--text)",
                      fontSize: 14,
                      margin: "2px 0 0",
                    }}
                  >
                    {project.date}
                  </p>
                </div>
              )}
            </div>

            {/* Stack */}
            {project.tags && project.tags.length > 0 && (
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: 24,
                }}
              >
                <h3
                  style={{
                    color: "var(--text)",
                    fontSize: 14,
                    fontWeight: 700,
                    marginBottom: 14,
                  }}
                >
                  Stack technique
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {project.tags.map((t: string) => (
                    <span
                      key={t}
                      style={{
                        background: `${color}12`,
                        color,
                        padding: "4px 10px",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: "var(--font-mono)",
                        border: `1px solid ${color}30`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Liens */}
            {(project.url || project.github_url) && (
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "12px 16px",
                      borderRadius: 10,
                      background:
                        "linear-gradient(135deg, var(--blue), var(--blue-d))",
                      color: "var(--text)",
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    🌐 Voir le site
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "12px 16px",
                      borderRadius: 10,
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    GitHub →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Galerie avec modal */}
        <ImageGallery
          images={project.images || []}
          projectTitle={project.title}
          accentColor={color}
        />
      </div>
    </main>
  );
}
