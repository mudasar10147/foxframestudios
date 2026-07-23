import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type SpinnerSize = "sm" | "md" | "lg";

const sizeMap: Record<SpinnerSize, number> = {
  sm: 16,
  md: 20,
  lg: 28,
};

type SpinnerProps = {
  size?: SpinnerSize;
  label?: string;
  className?: string;
};

export function Spinner({ size = "md", label = "Loading", className }: SpinnerProps) {
  return (
    <span role="status" aria-live="polite" className="inline-flex">
      <LoaderCircle
        aria-hidden="true"
        size={sizeMap[size]}
        className={cn("animate-spin text-current", className)}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
