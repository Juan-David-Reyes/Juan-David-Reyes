import type { MetadataRoute } from "next";
import { profileData } from "@/data/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profileData.name} — ${profileData.headline}`,
    short_name: profileData.shortName,
    description: profileData.subheadline,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f5",
    theme_color: "#f5f5f5",
  };
}
