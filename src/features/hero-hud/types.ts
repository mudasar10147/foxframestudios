import type { BreakdownReadoutProps } from "@/components/domain/BreakdownReadout";
import type { CapabilityReadoutProps } from "@/components/domain/CapabilityReadout";
import type { CodeReadoutProps } from "@/components/domain/CodeReadout";
import type { DeviceReadoutProps } from "@/components/domain/DeviceReadout";
import type { MetricReadoutProps } from "@/components/domain/MetricReadout";
import type { StyleReadoutProps } from "@/components/domain/StyleReadout";
import type { TallyReadoutProps } from "@/components/domain/TallyReadout";
import type { UiKitReadoutProps } from "@/components/domain/UiKitReadout";

/**
 * Every slide the hero carousel can show. The carousel's `SLIDES` list is typed
 * against this, and so is the per-slide content, which means adding a slide here
 * fails to compile until every card has content for it.
 */
export type HeroSlideId =
  | "ui-game-menu"
  | "gameplay-scripting"
  | "ui-inventory"
  | "portal-vfx";

/**
 * The four floating cards, named by where they sit in the composition. They are
 * positions only: which component fills a card is decided per slide, in
 * `content.ts`.
 */
export type HudCardId =
  | "top-right"
  | "mid-right"
  | "bottom-left"
  | "bottom-right";

/**
 * Every component a card can host, keyed by name, with the props each one takes.
 * To add a component: add an entry here, then register it in `registry.ts`.
 */
export interface HudWidgetPropsMap {
  breakdown: BreakdownReadoutProps;
  capability: CapabilityReadoutProps;
  code: CodeReadoutProps;
  device: DeviceReadoutProps;
  metric: MetricReadoutProps;
  style: StyleReadoutProps;
  tally: TallyReadoutProps;
  uiKit: UiKitReadoutProps;
}

export type HudWidgetKind = keyof HudWidgetPropsMap;

/**
 * What one card shows on one slide: a component's name and that component's props.
 * Written as a mapped type, so each name is tied to its own props, and the pairing
 * still holds when the entry is passed to the generic renderer.
 */
export type HudCardContent<K extends HudWidgetKind = HudWidgetKind> = {
  [P in K]: { widget: P; props: HudWidgetPropsMap[P] };
}[K];
