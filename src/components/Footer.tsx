import Image from "next/image";

export default function Footer() {
  const links = [
    { label: "GitHub", href: "https://github.com/yanni-bit" },
    { label: "Codeur.com", href: "https://www.codeur.com" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "28px 24px",
        marginTop: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image
            src="/images/logo.png"
            alt="Fullstack Point-Virgule"
            width={22}
            height={22}
          />
          <span style={{ color: "var(--text3)", fontSize: 13 }}>
            © 2026 Fullstack Point-Virgule · Yannick Franchaisse
          </span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--text3)",
                fontSize: 13,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
