"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "./Container";

const NAV_ITEMS = [
  { label: "WORKS", href: "/#proyectos" },
  { label: "TIMELINE", href: "/#trayectoria" },
  { label: "ABOUT ME", href: "/#capacidades" },
  { label: "CONTACT", href: "/#contacto" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-transparent">
        <Container className="flex h-16 items-center justify-end">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="fullscreen-navigation"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              menuOpen
                ? "text-[#f5f5f5] hover:bg-white/10"
                : "text-foreground hover:bg-black/5 dark:hover:bg-white/10"
            }`}
          >
            <span className="sr-only">Menú</span>
            <span
              aria-hidden="true"
              className="relative flex h-4 w-5 flex-col items-end justify-center gap-1.5"
            >
              <span
                className={`block h-[1.8px] rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  menuOpen
                    ? "w-5 translate-y-[3.8px] rotate-45"
                    : "w-5 translate-y-0 rotate-0"
                }`}
              />
              <span
                className={`block h-[1.8px] rounded-full bg-current transition-[transform,width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  menuOpen
                    ? "w-5 -translate-y-[3.8px] -rotate-45"
                    : "w-3.5 translate-y-0 rotate-0"
                }`}
              />
            </span>
          </button>
        </Container>
      </header>

      {/* Menú fullscreen con gota acelerada por GPU (transform: scale) */}
      <nav
        id="fullscreen-navigation"
        aria-label="Navegación principal"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 flex items-center justify-center overflow-hidden text-[#f5f5f5] ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Círculo líquido GPU-only originado exactamente en el botón del menú */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0"
        >
          <Container className="flex h-16 items-center justify-end">
            <div className="relative h-11 w-11">
              <span
                style={{
                  transform: menuOpen
                    ? "translate3d(-50%, -50%, 0) scale(1)"
                    : "translate3d(-50%, -50%, 0) scale(0)",
                  transition: menuOpen
                    ? "transform 950ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
                    : "transform 750ms cubic-bezier(0.4, 0, 0.2, 1) 220ms",
                }}
                className="absolute top-1/2 left-1/2 h-[300vmax] w-[300vmax] rounded-full bg-[#0d0d0d] will-change-transform motion-reduce:transition-none"
              />
            </div>
          </Container>
        </div>

        <ul className="relative z-10 flex flex-col items-center gap-3 text-center sm:gap-5">
          {NAV_ITEMS.map((item, index) => {
            const reverseIndex = NAV_ITEMS.length - 1 - index;
            return (
              <li
                key={item.href}
                style={{
                  transitionDelay: menuOpen
                    ? `${360 + index * 90}ms`
                    : `${reverseIndex * 65}ms`,
                  transitionDuration: menuOpen ? "600ms" : "320ms",
                }}
                className={`transition-[transform,opacity] ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <Link
                  href={item.href}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => setMenuOpen(false)}
                  className="inline-block px-6 py-1 text-3xl font-bold tracking-wide text-[#f5f5f5] transition-[transform,color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.04] hover:text-white/65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-5xl"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
