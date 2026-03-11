"use client";

import useInView from "./useInView";

export default function About() {
  const { ref, visible } = useInView();

  const stats = [
    { value: "15+", label: "ans de commerce" },
    { value: "3", label: "projets livrés" },
    { value: "30€", label: "/h · tarif de lancement" },
  ];

  return (
    <section aria-label="À propos" style={{ padding: "0px 24px" }}>
      <div
        ref={ref}
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-start",
          gap: 28,
          flexWrap: "wrap",
          padding: "44px 40px",
          borderRadius: 20,
          background:
            "linear-gradient(135deg, rgba(33,150,243,0.06), rgba(21,101,192,0.03))",
          border: "1px solid rgba(33,150,243,0.12)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 16,
            background: "linear-gradient(135deg, var(--blue), var(--blue-d))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            fontWeight: 900,
            color: "#fff",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          YF
        </div>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h2
            style={{
              color: "var(--text)",
              fontSize: 23,
              fontWeight: 800,
              marginBottom: 6,
            }}
          >
            Yannick Franchaisse
          </h2>
          <p
            style={{
              color: "var(--blue)",
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            Développeur Fullstack · Gérant de Trésors d&apos;Ambre
          </p>
          <p style={{ color: "var(--text2)", fontSize: 15, lineHeight: 1.8 }}>
            Après 15 ans à gérer des marges, des stocks et des équipes,
            je sais qu&apos;un beau site qui ne convertit pas est une perte
            d&apos;argent. Je ne suis pas qu&apos;un développeur —{" "}
            <strong style={{ color: "var(--text)" }}>
              j&apos;ai été à votre place.
            </strong>{" "}
            Je construis des outils qui servent vos objectifs business : moins
            de coûts fixes, plus de marge, propriété totale de votre code.
          </p>
          <div
            style={{
              display: "flex",
              gap: 28,
              marginTop: 20,
              flexWrap: "wrap",
            }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <strong
                  style={{
                    display: "block",
                    color: "var(--blue)",
                    fontSize: 28,
                    fontWeight: 900,
                  }}
                >
                  {s.value}
                </strong>
                <small style={{ color: "var(--text3)", fontSize: 12 }}>
                  {s.label}
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}