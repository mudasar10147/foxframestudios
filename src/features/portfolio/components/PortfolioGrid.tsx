"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ImageLightbox,
  type LightboxItem,
} from "@/components/shared/ImageLightbox";
import { Icon } from "@/components/ui/Icon";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { cn } from "@/lib/utils";
import type { PortfolioEntry } from "../entries";
import type { PortfolioGridColumns } from "../types";

export interface PortfolioGridProps {
  entries: readonly PortfolioEntry[];
  columns?: PortfolioGridColumns;
}

// One column below `md`, two to `xl`; `sizes` follows the 80rem container from there.
const columnLayouts: Record<
  PortfolioGridColumns,
  { grid: string; sizes: string }
> = {
  2: {
    grid: "md:grid-cols-2",
    sizes: "(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw",
  },
  3: {
    grid: "md:grid-cols-2 xl:grid-cols-3",
    sizes: "(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw",
  },
};

function toLightboxItem(entry: PortfolioEntry): LightboxItem {
  return {
    id: entry.id,
    src: entry.image.src,
    alt: entry.image.alt,
    title: entry.title,
    meta: `${entry.categoryLabel} • ${entry.tags.join(" • ")}`,
    description: entry.description,
    inset: entry.image.fit === "contain",
    video: entry.clip,
  };
}

/**
 * The portfolio page's project grid: one 16:9 tile per project, one column on
 * phones, two from `md`, and with `columns={3}` three from `xl`.
 *
 * A project with its own page links to it ("View project"). The others open in the
 * full-screen preview, which steps through just those, in the order shown — so with
 * a filter applied it flicks through that discipline only. The whole tile is the
 * hit area: the action's `::after` stretches over it.
 */
export function PortfolioGrid({ entries, columns = 3 }: PortfolioGridProps) {
  // Only projects without a page are previewed; the rest navigate away.
  const previewable = entries.filter((entry) => !entry.href);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const layout = columnLayouts[columns];

  return (
    <>
      <ul className={cn("grid gap-6", layout.grid)}>
        {entries.map((entry) => (
          <li key={entry.id}>
            <article className="portfolio-tile hover-reveal-scope">
              <div className="portfolio-tile-art">
                {entry.clip ? (
                  <LoopVideo
                    src={entry.clip}
                    poster={entry.image.src}
                    className={cn(
                      "portfolio-tile-image",
                      entry.image.fit === "contain"
                        ? "object-contain"
                        : "object-cover",
                    )}
                  />
                ) : (
                  <Image
                    src={entry.image.src}
                    alt={entry.image.alt}
                    fill
                    sizes={layout.sizes}
                    className={cn(
                      "portfolio-tile-image",
                      entry.image.fit === "contain"
                        ? "portfolio-tile-image-contain object-contain"
                        : "object-cover",
                    )}
                  />
                )}
                <span aria-hidden className="portfolio-tile-shade" />
                <span className="portfolio-tile-category">
                  <Icon name={entry.categoryIcon} />
                  {entry.categoryLabel}
                </span>
                {entry.featured ? (
                  <span className="portfolio-tile-featured">
                    <Icon name="star" />
                    <span className="sr-only">Featured</span>
                  </span>
                ) : null}
              </div>

              <div className="portfolio-tile-body">
                <h3 className="portfolio-tile-title">{entry.title}</h3>
                <p className="portfolio-tile-tags">{entry.tags.join(" • ")}</p>

                {entry.href ? (
                  <Link href={entry.href} className="portfolio-tile-action">
                    View project
                    <Icon name="chevronRight" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewIndex(
                        previewable.findIndex((item) => item.id === entry.id),
                      )
                    }
                    className="portfolio-tile-action"
                  >
                    View full screen
                    <Icon name="chevronRight" />
                  </button>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>

      <ImageLightbox
        items={previewable.map(toLightboxItem)}
        index={previewIndex}
        onIndexChange={setPreviewIndex}
        onClose={() => setPreviewIndex(null)}
      />
    </>
  );
}
