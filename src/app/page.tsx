import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { profileData } from "@/data/profile";
import { SITE_URL } from "@/lib/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profileData.name,
        jobTitle: profileData.headline,
        description: profileData.subheadline,
        url: SITE_URL,
        sameAs: profileData.socials.map((social) => social.href),
        knowsAbout: [
          "Product Design",
          "Design Systems",
          "Conversion Rate Optimization",
          "UX Architecture",
          "React",
          "Next.js",
          "TypeScript",
          "AI-Assisted Development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${profileData.name} — ${profileData.headline}`,
        description: profileData.subheadline,
        inLanguage: "es",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <SelectedWorkSection />
      <ExperienceSection />
    </main>
  );
}
