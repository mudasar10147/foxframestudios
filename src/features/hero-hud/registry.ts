import type { ComponentType } from "react";
import { BreakdownReadout } from "@/components/domain/BreakdownReadout";
import { CapabilityReadout } from "@/components/domain/CapabilityReadout";
import { CodeReadout } from "@/components/domain/CodeReadout";
import { DeviceReadout } from "@/components/domain/DeviceReadout";
import { MetricReadout } from "@/components/domain/MetricReadout";
import { StyleReadout } from "@/components/domain/StyleReadout";
import { TallyReadout } from "@/components/domain/TallyReadout";
import { UiKitReadout } from "@/components/domain/UiKitReadout";
import type { HudWidgetKind, HudWidgetPropsMap } from "./types";

/**
 * The component behind each name. It's a mapped type, so every name must be
 * registered and its component must accept that name's props. A missing or
 * mismatched entry is a type error.
 */
export const HUD_WIDGETS: {
  [K in HudWidgetKind]: ComponentType<HudWidgetPropsMap[K]>;
} = {
  breakdown: BreakdownReadout,
  capability: CapabilityReadout,
  code: CodeReadout,
  device: DeviceReadout,
  metric: MetricReadout,
  style: StyleReadout,
  tally: TallyReadout,
  uiKit: UiKitReadout,
};
