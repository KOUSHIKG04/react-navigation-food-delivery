import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../../components/ui/app-button";
import { ScreenShell } from "../../components/ui/screen-shell";
import { useAppState } from "../../state/app-context";
import { useAppTheme } from "../../state/theme-context";

export function OrdersScreen() {
  const { cartItems, cartTotal, deliverOrder } = useAppState();
  const { colors } = useAppTheme();

  return (
    <ScreenShell>
      <Text style={[styles.title, { color: colors.text }]}>Orders</Text>
      {cartItems.length === 0 ? (
        <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
          <Ionicons color={colors.accent} name="receipt-outline" size={34} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No active orders</Text>
          <Text style={[styles.emptyBody, { color: colors.mutedText }]}>Add dishes from a restaurant and they will appear here.</Text>
        </View>
      ) : (
        <>
          {cartItems.map((item) => (
            <View key={item.dishId} style={[styles.orderCard, { backgroundColor: colors.surface }]}>
              <View>
                <Text style={[styles.restaurantName, { color: colors.text }]}>{item.dishName}</Text>
                <Text style={[styles.meta, { color: colors.mutedText }]}>
                  {item.restaurantName} · {item.quantity} item{item.quantity > 1 ? "s" : ""}
                </Text>
              </View>
              <Text style={[styles.amount, { color: colors.text }]}>${item.price * item.quantity}</Text>
            </View>
          ))}
          <View style={styles.summary}>
            <Text style={[styles.summaryLabel, { color: colors.mutedText }]}>Current total</Text>
            <Text style={[styles.summaryAmount, { color: colors.accent }]}>${cartTotal}</Text>
          </View>
          <AppButton icon="checkmark-circle-outline" label="Mark Delivered" onPress={deliverOrder} />
        </>
      )}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  amount: {
    fontSize: 16,
    fontWeight: "800",
  },
  emptyBody: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  emptyState: {
    alignItems: "center",
    borderRadius: 8,
    gap: 8,
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
  },
  meta: {
    fontSize: 14,
    marginTop: 4,
  },
  orderCard: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    padding: 16,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "800",
  },
  summary: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    marginTop: 8,
  },
  summaryAmount: {
    fontSize: 22,
    fontWeight: "800",
  },
  summaryLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
  },
});
