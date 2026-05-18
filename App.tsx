import { DarkTheme, DefaultTheme, NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider, useAppState } from "./src/state/app-context";
import { ThemeProvider, useAppTheme } from "./src/state/theme-context";
import { AppNavigator, RootStackParamList } from "./src/navigation/app-navigator";
import { getRestaurantById } from "./src/data/restaurants";

const navigationRef = createNavigationContainerRef<RootStackParamList>();

const linking = {
  prefixes: [Linking.createURL("/"), "foodapp://"],
  config: {
    screens: {
      Main: {
        screens: {
          Tabs: {
            screens: {
              HomeTab: {
                screens: {
                  RestaurantDetail: "restaurant/:restaurantId",
                },
              },
            },
          },
        },
      },
    },
  },
};

function AppShell() {
  const { hydrated, isAuthenticated, hasCompletedOnboarding } = useAppState();
  const { colors, theme } = useAppTheme();
  const [pendingRestaurantId, setPendingRestaurantId] = useState<string | null>(null);
  const handledInitialUrl = useRef(false);

  useEffect(() => {
    const rememberRestaurantLink = (url: string | null) => {
      if (!url) {
        return;
      }

      const parsed = Linking.parse(url);
      const path = parsed.path ?? "";
      const normalizedPath =
        parsed.hostname === "restaurant" ? `restaurant/${path}` : path.replace(/^\/+/, "");
      const match = normalizedPath.match(/^restaurant\/([^/]+)$/);

      if (match?.[1]) {
        setPendingRestaurantId(match[1]);
      }
    };

    Linking.getInitialURL().then((url) => {
      if (!handledInitialUrl.current) {
        rememberRestaurantLink(url);
        handledInitialUrl.current = true;
      }
    });

    const subscription = Linking.addEventListener("url", ({ url }) => rememberRestaurantLink(url));
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!hydrated || !navigationRef.isReady()) {
      return;
    }

    const targetRoute = !isAuthenticated ? "Auth" : !hasCompletedOnboarding ? "Onboarding" : "Main";
    const currentRoute = navigationRef.getCurrentRoute()?.name;

    if (currentRoute !== targetRoute) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: targetRoute }],
      });
    }
  }, [hasCompletedOnboarding, hydrated, isAuthenticated]);

  useEffect(() => {
    if (
      !hydrated ||
      !isAuthenticated ||
      !hasCompletedOnboarding ||
      !pendingRestaurantId ||
      !navigationRef.isReady()
    ) {
      return;
    }

    const linkedRestaurant = getRestaurantById(pendingRestaurantId);

    navigationRef.reset({
      index: 0,
      routes: [
        {
          name: "Main",
          params: {
            screen: "Tabs",
            params: {
              screen: "HomeTab",
              params: {
                screen: "RestaurantDetail",
                params: {
                  restaurantId: pendingRestaurantId,
                  restaurantName: linkedRestaurant?.name,
                  price: linkedRestaurant?.price,
                },
              },
            },
          },
        },
      ],
    });

    
    setPendingRestaurantId(null);
  }, [hasCompletedOnboarding, hydrated, isAuthenticated, pendingRestaurantId]);

  if (!hydrated) {
    return (
      <View style={[styles.loading, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  const navigationTheme = {
    ...(theme === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme === "dark" ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.surface,
      border: colors.border,
      primary: colors.accent,
      text: colors.text,
    },
  };

  return (
    <View style={[styles.appRoot, { backgroundColor: colors.background }]}>
      <NavigationContainer ref={navigationRef} linking={linking} theme={navigationTheme}>
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
  loading: {
    alignItems: "center",
    backgroundColor: "#fff7f4",
    flex: 1,
    justifyContent: "center",
  },
  appRoot: {
    flex: 1,
  },
});
