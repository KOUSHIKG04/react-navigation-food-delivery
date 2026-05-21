import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScreenShell } from "../../components/ui/screen-shell";
import { ProfileStackParamList } from "../../navigation/app-navigator";
import { useAppState } from "../../state/app-context";
import { useAppTheme } from "../../state/theme-context";

type ProfileScreenProps = NativeStackScreenProps<ProfileStackParamList, "ProfileHome">;

const actions = [
  { icon: "receipt-outline", label: "My Orders", route: "MyOrders" },
  { icon: "settings-outline", label: "Settings", route: "Settings" },
  { icon: "help-circle-outline", label: "Help", route: "Help" },
] as const;

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { logout } = useAppState();
  const { colors, theme, toggleTheme } = useAppTheme();

  return (
    <ScreenShell>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.getParent()?.getParent()?.dispatch(DrawerActions.openDrawer())}
          style={[styles.drawerButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Ionicons color={colors.text} name="menu-outline" size={22} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.body, { color: colors.mutedText }]}>Manage account details, orders, and support.</Text>
      <View style={[styles.card, { backgroundColor: colors.hero }]}>
        <Image source={{ uri: "https://i.pravatar.cc/120?img=12" }} style={styles.avatar} />
        <View style={styles.identity}>
          <Text style={styles.name}>Koushik G</Text>
          <Text style={styles.email}>koushik@example.com</Text>
        </View>
      </View>
      <View style={styles.list}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.route}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(action.route)}
            style={[styles.row, { backgroundColor: colors.surface }]}
          >
            <View style={styles.rowLeft}>
              <Ionicons color="#dc2626" name={action.icon} size={20} />
              <Text style={[styles.rowLabel, { color: colors.text }]}>{action.label}</Text>
            </View>
            <Ionicons color="#9ca3af" name="chevron-forward" size={18} />
          </TouchableOpacity>
        ))}
        <View style={styles.themeBlock}>
          <Text style={[styles.themeLabel, { color: colors.mutedText }]}>Theme</Text>
          <View style={[styles.themeToggle, { backgroundColor: colors.surface }]}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => theme === "dark" && toggleTheme()}
              style={[
                styles.themeOption,
                theme === "light" && { backgroundColor: colors.accent },
              ]}
            >
              <Ionicons color={theme === "light" ? "#ffffff" : colors.text} name="sunny-outline" size={18} />
              <Text style={[styles.themeButtonText, { color: theme === "light" ? "#ffffff" : colors.text }]}>
                Light
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => theme === "light" && toggleTheme()}
              style={[
                styles.themeOption,
                theme === "dark" && { backgroundColor: colors.accent },
              ]}
            >
              <Ionicons color={theme === "dark" ? "#ffffff" : colors.text} name="moon-outline" size={18} />
              <Text style={[styles.themeButtonText, { color: theme === "dark" ? "#ffffff" : colors.text }]}>
                Dark
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={logout} style={[styles.row, { backgroundColor: colors.surface }]}>
          <View style={styles.rowLeft}>
            <Ionicons color="#dc2626" name="log-out-outline" size={20} />
            <Text style={[styles.rowLabel, { color: colors.text }]}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  body: {
    color: "#4b5563",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 18,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    padding: 18,
  },
  email: {
    color: "#d1d5db",
    fontSize: 14,
  },
  drawerButton: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  name: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },
  identity: {
    alignItems: "flex-end",
  },
  title: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "800",
  },
  list: {
    gap: 12,
  },
  row: {
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 62,
    paddingHorizontal: 20,
  },
  rowLabel: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
  },
  rowLeft: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  themeBlock: {
    marginTop: 12,
  },
  themeButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },
  themeOption: {
    alignItems: "center",
    borderRadius: 999,
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 52,
  },
  themeToggle: {
    borderRadius: 999,
    flexDirection: "row",
    padding: 4,
  },
  themeLabel: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
    marginLeft: 4,
  },
});
