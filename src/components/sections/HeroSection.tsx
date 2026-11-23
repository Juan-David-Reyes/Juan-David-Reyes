import Link from "next/link";
import { profileData } from "@/data/profile";
import { Container } from "@/components/layout/Container";

export function HeroSection() {
  const linkedin = profileData.socials.find((s) => s.label === "LinkedIn");

  return (
    <section
      aria-labelledby="hero-heading"
      className="py-16 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="max-w-3xl space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold tracking-wide text-accent backdrop-blur-sm sm:text-sm">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-accent"
            />
            {profileData.availability}
          </p>

          <h1
            id="hero-heading"
            className="text-4xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {profileData.headline}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed font-medium text-muted sm:text-lg lg:text-xl">
            {profileData.subheadline}
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <Link
              href="#proyectos"
              className="organic-transition inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-bold text-background shadow-sm hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-base"
            >
              Explorar proyectos
            </Link>

            {linkedin ? (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="organic-transition inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-surface px-6 text-sm font-bold text-foreground backdrop-blur-sm hover:border-accent/50 hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-base"
              >
                Ver perfil en LinkedIn
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
