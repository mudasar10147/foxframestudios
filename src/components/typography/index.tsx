import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
};

function createTextComponent(defaultTag: ElementType, baseClass: string) {
  function TextComponent({ as, className, ...props }: TextProps) {
    const Tag = as ?? defaultTag;
    return <Tag className={cn(baseClass, className)} {...props} />;
  }
  return TextComponent;
}

/** Largest display text — hero impact. Responsive. */
export const Display = createTextComponent(
  "h1",
  "font-display text-text-primary text-hero-lg md:text-hero-xl",
);

/** Primary page/hero title. Responsive. */
export const HeroTitle = createTextComponent(
  "h1",
  "font-display text-text-primary text-h1 md:text-hero-lg",
);

/** Section heading (h2). Responsive. */
export const Heading = createTextComponent(
  "h2",
  "font-display text-text-primary text-h3 md:text-h2",
);

/** Sub-section heading (h3). Responsive. */
export const Subheading = createTextComponent(
  "h3",
  "text-text-primary text-h4 md:text-h3",
);

/** Default body copy. */
export const Body = createTextComponent("p", "text-body text-text-secondary");

/** Small supporting / muted text. */
export const Caption = createTextComponent(
  "span",
  "text-caption text-text-muted",
);

/** Uppercase eyebrow label. */
export const Label = createTextComponent(
  "span",
  "text-label text-text-secondary",
);

/** Accent gradient inline text. */
export const GradientText = createTextComponent("span", "gradient-text");

/** Inline monospace code. */
export const CodeText = createTextComponent(
  "code",
  "text-code rounded-sm bg-elevated-surface px-1.5 py-0.5 text-text-primary",
);
