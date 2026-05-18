export const palettes = {
  light: {
    background: "#f7f4ef",
    surface: "#ffffff",
    surfaceAlt: "#efe8dd",
    text: "#171717",
    mutedText: "#625d57",
    border: "#ddd3c7",
    accent: "#d64c2f",
    accentSoft: "#f7ddd5",
    hero: "#22201f",
    heroText: "#fffaf5",
  },
  dark: {
    background: "#151311",
    surface: "#211e1b",
    surfaceAlt: "#2d2823",
    text: "#f8f4ef",
    mutedText: "#c4b8ab",
    border: "#3a342f",
    accent: "#ff7a59",
    accentSoft: "#40241d",
    hero: "#0d0c0b",
    heroText: "#fffaf5",
  },
} as const;

export type ThemeName = keyof typeof palettes;
export type AppPalette = (typeof palettes)[ThemeName];

export const Colors = {
  light: {
    text: palettes.light.text,
    background: palettes.light.background,
    backgroundElement: palettes.light.surface,
    backgroundSelected: palettes.light.surfaceAlt,
    textSecondary: palettes.light.mutedText,
  },
  dark: {
    text: palettes.dark.text,
    background: palettes.dark.background,
    backgroundElement: palettes.dark.surface,
    backgroundSelected: palettes.dark.surfaceAlt,
    textSecondary: palettes.dark.mutedText,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = {
  sans: "system",
  serif: "serif",
  rounded: "system",
  mono: "monospace",
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;
