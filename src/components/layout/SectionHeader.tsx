import type { ElementType } from "react";
import { cn } from "@/lib/utils";

type Align = "left" | "center";

type SectionHeaderProps = {
  id?: string;
  label?: string;
  title: string;
  description?: string;
  align?: Align;
  as?: ElementType;
  className?: string;
};

export function SectionHeader({
  id,
  label,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {label ? (
        <span className="text-label text-accent-primary">{label}</span>
      ) : null}
      <Heading id={id} className="section-title">
        {title}
      </Heading>
      {description ? (
        <p className="section-description">{description}</p>
      ) : null}
    </div>
  );
}
