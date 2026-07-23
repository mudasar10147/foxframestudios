# FoxFrame Studio — Information Architecture & Component Blueprint

**Phase 4 deliverable.** This is the authoritative plan for the entire one-page experience. Every component built in later phases must conform to this document. No implementation code lives here.

> Pairs with [`DESIGN_TOKENS.md`](./DESIGN_TOKENS.md). All values referenced (spacing, color, motion) resolve to tokens defined there — never hardcode.

---

## 1. Page Sitemap

Single-page vertical scroll. Sections in render order:

```
┌─ 0. Background System (fixed, behind everything)
│     glow + grid + noise + particle layer
│
├─ 1. Floating Navigation        [persistent overlay]
├─ 2. Hero                        #hero
├─ 3. Trusted By / Clients        #trusted        (optional)
├─ 4. About Me                    #about
├─ 5. Skills & Technologies       #skills
├─ 6. Experience Timeline         #experience
├─ 7. Featured Projects           #work
├─ 8. Services                    #services
├─ 9. Development Process         #process
├─ 10. Testimonials               #testimonials   (optional)
├─ 11. FAQ                        #faq            (optional)
├─ 12. Contact CTA                #contact
└─ 13. Footer                     #footer
```

**MVP (v1) priority:** Nav, Hero, About, Skills, Experience, Projects, Services, Process, Contact, Footer.
**Deferred (v1.1):** Trusted By, Testimonials, FAQ — scaffold data shapes now, render later.

Navigation anchors map 1:1 to section `id`s for scroll-spy and smooth scroll.

---

## 2. Section Specifications

Each section is defined by: **Purpose · User Goal · Content · CTA · Visual Style · Layout · Animation · Mobile**.

### 1. Floating Navigation
- **Purpose:** Persistent wayfinding and primary conversion access.
- **User Goal:** Jump to any section; reach contact in one click.
- **Content:** Logo, nav links (About, Work, Skills, Contact), primary CTA ("Let's Talk"), mobile menu trigger.
- **CTA:** Primary button → `#contact`.
- **Visual Style:** Glass surface (`glass-card` blur `--blur-nav`), `border-border-glass`, floating pill detached from top edge.
- **Layout:** Centered max-width row; logo left, links center, CTA right.
- **Animation:** Slide-down on load; hide on scroll-down / show on scroll-up; active link glow indicator; magnetic CTA.
- **Mobile:** Collapses to logo + hamburger; full-screen overlay menu with staggered links.

### 2. Hero
- **Purpose:** Deliver the 5-second WOW and core positioning.
- **User Goal:** Instantly understand who this is and the quality bar.
- **Content:** Status badge ("Available for work"), Hero title (name/role), gradient subtitle, one-line description, CTA group, optional scroll cue + stat row.
- **CTA:** Primary ("View Work" → `#work"), Secondary ("Get in Touch" → `#contact`).
- **Visual Style:** Full-viewport, ambient `glow-background` + `grid-background`, gradient headline, cinematic spacing.
- **Layout:** Centered or left-aligned single column; content max `--content-width`.
- **Animation:** Staggered fade/slide-up of badge → title → subtitle → description → CTAs; mouse parallax on background layers; floating particles; blinking status dot.
- **Mobile:** Reduced parallax/particles; title scales to `text-hero-lg`; CTAs stack full-width.

### 3. Trusted By / Clients *(optional)*
- **Purpose:** Social proof through recognizable logos.
- **User Goal:** Validate credibility quickly.
- **Content:** Section label, muted logo strip (4–8 logos).
- **CTA:** None.
- **Visual Style:** Low-contrast monochrome logos, subtle dividers.
- **Layout:** Single responsive row / marquee.
- **Animation:** Fade-in; optional infinite slow marquee (pauses on reduced motion).
- **Mobile:** Horizontal scroll or 2-row wrap.

### 4. About Me
- **Purpose:** Build trust with narrative and personality.
- **User Goal:** Understand experience, values, working style.
- **Content:** Section label + title, narrative paragraphs, avatar/portrait, highlight stats (counters), optional values list.
- **CTA:** Secondary ("Download CV" or "My Process" → `#process`).
- **Visual Style:** Glass portrait frame with glow, generous whitespace.
- **Layout:** Two-column (text + media) on desktop; reading width on copy.
- **Animation:** Slide-up reveal; image reveal mask; number count-up on stats.
- **Mobile:** Single column, media first then text; counters retained.

### 5. Skills & Technologies
- **Purpose:** Demonstrate technical breadth and depth.
- **User Goal:** Confirm stack fit for their needs.
- **Content:** Section header, grouped skill categories (Frontend, Backend, Tools, etc.), skill cards/badges with tech icons.
- **CTA:** None (or "See it in action" → `#work`).
- **Visual Style:** Glass skill cards, hover elevation, tech icon grid.
- **Layout:** Responsive grid of category groups; chips within each.
- **Animation:** Staggered card reveal; hover glow/lift; icon micro-motion.
- **Mobile:** 1–2 column grid; chips wrap.

### 6. Experience Timeline
- **Purpose:** Show career trajectory and seniority.
- **User Goal:** Assess track record over time.
- **Content:** Section header, ordered timeline entries (role, company, dates, summary, tags).
- **CTA:** None.
- **Visual Style:** Vertical connector line with glowing nodes, timeline cards.
- **Layout:** Alternating left/right cards on desktop; single rail on mobile.
- **Animation:** Sequential node + card reveal on scroll; line draw-in; node pulse.
- **Mobile:** Left-aligned single rail; cards stack.

### 7. Featured Projects
- **Purpose:** Prove capability with the strongest work.
- **User Goal:** Evaluate quality and relevance.
- **Content:** Section header, 3–4 project cards (thumbnail, title, role, summary, stack tags, links, optional metric).
- **CTA:** Per-card ("View Case Study" / "Live" / "Code"); section-level ("View All" optional).
- **Visual Style:** Large glass cards, image reveal, hover elevation + border glow.
- **Layout:** Featured grid (alternating large rows or 2-col); generous gaps.
- **Animation:** Staggered card reveal; image zoom/reveal on hover; tag fade.
- **Mobile:** Single column stack; tap states replace hover.

### 8. Services
- **Purpose:** Clarify what can be hired for.
- **User Goal:** Map their need to an offering.
- **Content:** Section header, service cards (icon, title, description, optional bullet list).
- **CTA:** Card or section ("Start a Project" → `#contact`).
- **Visual Style:** Glass cards, accent icon, consistent grid.
- **Layout:** 3-column grid desktop → 1-column mobile.
- **Animation:** Staggered reveal; hover lift + icon glow.
- **Mobile:** Stacked cards.

### 9. Development Process
- **Purpose:** Communicate a confident, structured methodology.
- **User Goal:** Trust how the work gets delivered.
- **Content:** Section header, numbered steps (Discover → Design → Build → Ship), each with title + description.
- **CTA:** None (or → `#contact`).
- **Visual Style:** Numbered nodes, connecting accent line, minimal cards.
- **Layout:** Horizontal steps desktop → vertical mobile.
- **Animation:** Sequential step reveal; connector draw; number count.
- **Mobile:** Vertical stepper.

### 10. Testimonials *(optional)*
- **Purpose:** Third-party validation.
- **User Goal:** Reduce hiring risk via peer proof.
- **Content:** Section header, testimonial cards (quote, author, role, avatar).
- **CTA:** None.
- **Visual Style:** Glass quote cards, subtle quotation accent.
- **Layout:** Carousel or 2–3 col grid.
- **Animation:** Fade/slide; carousel auto-advance (pauses on reduced motion / hover).
- **Mobile:** Single card carousel with swipe.

### 11. FAQ *(optional)*
- **Purpose:** Remove friction by answering common questions.
- **User Goal:** Self-serve answers before contacting.
- **Content:** Section header, accordion items (question/answer).
- **CTA:** "Still have questions?" → `#contact`.
- **Visual Style:** Minimal dividers, glass on expand.
- **Layout:** Single reading-width column.
- **Animation:** Smooth height expand/collapse; chevron rotate.
- **Mobile:** Same; full-width.

### 12. Contact CTA
- **Purpose:** Convert interest into outreach.
- **User Goal:** Send a message effortlessly.
- **Content:** Section header, value line, contact form (name, email, message), direct email + socials, availability note.
- **CTA:** Primary submit ("Send Message"); secondary mailto.
- **Visual Style:** Prominent glass panel, glow accents, focal CTA.
- **Layout:** Centered form (reading width) or 2-col (copy + form).
- **Animation:** Reveal on scroll; input focus glow; button loading/success states.
- **Mobile:** Single column; full-width fields.

### 13. Footer
- **Purpose:** Closure, secondary nav, legal.
- **User Goal:** Find links, socials, return to top.
- **Content:** Logo, mini nav, social icons, copyright, back-to-top.
- **CTA:** Back to top; social links.
- **Visual Style:** Quiet, low-contrast, top divider.
- **Layout:** Multi-column desktop → stacked mobile.
- **Animation:** Subtle fade-in; back-to-top hover glow.
- **Mobile:** Centered stacked.

---

## 3. Component Inventory

Grouped by domain. **R** = reusable primitive, **C** = composed, **S** = section container.

### Layout (R)
| Component | Purpose |
|-----------|---------|
| `Container` | Max-width wrapper, horizontal padding |
| `Section` | Section shell: id, padding, z-index, optional background slot |
| `Grid` | Responsive grid wrapper (col count by breakpoint) |
| `Flex` | Flex row/column helper |
| `Spacer` | Token-based vertical/horizontal spacing |

### Navigation (C)
| Component | Purpose |
|-----------|---------|
| `Navbar` | Floating glass nav container + scroll behavior |
| `NavItem` | Single anchor link with active state |
| `MobileMenu` | Full-screen overlay menu |
| `Logo` | Brand mark, links to top |
| `ScrollProgress` | Top scroll progress bar |
| `BackToTop` | Floating return-to-top button |

### Hero (C)
| Component | Purpose |
|-----------|---------|
| `HeroTitle` | Display headline |
| `HeroSubtitle` | Gradient secondary line |
| `HeroDescription` | Supporting copy |
| `CTAGroup` | Button cluster |
| `StatusBadge` | Availability pill |
| `ScrollCue` | Animated scroll indicator |

### Buttons (R)
| Component | Variants |
|-----------|----------|
| `Button` | `primary`, `secondary`, `ghost` |
| `IconButton` | Icon-only, square/round |
| `MagneticButton` | Wrapper adding magnetic motion (desktop) |

### Cards (C)
| Component | Purpose |
|-----------|---------|
| `Card` | Base glass card primitive |
| `ProjectCard` | Featured project |
| `ServiceCard` | Service offering |
| `SkillCard` | Skill/tech group |
| `TimelineCard` | Experience entry |
| `TestimonialCard` | Quote |
| `StatCard` | Counter statistic |
| `ContactCard` | Direct contact info block |
| `FaqItem` | Accordion row |

### Typography (R)
| Component | Purpose |
|-----------|---------|
| `SectionLabel` | Eyebrow label (`text-label`) |
| `SectionTitle` | Heading (`section-title`) |
| `SectionDescription` | Subcopy (`section-description`) |
| `GradientText` | Accent gradient inline |
| `CodeText` | Mono inline/code |
| `SectionHeader` | Composed label+title+description |

### Media (R/C)
| Component | Purpose |
|-----------|---------|
| `Avatar` | Portrait with glow frame |
| `Image` | `next/image` wrapper + reveal |
| `Video` | Lazy muted loop wrapper |
| `TechIcon` | Technology logo/icon |
| `ImageReveal` | Mask reveal wrapper |

### Badges (R)
| Component | Purpose |
|-----------|---------|
| `Badge` | Base pill |
| `SkillBadge` | Tech tag |
| `StatusBadge` | Availability/status |
| `CategoryBadge` | Project/service category |

### Social (R/C)
| Component | Purpose |
|-----------|---------|
| `SocialIcon` | Single icon link |
| `SocialLinks` | Icon row |
| `FooterLinks` | Footer nav column |

### Forms (R)
| Component | Purpose |
|-----------|---------|
| `Input` | Text field + label + error |
| `Textarea` | Multiline field |
| `FormField` | Label/control/error wrapper |
| `ContactForm` | Composed RHF + Zod form |
| `FormStatus` | aria-live success/error |

### Background & Effects (R)
| Component | Purpose |
|-----------|---------|
| `BackgroundLayer` | Fixed root background orchestrator |
| `GlowBackground` | Ambient radial glow |
| `GridBackground` | Sci-fi grid |
| `ParticleLayer` | Floating particles (placeholder→real) |
| `NoiseLayer` | Film grain |
| `Divider` | Token-based separator |
| `Reveal` | Scroll-triggered entrance wrapper |
| `Marquee` | Infinite logo/track scroller |

### Sections (S)
`Navbar`, `HeroSection`, `TrustedSection`, `AboutSection`, `SkillsSection`, `ExperienceSection`, `ProjectsSection`, `ServicesSection`, `ProcessSection`, `TestimonialsSection`, `FaqSection`, `ContactSection`, `Footer`.

---

## 4. Component Responsibilities

Defined as: **Purpose · Props · States · Variants · Responsive · A11y · Animation**. Representative specs below; all components follow the same contract.

### `Button`
- **Purpose:** Primary interaction primitive.
- **Props:** `variant` (`primary|secondary|ghost`), `size` (`sm|md|lg`), `as` (button/link), `href`, `icon`, `iconPosition`, `loading`, `disabled`, `fullWidth`, `onClick`, `children`.
- **States:** default, hover, focus-visible, active, loading, disabled.
- **Variants:** filled accent / glass outline / transparent ghost.
- **Responsive:** `fullWidth` stacks on mobile; size scales by breakpoint.
- **A11y:** real `<button>`/`<a>`; focus ring token; `aria-busy` when loading; min 44px touch target; `aria-label` for icon-only.
- **Animation:** `transition-button`; hover glow/lift; magnetic optional.

### `Section`
- **Purpose:** Consistent section wrapper.
- **Props:** `id`, `as`, `padded`, `background` slot, `containerWidth` (`container|section|content`), `children`.
- **States:** in-view / out-of-view (for reveal context).
- **Variants:** standard / full-bleed / centered.
- **Responsive:** responsive padding via `--section-padding-*` tokens.
- **A11y:** semantic `<section>` with `aria-labelledby` referencing its title.
- **Animation:** provides `Reveal` context; no motion itself.

### `ProjectCard`
- **Purpose:** Showcase a single project.
- **Props:** `project` (data object), `featured`, `index`, `priority` (image).
- **States:** default, hover, focus-within, loading image.
- **Variants:** large featured / compact grid.
- **Responsive:** image aspect locked; stacks content on mobile.
- **A11y:** card is a link or has a clear primary link; alt text; keyboard focusable; tags as list.
- **Animation:** `transition-card`; image reveal/zoom; staggered entrance via `index`.

### `Navbar`
- **Purpose:** Floating nav + scroll behavior.
- **Props:** `items`, `cta`.
- **States:** top (transparent-ish), scrolled (glass), hidden (scroll down), visible (scroll up), mobile-open.
- **Variants:** desktop row / mobile collapsed.
- **Responsive:** breakpoint switch to hamburger below `lg`.
- **A11y:** `<nav aria-label>`, `aria-current` on active link, focus trap in mobile overlay, ESC closes, body scroll lock.
- **Animation:** `transition-navbar`; hide/show transform; active glow.

### `ContactForm`
- **Purpose:** Lead capture.
- **Props:** `onSubmitSuccess`, `defaultValues`.
- **States:** idle, validating, submitting, success, error (field + form).
- **Variants:** stacked / two-column.
- **Responsive:** full-width fields on mobile.
- **A11y:** labels bound to inputs, `aria-invalid`, `aria-describedby` for errors, `aria-live` status region.
- **Animation:** focus glow; submit loading; success transition.

### `Reveal` (animation primitive)
- **Purpose:** Standardize scroll entrance.
- **Props:** `variant` (`fade|slide-up|stagger`), `delay`, `duration`, `once`, `as`, `children`.
- **States:** hidden → visible (on intersection).
- **A11y:** disabled under `prefers-reduced-motion` (renders final state instantly).
- **Animation:** uses `--duration-*` / `--ease-luxury`.

### `SectionHeader`
- **Props:** `label`, `title`, `description`, `align`, `as` (heading level).
- **A11y:** correct heading hierarchy (`h2` per section).

> Cards (`Service/Skill/Timeline/Testimonial/Stat/Contact`), badges, typography, media, and social components all follow the same contract: typed data props, hover/focus states, glass variants, token-driven motion, and accessible semantics.

---

## 5. Layout System

| Concern | Rule |
|---------|------|
| Container width | `--container-width` (1280px) via `container-base` |
| Section content width | `--section-width` (1200px) |
| Reading/copy width | `--reading-width` (65ch) |
| Section padding Y | `--section-padding-y` (80 → 96 → 128px responsive) |
| Section padding X | `--section-padding-x` (24 → 32 → 48px) |
| Section gap | `--section-gap` |
| Grid system | 12-col mental model; implement via `Grid` with responsive col counts (1 / 2 / 3 / 4) |
| Card layout | Equal-height glass cards, consistent internal padding (`--space-6`), gap `--space-6`/`--space-8` |

**Responsive column rules**
- Mobile (`<768`): 1 column everywhere.
- Tablet (`md`): 2 columns for cards/skills.
- Laptop (`lg`): 2–3 columns.
- Desktop (`xl`): 3–4 columns max; never exceed 4.

---

## 6. Spacing Rules

| Relationship | Token |
|--------------|-------|
| Between sections | `--section-padding-y` (handled per section, no double margins) |
| Section header → content | `--space-12` |
| Label → title | `--space-2` |
| Title → description | `--space-4` |
| Paragraph → paragraph | `--space-4` |
| Between cards | `--space-6` (tight) / `--space-8` (roomy) |
| Card padding | `--space-6` |
| Button → button (group) | `--space-4` |
| Text → CTA | `--space-8` |
| Image → caption | `--space-3` |

Rule: spacing flows in one direction (prefer `gap` / top-margin via stacks) to avoid margin collapse ambiguity.

---

## 7. Animation Blueprint

Per-section motion map. All durations/easings from motion tokens. Every entrance is **once**, disabled under reduced motion.

| Section | Entrance | Hover | Scroll | Background | Parallax | Counter | Mouse | Trigger | Duration | Delay |
|---------|----------|-------|--------|------------|----------|---------|-------|---------|----------|-------|
| Navbar | Slide-down | Link glow / magnetic CTA | Hide/show | — | — | — | Magnetic CTA | Load + scroll dir | `slow` | 0 |
| Hero | Stagger fade/slide-up | CTA glow | Subtle fade-out on scroll | Glow+grid drift | Yes (layers) | Stat row | Background parallax | Load | `very-slow` | 80ms step |
| Trusted | Fade-in | Logo opacity | — | — | — | — | — | In-view | `slow` | 60ms |
| About | Slide-up + image reveal | — | — | Soft glow | Light on portrait | Stats | — | In-view | `slow` | 100ms |
| Skills | Stagger cards | Lift + glow + icon motion | — | — | — | — | — | In-view | `normal` | 60ms |
| Experience | Sequential nodes + line draw | Node pulse | Line progress | — | — | — | — | In-view | `slow` | 120ms |
| Projects | Stagger cards | Image zoom + border glow + lift | — | — | Optional tilt | Metric | Card tilt (desktop) | In-view | `slow` | 100ms |
| Services | Stagger cards | Lift + icon glow | — | — | — | — | — | In-view | `normal` | 80ms |
| Process | Sequential steps + connector | Step highlight | Connector draw | — | — | Step number | — | In-view | `slow` | 120ms |
| Testimonials | Fade/slide | Pause autoplay | — | — | — | — | Swipe/drag | In-view | `slow` | 80ms |
| FAQ | Fade-in | Row highlight | — | — | — | — | Expand/collapse | In-view | `normal` | 50ms |
| Contact | Slide-up | Input focus glow / button states | — | Glow accent | — | — | — | In-view | `slow` | 100ms |
| Footer | Fade-in | Social/back-to-top glow | — | — | — | — | — | In-view | `normal` | 0 |

**Exit animations:** intentionally minimal — only Hero gets a subtle scroll-driven fade. Other sections persist once revealed (no re-trigger on scroll up).

---

## 8. Scroll Experience

| Behavior | Plan |
|----------|------|
| Hero entrance | On-load staggered reveal (no scroll required) |
| Section reveal | Intersection Observer (~15–25% threshold), reveal once |
| Navigation behavior | Hide on scroll-down, show on scroll-up; glass intensifies after hero |
| Active section indicator | Scroll-spy syncs active `NavItem` with in-view section (`aria-current`) |
| Smooth scrolling | CSS `scroll-behavior: smooth` (already set) + JS offset for floating nav; respects reduced motion |
| Scroll progress | `ScrollProgress` bar at top, accent gradient |
| Back to top | `BackToTop` appears after Hero out of view; smooth scroll to top |

All scroll motion degrades to instant under `prefers-reduced-motion`.

---

## 9. Content Hierarchy

Per section the hierarchy is consistent:

| Level | Element | Token/Utility |
|-------|---------|---------------|
| Eyebrow | Section label | `SectionLabel` / `text-label` + accent |
| Primary heading | Section title (`h2`) | `SectionTitle` / `text-h2` |
| Secondary heading | Card/subgroup titles (`h3`) | `text-h3`/`text-h4` |
| Supporting text | Descriptions, body | `text-body-lg` / `text-body` + secondary color |
| CTA | Buttons/links | `Button` variants |
| Supporting visuals | Images, icons, backgrounds | media + effect components |

Global: exactly one `h1` (Hero). Each section uses one `h2`. Headings never skip levels.

---

## 10. Data Model

All section content is data-driven from typed sources in `src/constants/` (and `src/types/`), enabling future CMS swap. Structure favors arrays of typed objects.

```ts
// types (illustrative shapes — defined in src/types)

type NavItem = { label: string; href: string };

type SocialLink = {
  platform: "github" | "linkedin" | "x" | "email" | string;
  url: string;
  label: string;
};

type Stat = { label: string; value: number; suffix?: string };

type Skill = { name: string; icon: string };
type SkillGroup = { category: string; skills: Skill[] };

type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  start: string; // ISO
  end: string | null; // null = present
  summary: string;
  tags: string[];
};

type Project = {
  id: string;
  slug: string;
  title: string;
  role: string;
  summary: string;
  description?: string;
  cover: string;
  gallery?: string[];
  stack: string[];
  category: string;
  metric?: { label: string; value: string };
  links: { live?: string; repo?: string; caseStudy?: string };
  featured: boolean;
  year: number;
};

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  points?: string[];
};

type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
};

type FaqItem = { id: string; question: string; answer: string };

type Client = { name: string; logo: string; url?: string };
```

| Section | Static (v1) | Dynamic | CMS-ready |
|---------|-------------|---------|-----------|
| Nav | `navItems` constant | active section (runtime) | n/a |
| Hero | name/role/desc/badge | stat counters | yes |
| Trusted | `clients[]` | — | yes |
| About | bio, values | `stats[]` count-up | yes |
| Skills | `skillGroups[]` | — | yes |
| Experience | `experience[]` | computed durations | yes |
| Projects | `projects[]` | filter/sort (future) | yes (per-project pages later) |
| Services | `services[]` | — | yes |
| Process | `processSteps[]` | — | yes |
| Testimonials | `testimonials[]` | carousel index | yes |
| FAQ | `faqs[]` | open state | yes |
| Contact | labels, socials | form values, submit status | partial |
| Footer | links, socials, year | year (runtime) | yes |

**CMS path:** constants export the same shape a CMS/`generateStaticParams` would return, so the swap is data-source only — no component changes.

---

## 11. Folder Architecture

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # composes <Section> components only
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── api/
│       └── contact/route.ts     # Resend handler (Phase: contact)
│
├── components/
│   ├── layout/                  # Container, Section, Grid, Flex, Spacer
│   ├── navigation/              # Navbar, NavItem, MobileMenu, Logo,
│   │                            #   ScrollProgress, BackToTop
│   ├── buttons/                 # Button, IconButton, MagneticButton
│   ├── cards/                   # Card, ProjectCard, ServiceCard, SkillCard,
│   │                            #   TimelineCard, TestimonialCard, StatCard,
│   │                            #   ContactCard, FaqItem
│   ├── typography/              # SectionLabel, SectionTitle,
│   │                            #   SectionDescription, GradientText,
│   │                            #   CodeText, SectionHeader
│   ├── media/                   # Avatar, Image, Video, TechIcon, ImageReveal
│   ├── badges/                  # Badge, SkillBadge, StatusBadge, CategoryBadge
│   ├── social/                  # SocialIcon, SocialLinks, FooterLinks
│   ├── forms/                   # Input, Textarea, FormField, ContactForm,
│   │                            #   FormStatus
│   ├── background/              # BackgroundLayer, GlowBackground,
│   │                            #   GridBackground, ParticleLayer, NoiseLayer
│   ├── effects/                 # Reveal, Marquee, Divider, Counter
│   ├── sections/               # *Section.tsx composition per page section
│   └── ui/                      # shadcn primitives (generated)
│
├── constants/                   # navItems, projects, skills, services, etc.
├── hooks/                       # useScrollDirection, useActiveSection,
│                                #   useReducedMotion, useMediaQuery,
│                                #   useMagnetic, useCountUp
├── lib/                         # utils, fonts, resend, validations/
├── providers/                   # theme-provider (+ future motion provider)
├── styles/                      # tokens, theme, utilities, effects
└── types/                       # shared TS types (data model)
```

**Placement rules**
- Primitives (`layout`, `buttons`, `typography`, `badges`, `media`, `forms`, `effects`) know nothing about page content.
- `cards` consume typed data props, no data imports.
- `sections` import data from `constants`, compose primitives + cards, own layout.
- `page.tsx` only orders sections + mounts `BackgroundLayer` and `Navbar`.

---

## 12. Development Order

Recommended build sequence (each step shippable & verifiable):

1. **Hooks & primitives foundation** — `useReducedMotion`, `useMediaQuery`, `useScrollDirection`, `useActiveSection`; `Reveal`, `Counter`.
2. **Layout primitives** — `Container`, `Section`, `Grid`, `Flex`, `Spacer`.
3. **Typography components** — `SectionLabel/Title/Description`, `GradientText`, `SectionHeader`.
4. **Buttons & badges** — `Button`, `IconButton`, `MagneticButton`, `Badge` family.
5. **Background system** — `BackgroundLayer` + glow/grid/noise/particles.
6. **Navigation** — `Navbar`, `NavItem`, `MobileMenu`, `Logo`, `ScrollProgress`, `BackToTop`.
7. **Media & cards** — `Avatar`, `Image`, `TechIcon`, then `Card` + all card variants.
8. **Forms** — `Input`, `Textarea`, `FormField`, `ContactForm`, `FormStatus` + Resend route.
9. **Data layer** — populate `constants/` + finalize `types/`.
10. **Sections (in page order)** — Hero → About → Skills → Experience → Projects → Services → Process → Contact → Footer (optional sections last).
11. **Page assembly** — compose in `page.tsx`, wire scroll-spy + smooth scroll.
12. **Polish & QA** — animation tuning, responsive passes, a11y audit, Lighthouse.

> Build primitives before sections. No section should be started until its dependent cards/primitives exist.

---

## Conformance Checklist (for every future component)

- [ ] Uses design tokens only (no hardcoded values)
- [ ] Typed props; data via props, not internal imports (except sections)
- [ ] Defined hover + focus-visible states
- [ ] Reduced-motion safe
- [ ] Semantic, accessible markup (roles, labels, heading order)
- [ ] Responsive per breakpoint rules
- [ ] Lives in the correct folder per §11
```
