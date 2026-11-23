import { profileData } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

export function ContactSection() {
  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      className="flex min-h-[80svh] scroll-mt-16 flex-col justify-center py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-border bg-surface p-8 backdrop-blur-md sm:p-12">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Contacto directo
              </p>
              <h2
                id="contact-heading"
                className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                ¿Construimos un producto claro, rápido y memorable?
              </h2>
              <p className="text-sm leading-relaxed font-medium text-muted sm:text-base">
                Sin formularios complejos ni base de datos: acceso directo a tu
                LinkedIn, Behance o correo para convertir visitas en
                conversaciones reales.
              </p>

              <div className="flex flex-wrap gap-3 pt-3">
                {profileData.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    className="organic-transition inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-surface-strong px-5 text-sm font-bold text-foreground hover:border-accent/50 hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {social.label}
                  </a>
                ))}

                <a
                  href={`mailto:${profileData.email}`}
                  className="organic-transition inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-bold text-background hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {profileData.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
