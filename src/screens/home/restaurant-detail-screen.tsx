import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppButton } from "../../components/ui/app-button";
import { ScreenShell } from "../../components/ui/screen-shell";
import { getRestaurantById } from "../../data/restaurants";
import { HomeStackParamList } from "../../navigation/app-navigator";
import { useAppState } from "../../state/app-context";
import { useAppTheme } from "../../state/theme-context";

export function RestaurantDetailScreen({
  navigation,
  route,
}: NativeStackScreenProps<HomeStackParamList, "RestaurantDetail">) {
  const { addToCart, cartItems, decreaseQuantity, increaseQuantity } = useAppState();
  const { colors } = useAppTheme();
  const linkedRestaurant = getRestaurantById(route.params.restaurantId);
  const restaurantName =
    route.params.restaurantName ?? linkedRestaurant?.name ?? `Restaurant ${route.params.restaurantId}`;
  const price = route.params.price ?? linkedRestaurant?.price ?? 0;

  return (
    <ScreenShell safeTop={false}>
      {linkedRestaurant ? <Image source={linkedRestaurant.image} style={styles.image} /> : null}
      <View style={[styles.banner, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cuisine, { color: colors.accent }]}>{linkedRestaurant?.cuisine ?? "Featured kitchen"}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{restaurantName}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>Choose from several dishes and build your cart.</Text>
      </View>

      <Text style={[styles.menuTitle, { color: colors.text }]}>Menu</Text>
      {linkedRestaurant?.dishes.map((dish) => {
        const cartItem = cartItems.find((item) => item.dishId === dish.id);

        return (
          <View key={dish.id} style={[styles.dishCard, { backgroundColor: colors.surface }]}>
            <View style={styles.dishCopy}>
              <Text style={[styles.dishName, { color: colors.text }]}>{dish.name}</Text>
              <Text style={[styles.dishDescription, { color: colors.mutedText }]}>{dish.description}</Text>
              <Text style={[styles.dishPrice, { color: colors.accent }]}>${dish.price}</Text>
            </View>
            {cartItem ? (
              <View style={[styles.quantityControl, { backgroundColor: colors.accentSoft }]}>
                <TouchableOpacity onPress={() => decreaseQuantity(dish.id)}>
                  <Text style={[styles.quantityAction, { color: colors.accent }]}>-</Text>
                </TouchableOpacity>
                <Text style={[styles.quantityValue, { color: colors.text }]}>{cartItem.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(dish.id)}>
                  <Text style={[styles.quantityAction, { color: colors.accent }]}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                  addToCart({
                    dishId: dish.id,
                    dishName: dish.name,
                    restaurantId: route.params.restaurantId,
                    restaurantName,
                    price: dish.price,
                  })
                }
                style={[styles.addButton, { backgroundColor: colors.accent }]}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}

      <AppButton
        icon="cart-outline"
        label="View Cart"
        onPress={() => navigation.navigate("Cart", { restaurantName, price })}
      />
      <AppButton icon="arrow-back" label="Go Back" onPress={() => navigation.goBack()} secondary style={styles.gap} />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: "center",
    borderRadius: 999,
    justifyContent: "center",
    minHeight: 38,
    minWidth: 72,
    paddingHorizontal: 14,
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "800",
  },
  banner: {
    borderRadius: 8,
    marginBottom: 16,
    padding: 18,
  },
  cuisine: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  dishCard: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    padding: 16,
  },
  dishCopy: {
    flex: 1,
    paddingRight: 12,
  },
  dishDescription: {
    fontSize: 14,
    marginBottom: 6,
  },
  dishName: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  dishPrice: {
    fontSize: 15,
    fontWeight: "800",
  },
  gap: {
    marginTop: 12,
  },
  image: {
    borderRadius: 8,
    height: 220,
    marginBottom: 16,
    width: "100%",
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },
  quantityAction: {
    fontSize: 22,
    fontWeight: "800",
    minWidth: 24,
    textAlign: "center",
  },
  quantityControl: {
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    gap: 10,
    minHeight: 40,
    paddingHorizontal: 12,
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: "800",
    minWidth: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
});
