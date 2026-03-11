export const SERVICES = [
  {
    icon: "🛒",
    title: "E-commerce sur mesure",
    desc: "Avec Shopify, vous êtes locataire : commissions, abonnements plugins, dépendance totale. Je construis votre boutique comme un actif qui vous appartient — code source inclus, zéro loyer mensuel.",
    benefit:
      "💡 300€/mois de frais Shopify × 12 = 3 600€/an qui restent dans votre poche.",
    techs: ["Next.js", "Saleor", "Medusa.js", "Stripe"],
  },
  {
    icon: "🌐",
    title: "Sites vitrines & apps web",
    desc: "Un site lent perd des clients avant même qu'ils lisent votre offre. Je livre des interfaces rapides, SEO natif et accessibles — sans plugin payant, sans abonnement, sans compromis.",
    benefit:
      "💡 +1s de chargement = -7% de conversions. Mon LCP mobile : 2,0s.",
    techs: ["Next.js", "React", "Angular", "TypeScript"],
  },
  {
    icon: "🔄",
    title: "Migration & modernisation",
    desc: "WordPress et Shopify vous coûtent en plugins, en maintenance et en marge. Je migre votre contenu et vos données vers une stack moderne — vous reprenez la main sur votre outil et vos coûts.",
    benefit:
      "💡 Vos données, votre code, votre liberté — zéro dépendance à une plateforme tierce.",
    techs: ["Node.js", "PostgreSQL", "Docker", "REST"],
  },
  {
    icon: "⚡",
    title: "API & intégrations",
    desc: "Les tâches répétitives — imports, exports, synchronisations, relances — mangent du temps et génèrent des erreurs. Je les automatise pour que votre équipe se concentre sur ce qui crée de la valeur.",
    benefit:
      "💡 1h/jour automatisée = 250h/an récupérées. Votre temps vaut plus que ça.",
    techs: ["Node.js", "GraphQL", "Prisma", "Redis"],
  },
];

export const PROJECTS = [
  {
    title: "Trésors d'Ambre",
    tag: "E-COMMERCE",
    desc: "Migration Shopify → Saleor headless. Import automatisé de 750 produits. Architecture monorepo moderne. Scores Lighthouse 97/100/100/100.",
    techs: [
      "Next.js 15",
      "React 19",
      "Saleor",
      "GraphQL",
      "PostgreSQL",
      "Docker",
    ],
    color: "#F59E0B",
    metrics: [
      { label: "Produits", value: "750" },
      { label: "Lighthouse", value: "97/100" },
      { label: "Statut", value: "En production" },
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
  {
    category: "Frontend",
    items: [
      "Next.js 15",
      "React 19",
      "Angular 20",
      "TypeScript",
      "Tailwind CSS 4",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "API REST",
      "GraphQL",
      "Saleor",
      "Medusa.js",
      "Stripe",
      "JWT",
    ],
  },
  {
    category: "Databases",
    items: ["PostgreSQL 16", "MySQL", "Redis", "Prisma 6", "Supabase"],
  },
  {
    category: "DevOps / Infra",
    items: ["Docker", "Git", "Vercel", "AWS SES", "Supabase", "CI/CD"],
  },
];

export const CONTACT_INFO = [
  {
    icon: "💬",
    label: "WhatsApp",
    value: ["Me contacter"],
    href: "https://wa.me/33650148605",
  },
  {
    icon: "📧",
    label: "Email",
    value: ["contact@fullstack-pointvirgule.fr"],
    href: "mailto:contact@fullstack-pointvirgule.fr",
  },
  {
    icon: "📍",
    label: "Localisation",
    value: ["Gisors, Normandie", "Lalande en Son, Oise"],
    href: null,
  },
];