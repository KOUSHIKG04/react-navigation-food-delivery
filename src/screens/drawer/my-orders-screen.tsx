import { StyleSheet, Text } from "react-native";

import { ScreenShell } from "../../components/ui/screen-shell";
import { useAppTheme } from "../../state/theme-context";

export function MyOrdersScreen() {
  const { colors } = useAppTheme();

  return (
    <ScreenShell safeTop={false}>
      <Text style={[styles.title, { color: colors.text }]}>My Orders</Text>
      <Text style={[styles.body, { color: colors.mutedText }]}>Past deliveries and receipts will be listed here.</Text>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: {
    color: "#4b5563",
    fontSize: 16,
  },
  title: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
});
