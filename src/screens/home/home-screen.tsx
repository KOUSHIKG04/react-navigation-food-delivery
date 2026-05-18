import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScreenShell } from "../../components/ui/screen-shell";
import { restaurants } from "../../data/restaurants";
import { HomeStackParamList } from "../../navigation/app-navigator";
import { useAppTheme } from "../../state/theme-context";

export function HomeScreen({ navigation }: NativeStackScreenProps<HomeStackParamList, "Home">) {
  const { colors } = useAppTheme();

  return (
    <ScreenShell safeTop={false}>
      <View style={[styles.hero, { backgroundColor: colors.hero }]}>
        <Text style={styles.kicker}>Delivering to</Text>
        <Text style={styles.heroTitle}>Kolkata, Sector 5</Text>
        <Text style={styles.heroSubtitle}>Top kitchens near you are ready now.</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular restaurants</Text>
      {restaurants.map((restaurant) => (
        <TouchableOpacity
          key={restaurant.id}
          activeOpacity={0.86}
          onPress={() =>
            navigation.navigate("RestaurantDetail", {
              restaurantId: restaurant.id,
              restaurantName: restaurant.name,
              price: restaurant.price,
            })
          }
          style={[styles.card, { backgroundColor: colors.surface }]}
        >
          <Image source={restaurant.image} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={[styles.restaurantName, { color: colors.text }]}>{restaurant.name}</Text>
            <Text style={[styles.meta, { color: colors.mutedText }]}>
              {restaurant.cuisine} · ${restaurant.price}
            </Text>
            <View style={styles.detailsRow}>
              <View style={styles.detail}>
                <Ionicons color="#f59e0b" name="star" size={14} />
                <Text style={[styles.detailText, { color: colors.mutedText }]}>{restaurant.rating}</Text>
              </View>
              <View style={styles.detail}>
                <Ionicons color="#6b7280" name="time-outline" size={14} />
                <Text style={[styles.detailText, { color: colors.mutedText }]}>{restaurant.eta}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 14,
    overflow: "hidden",
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  detail: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  detailText: {
    color: "#4b5563",
    fontSize: 13,
    fontWeight: "600",
  },
  detailsRow: {
    flexDirection: "row",
    gap: 14,
  },
  image: {
    height: 154,
    width: "100%",
  },
  hero: {
    backgroundColor: "#111827",
    borderRadius: 8,
    marginBottom: 22,
    padding: 18,
  },
  heroSubtitle: {
    color: "#d1d5db",
    fontSize: 14,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
  },
  kicker: {
    color: "#fca5a5",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  meta: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 10,
  },
  restaurantName: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 14,
  },
});
