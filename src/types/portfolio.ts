export interface SocialLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface CapabilityPillar {
  id: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  tags: string[];
  isPlaceholder?: boolean;
}

export interface ProjectCaseStudy {
  context: string;
  hypothesis: string;
  execution: string[];
  outcome: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  impactMetric: string;
  tags: string[];
  caseStudy: ProjectCaseStudy;
  isPlaceholder?: boolean;
}

export interface ProfileData {
  name: string;
  shortName: string;
  headline: string;
  subheadline: string;
  availability: string;
  location: string;
  email: string;
  socials: SocialLink[];
  pillars: CapabilityPillar[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
}
