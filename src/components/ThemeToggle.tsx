"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Évite le mismatch SSR/client
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0 }} />
    );
  }

  return (
    <button
      onClick={toggle}
      title={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
      style={{
        all: "unset",
        cursor: "pointer",
        width: 38,
        height: 38,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        fontSize: 18,
        transition: "background 0.2s, border-color 0.2s, transform 0.2s",
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-h)";
        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
      aria-label="Changer de thème"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}