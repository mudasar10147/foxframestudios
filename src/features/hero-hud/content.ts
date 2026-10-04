import type { HeroSlideId, HudCardContent, HudCardId } from "./types";

/**
 * Which component fills each card on each slide, and with what. Every slide must fill
 * every card: leaving one out is a compile error, not a blank panel.
 *
 * Any component can go in any card: each readout sizes itself from its card, so
 * moving an entry to another card needs no other change.
 */
export const HUD_CONTENT: Record<
  HeroSlideId,
  Record<HudCardId, HudCardContent>
> = {
  "character-hud": {
    "top-right": {
      widget: "capability",
      props: {
        title: "UI / UX Design",
        level: 85,
        features: [
          { icon: "layout", label: "HUDs & menus" },
          { icon: "layers", label: "Inventory systems" },
          { icon: "palette", label: "Themed visual kits" },
        ],
      },
    },
    "mid-right": {
      widget: "breakdown",
      props: {
        title: "UI Elements",
        capacity: 60,
        items: [
          { label: "Buttons", count: 14, tone: "cool" },
          { label: "Cards", count: 12, tone: "strong" },
          { label: "Forms", count: 10, tone: "deep" },
          { label: "Navigation", count: 12, tone: "warm" },
        ],
      },
    },
    "bottom-left": {
      widget: "style",
      props: {
        title: "Styles",
        samples: [
          { id: "figma", tone: "cool", icon: "figma" },
          { id: "sketch", tone: "warm", icon: "sketch" },
          { id: "framer", tone: "dim", icon: "framer" },
        ],
        caption: "Modern, clean and ready to ship.",
      },
    },
    "bottom-right": {
      widget: "device",
      props: {
        title: "Responsive Design",
        devices: [
          {
            kind: "desktop",
            src: "/hero/devices/desktop.webp",
            alt: "A game studio landing page on a desktop monitor",
          },
          {
            kind: "tablet",
            src: "/hero/devices/tablet.webp",
            alt: "The same landing page adapted for a tablet",
          },
          {
            kind: "mobile",
            src: "/hero/devices/mobile.webp",
            alt: "The same landing page adapted for a phone",
          },
        ],
      },
    },
  },
  "command-outpost": {
    "top-right": {
      widget: "uiKit",
      props: {
        title: "Build Menu",
        elements: [
          {
            kind: "icon",
            id: "blender",
            icon: "blender",
            tone: "neutral",
            selected: true,
          },
          { kind: "icon", id: "maya", icon: "maya", tone: "cool" },
          { kind: "icon", id: "cinema4d", icon: "cinema4d", tone: "neutral" },
          { kind: "swatch", id: "swatch", from: "cool", to: "dim" },
          { kind: "icon", id: "roblox", icon: "roblox", tone: "warm" },
          { kind: "icon", id: "unity", icon: "unity", tone: "cool" },
          { kind: "icon", id: "godot", icon: "godot", tone: "dim" },
          { kind: "empty", id: "empty" },
        ],
      },
    },
    "mid-right": {
      widget: "capability",
      props: {
        title: "3D Modeling",
        level: 65,
        features: [
          { icon: "cube", label: "Game-ready assets" },
          { icon: "layers", label: "Optimized topology" },
          { icon: "palette", label: "Stylized or realistic" },
        ],
      },
    },
    "bottom-left": {
      widget: "metric",
      props: {
        title: "Polygons",
        value: "24K",
        level: 62,
        tiers: ["Low", "Med", "High"],
        activeTier: "Med",
      },
    },
    "bottom-right": {
      widget: "style",
      props: {
        title: "Materials",
        samples: [
          { id: "blender", tone: "cool", icon: "blender" },
          { id: "maya", tone: "warm", icon: "maya" },
          { id: "cinema4d", tone: "dim", icon: "cinema4d" },
        ],
        caption: "Hard-surface PBR, built to snap together.",
      },
    },
  },
  "gameplay-scripting": {
    "top-right": {
      widget: "tally",
      props: {
        title: "Scripts",
        value: "250+",
        groups: [
          { label: "Server", share: 30, level: 100, tone: "warm" },
          { label: "Client", share: 50, level: 100, tone: "cool" },
        ],
      },
    },
    "mid-right": {
      widget: "style",
      props: {
        title: "Toolkits",
        samples: [
          { id: "typescript", tone: "cool", icon: "typescript" },
          { id: "lua", tone: "warm", icon: "lua" },
          { id: "git", tone: "dim", icon: "git" },
        ],
        caption: "Typed, modular code that's tested.",
      },
    },
    "bottom-left": {
      widget: "capability",
      props: {
        title: "Scripting",
        level: 90,
        features: [
          { icon: "code", label: "Gameplay systems" },
          { icon: "bolt", label: "Optimized runtime" },
          { icon: "layers", label: "Modular architecture" },
        ],
      },
    },
    "bottom-right": {
      widget: "code",
      props: {
        title: "Scripts",
        tags: ["Scalable", "Optimized"],
        language: "Lua",
        lines: [
          [{ length: 51, tone: "cool" }, { length: 40 }],
          [{ length: 32 }, { length: 6 }, { length: 4 }],
          [{ length: 30, tone: "deep" }, { length: 32 }],
          [{ length: 16 }, { length: 19, tone: "strong" }, { length: 19 }],
          [
            { length: 15, tone: "cool" },
            { length: 4, tone: "deep" },
            { length: 34 },
          ],
        ],
      },
    },
  },
  "portal-vfx": {
    "top-right": {
      widget: "metric",
      props: {
        title: "Overdraw",
        value: "1.2x",
        level: 28,
        tiers: ["Low", "Med", "High"],
        activeTier: "Low",
      },
    },
    "mid-right": {
      widget: "style",
      props: {
        title: "Effects",
        samples: [
          { id: "houdini", tone: "cool", icon: "houdini" },
          { id: "unreal", tone: "warm", icon: "unreal" },
          { id: "unity", tone: "dim", icon: "unity" },
        ],
        caption: "Real-time glow that sells the moment.",
      },
    },
    "bottom-left": {
      widget: "uiKit",
      props: {
        title: "FX Presets",
        elements: [
          {
            kind: "icon",
            id: "glow",
            icon: "sparkle",
            tone: "neutral",
            selected: true,
          },
          { kind: "icon", id: "burst", icon: "bolt", tone: "cool" },
          { kind: "icon", id: "palette", icon: "palette", tone: "neutral" },
          { kind: "swatch", id: "swatch", from: "warm", to: "cool" },
          { kind: "icon", id: "flare", icon: "sparkle", tone: "warm" },
          { kind: "icon", id: "loop", icon: "refresh", tone: "dim" },
          { kind: "icon", id: "badge", icon: "badge", tone: "dim" },
          { kind: "empty", id: "empty" },
        ],
      },
    },
    "bottom-right": {
      widget: "capability",
      props: {
        title: "Visual FX",
        level: 75,
        features: [
          { icon: "sparkle", label: "Particle effects" },
          { icon: "bolt", label: "Real-time shaders" },
          { icon: "palette", label: "Custom glow & color" },
        ],
      },
    },
  },
};
