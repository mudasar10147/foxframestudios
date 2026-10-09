"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

export interface LightboxItem {
  /** Stable key (§16). */
  id: string;
  src: string;
  alt: string;
  title: string;
  /** A short line under the title, e.g. tags. */
  meta?: string;
  /** A sentence or two about the image. */
  description?: string;
  /** Pads the image inside the frame, for cut-out art on transparency. */
  inset?: boolean;
  /** A looping clip to play instead of the image, which then serves as its poster. */
  video?: string;
}

/**
 * Higher than the default 75: these are often UI screens, and small interface text
 * is the first thing compression smears. Only this full-size view pays for it.
 */
const LIGHTBOX_QUALITY = 90;

export interface ImageLightboxProps {
  items: readonly LightboxItem[];
  /** The item being shown, or null when the lightbox is closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/**
 * Images full screen, one at a time: the image as large as fits, with its title,
 * a counter, an optional line of detail, and arrows (or ←/→) to step through the
 * set without closing. It wraps round at both ends. Built on `Modal`, so it traps
 * focus, closes on Escape or a click outside, and hands focus back on close.
 */
export function ImageLightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: ImageLightboxProps) {
  const count = items.length;
  const item = index === null ? undefined : items[index];

  const step = (by: number) => {
    if (index === null) return;
    onIndexChange((index + by + count) % count);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // The lightbox can sit inside something that also steps on ←/→ (the portfolio
    // carousel). Stopping it here keeps one keypress from moving both.
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.stopPropagation();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  return (
    <Modal
      open={item !== undefined}
      onClose={onClose}
      label={item ? `${item.title}, full screen` : "Image, full screen"}
      className="lightbox"
    >
      {item && index !== null ? (
        // Arrow keys work from anywhere in the lightbox, not just on the arrows.
        <div className="lightbox-body" onKeyDown={handleKeyDown}>
          <div className="lightbox-frame">
            {item.video ? (
              <LoopVideo
                key={item.id}
                src={item.video}
                poster={item.src}
                label={item.alt}
                className="lightbox-image object-contain"
              />
            ) : (
              <Image
                // Keyed by item so a step swaps the image instead of morphing it.
                key={item.id}
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                quality={LIGHTBOX_QUALITY}
                className={cn(
                  "lightbox-image object-contain",
                  item.inset && "lightbox-image-inset",
                )}
              />
            )}
          </div>

          <div className="lightbox-info">
            <div className="min-w-0">
              <p className="text-accent-primary text-xs font-semibold tracking-[0.2em] uppercase">
                {index + 1} / {count}
              </p>
              <h2 className="text-text-primary mt-1 text-xl font-extrabold uppercase sm:text-2xl">
                {item.title}
              </h2>
              {item.meta ? (
                <p className="text-text-secondary mt-1 text-sm">{item.meta}</p>
              ) : null}
              {item.description ? (
                <p className="text-text-secondary mt-3 max-w-2xl text-sm leading-relaxed">
                  {item.description}
                </p>
              ) : null}
            </div>

            {count > 1 ? (
              <div className="flex shrink-0 gap-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="project-carousel-arrow"
                >
                  <Icon name="chevronLeft" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="project-carousel-arrow"
                >
                  <Icon name="chevronRight" />
                </button>
              </div>
            ) : null}
          </div>

          {/* Last in the DOM so focus lands on the content first, but drawn top right. */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="lightbox-close"
          >
            <Icon name="close" />
          </button>
        </div>
      ) : null}
    </Modal>
  );
}
