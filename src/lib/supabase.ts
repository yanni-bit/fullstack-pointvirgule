import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

// Client admin avec secret key (server-side uniquement)
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
  );
}

export type Project = {
  id: string;
  title: string;
  slug: string;
  short_desc: string;
  long_desc: string;
  cover_url: string;
  images: string[];
  tags: string[];
  metrics: string[];
  client: string;
  date: string;
  url: string;
  github_url: string;
  featured: boolean;
  order_index: number;
  created_at: string;
};
