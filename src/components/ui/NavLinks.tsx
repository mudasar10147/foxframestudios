"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "@/components/ui/NavLink";
import type { NavItem } from "@/constants/site";
import { cn } from "@/lib/utils";

interface IndicatorRect {
  left: number;
  width: number;
  top: number;
}

/** Distance from the bottom of the label text to the underline. */
const UNDERLINE_GAP = 6;

export interface NavLinksProps {
  items: readonly NavItem[];
  className?: string;
}

/**
 * A nav list with ONE underline shared by every item, which slides between them.
 *
 * The indicator follows the hovered (or keyboard-focused) item and falls back to the
 * active route when the pointer leaves, so hovering previews the destination and
 * navigating leaves the underline parked on the new page.
 *
 * The list carries no gap or padding, and the anchors supply their own horizontal
 * padding so they tile edge to edge. Any dead space inside the list would hold the
 * indicator while the anchor's own :hover — and so the text colour — had already
 * dropped, making the two read as unsynchronised.
 */
export function NavLinks({ items, className }: NavLinksProps) {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [rect, setRect] = useState<IndicatorRect | null>(null);
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  const activeIndex = items.findIndex(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  const targetIndex = previewIndex ?? (activeIndex >= 0 ? activeIndex : null);

  const measure = useCallback(() => {
    const list = listRef.current;

    // Deliberately keep the last rect when there is nothing to point at, so the
    // underline fades out where it stands. Clearing it would snap the position to
    // the list's top-left corner and animate from there on the way out.
    if (!list || targetIndex === null) {
      setVisible(false);
      return;
    }

    // Measure the label, not the anchor: the anchor is padded out into a large hit
    // area, so its box would push the underline well below the text.
    const label =
      list.querySelectorAll<HTMLElement>("[data-nav-label]")[targetIndex];

    if (!label) {
      setVisible(false);
      return;
    }

    const listBox = list.getBoundingClientRect();
    const labelBox = label.getBoundingClientRect();

    setRect({
      left: labelBox.left - listBox.left,
      width: labelBox.width,
      top: labelBox.bottom - listBox.top + UNDERLINE_GAP,
    });
    setVisible(true);
  }, [targetIndex]);

  useEffect(() => {
    measure();
  }, [measure, pathname]);

  // Park the indicator on the active item WITHOUT animating on first paint —
  // otherwise it visibly sweeps in from the left edge on every page load. Enabling
  // the transition a frame later makes only subsequent moves animate.
  useEffect(() => {
    if (!rect || animate) return;
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, [rect, animate]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    // Web fonts swapping in and viewport resizes both shift the links out from
    // under the indicator, so remeasure whenever the list's box changes.
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [measure]);

  return (
    <ul
      ref={listRef}
      onMouseLeave={() => setPreviewIndex(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPreviewIndex(null);
        }
      }}
      className={cn("relative flex items-center", className)}
    >
      {items.map((item, index) => (
        <li
          key={item.href}
          className="flex items-center"
          onMouseEnter={() => setPreviewIndex(index)}
          onFocus={() => setPreviewIndex(index)}
        >
          {index > 0 ? (
            <span aria-hidden className="bg-border-strong h-4 w-px" />
          ) : null}
          <NavLink href={item.href} indicator="none" className="px-4">
            {item.label}
          </NavLink>
        </li>
      ))}

      <span
        aria-hidden
        className={cn(
          "nav-underline pointer-events-none absolute left-0",
          animate &&
            "transition-[transform,width,opacity] duration-300 ease-out",
          visible ? "opacity-100" : "opacity-0",
        )}
        style={{
          transform: `translateX(${rect?.left ?? 0}px)`,
          width: `${rect?.width ?? 0}px`,
          top: `${rect?.top ?? 0}px`,
        }}
      />
    </ul>
  );
}
