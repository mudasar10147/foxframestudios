import type {
  ExperienceEntry,
  FooterColumn,
  PriceItem,
  ProcessStep,
  Project,
  Service,
  SkillGroup,
  SocialLink,
  Stat,
} from "@/types";

export const heroContent = {
  badge: "Available for new projects",
  intro: "UI Designer · Game Scripter · Map Builder · 3D Modeller",
  greeting: "Hi, I'm",
  name: "Cecle Dev",
  role: "Owner of FoxDevs Studio",
  tagline: "UI Designer · Game Scripter · Map Builder · 3D Modeller",
  description:
    "FoxDevs Studio crafts immersive, high-performance Roblox game interfaces — responsive Luau scripting that brings them to life, Map Building, Full Stack Scripting, and AI Engineering.",
  primaryCta: { label: "View Work", href: "/work" },
  secondaryCta: { label: "Let's Talk", href: "/contact" },
} as const;

export const heroStats: Stat[] = [
  { label: "Years Experience", value: "4+" },
  { label: "UIs Delivered", value: "80+" },
  { label: "Client Satisfaction", value: "100%" },
];

export const aboutContent = {
  label: "About Me",
  title: "Designing & scripting Roblox interfaces players love",
  description:
    "I'm Cecle Dev, owner of FoxDevs Studio. I work with Roblox developers and studios across the full production pipeline — interface design, Luau scripting, map building, and 3D modelling.",
  paragraphs: [
    "FoxDevs Studio is my Roblox development studio. Most of my work is game UI: summon screens, battle passes, shops, inventories, loadouts, settings panels, and complete interface kits. I handle the whole journey, from the first mockup through to a working, scripted interface running in-game.",
    "My work covers four areas. UI design is the core — I've delivered full multi-screen kits in a range of art directions, from neon arcade to pixel art, ornate fantasy, and clean sci-fi. Alongside that I take on game scripting in Luau, including full stack systems, map building in Roblox Studio, and 3D modelling for props, characters, and game assets.",
    "I care about the details that make a game feel premium: crisp visuals, smooth tweens, layouts that hold up across every device, and clean, maintainable code your team can build on. Every interface is designed to be readable at a glance and to stay consistent as your game grows.",
    "Orders run through my Discord server, which is the fastest way to reach me and where larger packages get scoped. Straightforward UI and scripting work is priced per item, while bigger builds — map scripting, map building, and 3D modelling — are quoted per project once I understand what you need.",
  ],
} as const;

export const aboutHighlights: Stat[] = [
  { label: "UIs Delivered", value: "80+" },
  { label: "Years Experience", value: "4+" },
  { label: "Client Satisfaction", value: "100%" },
];

// TODO: `level` values are placeholders — adjust them to your real proficiency.
export const skillGroups: SkillGroup[] = [
  {
    category: "UI Design",
    skills: [
      { name: "Game UI / UX", level: 95 },
      { name: "Figma", level: 92 },
      { name: "Photoshop", level: 88 },
      { name: "Iconography", level: 88 },
      { name: "Illustration", level: 80 },
    ],
  },
  {
    category: "Scripting",
    skills: [
      { name: "Luau", level: 92 },
      { name: "Full Stack Systems", level: 85 },
      { name: "Data Stores", level: 85 },
      { name: "Tweening", level: 90 },
      { name: "Rojo", level: 82 },
    ],
  },
  {
    category: "Map Building",
    skills: [
      { name: "Roblox Studio", level: 95 },
      { name: "Level Design", level: 88 },
      { name: "Lighting", level: 85 },
      { name: "Terrain", level: 82 },
      { name: "Optimisation", level: 85 },
    ],
  },
  {
    category: "3D Modelling",
    skills: [
      { name: "Blender", level: 82 },
      { name: "Texturing", level: 80 },
      { name: "Props & Assets", level: 85 },
      { name: "Characters", level: 78 },
      { name: "Game-Ready Export", level: 85 },
    ],
  },
];

export const experience: ExperienceEntry[] = [
  {
    id: "exp-1",
    role: "Lead UI Designer & Scripter",
    company: "Pixel Forge Studio",
    period: "2023 — Present",
    summary:
      "Lead UI for popular Roblox games end to end — designing HUDs and menu systems, then scripting them in Luau while mentoring the UI team.",
    tags: ["UI / UX", "Luau", "Leadership", "HUD"],
  },
  {
    id: "exp-2",
    role: "Roblox UI Designer",
    company: "Nova Games",
    period: "2021 — 2023",
    summary:
      "Designed and animated game interfaces — shops, inventories, and lobbies — with smooth tweens and responsive layouts across devices.",
    tags: ["UI Design", "Tweening", "Menus"],
  },
  {
    id: "exp-3",
    role: "UI Scripter",
    company: "Indie Roblox Devs",
    period: "2020 — 2021",
    summary:
      "Built and wired up in-game UI for indie titles, turning static mockups into responsive, scripted systems in Roblox Studio.",
    tags: ["Luau", "Roblox Studio", "UI"],
  },
];

export const projects: Project[] = [
  // Purple Arcade UI — a four-screen Roblox game UI set.
  {
    id: "proj-1",
    slug: "purple-arcade-summon",
    title: "Summon",
    role: "Made By Cecle DEV",
    summary:
      "A gacha summon screen built around a featured banner — rarity-coded gem packs, luck boosts, auto-sell rarity filters, and dual pity meters tracking progress to the next mythic.",
    stack: ["Roblox UI", "Gacha System", "Neon Arcade"],
    category: "ui-designs",
    subcategory: "Summon",
    set: "Purple Arcade UI",
    cover: "/work/purple-arcade-ui/summon.webp",
    featured: true,
    year: 2026,
  },
  {
    id: "proj-2",
    slug: "purple-arcade-battle-pass",
    title: "Battle Pass",
    role: "Made By Cecle DEV",
    summary:
      "A seasonal battle pass with parallel free and premium tracks, per-tier reward states from claimed through locked, and a season XP bar with skip and claim-all actions.",
    stack: ["Roblox UI", "Progression", "Neon Arcade"],
    category: "ui-designs",
    subcategory: "Battle Pass",
    set: "Purple Arcade UI",
    cover: "/work/purple-arcade-ui/battle-pass.webp",
    featured: true,
    year: 2026,
  },
  {
    id: "proj-3",
    slug: "purple-arcade-leveling",
    title: "Leveling",
    role: "Made By Cecle DEV",
    summary:
      "A level reward track with claimed, active, and locked card states tied to a milestone progress bar, pushing players toward the next exclusive unlock.",
    stack: ["Roblox UI", "Progression", "Neon Arcade"],
    category: "ui-designs",
    subcategory: "Leveling",
    set: "Purple Arcade UI",
    cover: "/work/purple-arcade-ui/leveling.webp",
    featured: true,
    year: 2026,
  },
  {
    id: "proj-4",
    slug: "purple-arcade-unit-upgrade",
    title: "Unit Upgrade",
    role: "Made By Cecle DEV",
    summary:
      "A unit detail and upgrade panel pairing a character showcase and lifetime stats with a before-and-after stat comparison, upgrade cost, and availability states.",
    stack: ["Roblox UI", "Stat Systems", "Neon Arcade"],
    category: "ui-designs",
    subcategory: "Unit Upgrade",
    set: "Purple Arcade UI",
    cover: "/work/purple-arcade-ui/unit-upgrade.webp",
    featured: true,
    year: 2026,
  },

  // Stud UI — a seven-screen Roblox game UI set.
  {
    id: "proj-11",
    slug: "stud-loadout",
    title: "Loadout",
    role: "Made By Cecle DEV",
    summary:
      "A weapon loadout screen with primary, secondary, melee, and special slots, a rarity-coded weapon grid, and a detail panel showing stat bars and combat power.",
    stack: ["Roblox UI", "Loadout System", "Stud Style"],
    category: "ui-designs",
    subcategory: "Loadout",
    set: "Stud UI",
    cover: "/work/stud-ui/loadout.webp",
    featured: false,
    year: 2026,
  },
  {
    id: "proj-12",
    slug: "stud-inventory",
    title: "Inventory",
    role: "Made By Cecle DEV",
    summary:
      "An inventory browser with weapon-type tabs, item search, rarity filters, and equipped-state markers across a paged grid with a capacity counter.",
    stack: ["Roblox UI", "Inventory", "Stud Style"],
    category: "ui-designs",
    subcategory: "Inventory",
    set: "Stud UI",
    cover: "/work/stud-ui/inventory.webp",
    featured: false,
    year: 2026,
  },
  {
    id: "proj-13",
    slug: "stud-shop",
    title: "Shop",
    role: "Made By Cecle DEV",
    summary:
      "A storefront with featured, crates, passes, and gems tabs — a limited-time bundle hero card alongside a priced product grid and live balance.",
    stack: ["Roblox UI", "Monetisation", "Stud Style"],
    category: "ui-designs",
    subcategory: "Shop",
    set: "Stud UI",
    cover: "/work/stud-ui/shop.webp",
    featured: false,
    year: 2026,
  },
  {
    id: "proj-14",
    slug: "stud-case-contents",
    title: "Case Contents",
    role: "Made By Cecle DEV",
    summary:
      "A case preview pairing a rarity drop-rate breakdown with the full reward pool, plus dual-currency purchase options and an owned-cases counter.",
    stack: ["Roblox UI", "Crate System", "Stud Style"],
    category: "ui-designs",
    subcategory: "Case Contents",
    set: "Stud UI",
    cover: "/work/stud-ui/case-contents.webp",
    featured: false,
    year: 2026,
  },
  {
    id: "proj-15",
    slug: "stud-missions",
    title: "Missions",
    role: "Made By Cecle DEV",
    summary:
      "A daily, weekly, and season mission board with per-objective progress bars, reward tags, claim states, and a completion tracker with a bonus crate.",
    stack: ["Roblox UI", "Quest System", "Stud Style"],
    category: "ui-designs",
    subcategory: "Missions",
    set: "Stud UI",
    cover: "/work/stud-ui/missions.webp",
    featured: false,
    year: 2026,
  },
  {
    id: "proj-16",
    slug: "stud-daily-rewards",
    title: "Daily Rewards",
    role: "Made By Cecle DEV",
    summary:
      "A seven-day login streak calendar with escalating reward tiers, claimed and locked card states, a reset countdown, and a milestone bonus.",
    stack: ["Roblox UI", "Retention", "Stud Style"],
    category: "ui-designs",
    subcategory: "Daily Rewards",
    set: "Stud UI",
    cover: "/work/stud-ui/daily-rewards.webp",
    featured: false,
    year: 2026,
  },
  {
    id: "proj-17",
    slug: "stud-settings",
    title: "Settings",
    role: "Made By Cecle DEV",
    summary:
      "A settings panel with general, audio, and controls tabs — toggles, cycling quality options, and a volume slider beside an active performance preset.",
    stack: ["Roblox UI", "Settings", "Stud Style"],
    category: "ui-designs",
    subcategory: "Settings",
    set: "Stud UI",
    cover: "/work/stud-ui/settings.webp",
    featured: false,
    year: 2026,
  },

  // Pixel UI
  {
    id: "proj-21",
    slug: "pixel-hud-kit",
    title: "Pixel HUD Kit",
    role: "Made By Cecle DEV",
    summary:
      "A pixel-art interface set with a tabbed item inventory, skill window, item description popup, a level and stat bar, and a play-time reminder notice.",
    stack: ["Pixel Art", "UI Kit", "Game UI"],
    category: "ui-designs",
    subcategory: "HUD Kit",
    set: "Pixel UI",
    cover: "/work/foxframe/pixel-hud-kit.jpg",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-22",
    slug: "pixel-inventory-kit",
    title: "Pixel Inventory Kit",
    role: "Made By Cecle DEV",
    summary:
      "A pixel inventory window paired with a component sheet — transport controls, a d-pad, health and stamina bars, potions, coins, and a game-over sign.",
    stack: ["Pixel Art", "UI Kit", "Game UI"],
    category: "ui-designs",
    subcategory: "Inventory",
    set: "Pixel UI",
    cover: "/work/foxframe/pixel-inventory-kit.jpg",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-23",
    slug: "pixel-heroes-roster",
    title: "Heroes Roster",
    role: "Made By Cecle DEV",
    summary:
      "A hero collection screen with per-character cards showing sprite, level, power, and star rating on a soft daylight backdrop.",
    stack: ["Pixel Art", "Collection UI", "Game UI"],
    category: "ui-designs",
    subcategory: "Roster",
    set: "Pixel UI",
    cover: "/work/foxframe/pixel-heroes.jpg",
    featured: false,
    year: 2025,
  },

  // Medieval UI
  {
    id: "proj-24",
    slug: "medieval-create-lobby",
    title: "Create Lobby",
    role: "Made By Cecle DEV",
    summary:
      "A lobby creation panel with chapter selection, player-count dropdown, public and private status toggle, and invite and start actions in an ornate frame.",
    stack: ["Ornate Frame", "Multiplayer UI", "Game UI"],
    category: "ui-designs",
    subcategory: "Lobby",
    set: "Medieval UI",
    cover: "/work/foxframe/medieval-create-lobby.jpg",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-25",
    slug: "medieval-lobby",
    title: "Lobby",
    role: "Made By Cecle DEV",
    summary:
      "A pre-match lobby listing players with ready and waiting states, a party capacity counter, and leave and ready controls.",
    stack: ["Ornate Frame", "Multiplayer UI", "Game UI"],
    category: "ui-designs",
    subcategory: "Lobby",
    set: "Medieval UI",
    cover: "/work/foxframe/medieval-lobby.jpg",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-26",
    slug: "medieval-chapter-selection",
    title: "Chapter Selection",
    role: "Made By Cecle DEV",
    summary:
      "A chapter picker with banner cards in unlocked and locked states, roman-numeral markers, and a progress bar beneath a decorative border.",
    stack: ["Ornate Frame", "Progression", "Game UI"],
    category: "ui-designs",
    subcategory: "Chapter Select",
    set: "Medieval UI",
    cover: "/work/foxframe/medieval-chapter-selection.jpg",
    featured: false,
    year: 2025,
  },

  // Calisto Bowls
  {
    id: "proj-27",
    slug: "calisto-bowls-loading",
    title: "Loading Screen",
    role: "Made By Cecle DEV",
    summary:
      "A title and loading screen with a soft script logotype and a progress bar framed by illustrated beach foliage and driftwood.",
    stack: ["Illustration", "Loading Screen", "Game UI"],
    category: "ui-designs",
    subcategory: "Loading",
    set: "Calisto Bowls",
    cover: "/work/foxframe/calisto-bowls-loading.jpg",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-28",
    slug: "calisto-bowls-signage-kit",
    title: "Signage Kit",
    role: "Made By Cecle DEV",
    summary:
      "A hand-illustrated beach UI kit — a hanging wooden sign board, rope-strung menu buttons, a parchment panel, and round icon buttons.",
    stack: ["Illustration", "UI Kit", "Game UI"],
    category: "ui-designs",
    subcategory: "UI Kit",
    set: "Calisto Bowls",
    cover: "/work/foxframe/beach-signage-kit.jpg",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-29",
    slug: "calisto-bowls-panel-kit",
    title: "Panel Kit",
    role: "Made By Cecle DEV",
    summary:
      "A second beach kit pass with sand-mounted menu panels, a header banner with foliage, a progress bar, and a matching icon button set.",
    stack: ["Illustration", "UI Kit", "Game UI"],
    category: "ui-designs",
    subcategory: "UI Kit",
    set: "Calisto Bowls",
    cover: "/work/foxframe/beach-panel-kit.jpg",
    featured: false,
    year: 2025,
  },

  // Stein Facility
  {
    id: "proj-30",
    slug: "stein-facility-inventory",
    title: "Inventory",
    role: "Made By Cecle DEV",
    summary:
      "A split inventory and storage screen with a selected-slot highlight, discard bins, and HP and stamina readouts in a neon sci-fi frame.",
    stack: ["Sci-Fi", "Inventory", "Game UI"],
    category: "ui-designs",
    subcategory: "Inventory",
    set: "Stein Facility",
    cover: "/work/foxframe/stein-facility-inventory.jpg",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-31",
    slug: "stein-facility-settings",
    title: "Settings",
    role: "Made By Cecle DEV",
    summary:
      "A settings panel with accessibility toggles, three volume sliders on an extended scale, and a display-mode dropdown, using skull-shaped handles throughout.",
    stack: ["Sci-Fi", "Settings", "Game UI"],
    category: "ui-designs",
    subcategory: "Settings",
    set: "Stein Facility",
    cover: "/work/foxframe/stein-facility-settings.jpg",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-32",
    slug: "stein-facility-hud",
    title: "In-Game HUD",
    role: "Made By Cecle DEV",
    summary:
      "A gameplay overlay with a hotbar, quick-access shop, settings, inventory and menu buttons, save slot card, and paired status dials.",
    stack: ["Sci-Fi", "HUD", "Game UI"],
    category: "ui-designs",
    subcategory: "HUD",
    set: "Stein Facility",
    cover: "/work/foxframe/stein-facility-hud.jpg",
    featured: false,
    year: 2025,
  },

  // Fighter Jet Simulator
  {
    id: "proj-33",
    slug: "fighter-jet-menu",
    title: "Main Menu & Avionics",
    role: "Made By Cecle DEV",
    summary:
      "A cockpit-styled main menu beside live avionics panels — radar scope, targeting pod, fuel gauges, flight status warnings, and flight controls.",
    stack: ["HUD", "Simulation UI", "Game UI"],
    category: "ui-designs",
    subcategory: "Main Menu",
    set: "Fighter Jet Simulator",
    cover: "/work/foxframe/fighter-jet-menu.jpg",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-34",
    slug: "fighter-jet-title",
    title: "Title Screen",
    role: "Made By Cecle DEV",
    summary:
      "A pixel-art title screen with a jet illustration above riveted metal menu plates for continue, new game, load, options, and exit.",
    stack: ["Pixel Art", "Main Menu", "Game UI"],
    category: "ui-designs",
    subcategory: "Title Screen",
    set: "Fighter Jet Simulator",
    cover: "/work/foxframe/fighter-jet-title.jpg",
    featured: false,
    year: 2025,
  },

  // Standalone screens — no shared set.
  {
    id: "proj-35",
    slug: "veilborn-main-menu",
    title: "Veilborn Main Menu",
    role: "Made By Cecle DEV",
    summary:
      "An atmospheric main menu with a glowing serif logotype and filigree flourishes over a misty ruin backdrop, with a centred menu stack.",
    stack: ["Atmospheric", "Main Menu", "Game UI"],
    category: "ui-designs",
    subcategory: "Main Menu",
    cover: "/work/foxframe/veilborn-main-menu.jpg",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-36",
    slug: "run-down-menu",
    title: "Run Down Menu",
    role: "Made By Cecle DEV",
    summary:
      "A grunge horror menu pairing a distressed logotype and icon-led navigation with a settings block and a locked-stage level select.",
    stack: ["Grunge", "Main Menu", "Game UI"],
    category: "ui-designs",
    subcategory: "Main Menu",
    cover: "/work/foxframe/run-down-menu.jpg",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-37",
    slug: "tactical-game-over",
    title: "Game Over Screen",
    role: "Made By Cecle DEV",
    summary:
      "A tactical shooter death screen with a bullet-formed headline over a blurred battlefield, offering checkpoint reload, load, settings, and exit.",
    stack: ["Tactical", "Game State", "Game UI"],
    category: "ui-designs",
    subcategory: "Game Over",
    cover: "/work/foxframe/tactical-game-over.jpg",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-38",
    slug: "sproutville-ui-kit",
    title: "Sproutville UI Kit",
    role: "Made By Cecle DEV",
    summary:
      "A stitched-paper UI kit with title, settings, and inventory boards, a full round icon button set, heart health bars, currency chips, and a loading bar.",
    stack: ["Illustration", "UI Kit", "Game UI"],
    category: "ui-designs",
    subcategory: "UI Kit",
    cover: "/work/foxframe/sproutville-ui-kit.jpg",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-39",
    slug: "bubbly-ui-kit",
    title: "Bubbly UI Kit",
    role: "Made By Cecle DEV",
    summary:
      "A rounded, glossy UI kit with gift, shop, and inventory windows in a shared tabbed layout, plus a pill button set in three colourways and a progress bar.",
    stack: ["UI Kit", "Roblox UI", "Game UI"],
    category: "ui-designs",
    subcategory: "UI Kit",
    cover: "/work/foxframe/bubbly-ui-kit.jpg",
    featured: false,
    year: 2025,
  },

  // TODO: placeholder entries — replace with real work.
  {
    id: "proj-5",
    slug: "round-based-game-framework",
    title: "Round-Based Game Framework",
    role: "Gameplay Scripter",
    summary:
      "A modular round system handling matchmaking, team assignment, and win conditions — built to drop into any competitive Roblox game.",
    stack: ["Luau", "Rojo", "ProfileService"],
    category: "scripting",
    subcategory: "Systems",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-6",
    slug: "data-store-save-system",
    title: "Data Store Save System",
    role: "Backend Scripter",
    summary:
      "A session-locked save system with retry handling and versioned migrations, keeping player progress safe through server restarts.",
    stack: ["Luau", "DataStore2"],
    category: "scripting",
    subcategory: "Backend",
    featured: false,
    year: 2024,
  },
  {
    id: "proj-7",
    slug: "medieval-village-map",
    title: "Medieval Village Map",
    role: "Map Builder",
    summary:
      "A fully playable village with layered terrain, custom lighting, and streaming-friendly geometry that holds 60 FPS on mobile.",
    stack: ["Roblox Studio", "Terrain Editor", "Lighting"],
    category: "map-building",
    subcategory: "Environment",
    featured: false,
    year: 2025,
  },
  {
    id: "proj-8",
    slug: "obby-course-layout",
    title: "Obby Course Layout",
    role: "Map Builder",
    summary:
      "A 40-stage obstacle course with difficulty pacing, checkpoint flow, and modular kit pieces reusable across future maps.",
    stack: ["Roblox Studio", "Level Design"],
    category: "map-building",
    subcategory: "Level Design",
    featured: false,
    year: 2024,
  },
  {
    id: "3d-01",
    slug: "neon-city-street",
    title: "Neon City Street",
    role: "3D Modeller",
    summary:
      "A cinematic cyberpunk street scene built around bold neon signage, layered storefronts, and atmospheric blue lighting. The composition creates a dense, lived-in city space with a strong nighttime mood.",
    cover: "/work/3d-modelling/neon-city-street.webp",
    stack: ["Environment Design", "Lighting", "Rendering"],
    category: "3d-modelling",
    subcategory: "Environment",
    set: "Environment & Architecture",
    featured: false,
    year: 2025,
  },
  {
    id: "3d-02",
    slug: "neon-city-overlook",
    title: "Neon City Overlook",
    role: "3D Modeller",
    summary:
      "A wider view of the neon district, combining elevated walkways, illuminated towers, and layered urban silhouettes. Contrasting magenta and cyan accents guide the eye through the cityscape.",
    cover: "/work/3d-modelling/neon-city-overlook.jpg",
    stack: ["Environment Design", "Lighting", "Rendering"],
    category: "3d-modelling",
    subcategory: "Environment",
    set: "Environment & Architecture",
    featured: false,
    year: 2025,
  },
  {
    id: "3d-03",
    slug: "coastal-city-skyline",
    title: "Coastal City Skyline",
    role: "3D Modeller",
    summary:
      "A luminous waterfront skyline featuring varied tower shapes, reflective water, and a soft dusk gradient. The distant framing gives the scene scale while keeping the architecture as the focal point.",
    cover: "/work/3d-modelling/coastal-city-skyline.jpg",
    stack: ["Environment Design", "Architecture", "Rendering"],
    category: "3d-modelling",
    subcategory: "Environment",
    set: "Environment & Architecture",
    featured: false,
    year: 2025,
  },
  {
    id: "3d-04",
    slug: "stylised-townhouses",
    title: "Stylised Townhouse Set",
    role: "3D Modeller",
    summary:
      "A coordinated set of compact townhouses with bold colour blocking, readable silhouettes, and modular architectural details. The clean forms are designed to work together as a flexible street-building kit.",
    cover: "/work/3d-modelling/stylised-townhouses.jpg",
    stack: ["Architecture", "Modular Design", "Rendering"],
    category: "3d-modelling",
    subcategory: "Architecture",
    set: "Environment & Architecture",
    featured: false,
    year: 2025,
  },
  {
    id: "3d-05",
    slug: "classical-townhouse-exterior",
    title: "Classical Townhouse Exterior",
    role: "3D Modeller",
    summary:
      "A detailed multi-storey townhouse exterior with balanced window spacing, roof dormers, and traditional façade proportions. Neutral materials keep attention on the modelling and architectural structure.",
    cover: "/work/3d-modelling/classical-townhouse-exterior.jpg",
    stack: ["Architecture", "Hard-Surface", "Rendering"],
    category: "3d-modelling",
    subcategory: "Architecture",
    set: "Environment & Architecture",
    featured: false,
    year: 2025,
  },
  {
    id: "3d-06",
    slug: "complete-house-interior",
    title: "Complete House Interior",
    role: "3D Modeller",
    summary:
      "A complete cutaway house interior showing connected living spaces, bedrooms, bathrooms, and circulation. Furniture and room dressing give each area a clear function while preserving an easy-to-read overview.",
    cover: "/work/3d-modelling/complete-house-interior.webp",
    stack: ["Interior Design", "Space Planning", "Rendering"],
    category: "3d-modelling",
    subcategory: "Interior",
    set: "Environment & Architecture",
    featured: false,
    year: 2025,
  },
  {
    id: "3d-07",
    slug: "modern-kitchen",
    title: "Modern Kitchen",
    role: "3D Modeller",
    summary:
      "A bright modern kitchen featuring a marble island, pendant lighting, large windows, and clean white cabinetry. Reflective surfaces and restrained styling create a polished architectural visualisation.",
    cover: "/work/3d-modelling/modern-kitchen.webp",
    stack: ["Interior Design", "Materials", "Lighting"],
    category: "3d-modelling",
    subcategory: "Interior",
    set: "Environment & Architecture",
    featured: false,
    year: 2025,
  },
  {
    id: "3d-08",
    slug: "aircraft-carrier",
    title: "Aircraft Carrier",
    role: "3D Modeller",
    summary:
      "A large-scale aircraft carrier model with a full flight deck, island structure, and detailed hull profile. The elevated render highlights the ship’s overall proportions and recognisable silhouette.",
    cover: "/work/3d-modelling/aircraft-carrier.jpg",
    stack: ["Vehicle Design", "Hard-Surface", "Rendering"],
    category: "3d-modelling",
    subcategory: "Vehicle",
    set: "Vehicles & Spaceships",
    featured: false,
    year: 2025,
  },
  {
    id: "3d-09",
    slug: "futuristic-fighter-squadron",
    title: "Futuristic Fighter Squadron",
    role: "3D Modeller",
    summary:
      "A formation of angular sci-fi fighter craft presented on a circular display platform. Layered wings, dark panels, and red accents create an aggressive, high-tech visual language.",
    cover: "/work/3d-modelling/fighter-squadron.jpg",
    stack: ["Vehicle Design", "Hard-Surface", "Rendering"],
    category: "3d-modelling",
    subcategory: "Spaceship",
    set: "Vehicles & Spaceships",
    featured: false,
    year: 2025,
  },
  {
    id: "3d-10",
    slug: "futuristic-spaceship-front",
    title: "Futuristic Spaceship — Front",
    role: "3D Modeller",
    summary:
      "A close front-quarter study of a futuristic spacecraft with layered armour, illuminated orange details, and a compact cockpit. The presentation emphasises the model’s complex silhouette and surface depth.",
    cover: "/work/3d-modelling/futuristic-spaceship-front.webp",
    stack: ["Vehicle Design", "Hard-Surface", "Materials"],
    category: "3d-modelling",
    subcategory: "Spaceship",
    set: "Vehicles & Spaceships",
    featured: false,
    year: 2025,
  },
  {
    id: "3d-11",
    slug: "futuristic-spaceship-profile",
    title: "Futuristic Spaceship — Profile",
    role: "3D Modeller",
    summary:
      "A side-profile render of the same spacecraft, revealing its swept-back form and layered mechanical construction. Warm accent lights break up the dark bodywork and define the ship’s key contours.",
    cover: "/work/3d-modelling/futuristic-spaceship-profile.jpg",
    stack: ["Vehicle Design", "Hard-Surface", "Materials"],
    category: "3d-modelling",
    subcategory: "Spaceship",
    set: "Vehicles & Spaceships",
    featured: false,
    year: 2025,
  },
  {
    id: "3d-12",
    slug: "tactical-shotgun",
    title: "Tactical Shotgun",
    role: "3D Modeller",
    summary:
      "A clean hard-surface shotgun model with a compact stock, pump-action form, and visible shell storage. The simplified materials and strong silhouette keep the asset readable from gameplay distances.",
    cover: "/work/3d-modelling/tactical-shotgun.webp",
    stack: ["Weapon Design", "Hard-Surface", "Rendering"],
    category: "3d-modelling",
    subcategory: "Weapon",
    set: "Weapons & Props",
    featured: false,
    year: 2025,
  },
  {
    id: "3d-13",
    slug: "m16-rifle",
    title: "M16 Rifle",
    role: "3D Modeller",
    summary:
      "A detailed M16-style rifle model with a recognisable carry handle, ribbed handguard, magazine, and barrel assembly. The dark material treatment highlights the asset’s proportions and mechanical details.",
    cover: "/work/3d-modelling/m16-rifle.webp",
    stack: ["Weapon Design", "Hard-Surface", "Rendering"],
    category: "3d-modelling",
    subcategory: "Weapon",
    set: "Weapons & Props",
    featured: false,
    year: 2025,
  },
];

export const services: Service[] = [
  {
    id: "svc-1",
    title: "UI Design",
    description:
      "Complete game interfaces built to a consistent art direction — readable at a glance and ready to scale as your game grows.",
    icon: "palette",
    features: [
      "HUDs, menus & shops",
      "Battle pass & progression",
      "Full multi-screen UI kits",
    ],
  },
  {
    id: "svc-2",
    title: "Game Scripting",
    description:
      "Luau and full stack systems — interface logic, gameplay mechanics, and the backend that keeps everything running.",
    icon: "code",
    features: [
      "Luau & full stack systems",
      "Tweens & responsive scaling",
      "Data stores & save systems",
    ],
  },
  {
    id: "svc-3",
    title: "Map Building",
    description:
      "Playable environments built in Roblox Studio, with layout, lighting, and optimisation handled together.",
    icon: "map",
    features: [
      "Level layout & flow",
      "Lighting & atmosphere",
      "Performance optimisation",
    ],
  },
  {
    id: "svc-4",
    title: "3D Modelling",
    description:
      "Custom props, characters, and assets modelled and textured to Roblox standards, ready to drop into your game.",
    icon: "cube",
    features: [
      "Props & weapons",
      "Characters & accessories",
      "Game-ready optimisation",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We talk through your game, its players, and the UI features you need.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "I craft mockups and prototypes in Figma until the look and flow feel right.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "I script the UI in Luau — responsive, animated, and optimized for Roblox.",
  },
  {
    step: "04",
    title: "Ship",
    description:
      "I integrate, test across devices, and hand off clean, documented code.",
  },
];

export const contactContent = {
  label: "Contact",
  title: "Let's build your game's UI",
  description:
    "Have a Roblox project that needs standout UI? Tell me about it and I'll get back to you within a couple of days.",
} as const;

export const orderContent = {
  label: "Order",
  title: "Join to order",
  description:
    "All orders go through my Discord server — join, drop your brief, and I'll get back to you.",
  cta: { label: "Join to Order", href: "https://discord.gg/qyYJ2zZrq" },
  note: "For bigger packages — or map scripting, map building, and 3D modelling — reach out on the Discord server. Those are quoted per project rather than at the rates above.",
} as const;

export const pricing: PriceItem[] = [
  { label: "UI Design", value: "$15 – $20", note: "per UI" },
  { label: "Import", value: "$3", note: "per import" },
  { label: "Scripting", value: "$15", note: "per script" },
];

export const contactEmail = "wajahat.f009@gmail.com";

// TODO: X and GitHub still point at bare domains — add your real profile URLs.
export const socialLinks: SocialLink[] = [
  { platform: "x", label: "X", url: "https://x.com" },
  { platform: "github", label: "GitHub", url: "https://github.com" },
  { platform: "discord", label: "Discord", url: orderContent.cta.href },
  { platform: "email", label: "Email", url: `mailto:${contactEmail}` },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Navigate",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Skills", href: "/skills" },
      { label: "Process", href: "/#process" },
    ],
  },
];
