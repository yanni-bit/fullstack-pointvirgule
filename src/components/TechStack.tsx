"use client";

import useInView from "./useInView";
import { TECH_STACK } from "../data/siteData";

export default function TechStack() {
  const { ref, visible } = useInView();

  return (
    <section style={{ padding: "60px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          ref={ref}
          style={{
            textAlign: "center",
            marginBottom: 48,
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
            STACK TECHNIQUE
          </span>
          <h2
            style={{
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            Technologies maîtrisées
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {TECH_STACK.map((cat) => (
            <div
              key={cat.category}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: 24,
              }}
            >
              <h4
                style={{
                  color: "var(--blue)",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 14,
                  textTransform: "uppercase",
                }}
              >
                {cat.category}
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      background: "var(--surface)",
                      color: "var(--text)",
                      padding: "7px 15px",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 500,
                      border: "1px solid var(--border)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
