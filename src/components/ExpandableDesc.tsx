"use client";

import { useState, useEffect } from "react";

export default function ExpandableDesc({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const COLLAPSED_HEIGHT = 168; // ~7 lignes

  // Desktop : texte complet sans bouton
  if (!isMobile) {
    return (
      <div style={{ color: "var(--text2)", fontSize: 15, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
        {text}
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          position: "relative",
          maxHeight: expanded ? "none" : COLLAPSED_HEIGHT,
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        <div style={{ color: "var(--text2)", fontSize: 15, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
          {text}
        </div>

        {/* Gradient de fondu — visible seulement quand replié */}
        {!expanded && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 64,
              background: "linear-gradient(to bottom, transparent, var(--bg2))",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Bouton Voir plus / Voir moins */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          all: "unset",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginTop: 12,
          color: "var(--blue)",
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {expanded ? "Voir moins ↑" : "Voir plus ↓"}
      </button>
    </div>
  );
}