"use client";

import { useState, useEffect } from "react";
import useInView from "./useInView";

const stacks = [
  {
    name: "WordPress + WooCommerce",
    perf: [60, 85],
    seo: [85, 100],
    a11y: [80, 95],
    bp: [75, 95],
    highlight: false,
    color: "#F59E0B",
  },
  {
    name: "Shopify",
    perf: [65, 85],
    seo: [90, 100],
    a11y: [80, 95],
    bp: [85, 100],
    highlight: false,
    color: "#10B981",
  },
  {
    name: "Next.js headless",
    perf: [90, 100],
    seo: [95, 100],
    a11y: [90, 100],
    bp: [95, 100],
    highlight: true,
    color: "#2196F3",
  },
  {
    name: "Next.js + Saleor",
    perf: [90, 100],
    seo: [95, 100],
    a11y: [90, 100],
    bp: [95, 100],
    highlight: true,
    color: "#2196F3",
  },
];

type MetricKey = "perf" | "seo" | "a11y" | "bp";

const metrics: { key: MetricKey; label: string }[] = [
  { key: "perf", label: "Performance" },
  { key: "seo", label: "SEO" },
  { key: "a11y", label: "Accessibilité" },
  { key: "bp", label: "Bonnes pratiques" },
];

function ScoreBar({
  min,
  max,
  color,
}: {
  min: number;
  max: number;
  color: string;
}) {
  const isBlue = color === "#2196F3";
  const textColor = color;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          flex: 1,
          height: 6,
          borderRadius: 3,
          background: "var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${min}%`,
            width: `${max - min}%`,
            height: "100%",
            borderRadius: 3,
            background: isBlue
              ? "linear-gradient(90deg, #2196F3, #42A5F5)"
              : color,
            opacity: isBlue ? 1 : 0.7,
          }}
        />
      </div>
      <span
        style={{
          fontSize: 11,
          fontFamily: "var(--font-mono)",
          color: textColor,
          minWidth: 60,
          textAlign: "right",
          fontWeight: 700,
        }}
      >
        {min}–{max}
      </span>
    </div>
  );
}

function MyScoreBadge({ value, label }: { value: number; label: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.5s ease",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          border: "3px solid #2196F3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 8px",
          background: "rgba(33,150,243,0.08)",
          boxShadow: "0 0 24px rgba(33,150,243,0.2)",
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#2196F3",
            fontFamily: "var(--font-mono)",
          }}
        >
          {value}
        </span>
      </div>
      <span style={{ fontSize: 11, color: "var(--text3)", fontWeight: 600 }}>
        {label}
      </span>
    </div>
  );
}

function StackCard({ s }: { s: typeof stacks[0] }) {
  return (
    <div
      style={{
        background: s.highlight ? "rgba(33,150,243,0.04)" : `${s.color}08`,
        border: `1px solid ${s.highlight ? "rgba(33,150,243,0.2)" : s.color + "30"}`,
        borderRadius: 12,
        padding: "16px 18px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, display: "inline-block", boxShadow: `0 0 6px ${s.color}80`, flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: s.highlight ? 700 : 500, color: s.highlight ? "var(--text)" : "var(--text2)" }}>
          {s.name}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {metrics.map((m) => (
          <div key={m.key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text3)", fontFamily: "var(--font-mono)", minWidth: 90, letterSpacing: "0.06em" }}>
              {m.label.toUpperCase()}
            </span>
            <div style={{ flex: 1 }}>
              <ScoreBar min={s[m.key][0]} max={s[m.key][1]} color={s.color} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenshotGallery() {
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  const screenshots = [
    { icon: "📱", label: "MOBILE · Moto G Power · 4G lente", src: "/images/lighthouse-mobile.png", alt: "Rapport Lighthouse mobile - 98/100/100/100" },
    { icon: "🖥️", label: "BUREAU · Émulation ordinateur", src: "/images/lighthouse-bureau.png", alt: "Rapport Lighthouse bureau - 100/100/100/100" },
  ];

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          marginBottom: 16,
        }}
      >
        {screenshots.map((item) => (
          <div
            key={item.label}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              overflow: "hidden",
              cursor: "zoom-in",
            }}
            onClick={() => setModalSrc(item.src)}
          >
            <div
              style={{
                padding: "12px 20px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text3)", letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>
                {item.label}
              </span>
              <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text3)" }}>🔍</span>
            </div>
            <img
              src={item.src}
              alt={item.alt}
              style={{ width: "100%", display: "block" }}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {modalSrc && (
        <div
          onClick={() => setModalSrc(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            cursor: "zoom-out",
          }}
        >
          <img
            src={modalSrc}
            alt="Lighthouse rapport agrandi"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: 12,
              boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setModalSrc(null)}
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "#fff",
              fontSize: 22,
              width: 40,
              height: 40,
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}

export default function LighthouseComparison() {
  const { ref, visible } = useInView();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{ padding: "80px 24px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
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
            PERFORMANCES
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: "-0.02em",
              marginBottom: 14,
            }}
          >
            Pourquoi Next.js change tout
          </h2>
          <p
            style={{
              color: "var(--text2)",
              fontSize: 16,
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Les scores Lighthouse varient fortement selon la stack. Voici ce
            qu&apos;on observe en moyenne sur des e-commerces bien configurés.
          </p>
        </div>

        {/* Mon score */}
        <div
          style={{
            background: "rgba(33,150,243,0.05)",
            border: "1px solid rgba(33,150,243,0.2)",
            borderRadius: 16,
            padding: "28px 32px",
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 200 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#2196F3",
                fontFamily: "var(--font-mono)",
                marginBottom: 6,
              }}
            >
              MON SITE · fullstack-pointvirgule.fr
            </div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: 4,
              }}
            >
              Next.js 15 + React 19
            </div>
            <div style={{ fontSize: 13, color: "var(--text3)" }}>
              Déployé sur Vercel · Audité avec Lighthouse 13
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <MyScoreBadge value={97} label="Performance" />
            <MyScoreBadge value={100} label="SEO" />
            <MyScoreBadge value={100} label="Accessibilité" />
            <MyScoreBadge value={100} label="Bonnes pratiques" />
          </div>
        </div>

        {/* Tableau comparatif desktop / Cards mobile */}
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            {stacks.map((s) => (
              <StackCard key={s.name} s={s} />
            ))}
          </div>
        ) : (
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 32,
          }}
        >
          {/* En-têtes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "220px repeat(4, 1fr)",
              padding: "14px 24px",
              borderBottom: "1px solid var(--border)",
              background: "var(--bg2)",
              gap: 16,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--text3)",
                letterSpacing: "0.08em",
                fontFamily: "var(--font-mono)",
              }}
            >
              STACK
            </span>
            {metrics.map((m) => (
              <span
                key={m.key}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--text3)",
                  letterSpacing: "0.08em",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {m.label.toUpperCase()}
              </span>
            ))}
          </div>

          {stacks.map((s, i) => (
            <div
              key={s.name}
              style={{
                display: "grid",
                gridTemplateColumns: "220px repeat(4, 1fr)",
                padding: "16px 24px",
                gap: 16,
                borderBottom:
                  i < stacks.length - 1 ? "1px solid var(--border)" : "none",
                background: s.highlight
                  ? `rgba(33,150,243,0.04)`
                  : `${s.color}08`,
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: s.highlight ? 700 : 400,
                  color: s.highlight ? "var(--text)" : "var(--text2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: s.color,
                    display: "inline-block",
                    flexShrink: 0,
                    boxShadow: `0 0 6px ${s.color}80`,
                  }}
                />
                {s.name}
              </span>
              {metrics.map((m) => (
                <ScoreBar
                  key={m.key}
                  min={s[m.key][0]}
                  max={s[m.key][1]}
                  color={s.color}
                />
              ))}
            </div>
          ))}
        </div>
        )}

        {/* Pourquoi + Point SEO */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "24px 28px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#2196F3",
                letterSpacing: "0.1em",
                fontFamily: "var(--font-mono)",
                marginBottom: 12,
              }}
            >
              POURQUOI NEXT.JS EXCELLE
            </div>
            {[
              "Server Side Rendering (SSR)",
              "Static Site Generation (SSG)",
              "Images optimisées automatiquement",
              "Code splitting automatique",
              "Moins de JavaScript bloquant",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <span style={{ color: "#2196F3", fontSize: 14 }}>✓</span>
                <span style={{ fontSize: 13, color: "var(--text2)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "24px 28px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--text3)",
                letterSpacing: "0.1em",
                fontFamily: "var(--font-mono)",
                marginBottom: 12,
              }}
            >
              POURQUOI WORDPRESS / SHOPIFY SONT PLUS BAS
            </div>
            {[
              "Nombreux plugins / apps",
              "Scripts marketing tiers",
              "Thèmes lourds non optimisés",
              "WordPress optimisé : 85–95",
              "Shopify optimisé : 80–90",
            ].map((item, i) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    color: i < 3 ? "#ef4444" : "var(--text3)",
                    fontSize: 14,
                  }}
                >
                  {i < 3 ? "✗" : "→"}
                </span>
                <span style={{ fontSize: 13, color: "var(--text2)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "rgba(33,150,243,0.04)",
              border: "1px solid rgba(33,150,243,0.18)",
              borderRadius: 14,
              padding: "24px 28px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#2196F3",
                letterSpacing: "0.1em",
                fontFamily: "var(--font-mono)",
                marginBottom: 12,
              }}
            >
              POINT IMPORTANT POUR LE SEO
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--text2)",
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              Google ne demande pas forcément 100. Un site est déjà{" "}
              <strong style={{ color: "var(--text)" }}>
                très performant à partir de 80–85
              </strong>{" "}
              si les Core Web Vitals sont au vert.
            </p>
            {[
              { metric: "LCP", target: "< 2.5s", desc: "Largest Contentful Paint" },
              { metric: "CLS", target: "< 0.1", desc: "Cumulative Layout Shift" },
              { metric: "INP", target: "< 200ms", desc: "Interaction to Next Paint" },
            ].map((cwv) => (
              <div
                key={cwv.metric}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#2196F3",
                    minWidth: 30,
                  }}
                >
                  {cwv.metric}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "#22c55e",
                    fontWeight: 700,
                    minWidth: 52,
                  }}
                >
                  {cwv.target}
                </span>
                <span style={{ fontSize: 12, color: "var(--text3)" }}>
                  {cwv.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Captures d'écran réelles + note GA4 */}
        <div style={{ marginTop: 32 }}>
          <ScreenshotGallery />
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "14px 20px",
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>ℹ️</span>
            <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "var(--text2)" }}>Variations du score selon les runs : </strong>
              Google Analytics (GA4) charge un script tiers de ~149 KiB qui peut varier entre 50 ms
              et 200 ms selon la charge des serveurs Google au moment du test. Cela peut faire
              fluctuer le score Lighthouse de quelques points d&apos;un run à l&apos;autre — sans
              aucune conséquence sur le référencement. Google utilise les{" "}
              <strong style={{ color: "var(--text2)" }}>Core Web Vitals réels</strong> (LCP, CLS,
              INP) mesurés sur vos vrais utilisateurs, pas le score de laboratoire.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}