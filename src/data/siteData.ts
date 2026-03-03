export const SERVICES = [
  {
    icon: "🛒",
    title: "E-commerce sur mesure",
    desc: "Sites marchands headless avec Saleor, Medusa.js ou solution custom. Zéro abonnement, code 100% à vous.",
    techs: ["Next.js", "Saleor", "Medusa.js", "Stripe"],
  },
  {
    icon: "🌐",
    title: "Sites vitrines & apps web",
    desc: "Interfaces modernes, rapides et responsive. SEO natif, performances au top, design sur mesure.",
    techs: ["Next.js", "React", "Angular", "TypeScript"],
  },
  {
    icon: "🔄",
    title: "Migration & modernisation",
    desc: "Exit WordPress et Shopify. Migration vers une stack moderne : vos données, votre code, votre liberté.",
    techs: ["Node.js", "PostgreSQL", "Docker", "REST"],
  },
  {
    icon: "⚡",
    title: "API & intégrations",
    desc: "Backend robuste, APIs REST ou GraphQL, intégrations tierces et automatisations métier.",
    techs: ["Node.js", "GraphQL", "Prisma", "Redis"],
  },
];

export const PROJECTS = [
  {
    title: "Trésors d'Ambre",
    tag: "E-COMMERCE",
    desc: "Migration Shopify → Saleor headless. Import automatisé de 750 produits. Architecture monorepo moderne.",
    techs: ["Next.js 15", "React 19", "Saleor", "GraphQL", "PostgreSQL", "Docker"],
    color: "#F59E0B",
    metrics: [
      { label: "Produits", value: "750" },
      { label: "Stack", value: "Headless" },
      { label: "Statut", value: "En cours" },
    ],
  },
  {
    title: "Hotel Booking",
    tag: "HEADLESS",
    desc: "Plateforme de réservation hôtelière. 102 établissements, recherche avancée, filtres dynamiques, booking temps réel.",
    techs: ["Next.js 15", "TypeScript", "Medusa.js", "Prisma 6", "PostgreSQL"],
    color: "#8B5CF6",
    metrics: [
      { label: "Hôtels", value: "102" },
      { label: "Architecture", value: "Headless" },
      { label: "ORM", value: "Prisma" },
    ],
  },
  {
    title: "Book Your Travel",
    tag: "FULLSTACK",
    desc: "Réservation complète : auth JWT, paiement sécurisé, multilingue FR/EN/IT, multi-devises et accessibilité ARIA.",
    techs: ["Angular 20", "TypeScript", "Node.js", "MySQL", "JWT"],
    color: "#10B981",
    metrics: [
      { label: "Langues", value: "3" },
      { label: "Auth", value: "JWT" },
      { label: "A11y", value: "ARIA" },
    ],
  },
];

export const TECH_STACK = [
  { category: "Frontend", items: ["Next.js 15", "React 19", "Angular 20", "TypeScript", "Tailwind CSS 4"] },
  { category: "Backend", items: ["Node.js", "API REST", "GraphQL", "Saleor", "Medusa.js"] },
  { category: "Databases", items: ["PostgreSQL 16", "MySQL", "Redis", "Prisma 6"] },
  { category: "DevOps", items: ["Docker", "Git", "Vercel", "CI/CD"] },
];

export const CONTACT_INFO = [
  { icon: "💬", label: "WhatsApp", value: ["Me contacter"], href: "https://wa.me/33650148605" },
  { icon: "📧", label: "Email", value: ["contact@fullstack-pointvirgule.fr"], href: "mailto:contact@fullstack-pointvirgule.fr" },
  { 
    icon: "📍", 
    label: "Localisation", 
    value: ["Gisors, Normandie", "Lalande en Son, Oise"], 
    href: null 
  },
];