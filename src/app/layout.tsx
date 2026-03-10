import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
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

const BASE_URL = "https://fullstack-pointvirgule.fr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Fullstack Point-Virgule — Développeur Web Fullstack Freelance",
    template: "%s | Fullstack Point-Virgule",
  },
  description:
    "Yannick Franchaisse — Développeur Web Fullstack freelance. Sites e-commerce, applications web, APIs sur mesure. Next.js, React, Node.js, TypeScript.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "Fullstack Point-Virgule",
    title: "Fullstack Point-Virgule — Développeur Web Fullstack Freelance",
    description:
      "Yannick Franchaisse — Développeur Web Fullstack freelance. Sites e-commerce, applications web, APIs sur mesure. Next.js, React, Node.js, TypeScript.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fullstack Point-Virgule — Développeur Web Fullstack Freelance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fullstack Point-Virgule — Développeur Web Fullstack Freelance",
    description:
      "Yannick Franchaisse — Développeur Web Fullstack freelance. Sites e-commerce, applications web, APIs sur mesure.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Yannick Franchaisse",
      jobTitle: "Développeur Web Fullstack Freelance",
      url: BASE_URL,
      email: "contact@fullstack-pointvirgule.fr",
      telephone: "+33650148605",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gisors",
        addressRegion: "Normandie",
        addressCountry: "FR",
      },
      knowsAbout: [
        "Next.js",
        "React",
        "Angular",
        "TypeScript",
        "Node.js",
        "GraphQL",
        "PostgreSQL",
        "Docker",
      ],
      sameAs: ["https://github.com/yanni-bit"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#service`,
      name: "Fullstack Point-Virgule",
      description:
        "Développement web fullstack sur mesure : e-commerce headless, sites vitrines, APIs, migration et modernisation.",
      url: BASE_URL,
      provider: { "@id": `${BASE_URL}/#person` },
      areaServed: ["Gisors", "Normandie", "France"],
      serviceType: ["Développement Web", "E-commerce", "API", "Migration"],
      priceRange: "30€/h",
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
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <GoogleAnalytics gaId="G-N7M39QWEHX" />
      </body>
    </html>
  );
}