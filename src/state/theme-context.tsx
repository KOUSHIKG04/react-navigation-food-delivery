import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { AppPalette, palettes, ThemeName } from "../constants/theme";

type ThemeContextValue = {
  colors: AppPalette;
  theme: ThemeName;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemTheme = useColorScheme();
  const [overrideTheme, setOverrideTheme] = useState<ThemeName | null>(null);
  const theme: ThemeName = overrideTheme ?? (systemTheme === "dark" ? "dark" : "light");

  const value = useMemo(
    () => ({
      colors: palettes[theme],
      theme,
      toggleTheme: () => setOverrideTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used within ThemeProvider");
  }

  return context;
}
