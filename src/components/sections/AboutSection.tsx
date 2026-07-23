import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionBackground } from "@/components/effects/SectionBackground";
import { Reveal } from "@/components/shared/Reveal";
import { aboutContent } from "@/constants/content";
import { AboutVisual } from "./about/AboutVisual";

export function AboutSection() {
  return (
    <Section id="about" labelledBy="about-title" className="relative overflow-hidden">
      <SectionBackground glow />

      <Container className="relative z-10 flex flex-col gap-12">
        <SectionHeader
          id="about-title"
          label={aboutContent.label}
          title={aboutContent.title}
          description={aboutContent.description}
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal variant="right">
            <AboutVisual />
          </Reveal>

          <div className="flex flex-col gap-6">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <Reveal key={index} variant="up" delay={index * 0.1}>
                <p className="text-body-lg text-text-secondary">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
