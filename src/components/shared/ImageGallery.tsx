"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ImageLightbox,
  type LightboxItem,
} from "@/components/shared/ImageLightbox";

export interface ImageGalleryProps {
  items: readonly LightboxItem[];
}

/**
 * A grid of 16:9 thumbnails. Each is a button that opens the set in
 * `ImageLightbox` at that image, so the whole gallery can be flicked through full
 * screen.
 */
export function ImageGallery({ items }: ImageGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <ul className="image-gallery">
        {items.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`View "${item.title}" full screen`}
              className="image-gallery-item"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                // Three across on a wide screen (each under 400px), one on a phone.
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <ImageLightbox
        items={items}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}
