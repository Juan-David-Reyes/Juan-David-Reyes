"use client";

import Link from "next/link";
import { useState } from "react";
import { profileData } from "@/data/profile";
import { Container } from "./Container";

const NAV_ITEMS = [
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Trayectoria", href: "/#trayectoria" },
  { label: "Capacidades", href: "/#capacidades" },
  { label: "Contacto", href: "/#contacto" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/75 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="organic-transition inline-flex items-center gap-2.5 rounded-full py-1 text-base font-bold tracking-tight text-foreground hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-surface text-xs font-bold text-accent"
          >
            {profileData.shortName}
          </span>
          <span>{profileData.name}</span>
        </Link>

        {/* Navegación Desktop */}
        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="organic-transition rounded-full px-3.5 py-2 text-sm font-semibold text-muted hover:bg-accent-soft hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón menú móvil accesible */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="organic-transition inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
        >
          <span className="sr-only">Menú</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 8h16" />
                <path d="M4 16h16" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {/* Panel móvil */}
      <nav
        id="mobile-navigation"
        aria-label="Navegación móvil"
        hidden={!menuOpen}
        className="border-t border-border bg-background/95 md:hidden"
      >
        <Container className="py-4">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="organic-transition block rounded-2xl px-4 py-3 text-base font-semibold text-foreground hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
