import type { MetadataRoute } from "next";
import { profileData } from "@/data/profile";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes: MetadataRoute.Sitemap = profileData.projects.map(
    (project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectRoutes,
  ];
}
