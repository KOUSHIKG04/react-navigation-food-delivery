import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/app-navigator";
import { AppProvider } from "./src/state/app-context";
import { ThemeProvider, useAppTheme } from "./src/state/theme-context";

function AppShell() {
  const { colors, theme } = useAppTheme();
  const baseTheme = theme === "dark" ? DarkTheme : DefaultTheme;

  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: colors.background,
      card: colors.surface,
      border: colors.border,
      primary: colors.accent,
      text: colors.text,
    },
  };

  return (
    <View style={[styles.appRoot, { backgroundColor: colors.background }]}>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar backgroundColor={colors.hero} style="light" />
        <AppNavigator />
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppProvider>
          <AppShell />
        </AppProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
  },
});
