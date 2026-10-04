import type { ComponentType } from "react";
import { HUD_CONTENT } from "./content";
import { HUD_WIDGETS } from "./registry";
import type {
  HeroSlideId,
  HudCardContent,
  HudCardId,
  HudWidgetKind,
  HudWidgetPropsMap,
} from "./types";

export interface HudWidgetProps {
  card: HudCardId;
  slideId: HeroSlideId;
}

/**
 * Renders one card's entry. Generic so TypeScript keeps the component and its props
 * tied to the SAME name; looked up directly from the union, each would widen
 * separately and the pairing between them would be lost.
 */
function renderEntry<K extends HudWidgetKind>(entry: HudCardContent<K>) {
  const Widget: ComponentType<HudWidgetPropsMap[K]> = HUD_WIDGETS[entry.widget];
  return <Widget {...entry.props} />;
}

/**
 * Fills one card with whatever component the given slide assigns to it.
 *
 * Each readout makes itself a size container on its OWN root, inside this wrapper.
 * It's kept there on purpose: containment on the positioned slot, or on the panel,
 * would change what the card's backdrop blur can sample, and that blur is the
 * reason the carousel's motion is built the way it is.
 */
export function HudWidget({ card, slideId }: HudWidgetProps) {
  return (
    <div className="size-full overflow-hidden">
      {renderEntry(HUD_CONTENT[slideId][card])}
    </div>
  );
}
