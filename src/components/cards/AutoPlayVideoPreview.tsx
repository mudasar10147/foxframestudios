"use client";

import { useEffect, useRef } from "react";

type AutoPlayVideoPreviewProps = {
  src: string;
  title: string;
};

export function AutoPlayVideoPreview({ src, title }: AutoPlayVideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.45] },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      aria-label={`${title} animated project preview`}
      className="h-full w-full object-contain"
      loop
      muted
      playsInline
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
