"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Rise } from "@/components/shared/Rise";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CarouselDots } from "@/components/ui/CarouselDots";
import { HudPanel, type HudPanelVariant } from "@/components/ui/HudPanel";
import {
  HudWidget,
  type HeroSlideId,
  type HudCardId,
} from "@/features/hero-hud";
import { cn } from "@/lib/utils";

interface Slide {
  id: HeroSlideId;
  /** The render this slide puts on the stage. */
  src: string;
  alt: string;
  /**
   * How big this render sits on the stage. 1 is as large as it goes without any of
   * the source leaving the panel; above that it is allowed to run past the edges.
   *
   * It has to be per-slide because the four renders do NOT fill their own canvases
   * alike — the subject of one reaches 94% of the way down its square while
   * another's reaches 77%. At one shared size the second reads a fifth smaller than
   * the first for no reason a viewer could name. The values below are measured, not
   * guessed: each is the amount that brings that render's SUBJECT to the same
   * height as the biggest one's.
   */
  scale: number;
}

/**
 * What the carousel is actually showing: one render per slide, each a piece of the
 * work the studio does — a world, a script, an interface, an effect.
 *
 * Named by subject rather than numbered, so a slide reordered here stays the same
 * slide and its key travels with it (§16).
 */
const SLIDES: readonly Slide[] = [
  {
    id: "character-hud",
    src: "/hero/character-hud.webp",
    alt: "An armoured character standing in front of a holographic interface panel",
    // Subject is 769 of 1000 tall — the shortest of the four, so the largest push.
    scale: 1.5,
  },
  {
    id: "command-outpost",
    src: "/hero/command-outpost.webp",
    alt: "A modular sci-fi command outpost with a satellite dish, lit in cyan",
    // 937 of 1000. The fullest render, and the one the rest are matched against.
    scale: 1.2,
  },
  {
    id: "gameplay-scripting",
    src: "/hero/gameplay-scripting.webp",
    alt: "A laptop running a gameplay controller script in a game engine editor",
    // 766 of 1000, and wide with it, so it is held a little under the character.
    scale: 1.25,
  },
  {
    id: "portal-vfx",
    src: "/hero/portal-vfx.webp",
    alt: "A glowing ring of energy, open at its centre",
    // 906 of 1000, already nearly full. It is also the only one that is pure glow
    // rather than an object, and glow reads larger than it measures.
    scale: 1,
  },
];

/** Derived, never restated: a fifth slide added above needs nothing else (§12.1). */
const SLIDE_COUNT = SLIDES.length;
/**
 * Full cycle: the ~1.8s hand-off (800ms out, then 1000ms in) plus ~2.7s of stillness.
 */
const SLIDE_INTERVAL = 4500;
/**
 * Must match the exit keyframe duration in CSS. It doubles as the cue to swap the
 * outgoing layer for the incoming one, so if it runs short the exit is cut off, and
 * if it runs long the composition sits empty.
 */
const EXIT_DURATION = 800;

interface HudSlot {
  /** `stage` holds the render; every other id is a card, filled per slide. */
  id: "stage" | HudCardId;
  variant: HudPanelVariant;
  /** Percentages of the composition box, so the arrangement scales as one piece. */
  left: string;
  top: string;
  width: string;
  height: string;
}

/**
 * The five HUD surfaces, measured off the design. Percentage units keep the whole
 * arrangement locked together at any width — the alternative, fixed pixels, would
 * drift apart the moment the column resized.
 */
const HUD_SLOTS: readonly HudSlot[] = [
  {
    id: "stage",
    variant: "stage",
    left: "6%",
    top: "2%",
    width: "80%",
    height: "85%",
  },
  {
    id: "top-right",
    variant: "float",
    left: "69%",
    top: "-3%",
    width: "30%",
    height: "30%",
  },
  {
    id: "mid-right",
    variant: "float",
    left: "72%",
    top: "34%",
    width: "28%",
    height: "25%",
  },
  {
    id: "bottom-left",
    variant: "float",
    left: "0%",
    top: "66%",
    width: "31%",
    height: "30%",
  },
  {
    id: "bottom-right",
    variant: "float",
    left: "56%",
    top: "66%",
    width: "40%",
    height: "40%",
  },
];

/** Slide indicator, parked just above the stage's top-left corner. */
const INDICATOR_POSITION = { left: "6%", top: "-3%" } as const;

/**
 * One full set of HUD surfaces. Both the outgoing and incoming slide render a layer;
 * they overlap in the same box while the transition plays.
 *
 * The stage holds the slide's render, and each floating card hosts its own component
 * from `@/features/hero-hud`, filled with that slide's content.
 */
/** Distance the composition travels left on exit, as a percentage of the box. */
const EXIT_TRAVEL = -16;
/** How far the composition opens out while the pointer is over it. */
const EXPAND_SCALE = 1;

/**
 * A panel's box, optionally scaled about the composition's centre. Scaling every
 * panel about the same point spreads the set apart and enlarges it as one piece,
 * which is what a single transform on the group would have done.
 */
function slotBox(slot: HudSlot, expanded: boolean): CSSProperties {
  if (!expanded) {
    return {
      left: slot.left,
      top: slot.top,
      width: slot.width,
      height: slot.height,
    };
  }

  const left = parseFloat(slot.left);
  const top = parseFloat(slot.top);

  return {
    left: `${50 + (left - 50) * EXPAND_SCALE}%`,
    top: `${50 + (top - 50) * EXPAND_SCALE}%`,
    width: `${parseFloat(slot.width) * EXPAND_SCALE}%`,
    height: `${parseFloat(slot.height) * EXPAND_SCALE}%`,
  };
}

/**
 * Per-panel motion values that reproduce a single transform on the whole group.
 *
 * The origin is the composition's centre (50%, 50% of the box) restated in this
 * panel's own coordinate space, and the travel distance is converted from a
 * percentage of the box to a percentage of this panel's width. Derived from the slot
 * values rather than hardcoded, so retuning a panel keeps its motion correct.
 */
function panelMotion(slot: HudSlot): CSSProperties {
  const left = parseFloat(slot.left);
  const top = parseFloat(slot.top);
  const width = parseFloat(slot.width);
  const height = parseFloat(slot.height);

  return {
    "--panel-origin-x": `${((50 - left) / width) * 100}%`,
    "--panel-origin-y": `${((50 - top) / height) * 100}%`,
    "--panel-slide-x": `${(EXIT_TRAVEL / width) * 100}%`,
  } as CSSProperties;
}

/**
 * One full set of HUD surfaces. The layer itself is deliberately inert — every
 * animation lives on the panels, so no ancestor ever becomes a compositing context
 * and the cards keep their backdrop blur throughout.
 *
 * The slide's render goes INSIDE the stage panel, which is what puts the floating
 * cards over it: they are later siblings, so they paint above it without a single
 * z-index between them. It also means the render inherits the stage's own enter and
 * exit animation rather than needing one of its own.
 */
function HudLayer({
  slide,
  phase,
  expanded = false,
}: {
  slide: Slide;
  phase: "enter" | "exit";
  expanded?: boolean;
}) {
  return (
    <div className="absolute inset-0">
      {HUD_SLOTS.map((slot) => {
        // The stage is scenery; only the cards layered on it respond to hover.
        const isInteractive = slot.variant === "float";

        return (
          <div
            key={slot.id}
            className={cn(
              "hud-panel-slot absolute",
              isInteractive && "hover:z-10",
            )}
            style={{
              // Motion origins come from the BASE slot, so the exit path stays
              // identical whether or not the composition is currently open.
              ...panelMotion(slot),
              ...slotBox(slot, expanded),
            }}
          >
            <HudPanel
              variant={slot.variant}
              interactive={isInteractive}
              className={cn(
                "h-full w-full",
                phase === "enter" ? "hud-panel-enter" : "hud-panel-exit",
              )}
            >
              {slot.id === "stage" ? (
                <SlideArt slide={slide} />
              ) : (
                <HudWidget card={slot.id} slideId={slide.id} />
              )}
            </HudPanel>
          </div>
        );
      })}
    </div>
  );
}

/**
 * The render on the stage.
 *
 * `fill` with `object-contain`: the art is square and the stage is not, and these
 * are cut-outs on transparency — cropping one to the panel would take a wing off a
 * dish or the top off a helmet. The panel reserves the space, so nothing shifts
 * while the image loads (§9.1).
 *
 * That also means every render here is HEIGHT-constrained, since the stage is wider
 * than it is tall. Which is why `scale` is the one dial: it is the only thing that
 * decides how big a subject reads, and `object-contain` has already settled
 * everything else.
 *
 * `sizes` is measured off the layout rather than guessed: the stage runs 80% of a
 * composition that takes a little over half the container at `lg` and the full
 * width below it. Leaving it out ships the largest source to a phone.
 */
/**
 * How wide a render is drawn, measured off the layout: the stage is 80% of a
 * composition that takes 6/11 of the container at `lg`, and the render is scaled
 * up to 1.5× inside it. That comes to about 600px once the container hits its
 * 80rem cap, about 46vw just above `lg`, and most of the width below it. A plain
 * `40vw` kept growing past the cap and sent wide screens a bigger file than they
 * draw.
 *
 * Shared by the slide art and the preloader below, so both pick the SAME file and
 * the preloaded one is what the slide later finds in the cache.
 */
const SLIDE_ART_SIZES =
  "(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 90vw";

/** The renders' intrinsic size. They're all square. */
const SLIDE_ART_PX = 1000;

/**
 * Fetches every render after the first, quietly, so each one is already in the
 * cache when its slide comes round. Without this, a slide's image was only
 * requested as the slide mounted, and the stage sat empty for a moment while it
 * downloaded and decoded mid-animation.
 *
 * Low fetch priority, so they never compete with the first slide (the hero's
 * LCP). Rendered off screen rather than with `display: none`, which some browsers
 * treat as a reason not to fetch.
 */
function SlideArtPreloader() {
  return (
    <div aria-hidden className="sr-only">
      {SLIDES.slice(1).map((slide) => (
        <Image
          key={slide.id}
          src={slide.src}
          alt=""
          width={SLIDE_ART_PX}
          height={SLIDE_ART_PX}
          sizes={SLIDE_ART_SIZES}
          loading="eager"
          fetchPriority="low"
        />
      ))}
    </div>
  );
}

function SlideArt({ slide }: { slide: Slide }) {
  return (
    <Image
      src={slide.src}
      alt={slide.alt}
      fill
      sizes={SLIDE_ART_SIZES}
      // Only the slide the page opens on: it is the hero's LCP candidate. Marking
      // the rest would have the browser fetch four renders to show one (§9.1).
      priority={slide.id === SLIDES[0]?.id}
      // A transform rather than a width: it is composited, it cannot reflow the
      // panel around it, and it leaves `object-contain` to do the fitting. Scaling
      // about the centre is what keeps a render put while it grows.
      style={{ transform: `scale(${slide.scale})` }}
      className="object-contain"
    />
  );
}

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  // An auto-advancing carousel is exactly what "reduce motion" asks us not to do,
  // and the global CSS only stops the animation — the content would still jump.
  const allowAutoplay = !usePrefersReducedMotion();
  const lastIndexRef = useRef(index);

  // Looked up rather than indexed at the point of use: `outgoing` is a slide that
  // has already been replaced, and reading a stale index out of a list that could
  // have been edited underneath it is exactly where an undefined slips through.
  const currentSlide = SLIDES[index];
  const outgoingSlide = outgoing === null ? null : SLIDES[outgoing];

  useEffect(() => {
    if (!allowAutoplay || isHovered) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDE_COUNT);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [allowAutoplay, isHovered]);

  // Keep the previous slide mounted long enough to play its exit, then drop it.
  // Tracking it here rather than inside the setIndex updater keeps that updater pure.
  useEffect(() => {
    if (lastIndexRef.current === index) return;

    setOutgoing(lastIndexRef.current);
    lastIndexRef.current = index;

    const timer = setTimeout(() => setOutgoing(null), EXIT_DURATION);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className="relative aspect-7/5 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute z-20"
        style={{ left: INDICATOR_POSITION.left, top: INDICATOR_POSITION.top }}
      >
        <Rise delay={60}>
          <CarouselDots count={SLIDE_COUNT} activeIndex={index} />
        </Rise>
      </div>

      <SlideArtPreloader />

      {/*
       * Exactly one layer is mounted at a time: the outgoing one plays its exit, and
       * only once it is gone does the incoming one start. The panels are translucent,
       * so any overlap lets the previous slide's stage border read straight through
       * the new cards.
       */}
      {outgoingSlide ? (
        <HudLayer
          key={`out-${outgoingSlide.id}`}
          slide={outgoingSlide}
          phase="exit"
        />
      ) : currentSlide ? (
        <HudLayer
          key={`in-${currentSlide.id}`}
          slide={currentSlide}
          phase="enter"
          expanded={isHovered}
        />
      ) : null}
    </div>
  );
}
