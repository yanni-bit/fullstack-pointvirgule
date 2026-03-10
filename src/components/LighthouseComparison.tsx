"use client";

import useInView from "./useInView";

const stacks = [
  {
    name: "WordPress\n+ WooCommerce",
    icon: "🐘",
    color: "#21759B",
    bg: "rgba(33,117,155,0.08)",
    border: "rgba(33,117,155,0.2)",
    scores: { perf: [60, 85], seo: [85, 100], a11y: [80, 95], bp: [75, 95] },
  },
  {
    name: "Shopify",
    icon: "🛍️",
    color: "#96BF48",
    bg: "rgba(150,191,72,0.08)",
    border: "rgba(150,191,72,0.2)",
    scores: { perf: [65, 85], seo: [90, 100], a11y: [80, 95], bp: [85, 100] },
  },
  {
    name: "Next.js\nheadless",
    icon: "⚡",
    color: "#2196F3",
    bg: "rgba(33,150,243,0.08)",
    border: "rgba(33,150,243,0.25)",
    scores: { perf: [90, 100], seo: [95, 100], a11y: [90, 100], bp: [95, 100] },
    highlight: true,
  },
  {
    name: "Next.js\n+ Saleor",
    icon: "🚀",
    color: "#2196F3",
    bg: "rgba(33,150,243,0.08)",
    border: "rgba(33,150,243,0.25)",
    scores: { perf: [90, 100], seo: [95, 100], a11y: [90, 100], bp: [95, 100] },
    highlight: true,
  },
];

const metrics = [
  { key: "perf", label: "Performance" },
  { key: "seo", label: "SEO" },
  { key: "a11y", label: "Accessibilité" },
  { key: "bp", label: "Bonnes pratiques" },
];

function ScoreBar({
  min,
  max,
  highlight,
  delay,
  visible,
}: {
  min: number;
  max: number;
  highlight?: boolean;
  delay: number;
  visible: boolean;
}) {
  const avgScore = Math.round((min + max) / 2);
  const color = highlight ? "#2196F3" : avgScore >= 85 ? "#22c55e" : avgScore >= 70 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          flex: 1,
          height: 8,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 100,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* min bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: visible ? `${min}%` : "0%",
            background: `${color}44`,
            borderRadius: 100,
            transition: `width 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          }}
        />
        {/* max bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: visible ? `${max}%` : "0%",
            background: color,
            borderRadius: 100,
            transition: `width 0.8s cubic-bezier(0.16,1,0.3,1) ${delay + 100}ms`,
            boxShadow: highlight ? `0 0 8px ${color}88` : "none",
          }}
        />
      </div>
      <span
        style={{
          fontSize: 11,
          fontFamily: "var(--font-mono)",
          color: highlight ? "#2196F3" : "var(--text3)",
          minWidth: 60,
          textAlign: "right",
        }}
      >
        {min}–{max}
      </span>
    </div>
  );
}

export default function LighthouseComparison() {
  const { ref, visible } = useInView();

  return (
    <section
      id="performance"
      ref={ref}
      style={{
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(33,150,243,0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 18px",
              borderRadius: 100,
              background: "rgba(33,150,243,0.08)",
              border: "1px solid rgba(33,150,243,0.18)",
              color: "var(--blue)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              fontFamily: "var(--font-mono)",
              marginBottom: 20,
            }}
          >
            LIGHTHOUSE SCORES
          </span>

          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 900,
              color: "var(--text)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 16,
            }}
          >
            Pourquoi les performances
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #42A5F5, #1E88E5, #64B5F6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              font la différence
            </span>
          </h2>

          <p
            style={{
              fontSize: 16,
              color: "var(--text2)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Scores Lighthouse moyens observés selon la stack e-commerce.
            <br />
            Google récompense la vitesse — vos clients aussi.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {stacks.map((stack, si) => (
            <div
              key={stack.name}
              style={{
                borderRadius: 16,
                border: `1px solid ${stack.highlight ? "rgba(33,150,243,0.3)" : "var(--border)"}`,
                background: stack.highlight
                  ? "linear-gradient(135deg, rgba(33,150,243,0.06), rgba(30,136,229,0.03))"
                  : "var(--bg2)",
                padding: "24px 20px",
                position: "relative",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${si * 80}ms`,
                boxShadow: stack.highlight
                  ? "0 4px 32px rgba(33,150,243,0.1)"
                  : "none",
              }}
            >
              {stack.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: -1,
                    left: 20,
                    right: 20,
                    height: 2,
                    background: "linear-gradient(90deg, transparent, #2196F3, transparent)",
                    borderRadius: 100,
                  }}
                />
              )}

              {/* Stack name */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{stack.icon}</div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: stack.highlight ? "var(--blue)" : "var(--text)",
                    whiteSpace: "pre-line",
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stack.name}
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {metrics.map((m, mi) => {
                  const [min, max] = stack.scores[m.key as keyof typeof stack.scores];
                  return (
                    <div key={m.key}>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--text3)",
                          marginBottom: 5,
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {m.label}
                      </div>
                      <ScoreBar
                        min={min}
                        max={max}
                        highlight={stack.highlight}
                        delay={si * 80 + mi * 60 + 300}
                        visible={visible}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Score moyen */}
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--font-mono)" }}>
                  Performance moy.
                </span>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    fontFamily: "var(--font-mono)",
                    color: stack.highlight ? "#2196F3" : "var(--text2)",
                  }}
                >
                  {stack.scores.perf[0]}–{stack.scores.perf[1]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          style={{
            marginTop: 40,
            padding: "20px 24px",
            borderRadius: 12,
            background: "rgba(33,150,243,0.04)",
            border: "1px solid rgba(33,150,243,0.12)",
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 600ms",
          }}
        >
          <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: "var(--text)" }}>Source :</strong> Approximations basées sur des audits Lighthouse fréquents.
            Les scores varient selon l&apos;optimisation — un site Next.js mal configuré peut descendre, un WordPress optimisé peut monter.{" "}
            <span style={{ color: "var(--blue)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
              Trésors d&apos;Ambre : 97/100 ⚡
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}