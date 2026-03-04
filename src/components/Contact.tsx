"use client";

import { useState } from "react";
import useInView from "./useInView";
import { CONTACT_INFO } from "../data/siteData";

export default function Contact() {
  const { ref, visible } = useInView();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const inputStyle: React.CSSProperties = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    padding: "14px 16px",
    color: "var(--text)",
    fontSize: 14,
    fontFamily: "var(--font-sans)",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  };

  const handleSubmit = async () => {
    setError(null);
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur inconnue");
      }
      setSent(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'envoi. Réessayez.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: "50px 24px 60px" }}>
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
              color: "var(--text)",
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            Parlons de votre projet
          </h2>
          <p style={{ color: "var(--text2)", fontSize: 16 }}>
            Réponse sous 24h garantie.
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
                <small style={{ color: "var(--text3)", fontSize: 12 }}>
                  {c.label}
                </small>
                {c.value.map((text, idx) => (
                  <strong
                    key={idx}
                    style={{
                      color: "var(--text)",
                      fontSize: 14,
                      textAlign: "center",
                      display: "block",
                    }}
                  >
                    {text}
                  </strong>
                ))}
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
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3
                style={{
                  color: "var(--text)",
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Message envoyé !
              </h3>
              <p style={{ color: "var(--text2)" }}>
                Je vous recontacte sous 24h.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                <input
                  placeholder="Nom *"
                  style={inputStyle}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  placeholder="Email *"
                  type="email"
                  style={inputStyle}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <input
                placeholder="Votre service souhaité (e-commerce, vitrine, API...)"
                style={inputStyle}
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
              />
              <textarea
                placeholder="Décrivez votre projet... *"
                rows={5}
                style={{
                  ...inputStyle,
                  resize: "vertical" as const,
                  minHeight: 120,
                }}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              {error && (
                <p
                  style={{
                    color: "#f87171",
                    fontSize: 13,
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  {error}
                </p>
              )}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: 16,
                  borderRadius: 10,
                  border: "none",
                  background: loading
                    ? "rgba(33,150,243,0.4)"
                    : "linear-gradient(135deg, var(--blue), var(--blue-d))",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "var(--font-sans)",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading
                    ? "none"
                    : "0 4px 24px rgba(33,150,243,0.25)",
                  transition: "all 0.2s",
                }}
              >
                {loading ? "Envoi en cours..." : "On parle de votre projet ? →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
