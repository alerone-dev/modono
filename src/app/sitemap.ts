import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Update lastModified when a page's content changes
const PAGES = [
  { path: "", lastModified: "2026-11-02", priority: 1 },
  { path: "/privacy", lastModified: "2026-11-02", priority: 0.3 },
  { path: "/terms", lastModified: "2026-11-02", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, lastModified, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(lastModified),
    priority,
  }));
}
