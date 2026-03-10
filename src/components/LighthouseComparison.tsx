"use client";

import Typewriter from "./Typewriter";

export default function Hero() {
  return (
    <section
      id="accueil"
      style={{
        minHeight: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "120px 24px 80px",
      }}
    >
      {/* Glow effects */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "5%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(33,150,243,0.07) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "float 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: 0,
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(21,101,192,0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "float 10s ease-in-out infinite 2s",
          pointerEvents: "none",
        }}
      />

      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)",
        }}
      />

      <div
        style={{
          maxWidth: 820,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          animation: "heroFadeIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "6px 18px",
            borderRadius: 100,
            background: "rgba(33,150,243,0.08)",
            border: "1px solid rgba(33,150,243,0.18)",
            color: "var(--blue)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            fontFamily: "var(--font-mono)",
            marginBottom: 28,
          }}
        >
          DÉVELOPPEUR WEB FULLSTACK FREELANCE
        </span>

        <h1
          style={{
            fontSize: "clamp(38px, 6.5vw, 68px)",
            fontWeight: 900,
            lineHeight: 1.08,
            color: "var(--text)",
            marginBottom: 20,
            letterSpacing: "-0.03em",
          }}
        >
          Je construis vos
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #42A5F5, #1E88E5, #64B5F6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <Typewriter />
          </span>
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2.2vw, 20px)",
            color: "var(--text2)",
            lineHeight: 1.7,
            maxWidth: 580,
            margin: "0 auto 12px",
          }}
        >
          15+ ans de commerce, maintenant développeur fullstack.
          <br />
          Je comprends vos enjeux métier{" "}
          <strong style={{ color: "var(--text)" }}>et</strong> je code vos
          solutions.
        </p>

        <p
          style={{
            fontSize: 13,
            color: "var(--text3)",
            marginBottom: 36,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.02em",
          }}
        >
          Technologies modernes · Code sur mesure · Zéro abonnement · Propriété
          totale
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#portfolio"
            style={{
              display: "inline-block",
              padding: "13px 28px",
              borderRadius: 10,
              background: "linear-gradient(135deg, var(--blue), var(--blue-d))",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 24px rgba(33,150,243,0.25)",
            }}
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            style={{
              display: "inline-block",
              padding: "13px 28px",
              borderRadius: 10,
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text)",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Me contacter
          </a>
        </div>

        {/* Terminal */}
        <div
          style={{
            marginTop: 56,
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid var(--border)",
            maxWidth: 440,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "left",
            background: "var(--bg2)",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              padding: "11px 16px",
              borderBottom: "1px solid var(--border)",
              background: "var(--surface)",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ef4444",
              }}
            />
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#f59e0b",
              }}
            />
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            <span
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 11,
                color: "var(--text3)",
                fontFamily: "var(--font-mono)",
              }}
            >
              ~/fullstack-pointvirgule
            </span>
          </div>
          <div
            style={{
              padding: "16px 20px",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              lineHeight: 1.9,
            }}
          >
            <div>
              <span style={{ color: "var(--green)" }}>➜</span>{" "}
              <span style={{ color: "var(--blue)" }}>~</span> npx
              create-next-app@latest mon-projet
            </div>
            <div style={{ color: "var(--text3)" }}>
              ✔ TypeScript? <span style={{ color: "var(--green)" }}>Yes</span>
            </div>
            <div style={{ color: "var(--text3)" }}>
              ✔ Tailwind CSS? <span style={{ color: "var(--green)" }}>Yes</span>
            </div>
            <div style={{ color: "var(--text3)" }}>
              ✔ App Router? <span style={{ color: "var(--green)" }}>Yes</span>
            </div>
            <div style={{ color: "var(--green)", marginTop: 6 }}>
              🚀 Votre projet est prêt !
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}