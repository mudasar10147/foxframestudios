/**
 * Design token constants — TypeScript mirror of CSS custom properties.
 * Use for programmatic access (metadata, Motion, canvas, etc.).
 * Visual styling must always reference CSS variables / Tailwind tokens.
 */

export const colors = {
  background: {
    primary: "#08080c",
    secondary: "#0d0d14",
    surface: "#111118",
    elevatedSurface: "#18181f",
    glassSurface: "rgb(255 255 255 / 4%)",
  },
  text: {
    primary: "#ffffff",
    secondary: "#a1a1aa",
    muted: "#71717a",
    disabled: "#52525b",
  },
  accent: {
    primary: "#a855f7",
    secondary: "#8b5cf6",
    glowPurple: "rgb(168 85 247 / 50%)",
    glowBlue: "rgb(99 102 241 / 40%)",
  },
  border: {
    default: "rgb(255 255 255 / 8%)",
    strong: "rgb(255 255 255 / 15%)",
    glow: "rgb(168 85 247 / 40%)",
    glass: "rgb(255 255 255 / 12%)",
  },
  status: {
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
} as const;

export const typography = {
  fontFamily: {
    sans: "var(--font-family-sans)",
    display: "var(--font-family-display)",
    mono: "var(--font-family-mono)",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  scale: {
    heroXl: "4.5rem",
    heroLg: "3.75rem",
    h1: "3rem",
    h2: "2.25rem",
    h3: "1.875rem",
    h4: "1.5rem",
    bodyLg: "1.125rem",
    body: "1rem",
    bodySm: "0.875rem",
    caption: "0.75rem",
    button: "0.875rem",
    label: "0.75rem",
    code: "0.875rem",
  },
} as const;

export const spacing = {
  0: "0rem",
  0.5: "0.125rem",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
} as const;

export const radius = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

export const shadows = {
  soft: "var(--shadow-soft)",
  medium: "var(--shadow-medium)",
  large: "var(--shadow-large)",
  glow: "var(--shadow-glow)",
  purpleGlow: "var(--shadow-purple-glow)",
  blueGlow: "var(--shadow-blue-glow)",
  card: "var(--shadow-card)",
  floating: "var(--shadow-floating)",
} as const;

export const blur = {
  glass: "12px",
  nav: "16px",
  card: "8px",
  background: "24px",
} as const;

export const motion = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    verySlow: "800ms",
  },
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
    hover: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  },
  transition: {
    button: "var(--transition-button)",
    card: "var(--transition-card)",
    navbar: "var(--transition-navbar)",
    image: "var(--transition-image)",
    icon: "var(--transition-icon)",
    section: "var(--transition-section)",
  },
} as const;

export const breakpoints = {
  mobile: 0,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  ultraWide: 1536,
} as const;

export const breakpointsPx = {
  tablet: "48rem",
  laptop: "64rem",
  desktop: "80rem",
  ultraWide: "96rem",
} as const;

export const zIndex = {
  background: 0,
  content: 10,
  cards: 20,
  navbar: 50,
  overlay: 90,
  modal: 100,
  tooltip: 110,
} as const;

export const containers = {
  container: "80rem",
  section: "75rem",
  content: "60rem",
  reading: "65ch",
} as const;

export const designTokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  blur,
  motion,
  breakpoints,
  breakpointsPx,
  zIndex,
  containers,
} as const;

export type DesignTokens = typeof designTokens;
