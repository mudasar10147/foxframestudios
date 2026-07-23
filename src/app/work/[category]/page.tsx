import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionBackground } from "@/components/effects/SectionBackground";
import { ProjectsGrid } from "@/components/sections/projects/ProjectsGrid";
import { CategoryNav } from "@/components/sections/projects/CategoryNav";
import { SetDivider } from "@/components/sections/projects/SetDivider";
import { getCategoryBySlug, workCategories } from "@/constants/categories";
import { projects } from "@/constants/content";
import type { Project } from "@/types";

/**
 * Groups projects by their UI kit, preserving source order. Anything without a
 * `set` collects under the category's own `ungroupedLabel`.
 */
function groupBySet(items: Project[], ungroupedLabel: string) {
  const groups = new Map<string, Project[]>();

  for (const item of items) {
    const key = item.set ?? ungroupedLabel;
    const existing = groups.get(key);
    if (existing) {
      existing.push(item);
    } else {
      groups.set(key, [item]);
    }
  }

  return [...groups.entries()].map(([title, items]) => ({ title, items }));
}

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return workCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Not Found" };
  }

  return {
    title: category.title,
    description: category.description,
    alternates: { canonical: `/work/${category.slug}` },
    openGraph: {
      title: category.title,
      description: category.description,
      url: `/work/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryProjects = projects.filter(
    (project) => project.category === category.slug,
  );

  return (
    <MainLayout>
      <Section
        id="category"
        labelledBy="category-title"
        className="relative overflow-hidden"
      >
        <SectionBackground glow />

        <Container className="relative z-10 flex flex-col gap-12">
          <Link
            href="/#work"
            className="text-button text-text-muted transition-button inline-flex w-fit items-center gap-2 hover:text-text-primary"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to work
          </Link>

          <SectionHeader
            id="category-title"
            label="Portfolio"
            title={category.title}
            description={category.description}
            as="h1"
          />

          <CategoryNav active={category.slug} />

          {categoryProjects.length > 0 ? (
            <div className="flex flex-col gap-16">
              {groupBySet(categoryProjects, category.ungroupedLabel).map((group) => (
                <div key={group.title} className="flex flex-col gap-8">
                  <SetDivider title={group.title} count={group.items.length} />
                  <ProjectsGrid projects={group.items} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-body-lg text-text-muted">
              New work in this category is on the way — check back soon.
            </p>
          )}
        </Container>
      </Section>
    </MainLayout>
  );
}
