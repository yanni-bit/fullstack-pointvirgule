"use client";

import { useState } from "react";
import useInView from "./useInView";
import { CONTACT_INFO } from "../data/siteData";

export default function Contact() {
  const { ref, visible } = useInView();
  const [sent, setSent] = useState(false);

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "14px 16px",
    color: "#fff",
    fontSize: 14,
    fontFamily: "var(--font-sans)",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" style={{ padding: "100px 24px 60px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
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
            CONTACT
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            Parlons de votre projet
          </h2>
          <p style={{ color: "var(--text2)", fontSize: 16 }}>
            R&#233;ponse sous 24h garantie.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 14,
            marginBottom: 36,
          }}
        >
          {CONTACT_INFO.map((c) => {
            const isExternal = c.href !== null && c.href.startsWith("http");
            return (
              <a
                key={c.label}
                href={c.href || "#"}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "22px 16px",
                  textDecoration: "none",
                  transition: "border-color 0.2s",
                  cursor: c.href ? "pointer" : "default",
                }}
              >
                <span style={{ fontSize: 22 }}>{c.icon}</span>
                <small style={{ color: "var(--text3)", fontSize: 12 }}>{c.label}</small>
                <strong style={{ color: "#fff", fontSize: 14 }}>{c.value}</strong>
              </a>
            );
          })}
        </div>

        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            padding: 32,
          }}
        >
          {sent ? (
            <div style={{ textAlign: "center", padding: "48px 24px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>&#9989;</div>
              <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
                Message envoy&#233; !
              </h3>
              <p style={{ color: "var(--text2)" }}>Je vous recontacte sous 24h.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <input placeholder="Nom" style={inputStyle} />
                <input placeholder="Email" type="email" style={inputStyle} />
              </div>
              <input placeholder="Sujet" style={inputStyle} />
              <textarea
                placeholder="D&#233;crivez votre projet..."
                rows={5}
                style={{
                  ...inputStyle,
                  resize: "vertical" as const,
                  minHeight: 120,
                }}
              />
              <button
                onClick={() => setSent(true)}
                style={{
                  width: "100%",
                  padding: 16,
                  borderRadius: 10,
                  border: "none",
                  background: "linear-gradient(135deg, var(--blue), var(--blue-d))",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "var(--font-sans)",
                  cursor: "pointer",
                  boxShadow: "0 4px 24px rgba(33,150,243,0.25)",
                }}
              >
                Envoyer le message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}