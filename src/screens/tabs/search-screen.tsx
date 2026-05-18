import { Ionicons } from "@expo/vector-icons";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useMemo, useState } from "react";

import { ScreenShell } from "../../components/ui/screen-shell";
import { restaurants } from "../../data/restaurants";
import { MainTabParamList } from "../../navigation/app-navigator";
import { useAppTheme } from "../../state/theme-context";

export function SearchScreen({ navigation }: BottomTabScreenProps<MainTabParamList, "Search">) {
  const { colors } = useAppTheme();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return restaurants;
    }

    return restaurants.filter((restaurant) =>
      [restaurant.name, restaurant.cuisine].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [query]);

  return (
    <ScreenShell>
      <Text style={[styles.title, { color: colors.text }]}>Search</Text>
      <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Ionicons color={colors.mutedText} name="search-outline" size={20} />
        <TextInput
          onChangeText={setQuery}
          placeholder="Search restaurants or cuisines"
          placeholderTextColor={colors.mutedText}
          style={[styles.input, { color: colors.text }]}
          value={query}
        />
      </View>

      <Text style={[styles.resultLabel, { color: colors.mutedText }]}>
        {results.length} result{results.length === 1 ? "" : "s"}
      </Text>

      {results.length === 0 ? (
        <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
          <Ionicons color={colors.accent} name="search-outline" size={28} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No matches found</Text>
          <Text style={[styles.emptyBody, { color: colors.mutedText }]}>
            Try another restaurant name or cuisine.
          </Text>
        </View>
      ) : (
        results.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            activeOpacity={0.86}
            onPress={() =>
              navigation.navigate("HomeTab", {
                screen: "RestaurantDetail",
                params: {
                  restaurantId: restaurant.id,
                  restaurantName: restaurant.name,
                  price: restaurant.price,
                },
              })
            }
            style={[styles.card, { backgroundColor: colors.surface }]}
          >
            <Image source={restaurant.image} style={styles.image} />
            <View style={styles.cardBody}>
              <Text style={[styles.name, { color: colors.text }]}>{restaurant.name}</Text>
              <Text style={[styles.meta, { color: colors.mutedText }]}>
                {restaurant.cuisine} · ${restaurant.price}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 14,
    overflow: "hidden",
  },
  cardBody: {
    padding: 14,
  },
  emptyBody: {
    fontSize: 14,
    textAlign: "center",
  },
  emptyState: {
    alignItems: "center",
    borderRadius: 8,
    gap: 8,
    padding: 22,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  image: {
    height: 132,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  meta: {
    fontSize: 14,
  },
  name: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 5,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 12,
  },
  searchBar: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
    minHeight: 52,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 16,
  },
});
