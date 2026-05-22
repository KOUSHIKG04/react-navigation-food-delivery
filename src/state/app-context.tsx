import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

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

type AppContextValue = {
  isReady: boolean;
  isLoggedIn: boolean;
  hasSeenOnboarding: boolean;
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  deliveredOrders: DeliveredOrder[];
  login: () => void;
  logout: () => void;
  finishOnboarding: () => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increaseQuantity: (dishId: string) => void;
  decreaseQuantity: (dishId: string) => void;
  clearCart: () => void;
  deliverOrder: () => void;
};

const LOGIN_KEY = "demo.isLoggedIn";
const ONBOARDING_KEY = "demo.hasSeenOnboarding";
const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<DeliveredOrder[]>([]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    async function loadDemoState() {
      const savedLogin = await AsyncStorage.getItem(LOGIN_KEY);
      const savedOnboarding = await AsyncStorage.getItem(ONBOARDING_KEY);

      setIsLoggedIn(savedLogin === "true");
      setHasSeenOnboarding(savedOnboarding === "true");
      setIsReady(true);
    }

    loadDemoState();
  }, []);

  function login() {
    setIsLoggedIn(true);
    setHasSeenOnboarding(false);
    AsyncStorage.setItem(LOGIN_KEY, "true");
    AsyncStorage.setItem(ONBOARDING_KEY, "false");
  }

  function logout() {
    setIsLoggedIn(false);
    setHasSeenOnboarding(false);
    setCartItems([]);
    setDeliveredOrders([]);
    AsyncStorage.setItem(LOGIN_KEY, "false");
    AsyncStorage.setItem(ONBOARDING_KEY, "false");
  }

  function finishOnboarding() {
    setHasSeenOnboarding(true);
    AsyncStorage.setItem(ONBOARDING_KEY, "true");
  }

  function addToCart(item: Omit<CartItem, "quantity">) {
    const itemInCart = cartItems.find((cartItem) => cartItem.dishId === item.dishId);

    if (!itemInCart) {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      return;
    }

    increaseQuantity(item.dishId);
  }

  function increaseQuantity(dishId: string) {
    setCartItems(
      cartItems.map((item) =>
        item.dishId === dishId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decreaseQuantity(dishId: string) {
    const nextCart = cartItems
      .map((item) => (item.dishId === dishId ? { ...item, quantity: item.quantity - 1 } : item))
      .filter((item) => item.quantity > 0);

    setCartItems(nextCart);
  }

  function clearCart() {
    setCartItems([]);
  }

  function deliverOrder() {
    if (cartItems.length === 0) {
      return;
    }

    const newOrder = {
      id: Date.now().toString(),
      items: cartItems,
      deliveredAt: new Date().toLocaleString(),
      total: cartTotal,
    };

    setDeliveredOrders([newOrder, ...deliveredOrders]);
    clearCart();
  }

  return (
    <AppContext.Provider
      value={{
        isReady,
        isLoggedIn,
        hasSeenOnboarding,
        cartItems,
        cartCount,
        cartTotal,
        deliveredOrders,
        login,
        logout,
        finishOnboarding,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        deliverOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppState must be used inside AppProvider");
  }

  return context;
}
