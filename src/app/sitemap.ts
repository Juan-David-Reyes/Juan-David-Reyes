import type { MetadataRoute } from "next";
import { profileData } from "@/data/profile";
import { SITE_URL } from "@/lib/site";

const LAST_MODIFIED = new Date("2026-11-23T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes: MetadataRoute.Sitemap = profileData.projects.map(
    (project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectRoutes,
  ];
}
