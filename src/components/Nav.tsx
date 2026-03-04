"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("accueil");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      for (const s of ["accueil", "services", "portfolio", "contact"]) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActive(s);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["accueil", "services", "portfolio", "contact"];

  const navStyle: React.CSSProperties = scrolled
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "0 28px",
        transition: "all 0.3s ease",
        backdropFilter: "blur(24px)",
        background: "var(--bg2)",
        borderBottom: "1px solid var(--border)",
      }
    : {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "0 28px",
        transition: "all 0.3s ease",
      };

  function getLinkStyle(s: string): React.CSSProperties {
    const isActive = active === s;
    return {
      color: isActive ? "var(--blue)" : "var(--text3)",
      background: isActive ? "rgba(33,150,243,0.1)" : "transparent",
      textDecoration: "none",
      fontWeight: 500,
      padding: "8px 14px",
      borderRadius: "8px",
      transition: "all 0.2s",
      fontSize: "14px",
    };
  }

  function getMobileLinkStyle(s: string): React.CSSProperties {
    const isActive = active === s;
    return {
      color: isActive ? "var(--blue)" : "var(--text3)",
      background: isActive ? "rgba(33,150,243,0.1)" : "transparent",
      textDecoration: "none",
      fontWeight: 500,
      padding: "12px 16px",
      borderRadius: "8px",
      fontSize: "16px",
    };
  }

  const waStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #25D366, #128C7E)",
    boxShadow: "0 4px 16px rgba(37,211,102,0.25)",
    color: "#fff",
    fontWeight: 600,
    textDecoration: "none",
    borderRadius: "10px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 18px",
    fontSize: "13px",
    transition: "transform 0.2s",
    marginLeft: "8px",
  };
  const waMobileStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #25D366, #128C7E)",
    color: "#fff",
    fontWeight: 600,
    textDecoration: "none",
    borderRadius: "10px",
    display: "block",
    textAlign: "center",
    padding: "12px 16px",
    fontSize: "14px",
    marginTop: "8px",
  };

  return (
    <nav style={navStyle}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 72,
        }}
      >
        <Link
          href="#accueil"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <Logo size={42} />
          <span style={{ fontSize: 19, fontWeight: 700, color: "var(--blue)" }}>
            Fullstack{" "}
            <span style={{ color: "var(--text)" }}>Point-Virgule</span>
          </span>
        </Link>

        {!isMobile && (
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {links.map((s) => (
              <Link key={s} href={`#${s}`} style={getLinkStyle(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Link>
            ))}
            <ThemeToggle />
            <Link
              href="https://wa.me/33650148605"
              target="_blank"
              rel="noopener noreferrer"
              style={waStyle}
            >
              💬 WhatsApp
            </Link>
          </div>
        )}

        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text)",
                fontSize: 26,
                cursor: "pointer",
              }}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        )}
      </div>

      {isMobile && open && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            padding: "12px 20px 24px",
            background: "var(--bg2)",
          }}
        >
          {links.map((s) => (
            <Link
              key={s}
              href={`#${s}`}
              onClick={() => setOpen(false)}
              style={getMobileLinkStyle(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Link>
          ))}
          <Link
            href="https://wa.me/33650148605"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={waMobileStyle}
          >
            💬 WhatsApp
          </Link>
        </div>
      )}
    </nav>
  );
}
