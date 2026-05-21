import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppButton } from "../../components/ui/app-button";
import { ScreenShell } from "../../components/ui/screen-shell";
import { HomeStackParamList } from "../../navigation/app-navigator";
import { useAppState } from "../../state/app-context";
import { useAppTheme } from "../../state/theme-context";

export function CartScreen({
  navigation,
  route,
}: NativeStackScreenProps<HomeStackParamList, "Cart">) {
  const { cartItems, cartTotal, decreaseQuantity, increaseQuantity } = useAppState();
  const { colors } = useAppTheme();

  return (
    <ScreenShell contentStyle={styles.content} safeTop={false}>
      <Text style={[styles.title, { color: colors.text }]}>Cart</Text>
      {cartItems.map((item) => (
        <View key={item.dishId} style={[styles.lineItem, { backgroundColor: colors.surface }]}>
          <View>
            <Text style={[styles.name, { color: colors.text }]}>{item.dishName}</Text>
            <Text style={[styles.meta, { color: colors.mutedText }]}>{item.restaurantName}</Text>
          </View>
          <View style={styles.lineRight}>
            <Text style={[styles.amount, { color: colors.text }]}>${item.price * item.quantity}</Text>
            <View style={[styles.quantityControl, { backgroundColor: colors.accentSoft }]}>
              <TouchableOpacity onPress={() => decreaseQuantity(item.dishId)}>
                <Text style={[styles.quantityAction, { color: colors.accent }]}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.quantityValue, { color: colors.text }]}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => increaseQuantity(item.dishId)}>
                <Text style={[styles.quantityAction, { color: colors.accent }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
      <View style={[styles.totalRow, { borderTopColor: colors.border }]}>
        <Text style={[styles.totalLabel, { color: colors.mutedText }]}>Total</Text>
        <Text style={[styles.totalAmount, { color: colors.accent }]}>${cartTotal}</Text>
      </View>
      <View style={styles.actionsRow}>
        <AppButton
          icon="add-circle-outline"
          label="Add More"
          onPress={() => navigation.goBack()}
          secondary
          style={styles.actionButton}
        />
        <AppButton
          icon="home-outline"
          label="Home"
          onPress={() => navigation.replace("Home")}
          style={styles.actionButton}
        />
        <AppButton
          icon="refresh-outline"
          label="Reset"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          }
          secondary
          style={styles.actionButton}
        />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    flex: 1,
    minHeight: 46,
    paddingHorizontal: 8,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: "auto",
    paddingTop: 20,
  },
  content: {
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: "800",
  },
  lineItem: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    padding: 16,
  },
  lineRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  meta: {
    fontSize: 14,
    marginTop: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  quantityAction: {
    fontSize: 20,
    fontWeight: "800",
    minWidth: 22,
    textAlign: "center",
  },
  quantityControl: {
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    gap: 8,
    minHeight: 36,
    paddingHorizontal: 10,
  },
  quantityValue: {
    fontSize: 15,
    fontWeight: "800",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "800",
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
  totalRow: {
    alignItems: "center",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    marginTop: 6,
    paddingTop: 16,
  },
});
