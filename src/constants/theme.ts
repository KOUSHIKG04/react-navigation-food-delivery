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
