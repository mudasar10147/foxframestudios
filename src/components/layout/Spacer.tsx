type Size = 2 | 4 | 6 | 8 | 12 | 16 | 20 | 24;
type Axis = "y" | "x";

const tokenMap: Record<Size, string> = {
  2: "var(--space-2)",
  4: "var(--space-4)",
  6: "var(--space-6)",
  8: "var(--space-8)",
  12: "var(--space-12)",
  16: "var(--space-16)",
  20: "var(--space-20)",
  24: "var(--space-24)",
};

type SpacerProps = {
  size?: Size;
  axis?: Axis;
};

export function Spacer({ size = 8, axis = "y" }: SpacerProps) {
  const value = tokenMap[size];
  return (
    <span
      aria-hidden="true"
      style={
        axis === "y"
          ? { display: "block", height: value }
          : { display: "inline-block", width: value }
      }
    />
  );
}
