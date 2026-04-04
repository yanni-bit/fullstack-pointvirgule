"use client";

import useInView from "./useInView";
import { SERVICES } from "../data/siteData";

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      className="service-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.55s ease ${index * 0.1}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-h)";
        e.currentTarget.style.background = "rgba(33,150,243,0.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.background = "var(--surface)";
      }}
    >
      <div style={{ fontSize: 34 }}>{service.icon}</div>
      <h3
        style={{
          color: "var(--text)",
          fontSize: 19,
          fontWeight: 700,
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          color: "var(--text2)",
          fontSize: 14.5,
          lineHeight: 1.7,
        }}
      >
        {service.desc}
      </p>

      {/* Bénéfice client — aligné par subgrid */}
      {"benefit" in service && service.benefit ? (
        <p
          style={{
            color: "var(--blue)",
            fontSize: 13,
            lineHeight: 1.6,
            padding: "10px 14px",
            background: "rgba(33,150,243,0.06)",
            borderRadius: 8,
            borderLeft: "3px solid var(--blue)",
            fontStyle: "italic",
            alignSelf: "start",
          }}
        >
          {service.benefit}
        </p>
      ) : (
        <div />
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          alignSelf: "end",
        }}
      >
        {service.techs.map((t) => (
          <span
            key={t}
            style={{
              background: "rgba(33,150,243,0.08)",
              color: "var(--blue)",
              padding: "4px 11px",
              borderRadius: 6,
              fontSize: 11.5,
              fontWeight: 600,
              fontFamily: "var(--font-mono)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const { ref, visible } = useInView();

  return (
    <section id="services" style={{ padding: "50px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          ref={ref}
          style={{
            textAlign: "center",
            marginBottom: 56,
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
            SERVICES
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            Ce que je peux faire pour vous
          </h2>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}