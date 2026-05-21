import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { ScreenShell } from "../../components/ui/screen-shell";
import { useAppState } from "../../state/app-context";
import { useAppTheme } from "../../state/theme-context";

export function MyOrdersScreen() {
  const { deliveredOrders } = useAppState();
  const { colors } = useAppTheme();

  return (
    <ScreenShell safeTop={false}>
      <Text style={[styles.title, { color: colors.text }]}>My Orders</Text>
      {deliveredOrders.length === 0 ? (
        <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
          <Ionicons color={colors.accent} name="bag-check-outline" size={32} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No delivered orders</Text>
          <Text style={[styles.body, { color: colors.mutedText }]}>
            Mark an active order as delivered and it will appear here.
          </Text>
        </View>
      ) : (
        deliveredOrders.map((order) => (
          <View key={order.id} style={[styles.orderCard, { backgroundColor: colors.surface }]}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={[styles.orderTitle, { color: colors.text }]}>Delivered order</Text>
                <Text style={[styles.orderTime, { color: colors.mutedText }]}>{order.deliveredAt}</Text>
              </View>
              <Text style={[styles.total, { color: colors.accent }]}>${order.total}</Text>
            </View>
            {order.items.map((item) => (
              <Text key={item.dishId} style={[styles.itemText, { color: colors.mutedText }]}>
                {item.quantity}x {item.dishName} from {item.restaurantName}
              </Text>
            ))}
          </View>
        ))
      )}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: {
    color: "#4b5563",
    fontSize: 16,
    lineHeight: 23,
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
  },
  itemText: {
    fontSize: 14,
    lineHeight: 21,
  },
  orderCard: {
    borderRadius: 8,
    gap: 8,
    marginBottom: 12,
    padding: 16,
  },
  orderHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  orderTime: {
    fontSize: 13,
    marginTop: 4,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  title: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: "800",
  },
});
