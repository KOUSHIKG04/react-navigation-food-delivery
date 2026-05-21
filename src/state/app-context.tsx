import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

type AppContextValue = {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  deliveredOrders: DeliveredOrder[];
  hasCompletedOnboarding: boolean;
  hydrated: boolean;
  isAuthenticated: boolean;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  decreaseQuantity: (dishId: string) => void;
  deliverOrder: () => void;
  increaseQuantity: (dishId: string) => void;
  clearCart: () => void;
  completeOnboarding: () => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

export type CartItem = {
  dishId: string;
  dishName: string;
  restaurantId: string;
  restaurantName: string;
  price: number;
  quantity: number;
};

export type DeliveredOrder = {
  id: string;
  items: CartItem[];
  deliveredAt: string;
  total: number;
};

const AUTH_KEY = "foodapp.auth";
const ONBOARDING_KEY = "foodapp.onboarding";
const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [hydrated, setHydrated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<DeliveredOrder[]>([]);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    async function hydrate() {
      const [storedAuth, storedOnboarding] = await Promise.all([
        AsyncStorage.getItem(AUTH_KEY),
        AsyncStorage.getItem(ONBOARDING_KEY),
      ]);

      setIsAuthenticated(storedAuth === "true");
      setHasCompletedOnboarding(storedOnboarding === "true");
      setHydrated(true);
    }

    hydrate();
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      addToCart: (item) =>
        setCartItems((items) => {
          const existingItem = items.find((cartItem) => cartItem.dishId === item.dishId);

          if (!existingItem) {
            return [...items, { ...item, quantity: 1 }];
          }

          return items.map((cartItem) =>
            cartItem.dishId === item.dishId
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          );
        }),
      cartItems,
      cartCount,
      cartTotal,
      clearCart: () => setCartItems([]),
      decreaseQuantity: (dishId) =>
        setCartItems((items) =>
          items
            .map((item) =>
              item.dishId === dishId ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter((item) => item.quantity > 0),
        ),
      deliverOrder: () => {
        if (cartItems.length === 0) {
          return;
        }

        setDeliveredOrders((orders) => [
          {
            deliveredAt: new Date().toLocaleString(),
            id: `order-${Date.now()}`,
            items: cartItems,
            total: cartTotal,
          },
          ...orders,
        ]);
        setCartItems([]);
      },
      deliveredOrders,
      completeOnboarding: async () => {
        setHasCompletedOnboarding(true);
        await AsyncStorage.setItem(ONBOARDING_KEY, "true");
      },
      hasCompletedOnboarding,
      hydrated,
      isAuthenticated,
      login: async () => {
        setIsAuthenticated(true);
        setHasCompletedOnboarding(false);
        await Promise.all([
          AsyncStorage.setItem(AUTH_KEY, "true"),
          AsyncStorage.removeItem(ONBOARDING_KEY),
        ]);
      },
      increaseQuantity: (dishId) =>
        setCartItems((items) =>
          items.map((item) =>
            item.dishId === dishId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        ),
      logout: async () => {
        setCartItems([]);
        setDeliveredOrders([]);
        setIsAuthenticated(false);
        setHasCompletedOnboarding(false);
        await Promise.all([AsyncStorage.removeItem(AUTH_KEY), AsyncStorage.removeItem(ONBOARDING_KEY)]);
      },
    }),
    [cartCount, cartItems, cartTotal, deliveredOrders, hasCompletedOnboarding, hydrated, isAuthenticated],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppState must be used within AppProvider");
  }

  return context;
}
