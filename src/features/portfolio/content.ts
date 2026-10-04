import type { PortfolioCategory, ProjectImage } from "./types";

/**
 * STAND-IN ART. The repo has no portfolio screenshots yet, so every project borrows
 * one of the hero or device renders. Each is a cut-out on transparency, hence
 * `fit: "contain"`.
 *
 * TODO: replace each project's `image` with its real key art (e.g. in
 * `public/work/`) and drop the `fit` so it fills the card. Until then, several
 * projects share the same picture.
 */
const ART = {
  character: {
    src: "/hero/character-hud.webp",
    alt: "An armoured character in front of a holographic interface",
    fit: "contain",
  },
  outpost: {
    src: "/hero/command-outpost.webp",
    alt: "A modular sci-fi command outpost lit in cyan",
    fit: "contain",
  },
  scripting: {
    src: "/hero/gameplay-scripting.webp",
    alt: "A laptop running a gameplay script in a game engine editor",
    fit: "contain",
  },
  portal: {
    src: "/hero/portal-vfx.webp",
    alt: "A glowing ring of energy, open at its centre",
    fit: "contain",
  },
  desktop: {
    src: "/hero/devices/desktop.webp",
    alt: "A game studio landing page on a desktop monitor",
    fit: "contain",
  },
  tablet: {
    src: "/hero/devices/tablet.webp",
    alt: "A game studio landing page on a tablet",
    fit: "contain",
  },
} satisfies Record<string, ProjectImage>;

/** Every "View project" link, until each project has a page of its own. */
const WORK_HREF = "/work";

/**
 * The portfolio's tabs, in order, and the projects in each. The first project in a
 * category is the one its carousel opens on.
 */
export const PORTFOLIO_CATEGORIES: readonly PortfolioCategory[] = [
  {
    id: "gameplay",
    label: "Gameplay",
    icon: "gamepad",
    projects: [
      {
        id: "kingdom-defenders",
        title: "Kingdom Defenders",
        tagline: ["Build", "Defend", "Survive"],
        tags: ["Strategy", "Waves", "Co-op"],
        image: ART.outpost,
        href: WORK_HREF,
        featured: true,
      },
      {
        id: "city-racers",
        title: "City Racers",
        tagline: ["Race", "Drift", "Win"],
        tags: ["Vehicles", "Maps", "Multiplayer"],
        image: ART.portal,
        href: WORK_HREF,
      },
      {
        id: "portal-rush",
        title: "Portal Rush",
        tagline: ["Jump", "Dodge", "Escape"],
        tags: ["Platformer", "Physics", "Levels"],
        image: ART.character,
        href: WORK_HREF,
      },
      {
        id: "adventure-world",
        title: "Adventure World",
        tagline: ["Explore", "Quest", "Discover"],
        tags: ["Exploration", "Quests", "Systems"],
        image: ART.scripting,
        href: WORK_HREF,
      },
    ],
  },
  {
    id: "ui-ux",
    label: "UI/UX",
    icon: "monitor",
    projects: [
      {
        id: "neon-hud-kit",
        title: "Neon HUD Kit",
        tagline: ["Clear", "Fast", "Readable"],
        tags: ["HUD", "Menus", "Icons"],
        image: ART.character,
        href: WORK_HREF,
        featured: true,
      },
      {
        id: "studio-launcher",
        title: "Studio Launcher",
        tagline: ["Launch", "Browse", "Play"],
        tags: ["Responsive", "Web", "Launcher"],
        image: ART.desktop,
        href: WORK_HREF,
      },
      {
        id: "companion-app",
        title: "Companion App",
        tagline: ["Track", "Trade", "Connect"],
        tags: ["Tablet", "Inventory", "Social"],
        image: ART.tablet,
        href: WORK_HREF,
      },
    ],
  },
  {
    id: "scripting",
    label: "Scripting",
    icon: "code",
    projects: [
      {
        id: "combat-framework",
        title: "Combat Framework",
        tagline: ["Hit", "Combo", "React"],
        tags: ["Combat", "Netcode", "Modular"],
        image: ART.scripting,
        href: WORK_HREF,
        featured: true,
      },
      {
        id: "quest-engine",
        title: "Quest Engine",
        tagline: ["Track", "Branch", "Reward"],
        tags: ["Quests", "Dialogue", "Saves"],
        image: ART.character,
        href: WORK_HREF,
      },
      {
        id: "economy-system",
        title: "Economy System",
        tagline: ["Earn", "Spend", "Balance"],
        tags: ["Currency", "Shops", "Analytics"],
        image: ART.outpost,
        href: WORK_HREF,
      },
    ],
  },
  {
    id: "modeling",
    label: "3D Modeling",
    icon: "cube",
    projects: [
      {
        id: "sci-fi-outpost",
        title: "Sci-Fi Outpost",
        tagline: ["Modular", "Detailed", "Optimized"],
        tags: ["Hard-surface", "PBR", "Kit"],
        image: ART.outpost,
        href: WORK_HREF,
        featured: true,
      },
      {
        id: "armoured-operator",
        title: "Armoured Operator",
        tagline: ["Sculpt", "Rig", "Deploy"],
        tags: ["Character", "Armour", "Rigged"],
        image: ART.character,
        href: WORK_HREF,
      },
      {
        id: "energy-portal",
        title: "Energy Portal",
        tagline: ["Shape", "Light", "Animate"],
        tags: ["Props", "Emissive", "Game-ready"],
        image: ART.portal,
        href: WORK_HREF,
      },
    ],
  },
  {
    id: "visual-effects",
    label: "Visual Effects",
    icon: "sparkle",
    projects: [
      {
        id: "rift-portal",
        title: "Rift Portal",
        tagline: ["Charge", "Open", "Erupt"],
        tags: ["Particles", "Shaders", "Real-time"],
        image: ART.portal,
        href: WORK_HREF,
        featured: true,
      },
      {
        id: "energy-shield",
        title: "Energy Shield",
        tagline: ["Raise", "Absorb", "Shatter"],
        tags: ["Combat", "Impact", "Glow"],
        image: ART.character,
        href: WORK_HREF,
      },
      {
        id: "beacon-burst",
        title: "Beacon Burst",
        tagline: ["Signal", "Pulse", "Flare"],
        tags: ["Ambient", "Lighting", "Bloom"],
        image: ART.outpost,
        href: WORK_HREF,
      },
    ],
  },
];
