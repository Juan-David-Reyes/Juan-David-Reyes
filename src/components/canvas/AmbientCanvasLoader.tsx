"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AmbientOrganicCanvas = dynamic(
  () => import("./AmbientOrganicCanvas"),
  { ssr: false }
);

/**
 * Carga diferida del canvas WebGL tras la hidratación/idle del navegador.
 * Mantiene un fallback CSS inmediato para proteger LCP, CLS y prefers-reduced-motion.
 */
export function AmbientCanvasLoader() {
  const [shouldRenderWebGL, setShouldRenderWebGL] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    if (reducedMotion.matches) {
      return;
    }

    let cancelled = false;
    const enable = () => {
      if (!cancelled) {
        setShouldRenderWebGL(true);
      }
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(enable, { timeout: 1200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = globalThis.setTimeout(enable, 250);
    return () => {
      cancelled = true;
      globalThis.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {shouldRenderWebGL ? (
        <div className="absolute inset-0 opacity-90 transition-opacity duration-1000">
          <AmbientOrganicCanvas />
        </div>
      ) : null}
    </div>
  );
}
