"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Container } from "./Container";
import { useLanguage } from "@/context/LanguageContext";
import { profileData } from "@/data/profile";

const FOOTER_COPY = {
  es: {
    title: "Llegaste al final.",
    subtitle: "O al comienzo.",
    mailLabel: "Escríbeme",
    locationLabel: "Encuéntrame en",
    locationValue: "Colombia, Bogotá · Remoto",
    profilesLabel: "o explora mis perfiles",
    resumeLabel: "Descargar CV",
  },
  en: {
    title: "You’ve Reached The End.",
    subtitle: "Or The Beginning.",
    mailLabel: "Mail me",
    locationLabel: "Meet me in",
    locationValue: "Colombia, Bogotá · Remote",
    profilesLabel: "or stalk my profiles",
    resumeLabel: "Download Resume",
  },
} as const;

function SocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
      >
        <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.2 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.6V19.5H20.44V13.02Z" />
      </svg>
    );
  }

  if (label === "GitHub") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-current"
      >
        <path d="M12 2C6.475 2 2 6.475 2 12C2 16.425 4.8625 20.1625 8.8375 21.4875C9.3375 21.575 9.525 21.275 9.525 21.0125C9.525 20.775 9.5125 19.9875 9.5125 19.15C7 19.6125 6.35 18.5375 6.15 17.975C6.0375 17.6875 5.55 16.8 5.125 16.5625C4.775 16.375 4.275 15.9125 5.1125 15.9C5.9 15.8875 6.4625 16.625 6.65 16.925C7.55 18.4375 8.9875 18.0125 9.5625 17.75C9.65 17.1 9.9125 16.6625 10.2 16.4125C7.975 16.1625 5.65 15.3 5.65 11.475C5.65 10.3875 6.0375 9.4875 6.675 8.7875C6.575 8.5375 6.225 7.5125 6.775 6.1375C6.775 6.1375 7.6125 5.875 9.525 7.1625C10.325 6.9375 11.175 6.825 12.025 6.825C12.875 6.825 13.725 6.9375 14.525 7.1625C16.4375 5.8625 17.275 6.1375 17.275 6.1375C17.825 7.5125 17.475 8.5375 17.375 8.7875C18.0125 9.4875 18.4 10.375 18.4 11.475C18.4 15.3125 16.0625 16.1625 13.8375 16.4125C14.2 16.725 14.5125 17.325 14.5125 18.2625C14.5125 19.6 14.5 20.675 14.5 21.0125C14.5 21.275 14.6875 21.5875 15.1875 21.4875C19.1375 20.1625 22 16.4125 22 12C22 6.475 17.525 2 12 2Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
    >
      <path d="M7.5 11.2C8.8 11.2 9.5 10.5 9.5 9.4C9.5 8.3 8.8 7.7 7.4 7.7H4.2V11.2H7.5ZM7.8 16.3C9.2 16.3 10 15.6 10 14.3C10 13.1 9.2 12.4 7.7 12.4H4.2V16.3H7.8ZM10.9 11.7C11.9 12.2 12.5 13.2 12.5 14.5C12.5 16.8 10.7 18.1 7.9 18.1H2V5.9H7.6C10.3 5.9 11.9 7.1 11.9 9.2C11.9 10.3 11.5 11.2 10.9 11.7ZM15.1 7.1H19.8V8.5H15.1V7.1ZM17.6 11.1C16.3 11.1 15.5 11.9 15.3 13.1H19.8C19.6 11.8 18.9 11.1 17.6 11.1ZM21.9 14.4H15.3C15.5 15.8 16.4 16.6 17.8 16.6C18.8 16.6 19.6 16.1 20 15.4H21.8C21.2 17.1 19.7 18.2 17.7 18.2C15 18.2 13.2 16.3 13.2 13.5C13.2 10.7 15 8.8 17.6 8.8C20.3 8.8 22 10.7 22 13.6C22 13.9 22 14.2 21.9 14.4Z" />
    </svg>
  );
}

interface DockItemState {
  scale: number;
  y: number;
}

const DEFAULT_DOCK: DockItemState[] = profileData.socials.map(() => ({
  scale: 1,
  y: 0,
}));

const DOCK_RADIUS = 100;

export function Footer() {
  const { locale } = useLanguage();
  const [dockValues, setDockValues] = useState<DockItemState[]>(DEFAULT_DOCK);
  const [isTracking, setIsTracking] = useState(false);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const copy = FOOTER_COPY[locale];
  const linkedin = profileData.socials.find((s) => s.label === "LinkedIn");

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleDockMouseMove = (event: MouseEvent<HTMLUListElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const clientX = event.clientX;
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = window.requestAnimationFrame(() => {
      const next = profileData.socials.map((_, index) => {
        const el = itemRefs.current[index];
        if (!el) return { scale: 1, y: 0 };

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const distance = Math.abs(clientX - centerX);
        const proximity = Math.max(0, 1 - distance / DOCK_RADIUS);
        const curve = Math.sin((proximity * Math.PI) / 2) * proximity;

        return {
          scale: 1 + 0.2 * curve,
          y: -4 * curve,
        };
      });

      setIsTracking(true);
      setDockValues(next);
    });
  };

  const resetDock = () => {
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
    }
    setIsTracking(false);
    setDockValues(DEFAULT_DOCK);
  };

  const focusDockItem = (focusedIndex: number) => {
    setIsTracking(false);
    setDockValues(
      profileData.socials.map((_, index) => {
        const distance = Math.abs(focusedIndex - index);
        if (distance === 0) return { scale: 1.2, y: -4 };
        if (distance === 1) return { scale: 1.08, y: -1.5 };
        return { scale: 1, y: 0 };
      })
    );
  };

  return (
    <footer
      id="contacto"
      aria-labelledby="footer-heading"
      className="flex min-h-[85svh] scroll-mt-16 flex-col justify-between py-20 sm:py-28"
    >
      <Container className="my-auto flex w-full justify-end">
        <div className="max-w-2xl space-y-10 text-right">
          <div>
            <h2
              id="footer-heading"
              className="text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-[60px] xl:text-[68px]"
            >
              {copy.title}
            </h2>
            <p className="mt-2 text-[18px] font-medium text-foreground/75 sm:text-2xl">
              {copy.subtitle}
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[18px] font-medium text-muted">
                {copy.mailLabel}
              </p>
              <a
                href={`mailto:${profileData.email}`}
                className="organic-transition mt-1 inline-block text-2xl font-bold tracking-tight text-foreground hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-[32px]"
              >
                {profileData.email}
              </a>
            </div>

            <div>
              <p className="text-[18px] font-medium text-muted">
                {copy.locationLabel}
              </p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-[32px]">
                {copy.locationValue}
              </p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <p className="text-[18px] font-medium text-muted">
                {copy.profilesLabel}
              </p>
              <ul
                onMouseMove={handleDockMouseMove}
                onMouseLeave={resetDock}
                className="inline-flex items-end gap-3.5 rounded-2xl bg-black/[0.05] px-4 py-3 dark:bg-white/[0.08]"
              >
                {profileData.socials.map((social, index) => {
                  const itemState = dockValues[index] ?? { scale: 1, y: 0 };
                  return (
                    <li key={social.label}>
                      <a
                        ref={(el) => {
                          itemRefs.current[index] = el;
                        }}
                        href={social.href}
                        target={social.external ? "_blank" : undefined}
                        rel={social.external ? "noopener noreferrer" : undefined}
                        aria-label={social.label}
                        onFocus={() => focusDockItem(index)}
                        onBlur={resetDock}
                        style={{
                          transform: `translate3d(0, ${itemState.y}px, 0) scale(${itemState.scale})`,
                          transitionDuration: isTracking ? "0ms" : "300ms",
                        }}
                        className="inline-flex h-12 w-12 origin-bottom items-center justify-center rounded-full bg-foreground text-background transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transform-none motion-reduce:transition-none"
                      >
                        <SocialIcon label={social.label} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <Container className="flex w-full items-center justify-between gap-4 pt-12">
        <p className="text-[18px] font-medium text-muted">
          © 2026 {profileData.name}
        </p>

        {linkedin ? (
          <a
            href={linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="organic-transition inline-flex items-center gap-3 rounded-full bg-surface-strong py-1.5 pr-4 pl-1.5 text-xs font-bold text-foreground shadow-sm ring-1 ring-border hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background"
            >
              ↓
            </span>
            <span>{copy.resumeLabel}</span>
          </a>
        ) : null}
      </Container>
    </footer>
  );
}
