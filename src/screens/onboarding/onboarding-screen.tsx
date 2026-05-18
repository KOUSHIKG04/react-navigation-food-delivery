import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

import { AppButton } from "../../components/ui/app-button";
import { ScreenShell } from "../../components/ui/screen-shell";
import { useAppState } from "../../state/app-context";
import { useAppTheme } from "../../state/theme-context";

export function OnboardingScreen() {
  const { completeOnboarding } = useAppState();
  const { colors } = useAppTheme();
  const { height } = useWindowDimensions();
  const isCompact = height < 720;

  async function handleStart() {
    await completeOnboarding();
  }

  return (
    <ScreenShell contentStyle={[styles.content, isCompact && styles.compactContent]}>
      <View style={styles.header}>
        <Text style={[styles.brand, { color: colors.text }]}>PlateDrop</Text>
        <Text style={[styles.kicker, { color: colors.accent }]}>Food delivery</Text>
      </View>

      <View style={styles.statement}>
        <Text style={[styles.title, { color: colors.text }]}>Pick.</Text>
        <Text style={[styles.title, { color: colors.text }]}>Add.</Text>
        <Text style={[styles.title, { color: colors.accent }]}>Track.</Text>
      </View>

      <View style={styles.route}>
        <RouteItem icon="storefront-outline" label="Restaurants" colors={colors} />
        <View style={[styles.connector, { backgroundColor: colors.border }]} />
        <RouteItem icon="restaurant-outline" label="Dishes" colors={colors} />
        <View style={[styles.connector, { backgroundColor: colors.border }]} />
        <RouteItem icon="receipt-outline" label="Orders" colors={colors} />
      </View>

      <Text style={[styles.subtitle, { color: colors.mutedText }]}>
        One clean flow from discovery to delivery.
      </Text>

      <View style={styles.footer}>
        <AppButton
          icon="arrow-forward"
          label="Get Started"
          onPress={handleStart}
        />
      </View>
    </ScreenShell>
  );
}

function RouteItem({
  colors,
  icon,
  label,
}: {
  colors: ReturnType<typeof useAppTheme>["colors"];
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <View style={styles.routeItem}>
      <Ionicons color={colors.text} name={icon} size={22} />
      <Text style={[styles.routeLabel, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  brand: {
    fontSize: 20,
    fontWeight: "900",
  },
  compactContent: {
    justifyContent: "center",
  },
  connector: {
    height: 1,
    flex: 1,
  },
  content: {
    gap: 26,
    justifyContent: "center",
  },
  footer: {
    marginTop: 8,
    width: "100%",
  },
  header: {
    alignItems: "center",
    gap: 6,
  },
  kicker: {
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  route: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  routeItem: {
    alignItems: "center",
    gap: 8,
  },
  routeLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  statement: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "900",
    lineHeight: 46,
  },
});
