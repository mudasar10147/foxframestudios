export type NavItem = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  creator: string;
  keywords: readonly string[];
};

export type SocialLink = {
  platform: string;
  label: string;
  url: string;
};

export type Stat = {
  label: string;
  value: string;
};

export type PriceItem = {
  label: string;
  value: string;
  /** Unit the price applies to, e.g. "per import". */
  note?: string;
};

export type Skill = {
  name: string;
  /** Proficiency 0-100, used to render meters. */
  level?: number;
};

export type SkillGroup = {
  category: string;
  skills: Skill[];
};

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  tags: string[];
};

export type ProjectLinks = {
  live?: string;
  repo?: string;
  caseStudy?: string;
};

/** URL slug for a top-level portfolio category. */
export type CategorySlug =
  | "ui-designs"
  | "scripting"
  | "map-building"
  | "3d-modelling";

export type WorkCategory = {
  slug: CategorySlug;
  /** Short name used on filter buttons and in nav. */
  label: string;
  /** Page heading for the category's own route. */
  title: string;
  description: string;
  /** Short line shown under the label on category buttons. */
  blurb: string;
  /** Icon key resolved by CategoryNav to a lucide icon. */
  icon: "layout" | "code" | "map" | "cube";
  /** Divider label for work in this category that has no `set`. */
  ungroupedLabel: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  role: string;
  summary: string;
  description?: string;
  cover?: string;
  stack: string[];
  category: CategorySlug;
  /** Optional finer-grained label, e.g. "HUD" within UI Designs. */
  subcategory?: string;
  /** Groups screens belonging to one UI kit, e.g. "Purple Arcade UI". */
  set?: string;
  metric?: { label: string; value: string };
  links?: ProjectLinks;
  featured: boolean;
  year?: number;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  /** Icon key resolved by the Services section to a lucide icon. */
  icon?: string;
  features?: string[];
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type FooterColumn = {
  title: string;
  links: NavItem[];
};
