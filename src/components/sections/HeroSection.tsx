import { profileData } from "@/data/profile";
import { Container } from "@/components/layout/Container";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex min-h-[calc(100svh-4rem)] flex-col justify-between py-12 sm:py-16 lg:py-20"
    >
      <Container className="my-auto flex w-full justify-end">
        <div className="max-w-2xl text-right">
          <p className="mb-3 text-lg font-medium text-foreground/80 sm:text-xl">
            Hi,
          </p>

          <h1
            id="hero-heading"
            className="text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            <span className="block">I design.</span>
            <span className="block">Products scale.</span>
            <span className="block">Simple.</span>
          </h1>
        </div>
      </Container>

      <Container className="flex w-full justify-end pt-12">
        <div className="text-right">
          <p className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {profileData.name}
          </p>
          <p className="mt-1 flex flex-wrap items-center justify-end gap-x-6 gap-y-1 text-sm font-medium text-muted sm:text-base">
            <span>Lead Product Designer</span>
            <span>(7+ years)</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
