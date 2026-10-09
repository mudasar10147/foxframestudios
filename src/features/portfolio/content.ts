import { GAMES, gameHref } from "./games";
import type { PortfolioCategory, ProjectImage } from "./types";

/**
 * What a game's card shows before it has any screenshots: one of the hero renders,
 * a cut-out on transparency, hence `fit: "contain"`.
 */
const FALLBACK_ART: ProjectImage = {
  src: "/hero/command-outpost.webp",
  alt: "A modular sci-fi command outpost lit in cyan",
  fit: "contain",
};

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
        : FALLBACK_ART,
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
        id: "auto-climb",
        title: "Auto Climb System",
        tagline: ["Climb", "Dive", "Repeat"],
        tags: ["Automation", "Game Loop", "Roblox"],
        image: {
          src: "/work/scripting/auto-climb-poster.webp",
          alt: "A Roblox character climbing a glowing tower in Climb and Dive For Coins, with the height meter rising",
        },
        clip: "/work/scripting/auto-climb.mp4",
        description:
          "One tap runs the whole loop in Climb and Dive For Coins: the character walks to the tower, climbs it, dives back down through the coins and starts again, with the height meter and coin count updating live.",
        featured: true,
      },
      {
        id: "coin-economy",
        title: "Coin Economy System",
        tagline: ["Earn", "Spend", "Upgrade"],
        tags: ["Economy", "Shop", "Upgrades"],
        image: {
          src: "/work/scripting/coin-economy-poster.webp",
          alt: "The Fins shop in Climb and Dive For Coins, with a fin on sale for 5K coins and the locked fins after it",
        },
        clip: "/work/scripting/coin-economy.mp4",
        description:
          "The coin economy behind Climb and Dive For Coins: coins earned from dives buy fins in the shop. Each fin costs more and gives a bigger boost than the last, buying one unlocks the next and equips it straight away, and the coin balance updates as it's spent.",
      },
      {
        id: "ticket-generator",
        title: "Generate & Collect System",
        tagline: ["Generate", "Store", "Collect"],
        tags: ["Idle", "Economy", "Rewards"],
        image: {
          src: "/work/scripting/ticket-generator-poster.webp",
          alt: "A player stepping on a Collect pad beside a Ticket Agent, banking stored tickets in a burst of green sparkles",
        },
        clip: "/work/scripting/ticket-generator.mp4",
        description:
          "An idle income loop: the Ticket Agent generates tickets every second at a rate set by its level, 297.7 a second at level 19, and stores them. Stepping on the Collect pad banks the total with a burst of effects and starts the count again from zero.",
      },
      {
        id: "daily-rewards-system",
        title: "Daily Rewards System",
        tagline: ["Claim", "Return", "Reward"],
        tags: ["Retention", "Rewards", "Timers"],
        image: {
          src: "/work/scripting/daily-rewards-poster.webp",
          alt: "The Daily Rewards panel in Climb and Dive For Coins, with coins bursting across the screen after a claim",
        },
        clip: "/work/scripting/daily-rewards.mp4",
        description:
          "A weekly reward track in Climb and Dive For Coins: one claim a day, from coins, spins and gems up to an exclusive pet on the last day. Claiming pays out with a burst of coins, marks the day as claimed and starts a live countdown to the next; the track resets every week.",
      },
      {
        id: "playtime-gifts",
        title: "Playtime Gifts System",
        tagline: ["Play", "Unlock", "Claim"],
        tags: ["Playtime", "Gifts", "Countdowns"],
        image: {
          src: "/work/scripting/playtime-gifts-poster.webp",
          alt: "The Free Gifts panel in Climb and Dive For Coins, a grid of twelve rewards, with coins bursting out after a claim",
        },
        clip: "/work/scripting/playtime-gifts.mp4",
        description:
          "Free gifts for time spent playing Climb and Dive For Coins: a grid of twelve rewards, from coins and boosts to pets, each unlocking a little later than the last. The HUD shows when a gift is ready; claiming it pays out with a burst of coins and starts the countdown to the next.",
      },
      {
        id: "leaderboards",
        title: "Leaderboard System",
        tagline: ["Rank", "Compete", "Climb"],
        tags: ["Leaderboards", "Social", "Donations"],
        image: {
          src: "/work/scripting/leaderboards-poster.webp",
          alt: "A player standing in front of the lobby's streak and coins leaderboards in Climb and Dive For Coins",
        },
        clip: "/work/scripting/leaderboards.mp4",
        description:
          "In-world leaderboards for Climb and Dive For Coins: boards in the lobby rank the top players by streak, wins, coins and donations, each with avatar, name and total. Beside them, a donation board lets players give Robux and climb its ranking, with the top donors called out.",
      },
      {
        id: "depth-progress",
        title: "Depth Progress System",
        tagline: ["Dive", "Track", "Beat"],
        tags: ["Progression", "HUD", "Real-time"],
        image: {
          src: "/work/scripting/depth-progress-poster.webp",
          alt: "The depth meter in Climb and Dive For Coins, marked from 0 to 12 km, with the player's avatar beside it at 3,148 m",
          // A tall clip of the meter alone: shown whole, not cropped to the card.
          fit: "contain",
        },
        clip: "/work/scripting/depth-progress.mp4",
        description:
          "A live depth meter for Climb and Dive For Coins: as the player dives, their avatar slides up a 12 km gauge, with sea creatures marking the milestones, and a readout counts the depth in real time, from 0 m past 4,000 m.",
      },
      {
        id: "spin-wheel",
        title: "Spin Wheel System",
        tagline: ["Spin", "Win", "Return"],
        tags: ["Rewards", "Monetization", "Timers"],
        image: {
          src: "/work/scripting/spin-wheel-poster.webp",
          alt: "The prize wheel in Climb and Dive For Coins, with coin, boost, extra-spin and pet slices, confetti, and buttons to spin or buy spin packs",
        },
        clip: "/work/scripting/spin-wheel.mp4",
        description:
          "A prize wheel for Climb and Dive For Coins: coins, boosts, extra spins and an exclusive pet, each slice with its own odds. Players earn a free spin on a daily timer, can buy spin packs with Robux, and every win pays out with confetti.",
      },
      {
        id: "daily-quests",
        title: "Daily Quests System",
        tagline: ["Accept", "Progress", "Claim"],
        tags: ["Quests", "Progression", "Daily Reset"],
        image: {
          src: "/work/scripting/daily-quests-poster.webp",
          alt: "The Daily Quests panel in Climb and Dive For Coins, with progress bars for climbing 25,000 meters and hatching eggs",
        },
        clip: "/work/scripting/daily-quests.mp4",
        description:
          "Daily quests for Climb and Dive For Coins: goals like climbing 25,000 meters or hatching eggs, each with a progress bar and a reward. Progress builds up from normal play, so one climb in the clip moves the climbing goal from 2.25K to 3.14K, and the list resets every day.",
      },
      {
        id: "pet-upgrades",
        title: "Pet Upgrade System",
        tagline: ["Select", "Roll", "Boost"],
        tags: ["Upgrades", "Odds", "Gems"],
        image: {
          src: "/work/scripting/pet-upgrades-poster.webp",
          alt: "The pet upgrade odds in Climb and Dive For Coins, listing speed, coin and luck boosts with their chances, beside gem packs",
        },
        clip: "/work/scripting/pet-upgrades.mp4",
        description:
          "Pet upgrades for Climb and Dive For Coins: pick a pet and roll it a random upgrade for a gem. A list shows every upgrade and its odds, from common 3% speed, coin and luck boosts at 17% to a rare 7% speed boost at 2%, with gem packs on sale beside it.",
      },
      {
        id: "tutorial-guide",
        title: "Tutorial Guide System",
        tagline: ["Guide", "Teach", "Reward"],
        tags: ["Onboarding", "Tutorial", "Rewards"],
        image: {
          src: "/work/scripting/tutorial-guide-poster.webp",
          alt: "Step 15 of 17 of the in-game guide in Climb and Dive For Coins, with a Next button and coins raining down as a tutorial reward",
          // A very wide clip: shown whole, not cropped to the card.
          fit: "contain",
        },
        clip: "/work/scripting/tutorial-guide.mp4",
        description:
          "A step-by-step guide for new players in Climb and Dive For Coins: numbered steps with on-screen tips walk them through the game, finishing the tutorial pays out a shower of coins, and the last steps point to the rewards for liking, favouriting and joining the group.",
      },
      {
        id: "treadmill",
        title: "Treadmill System",
        tagline: ["Run", "Count", "Progress"],
        tags: ["Movement", "Counters", "Progression"],
        image: {
          src: "/work/scripting/treadmill-poster.webp",
          alt: "A player running along a treadmill track through a Halloween farm, with +1 pop-ups and a step counter at 90",
        },
        clip: "/work/scripting/treadmill.mp4",
        description:
          "A treadmill track: every step the player runs adds one to their count, with a +1 popping up each time and the counter in the corner climbing as they go, from 55 to past 125 in the clip.",
      },
      {
        id: "waves",
        title: "Wave System",
        tagline: ["Spawn", "Sweep", "Survive"],
        tags: ["Hazards", "Spawning", "Difficulty"],
        image: {
          src: "/work/scripting/waves-poster.webp",
          alt: "A blue wave sweeping down a long course toward the player, with speed tags reading Normal and Fast",
        },
        clip: "/work/scripting/waves.mp4",
        description:
          "Waves that sweep down the course one after another, each in its own colour, with tags showing how fast each one is coming: Slow, Normal or Fast. They keep spawning and rolling toward the player, so there's always another to watch for.",
      },
    ],
  },
];
