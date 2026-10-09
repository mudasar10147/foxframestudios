import type { LightboxItem } from "@/components/shared/ImageLightbox";
import { ROUTES } from "@/constants/routes";

/**
 * Full games the studio has shipped, each with a page of its own at
 * `/portfolio/<slug>`. The portfolio's Full Game tab is built from this list, so a game
 * added here gets its card and its page together.
 */

export interface GameStat {
  label: string;
  value: string;
}

export interface GameDetail {
  /** The page's URL segment, and the portfolio card's id. */
  slug: string;
  title: string;
  /** Three words for the portfolio card, e.g. Climb / Dive / Collect. */
  tagline: readonly string[];
  /** Short labels for the card and the page header. */
  tags: readonly string[];
  /** The platform it's published on, e.g. "Roblox". */
  platform: string;
  /** Where to play it. Opens in a new tab. */
  playUrl: string;
  /** One or two sentences for the page header and the portfolio preview. */
  summary: string;
  /** The longer "About" text, one paragraph per entry. */
  about: readonly string[];
  /** "How to play" points. */
  howToPlay: readonly string[];
  /** Lifetime visits, as a number, so the portfolio can total them across games. */
  playerVisits: number;
  /** The headline numbers, shown as stat cards. */
  stats: readonly GameStat[];
  /** When the stats were taken, since visits and favourites keep changing. */
  statsAsOf: string;
  /** Everything else worth knowing, shown as a details list. */
  details: readonly GameStat[];
  /** The first is the card's image and the page's hero; all appear in the gallery. */
  images: readonly LightboxItem[];
}

const CLIMB_AND_DIVE_IMAGES = "/work/games/climb-and-dive-for-coins";

export const GAMES: readonly GameDetail[] = [
  {
    slug: "climb-and-dive-for-coins",
    title: "Climb and Dive For Coins",
    tagline: ["Climb", "Dive", "Collect"],
    tags: ["Roblox", "Simulator", "Multiplayer"],
    platform: "Roblox",
    playUrl:
      "https://www.roblox.com/games/124921395444962/Climb-and-Dive-For-Coins",
    summary:
      "An ocean adventure where players scale towering sea stacks, dive into glittering underwater caves and race their friends for the top score.",
    about: [
      "Climb Ocean and Dive is an epic adventure across wild waters and towering ocean cliffs. Players and their friends explore mysterious sea stacks, dive into shimmering underwater caves and climb colossal marine landmarks.",
      "It's a test of courage, skill, and how high, or how deep, you're willing to go. Regular updates add new worlds to explore.",
    ],
    howToPlay: [
      "Conquer oceanic climb zones",
      "Unlock dive gear and power-ups",
      "Compete with friends for top scores",
    ],
    playerVisits: 1_400_000,
    stats: [
      { label: "Visits", value: "1.4M+" },
      { label: "Favorites", value: "6,919" },
      { label: "Server size", value: "20 players" },
      { label: "Genre", value: "Simulation" },
    ],
    statsAsOf: "October 2026",
    details: [
      { label: "Platform", value: "Roblox" },
      { label: "Genre", value: "Simulation" },
      { label: "Subgenre", value: "Incremental Simulator" },
      { label: "Maturity", value: "Minimal" },
      { label: "Server size", value: "20 players" },
      { label: "Voice chat", value: "Not supported" },
      { label: "Camera", value: "Supported" },
      { label: "Released", value: "12 May 2025" },
      { label: "Last updated", value: "18 August 2026" },
    ],
    images: [
      {
        id: "dive-into-treasure",
        src: `${CLIMB_AND_DIVE_IMAGES}/dive-into-treasure.webp`,
        alt: "A diver plunging into a pile of gold coins and gems under the sea, with a climber on a tower behind",
        title: "Dive into treasure",
      },
      {
        id: "treasure-chest",
        src: `${CLIMB_AND_DIVE_IMAGES}/treasure-chest.webp`,
        alt: "Two divers racing toward an open treasure chest overflowing with gold and gems",
        title: "Race for the chest",
      },
      {
        id: "space-dive",
        src: `${CLIMB_AND_DIVE_IMAGES}/space-dive.webp`,
        alt: "A character diving through a fiery explosion in space while another climbs",
        title: "Dive through new worlds",
      },
      {
        id: "climb-panic",
        src: `${CLIMB_AND_DIVE_IMAGES}/climb-panic.webp`,
        alt: "A shocked character clinging to a wooden ledge above shark-filled water",
        title: "Don't look down",
      },
    ],
  },
];

/** The game with this slug, or undefined. */
export function getGame(slug: string): GameDetail | undefined {
  return GAMES.find((game) => game.slug === slug);
}

/** A game's page URL. One definition, used by its card and its page (§14). */
export function gameHref(slug: string): string {
  return `${ROUTES.portfolio}/${slug}`;
}
