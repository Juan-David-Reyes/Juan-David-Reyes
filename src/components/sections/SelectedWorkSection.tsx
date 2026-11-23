import Link from "next/link";
import { profileData } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

export function SelectedWorkSection() {
  return (
    <section
      id="proyectos"
      aria-labelledby="projects-heading"
      className="flex min-h-[88svh] scroll-mt-16 flex-col justify-center py-20 sm:py-28 lg:py-32"
    >
      <Container className="space-y-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Portafolio · Case Studies
              </p>
              <h2
                id="projects-heading"
                className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                Proyectos seleccionados
              </h2>
            </div>
            <p className="max-w-md text-sm font-medium text-muted">
              Estructura preparada para documentar contexto, hipótesis UX/CRO,
              ejecución e impacto medible.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {profileData.projects.map((project, index) => (
            <Reveal key={project.slug} delayMs={index * 70}>
              <article className="organic-transition group flex h-full flex-col justify-between rounded-3xl border border-border bg-surface p-6 backdrop-blur-md hover:-translate-y-1 hover:border-accent/45 hover:bg-surface-strong">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold text-muted">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>

                  {/* Contenedor visual conceptual reservado para mockups o arte interactivo */}
                  <div
                    aria-hidden="true"
                    className="organic-transition flex h-36 items-end rounded-2xl border border-border/70 bg-gradient-to-br from-accent-soft via-surface-strong/40 to-transparent p-4 group-hover:border-accent/30"
                  >
                    <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-foreground">
                      {project.impactMetric}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed font-medium text-muted">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 border-t border-border/70 pt-4">
                  <ul className="flex flex-wrap gap-1.5" aria-label="Etiquetas">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="organic-transition inline-flex items-center gap-1.5 text-sm font-bold text-foreground group-hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <span>Ver estructura del caso</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
