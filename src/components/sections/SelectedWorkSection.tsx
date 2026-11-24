"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { profileData } from "@/data/profile";

const WORKS_COPY = {
  es: {
    heading: "Proyectos",
    briefLabel: "brief",
    projectLabel: "Proyecto",
    artworksLabel: "Behance / Exploraciones",
  },
  en: {
    heading: "Works",
    briefLabel: "brief",
    projectLabel: "Project",
    artworksLabel: "Artworks",
  },
} as const;

function FolderIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center"
    >
      <svg viewBox="0 0 24 24" className="h-8 w-8 overflow-visible" fill="none">
        {/* Cuerpo posterior + pestaña de la carpeta */}
        <path
          d="M3 7C3 5.89543 3.89543 5 5 5H9.2C9.73043 5 10.2391 5.21071 10.6142 5.58579L11.7 6.67157C11.8875 6.85911 12.1419 6.96447 12.4071 6.96447H19C20.1046 6.96447 21 7.8599 21 8.96447V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V7Z"
          fill="#FFC400"
          fillOpacity="0.32"
          stroke="#D9A300"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Hoja interior: sale más al abrir y se guarda primero al cerrar */}
        <rect
          x="6.2"
          y="7.8"
          width="11.6"
          height="8"
          rx="1.2"
          fill="#FFFFFF"
          stroke="#D9A300"
          strokeWidth="1.2"
          style={{
            transform: isOpen ? "translateY(-4.2px)" : "translateY(3.2px)",
            opacity: isOpen ? 0.98 : 0,
            transition: isOpen
              ? "transform 420ms cubic-bezier(0.22, 1, 0.36, 1) 90ms, opacity 260ms ease 90ms"
              : "transform 280ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 220ms ease 60ms",
          }}
          className="motion-reduce:transform-none motion-reduce:transition-none"
        />

        {/* Tapa frontal con inclinación 3D; espera a que la hoja entre al cerrar */}
        <path
          d="M3 10.5C3 9.67157 3.67157 9 4.5 9H19.5C20.3284 9 21 9.67157 21 10.5V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V10.5Z"
          fill="#FFC400"
          fillOpacity={isOpen ? "0.78" : "0.62"}
          stroke="#D9A300"
          strokeWidth="1.5"
          strokeLinejoin="round"
          style={{
            transformOrigin: "12px 20px",
            transform: isOpen
              ? "perspective(140px) rotateX(-34deg) skewX(-9deg) translateY(0.5px)"
              : "perspective(140px) rotateX(0deg) skewX(0deg) translateY(0px)",
            transition: isOpen
              ? "transform 440ms cubic-bezier(0.22, 1, 0.36, 1) 0ms, fill-opacity 320ms ease"
              : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1) 110ms, fill-opacity 320ms ease 110ms",
          }}
          className="motion-reduce:transform-none motion-reduce:transition-none"
        />
      </svg>
    </span>
  );
}

function FileIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8 shrink-0 text-foreground/75"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3.5H7.5C6.39543 3.5 5.5 4.39543 5.5 5.5V18.5C5.5 19.6046 6.39543 20.5 7.5 20.5H16.5C17.6046 20.5 18.5 19.6046 18.5 18.5V8L14 3.5Z" />
      <path d="M14 3.5V8H18.5" />
    </svg>
  );
}

export function SelectedWorkSection() {
  const { locale } = useLanguage();
  const copy = WORKS_COPY[locale];
  const [openSlug, setOpenSlug] = useState<string | null>(
    profileData.projects[0]?.slug ?? null
  );
  const behance = profileData.socials.find((s) => s.label === "Behance");

  const toggleFolder = (slug: string) => {
    setOpenSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <section
      id="proyectos"
      aria-labelledby="projects-heading"
      className="flex min-h-[88svh] scroll-mt-16 flex-col justify-center py-20 sm:py-28 lg:py-32"
    >
      <Container className="flex w-full justify-end">
        <Reveal className="w-full max-w-xl">
          <div className="space-y-9 text-left">
            <h2
              id="projects-heading"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[60px] xl:text-[68px]"
            >
              {copy.heading}
            </h2>

            <ul className="space-y-4" aria-label={copy.heading}>
              {profileData.projects.map((project) => {
                const isOpen = openSlug === project.slug;
                return (
                  <li key={project.slug}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`folder-${project.slug}`}
                      onClick={() => toggleFolder(project.slug)}
                      className="organic-transition group flex w-full cursor-pointer items-center gap-4 rounded-xl py-1.5 text-left text-2xl font-medium text-foreground hover:text-foreground/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-[30px]"
                    >
                      <FolderIcon isOpen={isOpen} />
                      <span className="tracking-tight">{project.title}</span>
                    </button>

                    <div
                      id={`folder-${project.slug}`}
                      aria-hidden={!isOpen}
                      className={`grid transition-[grid-template-rows,opacity] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="mt-2 ml-11 space-y-2 border-l border-border/70 pl-5">
                          <li>
                            <Link
                              href={`/projects/${project.slug}#contexto`}
                              tabIndex={isOpen ? 0 : -1}
                              className="organic-transition inline-flex items-center gap-3.5 py-1 text-xl font-medium text-muted hover:translate-x-1 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-[24px]"
                            >
                              <FileIcon />
                              <span>{copy.briefLabel}</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/projects/${project.slug}`}
                              tabIndex={isOpen ? 0 : -1}
                              className="organic-transition inline-flex items-center gap-3.5 py-1 text-xl font-medium text-muted hover:translate-x-1 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-[24px]"
                            >
                              <FileIcon />
                              <span>{copy.projectLabel}</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}

              {behance ? (
                <li className="pt-1">
                  <a
                    href={behance.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="organic-transition inline-flex items-center gap-4 rounded-xl py-1.5 text-2xl font-medium text-foreground hover:translate-x-1 hover:text-foreground/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-[30px]"
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center">
                      <FileIcon />
                    </span>
                    <span className="tracking-tight">
                      {copy.artworksLabel}
                    </span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
