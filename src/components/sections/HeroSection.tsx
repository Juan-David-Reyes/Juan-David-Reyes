"use client";

import { Container } from "@/components/layout/Container";
import { useLanguage } from "@/context/LanguageContext";
import { profileData } from "@/data/profile";

const HERO_COPY = {
  es: {
    greeting: "Hola,",
    lines: ["Diseño.", "Productos escalan.", "Simple."],
    role: "Lead Product Designer",
    experience: "(+7 años)",
  },
  en: {
    greeting: "Hi,",
    lines: ["I design.", "Products scale.", "Simple."],
    role: "Lead Product Designer",
    experience: "(7+ years)",
  },
} as const;

export function HeroSection() {
  const { locale } = useLanguage();
  const copy = HERO_COPY[locale];

  return (
    <section
      aria-labelledby="hero-heading"
      className="flex min-h-[calc(100svh-4rem)] flex-col justify-between py-12 sm:py-16 lg:py-20"
    >
      <Container className="my-auto flex w-full justify-end">
        <div className="max-w-2xl text-right">
          <p className="mb-3 text-lg font-medium text-foreground/80 sm:text-xl">
            {copy.greeting}
          </p>

          <h1
            id="hero-heading"
            className="text-5xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[80px] xl:text-[88px]"
          >
            <span className="sr-only">
              {profileData.name}, {profileData.headline} —{" "}
            </span>
            {copy.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>
      </Container>

      <Container className="flex w-full justify-end pt-12">
        <div className="text-right">
          <p className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {profileData.name}
          </p>
          <p className="mt-1 flex flex-wrap items-center justify-end gap-x-6 gap-y-1 text-sm font-medium text-muted sm:text-base">
            <span>{copy.role}</span>
            <span>{copy.experience}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
