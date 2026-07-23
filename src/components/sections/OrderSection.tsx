import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionBackground } from "@/components/effects/SectionBackground";
import { Button } from "@/components/buttons/Button";
import { Card } from "@/components/cards/Card";
import { Reveal } from "@/components/shared/Reveal";
import { TiltCard } from "@/components/shared/TiltCard";
import { orderContent, pricing } from "@/constants/content";

export function OrderSection() {
  return (
    <Section id="order" labelledBy="order-title" className="relative overflow-hidden">
      <SectionBackground glow />

      <Container className="relative z-10 flex flex-col gap-12">
        <SectionHeader
          id="order-title"
          label={orderContent.label}
          title={orderContent.title}
          description={orderContent.description}
          align="center"
        />

        <Reveal variant="up">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {pricing.map((item) => (
              <TiltCard key={item.label}>
                <Card
                  hoverable
                  glow
                  className="flex h-full flex-col items-center gap-2 text-center"
                >
                  <span className="text-label text-accent-primary">
                    {item.label}
                  </span>
                  <span className="text-h3 text-text-primary">{item.value}</span>
                  {item.note ? (
                    <span className="text-body-sm text-text-muted">
                      {item.note}
                    </span>
                  ) : null}
                </Card>
              </TiltCard>
            ))}
          </div>
        </Reveal>

        <Reveal variant="up" delay={0.1}>
          <div className="flex flex-col items-center gap-6">
            <p className="text-body text-text-secondary max-w-[var(--reading-width)] text-center">
              {orderContent.note}
            </p>
            <Button
              href={orderContent.cta.href}
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {orderContent.cta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
