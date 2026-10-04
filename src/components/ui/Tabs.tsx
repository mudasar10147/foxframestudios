"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface TabItem<Value extends string = string> {
  value: Value;
  label: string;
  /** Shown before the label. */
  icon?: IconName;
}

const variantStyles = {
  /** One glass pill bar holding every tab. */
  segmented: { bar: "tabs-bar", tab: "tabs-tab" },
  /** Separate bordered buttons with a gap between them. */
  split: {
    bar: "tabs-bar tabs-bar-split",
    tab: "tabs-tab tabs-tab-split",
  },
} as const;

export type TabsVariant = keyof typeof variantStyles;

export interface TabsProps<Value extends string = string> {
  /** Accessible name for the tab list, e.g. "Workflow by service". */
  label: string;
  items: readonly TabItem<Value>[];
  value: Value;
  onValueChange: (value: Value) => void;
  /** Where the tab bar sits in its row. Defaults to `start`. */
  align?: "start" | "center" | "end";
  /** Defaults to `segmented`. */
  variant?: TabsVariant;
  className?: string;
  /** The selected tab's content, rendered as its panel. */
  children: ReactNode;
}

/**
 * How long the highlight spends stretched across both tabs before it closes onto
 * the new one. Must match the stretch transition in `.tabs-indicator-stretched`.
 */
const STRETCH_MS = 200;

/** Where the highlight sits, in px from the bar's padding edge. */
interface IndicatorBox {
  left: number;
  top: number;
  width: number;
  height: number;
  /** True for the first half of a move, while it spans both tabs. */
  stretched: boolean;
}

/** Which ends of a scrolling bar have tabs hidden past them. */
interface HiddenEdges {
  start: boolean;
  end: boolean;
}

function readEdges(bar: HTMLElement): HiddenEdges {
  return {
    start: bar.scrollLeft > 1,
    end: bar.scrollLeft + bar.clientWidth < bar.scrollWidth - 1,
  };
}

/** A tab's box, measured off the DOM. Null if that tab isn't mounted. */
function measureTab<Value>(
  tabs: ReadonlyMap<Value, HTMLButtonElement>,
  item: Value,
) {
  const tab = tabs.get(item);
  return tab
    ? {
        left: tab.offsetLeft,
        top: tab.offsetTop,
        width: tab.offsetWidth,
        height: tab.offsetHeight,
      }
    : null;
}

const alignStyles = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
} as const;

/**
 * A row of tabs over one panel, built to the WAI-ARIA tabs pattern with automatic
 * activation: ←/→ (and Home/End) move between tabs and select as they go, and only
 * the selected tab is in the Tab order, so one press of Tab leaves the bar for the
 * panel.
 *
 * Drawn as a glass pill bar with ONE highlight that travels between tabs like a
 * bubble: on a switch it first stretches from the old tab across to the new one,
 * then closes onto the new one.
 *
 * Always a single line. Where the tabs don't fit (a phone), the bar becomes a
 * swipeable strip: it fades out at whichever end has more tabs past it, and it
 * scrolls the selected tab to the middle, so no tab is ever stranded out of view.
 */
export function Tabs<Value extends string>({
  label,
  items,
  value,
  onValueChange,
  align = "start",
  variant = "segmented",
  className,
  children,
}: TabsProps<Value>) {
  const styles = variantStyles[variant];
  const baseId = useId();
  const tabId = (item: Value) => `${baseId}-tab-${item}`;
  const panelId = `${baseId}-panel`;
  const tabRefs = useRef(new Map<Value, HTMLButtonElement>());
  const bar = useRef<HTMLDivElement>(null);
  const previous = useRef<Value | null>(null);
  const [indicator, setIndicator] = useState<IndicatorBox | null>(null);
  const [edges, setEdges] = useState<HiddenEdges>({ start: false, end: false });

  // Measured in a layout effect, before paint, so the highlight never shows a
  // frame in the wrong place.
  useLayoutEffect(() => {
    const tabs = tabRefs.current;
    const target = measureTab(tabs, value);
    if (!target) return;

    const isFirstPlacement = previous.current === null;
    const from =
      previous.current !== null && previous.current !== value
        ? measureTab(tabs, previous.current)
        : null;
    previous.current = value;

    // Bring the selected tab to the middle of a strip that scrolls. Instant on the
    // first placement, so the page doesn't open on a scroll animation.
    const element = bar.current;
    if (element && element.scrollWidth > element.clientWidth) {
      element.scrollTo({
        left: target.left - (element.clientWidth - target.width) / 2,
        behavior: isFirstPlacement ? "auto" : "smooth",
      });
    }

    // First placement, or a tab that's gone: go straight there.
    const canStretch = from !== null && from.top === target.top;

    if (!canStretch) {
      setIndicator({ ...target, stretched: false });
    } else {
      // Phase 1: span both tabs. Phase 2 (after the stretch): close onto the new one.
      const left = Math.min(from.left, target.left);
      const right = Math.max(
        from.left + from.width,
        target.left + target.width,
      );
      setIndicator({ ...target, left, width: right - left, stretched: true });
    }

    if (!canStretch) return;

    const timer = setTimeout(
      () => setIndicator({ ...target, stretched: false }),
      STRETCH_MS,
    );
    return () => clearTimeout(timer);
  }, [value]);

  // Tabs can change width with the viewport or a font loading, so follow them.
  // An observer reports once as soon as it starts; that first call is skipped,
  // or it would snap the highlight onto the new tab and cut the stretch short.
  useLayoutEffect(() => {
    const element = bar.current;
    if (!element) return;

    let isFirst = true;
    const observer = new ResizeObserver(() => {
      setEdges(readEdges(element));
      if (isFirst) {
        isFirst = false;
        return;
      }
      const box = measureTab(tabRefs.current, value);
      if (box) setIndicator({ ...box, stretched: false });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  // Keep the edge fades in step with the reader's swiping.
  useLayoutEffect(() => {
    const element = bar.current;
    if (!element) return;

    const handleScroll = () => setEdges(readEdges(element));
    handleScroll();
    element.addEventListener("scroll", handleScroll, { passive: true });
    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

  const selectAt = (index: number) => {
    const item = items[(index + items.length) % items.length];
    if (!item) return;
    onValueChange(item.value);
    tabRefs.current.get(item.value)?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = items.findIndex((item) => item.value === value);

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        selectAt(current + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        selectAt(current - 1);
        break;
      case "Home":
        event.preventDefault();
        selectAt(0);
        break;
      case "End":
        event.preventDefault();
        selectAt(items.length - 1);
        break;
    }
  };

  return (
    <div className={className}>
      <div className={cn("flex", alignStyles[align])}>
        <div
          ref={bar}
          role="tablist"
          aria-label={label}
          onKeyDown={handleKeyDown}
          className={cn(
            styles.bar,
            edges.start && "tabs-bar-fade-start",
            edges.end && "tabs-bar-fade-end",
          )}
        >
          {indicator ? (
            <span
              aria-hidden
              className={cn(
                "tabs-indicator",
                indicator.stretched && "tabs-indicator-stretched",
              )}
              // Measured positions, so they can't be classes.
              style={{
                left: indicator.left,
                top: indicator.top,
                width: indicator.width,
                height: indicator.height,
              }}
            />
          ) : null}
          {items.map((item) => {
            const isSelected = item.value === value;

            return (
              <button
                key={item.value}
                ref={(element) => {
                  if (element) tabRefs.current.set(item.value, element);
                  else tabRefs.current.delete(item.value);
                }}
                id={tabId(item.value)}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={panelId}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => onValueChange(item.value)}
                className={cn(styles.tab, isSelected && "tabs-tab-selected")}
              >
                {item.icon ? (
                  <span aria-hidden className="tabs-tab-icon">
                    <Icon name={item.icon} />
                  </span>
                ) : null}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(value)}
        // Focusable, so a keyboard user can reach a panel that has nothing
        // focusable inside it (§15).
        tabIndex={0}
        className="focus-visible:ring-accent-primary focus-visible:ring-offset-background-primary rounded-lg focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        {children}
      </div>
    </div>
  );
}
