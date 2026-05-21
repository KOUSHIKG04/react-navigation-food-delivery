import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { NavigatorScreenParams, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppState } from "../state/app-context";
import { LoginScreen } from "../screens/auth/login-screen";
import { HelpScreen } from "../screens/drawer/help-screen";
import { MyOrdersScreen } from "../screens/drawer/my-orders-screen";
import { SettingsScreen } from "../screens/drawer/settings-screen";
import { CartScreen } from "../screens/home/cart-screen";
import { HomeScreen } from "../screens/home/home-screen";
import { RestaurantDetailScreen } from "../screens/home/restaurant-detail-screen";
import { OnboardingScreen } from "../screens/onboarding/onboarding-screen";
import { OrdersScreen } from "../screens/tabs/orders-screen";
import { ProfileScreen } from "../screens/tabs/profile-screen";
import { SearchScreen } from "../screens/tabs/search-screen";
import { useAppTheme } from "../state/theme-context";

export type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  Main: NavigatorScreenParams<MainDrawerParamList>;
};

export type HomeStackParamList = {
  Home: undefined;
  RestaurantDetail: { restaurantId: string; restaurantName?: string; price?: number };
  Cart: { restaurantName: string; price: number };
};

type AuthStackParamList = {
  Login: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  Search: undefined;
  Orders: undefined;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  MyOrders: undefined;
  Settings: undefined;
  Help: undefined;
};

export type MainDrawerParamList = {
  Tabs: NavigatorScreenParams<MainTabParamList>;
  MyOrders: undefined;
  Settings: undefined;
  Help: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();
const Drawer = createDrawerNavigator<MainDrawerParamList>();

function AuthNavigator() {
  const { colors } = useAppTheme();

  return (
    <AuthStack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        contentStyle: { backgroundColor: colors.background },
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

function RestaurantStackNavigator() {
  const { colors } = useAppTheme();

  return (
    <HomeStack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        contentStyle: { backgroundColor: colors.background },
        headerBackTitle: "Back",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { color: colors.text, fontWeight: "800" },
        headerTintColor: colors.text,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerTitle: "Food Delivery" }} />
      <HomeStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={{ headerTitle: "Restaurant Detail" }}
      />
      <HomeStack.Screen name="Cart" component={CartScreen} options={{ headerTitle: "Cart" }} />
    </HomeStack.Navigator>
  );
}

function MainTabs() {
  const { cartCount } = useAppState();
  const { colors } = useAppTheme();

  return (
    <Tabs.Navigator
      detachInactiveScreens={false}
      screenOptions={({ route }) => ({
        headerShown: false,
        lazy: false,
        sceneStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.accent,
        tabBarBadgeStyle: { backgroundColor: colors.hero },
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            HomeTab: "home-outline",
            Search: "search-outline",
            Orders: "receipt-outline",
            Profile: "person-outline",
          } as const;

          return <Ionicons color={color} name={icons[route.name]} size={size} />;
        },
      })}
    >
      <Tabs.Screen
        name="HomeTab"
        component={RestaurantStackNavigator}
        options={({ route }) => {
          const nestedRoute = getFocusedRouteNameFromRoute(route);
          const hidden = nestedRoute === "RestaurantDetail" || nestedRoute === "Cart";

          return {
            tabBarLabel: "Home",
            tabBarStyle: hidden
              ? { display: "none" }
              : {
                  backgroundColor: colors.surface,
                  borderTopColor: colors.border,
                },
          };
        }}
      />
      <Tabs.Screen name="Search" component={SearchScreen} />
      <Tabs.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ tabBarBadge: cartCount > 0 ? cartCount : undefined }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tabs.Navigator>
  );
}

function ProfileStackNavigator() {
  const { colors } = useAppTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        contentStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { color: colors.text, fontWeight: "800" },
        headerTintColor: colors.text,
      }}
    >
      <ProfileStack.Screen
        name="ProfileHome"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen name="MyOrders" component={MyOrdersScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="Help" component={HelpScreen} />
    </ProfileStack.Navigator>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { logout } = useAppState();
  const { colors } = useAppTheme();
  const drawerItems = [
    {
      icon: "receipt-outline",
      label: "My Orders",
      onPress: () => props.navigation.navigate("MyOrders"),
    },
    {
      icon: "settings-outline",
      label: "Settings",
      onPress: () => props.navigation.navigate("Settings"),
    },
    {
      icon: "help-circle-outline",
      label: "Help",
      onPress: () => props.navigation.navigate("Help"),
    },
    {
      icon: "log-out-outline",
      label: "Logout",
      onPress: logout,
    },
  ] as const;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => props.navigation.navigate("Tabs", { screen: "Profile" })}
        style={[styles.drawerProfile, { backgroundColor: colors.surface }]}
      >
        <Image source={{ uri: "https://i.pravatar.cc/120?img=12" }} style={styles.avatar} />
        <Text style={[styles.drawerName, { color: colors.text }]}>Koushik G</Text>
        <Text style={[styles.drawerEmail, { color: colors.mutedText }]}>koushik@example.com</Text>
      </TouchableOpacity>
      <View style={styles.drawerList}>
        {drawerItems.map((item) => (
          <TouchableOpacity
            activeOpacity={0.84}
            key={item.label}
            onPress={item.onPress}
            style={[styles.drawerPill, { backgroundColor: colors.surface }]}
          >
            <View style={styles.drawerPillLeft}>
              <Ionicons color={colors.accent} name={item.icon} size={20} />
              <Text style={[styles.drawerPillLabel, { color: colors.text }]}>{item.label}</Text>
            </View>
            <Ionicons color={colors.mutedText} name="chevron-forward" size={18} />
          </TouchableOpacity>
        ))}
      </View>
    </DrawerContentScrollView>
  );
}

function MainDrawer() {
  const { colors } = useAppTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: colors.accentSoft,
        drawerActiveTintColor: colors.accent,
        drawerInactiveTintColor: colors.text,
        drawerStyle: { backgroundColor: colors.background },
        drawerLabelStyle: { fontWeight: "700" },
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { color: colors.text, fontWeight: "800" },
        headerTintColor: colors.text,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen name="Tabs" component={MainTabs} options={{ headerShown: false }} />
      <Drawer.Screen name="MyOrders" component={MyOrdersScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
    </Drawer.Navigator>
  );
}

export function AppNavigator() {
  const { colors } = useAppTheme();

  return (
    <RootStack.Navigator
      screenOptions={{
        animation: "none",
        contentStyle: { backgroundColor: colors.background },
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      <RootStack.Screen name="Main" component={MainDrawer} />
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 30,
    height: 60,
    marginBottom: 12,
    width: 60,
  },
  drawerContent: {
    flex: 1,
  },
  drawerEmail: {
    fontSize: 13,
  },
  drawerName: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  drawerPill: {
    alignItems: "center",
    borderRadius: 999,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 56,
    paddingHorizontal: 18,
  },
  drawerPillLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
  drawerPillLeft: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  drawerProfile: {
    marginBottom: 12,
    padding: 20,
  },
  drawerList: {
    gap: 12,
    paddingHorizontal: 12,
  },
});
