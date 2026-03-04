import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 86400;

const BASE_URL = "https://fullstack-pointvirgule.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );
    const { data, error } = await supabase.from("projects").select("slug, updated_at");
    console.log("[sitemap] data:", JSON.stringify(data));
    console.log("[sitemap] error:", JSON.stringify(error));

    const projectRoutes: MetadataRoute.Sitemap = (data || []).map((p) => ({
      url: `${BASE_URL}/portfolio/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
    return [...staticRoutes, ...projectRoutes];
  } catch (e) {
    console.log("[sitemap] catch:", e);
    return staticRoutes;
  }
}