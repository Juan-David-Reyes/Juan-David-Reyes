import { profileData } from "@/data/profile";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-border/70 py-10">
      <Container className="flex flex-col items-start justify-between gap-4 text-sm text-muted sm:flex-row sm:items-center">
        <p>
          © 2026 {profileData.name}. Diseño conceptual y arquitectura estática.
        </p>

        <ul className="flex flex-wrap items-center gap-4">
          {profileData.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
                className="organic-transition font-semibold text-foreground underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
