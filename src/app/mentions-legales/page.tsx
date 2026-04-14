import React from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

// ─────────────────────────────────────────────
// Page Mentions Légales — Fullstack Point-Virgule
// Route : /mentions-legales
// ─────────────────────────────────────────────

export default function MentionsLegales() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: "100vh", background: "var(--bg)", color: "#CBD5E1" }}>
        <div style={{ maxWidth: 768, margin: "0 auto", padding: "120px 24px 80px" }}>
          {/* ── Header ── */}
          <header style={{ marginBottom: 64 }}>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                fontFamily: "var(--font-outfit)",
              }}
            >
              Mentions légales
            </h1>
            <p style={{ marginTop: 16, fontSize: 14, color: "var(--text3)" }}>
              En vigueur au 14 avril 2026
            </p>
            <div
              style={{
                marginTop: 24,
                height: 4,
                width: 64,
                borderRadius: 100,
                background: "var(--blue)",
              }}
            />
          </header>

          {/* ── Sections ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 56, fontSize: 15, lineHeight: 1.75 }}>
            {/* 1. Éditeur */}
            <Section title="1. Éditeur du site">
              <p>
                Le site <Strong>fullstack-pointvirgule.fr</Strong> est édité par :
              </p>
              <dl style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                <Row label="Dénomination" value="Fullstack Point-Virgule" />
                <Row label="Responsable" value="Yannick Franchaisse" />
                <Row label="Statut" value="Micro-entrepreneur (Entreprise Individuelle)" />
                <Row label="SIREN" value="789 093 127" />
                <Row label="APE" value="6201Z — Programmation informatique" />
                <Row label="Adresse" value="Gisors (27140), Normandie, France" />
                <Row
                  label="E-mail"
                  value={
                    <a
                      href="mailto:contact@fullstack-pointvirgule.fr"
                      style={{
                        color: "var(--blue)",
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      contact@fullstack-pointvirgule.fr
                    </a>
                  }
                />
                <Row label="TVA" value="Non assujetti — Article 293 B du CGI" />
              </dl>
            </Section>

            {/* 2. Hébergeur */}
            <Section title="2. Hébergement">
              <p>Le site est hébergé par :</p>
              <dl style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                <Row label="Hébergeur" value="Vercel Inc." />
                <Row label="Adresse" value="440 N Barranca Ave #4133, Covina, CA 91723, États-Unis" />
                <Row
                  label="Site web"
                  value={
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--blue)",
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      vercel.com
                    </a>
                  }
                />
              </dl>
            </Section>

            {/* 3. Propriété intellectuelle */}
            <Section title="3. Propriété intellectuelle">
              <p>
                L&apos;ensemble du contenu du site fullstack-pointvirgule.fr
                (textes, images, logo, graphismes, code source) est la propriété
                exclusive de Yannick Franchaisse / Fullstack Point-Virgule, sauf
                mention contraire. Toute reproduction, représentation,
                modification ou exploitation, totale ou partielle, de ce contenu
                est interdite sans autorisation écrite préalable.
              </p>
            </Section>

            {/* 4. Données personnelles */}
            <Section title="4. Données personnelles &amp; RGPD">
              <p>
                Conformément au Règlement Général sur la Protection des Données
                (RGPD — Règlement UE 2016/679) et à la loi Informatique et
                Libertés du 6 janvier 1978 modifiée, vous disposez d&apos;un droit
                d&apos;accès, de rectification, de suppression et d&apos;opposition aux
                données personnelles vous concernant.
              </p>
              <p style={{ marginTop: 16 }}>
                Les données personnelles éventuellement collectées via le
                formulaire de contact (nom, e-mail, message) sont utilisées
                uniquement pour répondre à vos demandes. Elles ne sont ni cédées
                ni vendues à des tiers.
              </p>
              <p style={{ marginTop: 16 }}>
                <Strong>Responsable du traitement :</Strong> Yannick Franchaisse
                —{" "}
                <a
                  href="mailto:contact@fullstack-pointvirgule.fr"
                  style={{
                    color: "var(--blue)",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  contact@fullstack-pointvirgule.fr
                </a>
              </p>
              <p style={{ marginTop: 16 }}>
                Pour exercer vos droits, adressez votre demande par e-mail à
                l&apos;adresse ci-dessus. Vous pouvez également introduire une
                réclamation auprès de la{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--blue)",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  CNIL
                </a>
                .
              </p>
            </Section>

            {/* 5. Cookies */}
            <Section title="5. Cookies">
              <p>
                Le site utilise Google Analytics (identifiant : G-N7M39QWEHX)
                à des fins de mesure d&apos;audience. Cet outil peut déposer des
                cookies sur votre navigateur. Vous pouvez configurer votre
                navigateur pour refuser les cookies ou être averti de leur
                dépôt. La poursuite de la navigation sur ce site vaut
                acceptation de l&apos;utilisation de cookies.
              </p>
            </Section>

            {/* 6. Liens hypertextes */}
            <Section title="6. Liens hypertextes">
              <p>
                Le site peut contenir des liens vers des sites tiers.
                Fullstack Point-Virgule n&apos;exerce aucun contrôle sur le contenu
                de ces sites et décline toute responsabilité les concernant.
              </p>
            </Section>

            {/* 7. Limitation de responsabilité */}
            <Section title="7. Limitation de responsabilité">
              <p>
                Fullstack Point-Virgule s&apos;efforce de maintenir des informations
                exactes et à jour sur le site, mais ne saurait être tenu
                responsable d&apos;éventuelles erreurs, omissions ou résultats
                obtenus suite à l&apos;utilisation de ces informations. L&apos;accès au
                site peut être interrompu à tout moment pour des raisons de
                maintenance ou de force majeure.
              </p>
            </Section>

            {/* 8. Droit applicable */}
            <Section title="8. Droit applicable">
              <p>
                Les présentes mentions légales sont régies par le droit
                français. En cas de litige, et à défaut de résolution amiable,
                les tribunaux français seront seuls compétents.
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ── Sub-components ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        style={{
          marginBottom: 16,
          fontSize: 20,
          fontWeight: 600,
          color: "var(--text)",
          fontFamily: "var(--font-outfit)",
        }}
      >
        {title}
      </h2>
      <div style={{ color: "var(--text2)" }}>{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <dt style={{ width: 176, flexShrink: 0, fontWeight: 500, color: "var(--text3)" }}>{label}</dt>
      <dd style={{ color: "var(--text2)" }}>{value}</dd>
    </div>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <span style={{ fontWeight: 500, color: "var(--text)" }}>{children}</span>;
}