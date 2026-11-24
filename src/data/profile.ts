import type { ProfileData } from "@/types/portfolio";

/**
 * Fuente única de verdad (sin base de datos).
 * Base inicial tomada del README del repositorio + slots estructurados
 * listos para poblar con la información exacta de LinkedIn.
 */
export const profileData: ProfileData = {
  name: "Juan David Reyes",
  shortName: "JDR",
  headline:
    "AI Product Builder & Lead Product Designer | End-to-End AI Development",
  subheadline:
    "Más de 7 años escalando productos digitales en fintech, banca y educación. Conecto estrategia de producto, Design Systems, CRO y desarrollo frontend asistido por IA.",
  availability: "Estructura inicial · Listo para contenido de LinkedIn",
  location: "Colombia, Bogotá · Remoto",
  email: "jdavidreyes09@gmail.com",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jdavidreyes/",
      external: true,
    },
    {
      label: "Behance",
      href: "https://www.behance.net/jureyes",
      external: true,
    },
    {
      label: "GitHub",
      href: "https://github.com/Juan-David-Reyes",
      external: true,
    },
  ],
  pillars: [
    {
      id: "product-cro",
      title: "Product Design & CRO",
      description:
        "Diseño centrado en conversión, flujos de pago de alto tráfico y experimentación basada en datos.",
      highlights: ["Discovery & Strategy", "Conversion Optimization", "User Flows"],
    },
    {
      id: "design-systems",
      title: "Design Systems & Ops",
      description:
        "Sistemas escalables que alinean tokens, accesibilidad WCAG AA y velocidad de entrega entre diseño e ingeniería.",
      highlights: ["DesignOps", "Tokens & Components", "Accessibility"],
    },
    {
      id: "builder-ai",
      title: "Frontend & AI Building",
      description:
        "Prototipado rápido y construcción end-to-end de productos web con React, TypeScript y flujos asistidos por IA.",
      highlights: ["React / Next.js", "TypeScript & CSS", "AI Workflows"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Lead Product Designer",
      company: "Fintech / Pagos Digitales (Completar con LinkedIn)",
      period: "Actualidad",
      location: "Remoto",
      summary:
        "Liderazgo de estrategia de Product Design, Design Systems y optimización CRO para productos financieros y de pago de alto tráfico.",
      tags: ["Product Strategy", "Design Systems", "CRO"],
      isPlaceholder: true,
    },
    {
      id: "exp-2",
      role: "Senior Product Designer & Builder",
      company: "Banca & Educación Digital (Completar con LinkedIn)",
      period: "Experiencia previa",
      location: "Híbrido / Remoto",
      summary:
        "Diseño de experiencias digitales de punta a punta y colaboración directa en código para acelerar validación y salida a producción.",
      tags: ["UX Architecture", "Frontend", "Prototyping"],
      isPlaceholder: true,
    },
  ],
  projects: [
    {
      slug: "fintech-checkout-cro",
      title: "Optimización de Checkout y Pagos",
      category: "Fintech · CRO",
      year: "Case Study 01",
      role: "Lead Product Designer",
      summary:
        "Slot estructural para caso de estudio enfocado en fricción de pago, claridad visual y mejora de conversión.",
      impactMetric: "+XX% Conversión (Placeholder)",
      tags: ["CRO", "Fintech", "Design System"],
      isPlaceholder: true,
      caseStudy: {
        context:
          "Espacio reservado para describir el problema de negocio, métricas iniciales y restricciones técnicas del producto.",
        hypothesis:
          "Reducir la carga cognitiva en pasos críticos y unificar patrones del Design System mejora la finalización sin sacrificar confianza.",
        execution: [
          "Auditoría de embudo, heurísticas de usabilidad y análisis de puntos de abandono.",
          "Rediseño modular con estados claros de error, validación y accesibilidad WCAG AA.",
          "Prototipo interactivo validado en código antes de pasar a producción.",
        ],
        outcome:
          "Aquí documentarás el impacto medible final (conversión, tiempo de tarea, adopción o reducción de soporte).",
      },
    },
    {
      slug: "scalable-design-system",
      title: "Design System Multi-Producto",
      category: "DesignOps · Sistemas",
      year: "Case Study 02",
      role: "Design Systems Lead",
      summary:
        "Slot estructural para documentar arquitectura de tokens, gobernanza y adopción entre equipos de diseño y desarrollo.",
      impactMetric: "2x Velocidad de entrega (Placeholder)",
      tags: ["DesignOps", "Tokens", "React"],
      isPlaceholder: true,
      caseStudy: {
        context:
          "Espacio reservado para explicar la fragmentación inicial de interfaces y la necesidad de consistencia entre squads.",
        hypothesis:
          "Conectar tokens semánticos con componentes accesibles en React reduce deuda visual y retrabajo.",
        execution: [
          "Definición de fundamentos: escala tipográfica, contraste AA y espaciado fluido.",
          "Documentación de componentes y criterios de uso para diseñadores y frontend.",
          "Integración continua entre Figma y código.",
        ],
        outcome:
          "Aquí irán los resultados de adopción, consistencia y ahorro de tiempo en desarrollo.",
      },
    },
    {
      slug: "ai-assisted-product-build",
      title: "Producto Full-Stack End-to-End",
      category: "Builder · AI Workflows",
      year: "Case Study 03",
      role: "Product Designer & Builder",
      summary:
        "Slot estructural para mostrar un proyecto llevado desde wireframes conceptuales hasta producción con código e IA.",
      impactMetric: "0 → 1 en Producción (Placeholder)",
      tags: ["Next.js", "TypeScript", "AI Workflows"],
      isPlaceholder: true,
      caseStudy: {
        context:
          "Espacio reservado para presentar un proyecto propio o iniciativa llevada de idea a producto funcional.",
        hypothesis:
          "Combinar criterio de producto con flujos asistidos por IA permite iterar directamente sobre software real.",
        execution: [
          "Definición de arquitectura mínima viable y flujos clave de usuario.",
          "Implementación frontend/backend cuidando Core Web Vitals y experiencia táctil.",
          "Iteración rápida basada en feedback real.",
        ],
        outcome:
          "Resumen de aprendizajes, arquitectura desplegada y métricas de uso.",
      },
    },
  ],
};
