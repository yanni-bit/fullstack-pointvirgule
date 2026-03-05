import { MetadataRoute } from "next";
import { createPublicClient } from "../lib/supabase";

const BASE_URL = "https://fullstack-pointvirgule.fr";

// Fallback statique si Supabase est inaccessible au build
const FALLBACK_SLUGS = ["tresors-dambre", "hotel-booking", "book-your-travel"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Récupération dynamique des slugs depuis Supabase
  let slugs: string[] = FALLBACK_SLUGS;

  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("projects")
      .select("slug")
      .order("order_index", { ascending: true });

    if (data && data.length > 0) {
      slugs = data.map((p: { slug: string }) => p.slug);
    }
  } catch {
    // Fallback silencieux sur les slugs statiques
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}