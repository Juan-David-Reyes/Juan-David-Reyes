import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { profileData } from "@/data/profile";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return profileData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = profileData.projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Proyecto no encontrado" };
  }

  const canonicalPath = `/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.summary,
    keywords: [project.category, project.role, ...project.tags],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${project.title} | ${profileData.name}`,
      description: project.summary,
      url: `${SITE_URL}${canonicalPath}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${profileData.name}`,
      description: project.summary,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = profileData.projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${SITE_URL}/projects/${project.slug}`,
    keywords: project.tags.join(", "),
    author: {
      "@type": "Person",
      name: profileData.name,
      url: SITE_URL,
    },
  };

  return (
    <main id="main-content" className="py-12 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="max-w-3xl space-y-10">
        <div className="space-y-6">
          <Link
            href="/#proyectos"
            className="organic-transition inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-bold text-foreground hover:border-accent/50 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span aria-hidden="true">←</span>
            <span>Volver a proyectos</span>
          </Link>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">
              {project.category} · {project.role}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="text-base leading-relaxed font-medium text-muted sm:text-lg">
              {project.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent px-3.5 py-1 text-xs font-bold text-background">
              {project.impactMetric}
            </span>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Espacio conceptual reservado para visuales del caso de estudio */}
        <div
          aria-hidden="true"
          className="flex h-56 items-center justify-center rounded-3xl border border-dashed border-border bg-surface/60 p-6 text-center text-sm font-semibold text-muted backdrop-blur-sm sm:h-72"
        >
          Área reservada para arte conceptual, prototipo interactivo o capturas
          del producto
        </div>

        <section
          aria-label="Estructura del caso de estudio"
          className="space-y-6"
        >
          <article
            id="contexto"
            className="scroll-mt-20 rounded-3xl border border-border bg-surface p-6 backdrop-blur-md"
          >
            <h2 className="text-lg font-bold text-foreground">1. Contexto</h2>
            <p className="mt-2 text-sm leading-relaxed font-medium text-muted sm:text-base">
              {project.caseStudy.context}
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-surface p-6 backdrop-blur-md">
            <h2 className="text-lg font-bold text-foreground">
              2. Hipótesis UX / CRO
            </h2>
            <p className="mt-2 text-sm leading-relaxed font-medium text-muted sm:text-base">
              {project.caseStudy.hypothesis}
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-surface p-6 backdrop-blur-md">
            <h2 className="text-lg font-bold text-foreground">
              3. Ejecución (Design + Build)
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed font-medium text-muted sm:text-base">
              {project.caseStudy.execution.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-border bg-surface p-6 backdrop-blur-md">
            <h2 className="text-lg font-bold text-foreground">
              4. Impacto y aprendizajes
            </h2>
            <p className="mt-2 text-sm leading-relaxed font-medium text-muted sm:text-base">
              {project.caseStudy.outcome}
            </p>
          </article>
        </section>
      </Container>
    </main>
  );
}
