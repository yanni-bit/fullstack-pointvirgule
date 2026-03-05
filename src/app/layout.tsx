import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fullstack Point-Virgule — Développeur Web Fullstack Freelance",
  description:
    "Yannick Franchaisse — Développeur Web Fullstack freelance. Sites e-commerce, applications web, APIs sur mesure. Next.js, React, Node.js, TypeScript.",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://fullstack-pointvirgule.fr/#person",
      "name": "Yannick Franchaisse",
      "jobTitle": "Développeur Web Fullstack Freelance",
      "url": "https://fullstack-pointvirgule.fr",
      "email": "contact@fullstack-pointvirgule.fr",
      "telephone": "+33650148605",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Gisors",
        "addressRegion": "Normandie",
        "addressCountry": "FR",
      },
      "knowsAbout": ["Next.js", "React", "Angular", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "Docker"],
      "sameAs": ["https://github.com/yanni-bit"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://fullstack-pointvirgule.fr/#service",
      "name": "Fullstack Point-Virgule",
      "description": "Développement web fullstack sur mesure : e-commerce headless, sites vitrines, APIs, migration et modernisation.",
      "url": "https://fullstack-pointvirgule.fr",
      "provider": { "@id": "https://fullstack-pointvirgule.fr/#person" },
      "areaServed": ["Gisors", "Normandie", "France"],
      "serviceType": ["Développement Web", "E-commerce", "API", "Migration"],
      "priceRange": "30€/h",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
