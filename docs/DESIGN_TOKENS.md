# FoxFrame Studio — Design Tokens

Complete reference for the project design system. All visual values live in CSS custom properties and Tailwind theme tokens. **Never hardcode colors, spacing, radii, shadows, or typography in components.**

---

## Architecture

```
src/styles/
├── globals.css              # Entry point — imports all layers
├── tokens/                  # Raw CSS custom properties (:root)
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   ├── radius.css
│   ├── shadows.css
│   ├── blur.css
│   ├── motion.css
│   ├── z-index.css
│   ├── containers.css
│   └── breakpoints.css
├── theme/
│   └── tailwind-theme.css   # Tailwind v4 @theme mapping
├── utilities/               # Reusable @utility classes
│   ├── layout.css
│   ├── typography.css
│   ├── effects.css
│   └── accessibility.css
└── effects/
    └── global-effects.css   # Pseudo-element effects

src/constants/
└── design-tokens.ts         # TypeScript mirror for programmatic use
```

---

## Usage Rules

1. **CSS / Tailwind first** — use utility classes or `var(--token-name)` in styles.
2. **TypeScript tokens** — use `design-tokens.ts` only for metadata, Motion, canvas, or runtime logic.
3. **No magic values** — if a value is missing, add it to the token layer first.
4. **Dark theme only** — all tokens are designed for dark mode.

---

## Colors

### Background

| Token | CSS Variable | Tailwind Class |
|-------|--------------|----------------|
| Background Primary | `--background-primary` | `bg-background-primary` |
| Background Secondary | `--background-secondary` | `bg-background-secondary` |
| Surface | `--surface` | `bg-surface` |
| Elevated Surface | `--elevated-surface` | `bg-elevated-surface` |
| Glass Surface | `--glass-surface` | `bg-glass-surface` |

### Text

| Token | CSS Variable | Tailwind Class |
|-------|--------------|----------------|
| Primary | `--text-primary` | `text-text-primary` |
| Secondary | `--text-secondary` | `text-text-secondary` |
| Muted | `--text-muted` | `text-text-muted` |
| Disabled | `--text-disabled` | `text-text-disabled` |

### Accent

| Token | CSS Variable | Tailwind Class |
|-------|--------------|----------------|
| Primary Purple | `--accent-primary` | `text-accent-primary` / `bg-accent-primary` |
| Secondary Violet | `--accent-secondary` | `text-accent-secondary` |
| Glow Purple | `--glow-purple` | `text-glow-purple` |
| Glow Blue | `--glow-blue` | `text-glow-blue` |

### Border

| Token | CSS Variable | Tailwind Class |
|-------|--------------|----------------|
| Default | `--border-default` | `border-border-default` |
| Strong | `--border-strong` | `border-border-strong` |
| Glow | `--border-glow` | `border-border-glow` |
| Glass | `--border-glass` | `border-border-glass` |

### Status

| Token | CSS Variable | Tailwind Class |
|-------|--------------|----------------|
| Success | `--status-success` | `text-status-success` |
| Warning | `--status-warning` | `text-status-warning` |
| Error | `--status-error` | `text-status-error` |
| Info | `--status-info` | `text-status-info` |

---

## Typography

### Font Families

| Role | Variable | Tailwind |
|------|----------|----------|
| Body | `--font-family-sans` | `font-sans` |
| Display / Headings | `--font-family-display` | `font-display` |
| Code | `--font-family-mono` | `font-mono` |

### Type Scale Utilities

| Scale | Utility Class |
|-------|---------------|
| Hero XL | `text-hero-xl` |
| Hero Large | `text-hero-lg` |
| Heading 1 | `text-h1` |
| Heading 2 | `text-h2` |
| Heading 3 | `text-h3` |
| Heading 4 | `text-h4` |
| Body Large | `text-body-lg` |
| Body | `text-body` |
| Body Small | `text-body-sm` |
| Caption | `text-caption` |
| Button | `text-button` |
| Label | `text-label` |
| Code | `text-code` |

### Semantic Typography

| Utility | Purpose |
|---------|---------|
| `section-title` | Section heading style |
| `section-description` | Section subcopy style |
| `text-muted` | Muted body text |
| `text-secondary` | Secondary body text |
| `gradient-text` | Accent gradient headline |

---

## Spacing

| Token | Value | Tailwind |
|-------|-------|----------|
| `--space-0-5` | 2px | `p-0.5`, `gap-0.5` |
| `--space-1` | 4px | `p-1`, `gap-1` |
| `--space-2` | 8px | `p-2`, `gap-2` |
| `--space-3` | 12px | `p-3`, `gap-3` |
| `--space-4` | 16px | `p-4`, `gap-4` |
| `--space-5` | 20px | `p-5`, `gap-5` |
| `--space-6` | 24px | `p-6`, `gap-6` |
| `--space-8` | 32px | `p-8`, `gap-8` |
| `--space-10` | 40px | `p-10`, `gap-10` |
| `--space-12` | 48px | `p-12`, `gap-12` |
| `--space-16` | 64px | `p-16`, `gap-16` |
| `--space-20` | 80px | `p-20`, `gap-20` |
| `--space-24` | 96px | `p-24`, `gap-24` |
| `--space-32` | 128px | `p-32`, `gap-32` |

---

## Border Radius

| Token | Value | Tailwind |
|-------|-------|----------|
| Small | 4px | `rounded-sm` |
| Medium | 8px | `rounded-md` |
| Large | 12px | `rounded-lg` |
| XL | 16px | `rounded-xl` |
| 2XL | 24px | `rounded-2xl` |
| Full | pill | `rounded-full` |

---

## Shadows

| Token | Tailwind Utility |
|-------|------------------|
| `--shadow-soft` | `shadow-soft` |
| `--shadow-medium` | `shadow-medium` |
| `--shadow-large` | `shadow-large` |
| `--shadow-glow` | `shadow-glow` |
| `--shadow-purple-glow` | `shadow-purple-glow` |
| `--shadow-blue-glow` | `shadow-blue-glow` |
| `--shadow-card` | `shadow-card` |
| `--shadow-floating` | `shadow-floating` |

---

## Motion

| Duration Token | Value |
|----------------|-------|
| `--duration-fast` | 150ms |
| `--duration-normal` | 300ms |
| `--duration-slow` | 500ms |
| `--duration-very-slow` | 800ms |

| Easing Token | Curve |
|--------------|-------|
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--ease-luxury` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-hover` | `cubic-bezier(0.25, 0.1, 0.25, 1)` |

---

## Breakpoints

| Name | Min Width |
|------|-----------|
| Mobile | 0 |
| Tablet | 768px (`md:`) |
| Laptop | 1024px (`lg:`) |
| Desktop | 1280px (`xl:`) |
| Ultra Wide | 1536px (`2xl:`) |

---

## Z-Index

| Layer | Utility |
|-------|---------|
| Background | `z-background` |
| Content | `z-content` |
| Cards | `z-cards` |
| Navbar | `z-navbar` |
| Overlay | `z-overlay` |
| Modal | `z-modal` |
| Tooltip | `z-tooltip` |

---

## Container Utilities

| Class | Max Width |
|-------|-----------|
| `container-base` | 1280px |
| `section-container` | 1200px |
| `content-container` | 960px |
| `reading-container` | 65ch |

---

## Effect Utilities

| Class | Effect |
|-------|--------|
| `glass-card` | Glassmorphism surface |
| `glow-border` | Glowing border |
| `soft-glow` | Purple glow shadow |
| `border-glow` | Gradient border |
| `gradient-text` | Accent text gradient |
| `noise-background` | Film grain overlay |
| `grid-background` | Sci-fi grid overlay |
| `glow-background` | Ambient radial glow |
| `particles-background` | Dot particle placeholder |
| `animated-gradient` | Slow shifting gradient |

---

## Button Utilities

| Class | Variant |
|-------|---------|
| `button-primary` | Filled accent CTA shell |
| `button-secondary` | Glass outline CTA shell |

---

## Accessibility

- **Focus**: `:focus-visible` uses `--focus-ring`
- **Selection**: `::selection` uses `--selection-bg`
- **Reduced motion**: honors `prefers-reduced-motion`

---

## TypeScript Access

```typescript
import { colors, motion, breakpoints } from "@/constants/design-tokens";
```
