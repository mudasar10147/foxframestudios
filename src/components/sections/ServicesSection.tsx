import type { ComponentType, SVGProps } from "react";
import { Box, Code2, LayoutDashboard, Map, Palette, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Stagger, StaggerItem } from "@/components/shared/Stagger";
import { TiltCard } from "@/components/shared/TiltCard";
import { services } from "@/constants/content";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const iconMap: Record<string, IconComponent> = {
  palette: Palette,
  code: Code2,
  layout: LayoutDashboard,
  map: Map,
  cube: Box,
};

export function ServicesSection() {
  return (
    <Section id="services" labelledBy="services-title">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          id="services-title"
          label="Services"
          title="What I Can Do For You"
          description="End-to-end Roblox UI services to take your game from concept to launch."
        />

        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon ? (iconMap[service.icon] ?? Sparkles) : Sparkles;
            return (
              <StaggerItem key={service.id} className="h-full">
                <TiltCard>
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    features={service.features}
                    icon={<Icon size={22} aria-hidden="true" />}
                  />
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
