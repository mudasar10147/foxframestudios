import { ServiceCard } from "@/components/domain/ServiceCard";
import { Rise } from "@/components/shared/Rise";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  EdgeNotch,
  notchMaskStyle,
  notchPanelStyle,
} from "@/components/ui/EdgeNotch";
import { HudPanel } from "@/components/ui/HudPanel";
import type { IconName } from "@/components/ui/Icon";

interface Service {
  /** Stable key (§16). */
  id: string;
  title: string;
  icon: IconName;
  description: string;
  tags: readonly string[];
}

const SERVICES: readonly Service[] = [
  {
    id: "full-game",
    title: "Full Game Development",
    icon: "gamepad",
    description:
      "Complete games built end to end, from first prototype to launch.",
    tags: ["Prototype", "Production", "Launch"],
  },
  {
    id: "ui-ux",
    title: "UI/UX",
    icon: "layout",
    description: "Clean game interfaces built for clarity and usability.",
    tags: ["HUDs", "Menus", "Kits"],
  },
  {
    id: "scripting",
    title: "Scripting",
    icon: "code",
    description: "Scalable gameplay systems and clean code architecture.",
    tags: ["Lua", "TypeScript", "Systems"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative py-20 lg:py-28">
      {/*
       * The whole section sits on a HUD surface so it reads as one block against
       * the page. This is the SAME `HudPanel` the hero composition uses, on
       * purpose: border, fill and frosting are shared by construction, so
       * retuning the hero's readouts retunes this box with them (§6.0).
       *
       * It sets its own width from `--section-width` instead of using `Container`,
       * so the box lines up with the header bar rather than with the narrower page
       * grid — at container width it read as a small panel floating in the section.
       *
       * `hud-panel-section` re-draws the outline so its sides can step inward,
       * and brightens it for this scale without disturbing the hero's cards.
       *
       * Dials — `--section-width` for how wide the box runs, `--border-section`
       * for how lit its edge is, `--notch-inset` for where the sides step in,
       * `--service-card-max` and `--service-gap` for the frames, `--grid-cell` for
       * the texture behind them, and the padding for how far the frames sit
       * inside the border.
       */}
      <div
        className="section-panel relative mx-auto w-[var(--section-width)]"
        style={notchPanelStyle()}
      >
        {/*
         * What casts the glow. It is a separate layer because a filter traces
         * everything inside it — put on the panel, the light would come off every
         * card and letter as well as the edge.
         *
         * Opaque, and in the page colour, because `drop-shadow` reads alpha: a
         * translucent caster would give a proportionally weaker glow. It sits
         * behind the panel, where that colour is what showed through anyway.
         *
         * `rounded-xl` must match the panel's own radius, and the mask must be the
         * same one — the glow follows this shape, not the panel's.
         */}
        <div
          aria-hidden
          className="section-glow pointer-events-none absolute inset-0"
        >
          <div
            className="bg-background-primary size-full rounded-xl"
            style={notchMaskStyle()}
          />
        </div>

        <HudPanel
          variant="float"
          className="hud-panel-section relative w-full p-6 sm:p-10 lg:p-14"
          style={notchMaskStyle()}
        >
          {/*
           * `rounded-[inherit]` rather than a radius utility: the grid has to clip to
           * whatever corner the panel is currently using, and the panel owns that.
           */}
          <div
            aria-hidden
            className="texture-grid texture-grid-section pointer-events-none absolute inset-0 rounded-[inherit]"
          />

          {/*
           * A finer grid over the top-left corner, fading toward the bottom right —
           * picking up where the grid above has faded out. Only its own corner needs
           * rounding, since that is the only one it touches; the panel does not clip
           * its children.
           */}
          <div
            aria-hidden
            className="texture-grid texture-grid-corner pointer-events-none absolute top-0 left-0 rounded-tl-[inherit]"
          />

          {/*
           * These ARE the side borders over their span — the panel masks its own
           * outline away underneath them (see `.hud-panel-section::before`), so the
           * edge reads as one line that steps out and back, not as a line with a
           * second line beside it.
           */}
          <EdgeNotch side="left" />
          <EdgeNotch side="right" />

          {/*
           * Positioned, so the content paints above the overlay. Without it the
           * absolutely positioned grid would sit on top of the unpositioned header.
           */}
          <div className="relative">
            <Rise trigger="in-view">
              <SectionHeader title="Services" align="center" divider />
            </Rise>

            <div className="service-grid mt-12 lg:mt-16">
              {SERVICES.map((service, index) => (
                <Rise
                  key={service.id}
                  trigger="in-view"
                  delay={index * 120}
                  // So every card in a row stretches to the tallest one.
                  className="h-full"
                >
                  <ServiceCard
                    index={String(index + 1).padStart(2, "0")}
                    title={service.title}
                    icon={service.icon}
                    description={service.description}
                    tags={service.tags}
                  />
                </Rise>
              ))}
            </div>
          </div>
        </HudPanel>
      </div>
    </section>
  );
}
