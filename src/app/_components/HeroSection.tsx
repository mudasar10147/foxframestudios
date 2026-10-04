import { HeroCarousel } from "@/app/_components/HeroCarousel";
import { Container } from "@/components/layout/Container";
import { Rise } from "@/components/shared/Rise";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { siteConfig } from "@/constants/site";

export function HeroSection() {
  return (
    // `overflow-x-clip`: the stage renders are scaled past their panel on purpose,
    // and at some widths that reaches past the screen edge. `clip` rather than
    // `hidden`, so this isn't a scroll container and the cards' blur is untouched.
    <section className="relative flex flex-1 flex-col justify-center overflow-x-clip">
      <div
        aria-hidden
        className="texture-grid pointer-events-none absolute inset-0"
      />

      <Container className="relative grid items-center gap-14 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10 lg:py-20">
        <div>
          <Rise>
            <h1 className="text-5xl leading-none font-extrabold tracking-tight uppercase sm:text-6xl lg:text-7xl">
              Architects
              <br />
              of <span className="text-accent-primary">Virtual</span>
              <br />
              <span className="text-accent-primary">Reality</span>
            </h1>
          </Rise>

          <Rise delay={90} className="mt-7">
            <p className="text-text-secondary max-w-md text-base text-pretty sm:text-lg">
              Crafting immersive interfaces, systems, and assets for next-gen
              worlds.
            </p>
          </Rise>

          <Rise delay={180} className="mt-9">
            <ButtonLink href={siteConfig.cta.href} variant="primary" size="lg">
              {siteConfig.cta.label}
            </ButtonLink>
          </Rise>
        </div>

        <HeroCarousel />
      </Container>
    </section>
  );
}
