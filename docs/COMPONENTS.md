# FoxFrame Studio — Component Library

Production-ready, token-driven, accessible UI primitives. All components consume the design system ([`DESIGN_TOKENS.md`](./DESIGN_TOKENS.md)) — no hardcoded colors, spacing, radii, shadows, or typography.

> No portfolio sections live here. Sections compose these primitives in a later phase.

---

## Folder Tree

```
src/components/
├── layout/        Container, Section, SectionHeader, Grid, Flex, Stack, Divider, Spacer, PageWrapper, MainLayout
├── typography/    Display, HeroTitle, Heading, Subheading, Body, Caption, Label, GradientText, CodeText
├── buttons/       Button, IconButton
├── badges/        Badge, SkillBadge, TechBadge, StatusBadge, AnimatedBadge
├── cards/         Card, ProjectCard, ServiceCard, TimelineCard, StatCard, FeatureCard
├── forms/         Label, Input, Textarea, Select, Checkbox, ValidationMessage, FormField
├── navigation/    Navbar, Logo, NavLink, MenuButton, CTAButton, NavIndicator, MobileMenu
├── social/        SocialIcon, SocialLinks
├── icons/         brand-icons (GitHub, LinkedIn, X), getSocialIcon registry
├── effects/       GlowLayer, GridBackground, NoiseLayer, GradientLayer, ParticleLayer, SectionBackground, AnimatedDivider
├── ui/            Spinner, Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, EmptyState
└── shared/        Reveal, Stagger, StaggerItem, VisuallyHidden
```

Each folder exposes a barrel `index.ts`. Import via `@/components/<folder>`.

Animation primitives + tokens live in `src/lib/motion.ts`.

---

## Export Structure

```ts
import { Container, Section, Grid, Flex, Stack } from "@/components/layout";
import { Heading, Body, GradientText } from "@/components/typography";
import { Button, IconButton } from "@/components/buttons";
import { Badge, StatusBadge, SkillBadge } from "@/components/badges";
import { Card, ProjectCard, ServiceCard } from "@/components/cards";
import { Input, Textarea, FormField } from "@/components/forms";
import { Navbar, NavLink, CTAButton } from "@/components/navigation";
import { SocialLinks } from "@/components/social";
import { SectionBackground, GlowLayer } from "@/components/effects";
import { Spinner, SkeletonCard, EmptyState } from "@/components/ui";
import { Reveal, Stagger } from "@/components/shared";
```

---

## Animation System

- Durations/easings mirror tokens: `fast 150ms`, `normal 300ms`, `slow 500ms`; easings `standard`, `luxury`, `hover`.
- **Hover/focus** states use CSS transitions (`transition-button`, `transition-card`) — zero JS.
- **Entrance/scroll** uses Motion via `Reveal` / `Stagger` (client) with `whileInView`, reveal-once.
- **All motion respects `prefers-reduced-motion`** — animated components render final state instantly.

```tsx
<Reveal variant="up" delay={0.1}>
  <Heading>Premium by default</Heading>
</Reveal>

<Stagger>
  <StaggerItem><Card>…</Card></StaggerItem>
  <StaggerItem><Card>…</Card></StaggerItem>
</Stagger>
```

---

## Usage Examples

### Buttons
```tsx
<Button variant="primary" size="md">Get Started</Button>
<Button variant="secondary" leftIcon={<ArrowRight size={16} />}>Learn more</Button>
<Button variant="ghost" loading>Saving</Button>
<Button href="#contact" variant="outline">Contact</Button>
<IconButton aria-label="Menu" icon={<Menu size={20} />} variant="ghost" />
```

### Typography
```tsx
<Display>FoxFrame Studio</Display>
<Heading>Selected Work</Heading>
<Body>Supporting copy in secondary color.</Body>
<GradientText as="span">premium</GradientText>
<CodeText>pnpm dev</CodeText>
```

### Badges
```tsx
<Badge variant="accent">Featured</Badge>
<SkillBadge label="TypeScript" />
<TechBadge label="Next.js" />
<StatusBadge tone="available" label="Available for work" />
<AnimatedBadge variant="accent">New</AnimatedBadge>
```

### Cards
```tsx
<Card variant="glass" hoverable glow>…</Card>
<ProjectCard project={project} />
<ServiceCard title="Web Apps" description="…" icon={<Code />} />
<TimelineCard role="Lead Engineer" company="Acme" period="2023 — Now" summary="…" tags={["React"]} />
<StatCard value="40+" label="Projects" />
<FeatureCard title="Performance" description="…" eyebrow="Why me" />
```

### Forms
```tsx
<FormField htmlFor="email" label="Email" required error={errors.email?.message}>
  <Input id="email" type="email" aria-invalid={!!errors.email} {...register("email")} />
</FormField>
<Textarea id="message" rows={5} />
<Select id="topic"><option>General</option></Select>
<Checkbox id="terms" label="I agree" />
```

### Effects
```tsx
<div className="relative">
  <SectionBackground glow grid />
  {/* content */}
</div>
<AnimatedDivider />
```

### Loading & Empty
```tsx
<Spinner size="md" />
<SkeletonCard />
<EmptyState icon={<Inbox />} title="Nothing here" description="No items yet." action={<Button>Add</Button>} />
```

---

## Component Inventory

| Component | Purpose | Variants | States | Dependencies |
|-----------|---------|----------|--------|--------------|
| **Container** | Max-width centering | wide / section / content / reading | — | cn |
| **Section** | Semantic section shell | — | — | cn |
| **SectionHeader** | Label + title + description | align: left/center | — | cn |
| **Grid** | Responsive grid | cols 1–4, gap 4/6/8/12 | — | cn |
| **Flex** | Flex row helper | gap/align/justify/wrap | — | cn |
| **Stack** | Flex column helper | gap/align/justify | — | cn |
| **Divider** | Separator line | horizontal/vertical | — | cn |
| **Spacer** | Token spacing gap | size, axis | — | tokens |
| **PageWrapper** | Page shell | — | — | cn |
| **MainLayout** | Navbar + main + Footer | — | — | navigation, sections |
| **Display/HeroTitle/Heading/Subheading** | Responsive headings | polymorphic `as` | — | cn |
| **Body/Caption/Label** | Text styles | polymorphic `as` | — | cn |
| **GradientText** | Accent gradient text | `as` | — | cn |
| **CodeText** | Inline code | `as` | — | cn |
| **Button** | Primary action | primary/secondary/ghost/outline · sm/md/lg · fullWidth | hover, focus, active, loading, disabled | cva, Spinner, Link |
| **IconButton** | Icon-only action | same variants · sm/md/lg | hover, focus, disabled | cva, Link |
| **Badge** | Status/label pill | default/accent/outline/success/warning/error/info · sm/md | — | cva |
| **SkillBadge / TechBadge** | Skill / tech tag | (Badge presets) | — | Badge |
| **StatusBadge** | Availability pill w/ dot | available/busy/offline · pulse | animated dot | Badge |
| **AnimatedBadge** | Motion badge | Badge variants | in-view, hover scale | Motion, Badge |
| **Card** | Base surface | surface/glass/elevated · hoverable · glow · padded | hover lift/glow | cva |
| **ProjectCard** | Project showcase | — | hover lift+glow | Card, Badge, TechBadge |
| **ServiceCard** | Service offering | — | hover lift+glow | Card |
| **TimelineCard** | Experience entry | — | hover lift | Card, Badge |
| **StatCard** | Metric stat | — | hover lift | Card |
| **FeatureCard** | Feature highlight | glass | hover lift+glow | Card |
| **Label** | Form label | required | — | cn |
| **Input / Textarea / Select** | Form controls | — | focus glow, invalid, disabled | forwardRef, cn |
| **Checkbox** | Boolean control | — | focus, checked, disabled | forwardRef, cn |
| **ValidationMessage** | Field error | — | role=alert | cn |
| **FormField** | Label+control+error wrapper | — | — | Label, ValidationMessage |
| **Navbar** | Floating nav | — | mobile open | Container, NavLink, MenuButton, CTAButton, MobileMenu |
| **Logo** | Brand mark | — | — | Link |
| **NavLink** | Nav anchor | active | hover, active | Link, cn |
| **MenuButton** | Hamburger toggle | — | open/closed | lucide |
| **CTAButton** | Nav CTA preset | size, fullWidth | (Button states) | Button |
| **NavIndicator** | Active underline | layoutId | animated | Motion |
| **MobileMenu** | Mobile nav panel | — | open/closed | Container, NavLink, CTAButton |
| **SocialIcon** | Single social link | size sm/md/lg | hover | IconButton, icons |
| **SocialLinks** | Social icon row | size | — | SocialIcon |
| **GlowLayer/GridBackground/NoiseLayer/GradientLayer/ParticleLayer** | Background layers | — | — | effect utilities |
| **SectionBackground** | Composed background | glow/grid/noise/gradient toggles | — | layers |
| **AnimatedDivider** | Scroll-draw divider | — | in-view animate | Motion |
| **Spinner** | Loading indicator | sm/md/lg | role=status | lucide |
| **Skeleton / Text / Avatar / Card** | Loading placeholders | lines, size | pulse | cn |
| **EmptyState** | Empty placeholder | — | — | cn |
| **Reveal** | Scroll entrance wrapper | fade/up/down/left/right/scale | reduced-motion safe | Motion |
| **Stagger / StaggerItem** | Staggered entrance | variant | reduced-motion safe | Motion |
| **VisuallyHidden** | SR-only content | `as` | — | — |

---

## Accessibility Contract

- **Keyboard:** all interactive elements are real `<button>`/`<a>`/inputs; focus order natural.
- **Focus:** global `:focus-visible` ring (accent) + per-control focus glow; never removed.
- **ARIA:** `IconButton`/`SocialIcon` require `aria-label`; `Spinner` is `role="status"`; `ValidationMessage` is `role="alert"`; `MenuButton` exposes `aria-expanded`/`aria-controls`.
- **Reduced motion:** every Motion component short-circuits to final state under `prefers-reduced-motion`.
- **Decorative layers** are `aria-hidden`.

---

## Conventions

- Variants via `class-variance-authority`; class merging via `cn` (clsx + tailwind-merge).
- Polymorphism via `as` prop (typography/layout); link/button polymorphism via `href` presence.
- Client components (`"use client"`) only where interactivity/Motion requires it: `Navbar`, `NavIndicator`, `AnimatedBadge`, `AnimatedDivider`, `Reveal`, `Stagger`. Everything else is a Server Component.
