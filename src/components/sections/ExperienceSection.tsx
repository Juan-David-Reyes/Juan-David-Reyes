import { profileData } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

export function ExperienceSection() {
  return (
    <>
      <section
        id="trayectoria"
        aria-labelledby="experience-heading"
        className="scroll-mt-20 py-14 sm:py-20"
      >
        <Container className="space-y-8">
          <Reveal>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                LinkedIn · Trayectoria
              </p>
              <h2
                id="experience-heading"
                className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                Experiencia profesional
              </h2>
            </div>
          </Reveal>

          <ol className="space-y-4">
            {profileData.experience.map((item, index) => (
              <li key={item.id}>
                <Reveal delayMs={index * 70}>
                  <article className="organic-transition rounded-3xl border border-border bg-surface p-6 backdrop-blur-md hover:border-accent/40">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                      <div>
                        <h3 className="text-lg font-bold text-foreground sm:text-xl">
                          {item.role}
                        </h3>
                        <p className="text-sm font-semibold text-accent">
                          {item.company}
                        </p>
                      </div>
                      <p className="text-xs font-semibold text-muted sm:text-sm">
                        {item.period} · {item.location}
                      </p>
                    </div>

                    <p className="mt-3 max-w-3xl text-sm leading-relaxed font-medium text-muted sm:text-base">
                      {item.summary}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        id="capacidades"
        aria-labelledby="capabilities-heading"
        className="scroll-mt-20 py-14 sm:py-20"
      >
        <Container className="space-y-8">
          <Reveal>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Design + Build
              </p>
              <h2
                id="capabilities-heading"
                className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                Pilares de trabajo
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {profileData.pillars.map((pillar, index) => (
              <Reveal key={pillar.id} delayMs={index * 70}>
                <div className="h-full rounded-3xl border border-border bg-surface p-6 backdrop-blur-md">
                  <h3 className="text-lg font-bold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed font-medium text-muted">
                    {pillar.description}
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs font-semibold text-accent">
                    {pillar.highlights.map((highlight) => (
                      <li key={highlight}>· {highlight}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
