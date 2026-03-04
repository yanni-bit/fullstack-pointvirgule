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