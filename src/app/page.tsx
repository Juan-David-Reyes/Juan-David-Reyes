import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <SelectedWorkSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
