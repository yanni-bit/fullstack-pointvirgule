"use client";

import { useEffect, useState } from "react";

interface ProjectLayoutProps {
  desc: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function ProjectLayout({ desc, sidebar }: ProjectLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mobile : Stack → À propos → Informations (colonne unique)
  if (isMobile) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div key="sidebar">{sidebar}</div>
        <div key="desc">{desc}</div>
      </div>
    );
  }

  // Desktop : À propos (gauche) | Sidebar (droite)
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 280px",
        gap: 24,
        alignItems: "start",
        marginBottom: 24,
      }}
    >
      <div key="desc">{desc}</div>
      <div key="sidebar">{sidebar}</div>
    </div>
  );
}
