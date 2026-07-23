import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block animate-pulse rounded-md bg-elevated-surface",
        className,
      )}
    />
  );
}

type SkeletonTextProps = {
  lines?: number;
  className?: string;
};

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn("h-4", index === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

type SkeletonAvatarProps = {
  size?: number;
  className?: string;
};

export function SkeletonAvatar({ size = 48, className }: SkeletonAvatarProps) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={cn("block animate-pulse rounded-full bg-elevated-surface", className)}
    />
  );
}

type SkeletonCardProps = {
  className?: string;
};

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-border-default bg-surface p-6",
        className,
      )}
    >
      <Skeleton className="aspect-video w-full" />
      <Skeleton className="h-6 w-1/2" />
      <SkeletonText lines={2} />
    </div>
  );
}
