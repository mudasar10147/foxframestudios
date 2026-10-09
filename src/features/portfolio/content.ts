import { GAMES, gameHref } from "./games";
import type { PortfolioCategory, ProjectImage } from "./types";

/**
 * STAND-IN ART. Where a project has no real screenshot yet, it borrows
 * one of the hero or device renders. Each is a cut-out on transparency, hence
 * `fit: "contain"`.
 *
 * The UI/UX projects already have their real screens, in `public/work/ui/`.
 *
 * The Full Game projects come from `games.ts`, with their own art and pages.
 *
 * TODO: replace the Scripting projects' `image` with their real key art (e.g. in
 * `public/work/`) and drop the `fit` so it fills the card. Until then, they share
 * the hero renders.
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
} satisfies Record<string, ProjectImage>;

/**
 * The portfolio's tabs, in order, and the projects in each. The first project in a
 * category is the one its carousel opens on.
 */
export const PORTFOLIO_CATEGORIES: readonly PortfolioCategory[] = [
  {
    id: "full-game",
    label: "Full Game",
    icon: "gamepad",
    // Real games, each with its own page: the cards come from `GAMES`.
    projects: GAMES.map((game, index) => ({
      id: game.slug,
      title: game.title,
      tagline: game.tagline,
      tags: game.tags,
      image: game.images[0]
        ? { src: game.images[0].src, alt: game.images[0].alt }
        : ART.outpost,
      description: game.summary,
      href: gameHref(game.slug),
      featured: index === 0,
    })),
  },
  {
    id: "ui-ux",
    label: "UI/UX",
    icon: "monitor",
    projects: [
      {
        id: "abilities",
        title: "Void Abilities",
        tagline: ["Unlock", "Upgrade", "Unleash"],
        tags: ["Skill Tree", "Mastery", "Anime"],
        image: {
          src: "/work/ui/abilities.webp",
          alt: "An anime-style abilities menu with diamond skill slots and a Void Slash detail panel",
        },
        description:
          "An abilities menu with a diamond skill layout, level badges, a detail panel for the selected skill and a mastery bar with upgrade points.",
        featured: true,
      },
      {
        id: "storm-inventory",
        title: "Storm Inventory",
        tagline: ["Collect", "Compare", "Equip"],
        tags: ["Rarity", "Filters", "Stats"],
        image: {
          src: "/work/ui/storm-inventory.webp",
          alt: "A green anime-style inventory with weapon categories, rarity cards and a Storm Katana stat panel",
        },
        description:
          "An anime-style inventory with category tabs, search and sorting, star-rated rarity cards, and a stat panel to equip or discard.",
      },
      {
        id: "character-index",
        title: "Character Index",
        tagline: ["Discover", "Collect", "Complete"],
        tags: ["Collection", "Filters", "Rarity"],
        image: {
          src: "/work/ui/character-index.webp",
          alt: "A purple index screen tracking discovered characters, with search, filters and a character detail panel",
        },
        description:
          "A collection index that tracks discovered characters, with search, owned and missing filters, locked entries and a detail panel.",
      },
      {
        id: "fallen-respawn",
        title: "Fallen Screen",
        tagline: ["Fall", "Wait", "Return"],
        tags: ["Respawn", "Countdown", "Combat"],
        image: {
          src: "/work/ui/fallen-respawn.webp",
          alt: "A comic-style respawn screen with a FALLEN banner, a countdown, and Return and Watch buttons",
        },
        description:
          "A comic-style defeat screen with a bold FALLEN banner, a respawn countdown, and quick Return and Watch options.",
      },
      {
        id: "daily-rewards",
        title: "Daily Rewards",
        tagline: ["Log In", "Claim", "Repeat"],
        tags: ["Calendar", "Rewards", "Retention"],
        image: {
          src: "/work/ui/daily-rewards.webp",
          alt: "An orange daily rewards calendar with seven reward days and a Claim Reward button",
        },
        description:
          "A seven-day login calendar showing claimed days, today's reward, and a rainbow jackpot waiting on day seven.",
      },
      {
        id: "quest-board",
        title: "Quest Board",
        tagline: ["Track", "Complete", "Claim"],
        tags: ["Progress", "Rewards", "Daily"],
        image: {
          src: "/work/ui/quest-board.webp",
          alt: "A red quests panel with four tasks, progress bars, rewards and Claim buttons",
        },
        description:
          "A quest log with task icons, progress bars, reward previews and a claim button for each objective.",
      },
      {
        id: "blocky-inventory",
        title: "Blocky Inventory",
        tagline: ["Pick", "Inspect", "Equip"],
        tags: ["Grid", "Stats", "Casual"],
        image: {
          src: "/work/ui/blocky-inventory.webp",
          alt: "A purple blocky inventory with an item grid, a Golden Shovel detail panel and an Equip button",
        },
        description:
          "A playful blocky inventory with colour-coded item slots, a large item preview, stat bars and an equip button.",
      },
      {
        id: "settings-panel",
        title: "Settings Panel",
        tagline: ["Toggle", "Tune", "Save"],
        tags: ["Audio", "Graphics", "Casual"],
        image: {
          src: "/work/ui/settings-panel.webp",
          alt: "A blue blocky settings panel with on/off toggles, a volume slider and a graphics quality selector",
        },
        description:
          "A clear settings panel with on/off toggles, a volume slider and a graphics quality selector, built for quick changes.",
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
        placeholder: true,
        featured: true,
      },
      {
        id: "quest-engine",
        title: "Quest Engine",
        tagline: ["Track", "Branch", "Reward"],
        tags: ["Quests", "Dialogue", "Saves"],
        image: ART.character,
        placeholder: true,
      },
      {
        id: "economy-system",
        title: "Economy System",
        tagline: ["Earn", "Spend", "Balance"],
        tags: ["Currency", "Shops", "Analytics"],
        image: ART.outpost,
        placeholder: true,
      },
    ],
  },
];
