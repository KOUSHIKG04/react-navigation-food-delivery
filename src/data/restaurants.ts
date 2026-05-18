export type Restaurant = {
  id: string;
  name: string;
  price: number;
  eta: string;
  cuisine: string;
  rating: number;
  accent: string;
  image: number;
  dishes: Dish[];
};

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export const restaurants: Restaurant[] = [
  {
    id: "123",
    name: "Spice Route",
    price: 18,
    eta: "25-30 min",
    cuisine: "Indian",
    rating: 4.8,
    accent: "#f97316",
    image: require("../../assets/images/restaurants/spice-route.png"),
    dishes: [
      { id: "butter-paneer", name: "Butter Paneer", description: "Creamy tomato curry with paneer.", price: 18 },
      { id: "dal-makhani", name: "Dal Makhani", description: "Slow-cooked black lentils.", price: 14 },
      { id: "veg-biryani", name: "Veg Biryani", description: "Fragrant rice with vegetables.", price: 16 },
    ],
  },
  {
    id: "456",
    name: "Urban Tandoor",
    price: 22,
    eta: "30-35 min",
    cuisine: "North Indian",
    rating: 4.6,
    accent: "#ef4444",
    image: require("../../assets/images/restaurants/urban-tandoor.png"),
    dishes: [
      { id: "tandoori-chicken", name: "Tandoori Chicken", description: "Charred chicken with spices.", price: 22 },
      { id: "chicken-tikka", name: "Chicken Tikka", description: "Boneless grilled tikka pieces.", price: 19 },
      { id: "garlic-naan", name: "Garlic Naan", description: "Fresh tandoor bread.", price: 6 },
    ],
  },
  {
    id: "789",
    name: "Green Bowl",
    price: 16,
    eta: "20-25 min",
    cuisine: "Healthy",
    rating: 4.7,
    accent: "#16a34a",
    image: require("../../assets/images/restaurants/green-bowl.png"),
    dishes: [
      { id: "grain-bowl", name: "Power Grain Bowl", description: "Quinoa, greens, avocado.", price: 16 },
      { id: "avocado-toast", name: "Avocado Toast", description: "Sourdough with herbs.", price: 12 },
      { id: "smoothie-bowl", name: "Smoothie Bowl", description: "Fruit, seeds, and granola.", price: 11 },
    ],
  },
  {
    id: "321",
    name: "Pasta Piazza",
    price: 20,
    eta: "25-30 min",
    cuisine: "Italian",
    rating: 4.5,
    accent: "#eab308",
    image: require("../../assets/images/restaurants/spice-route.png"),
    dishes: [
      { id: "alfredo", name: "Fettuccine Alfredo", description: "Cream sauce and parmesan.", price: 20 },
      { id: "arrabbiata", name: "Penne Arrabbiata", description: "Spicy tomato pasta.", price: 17 },
      { id: "tiramisu", name: "Tiramisu", description: "Coffee mascarpone dessert.", price: 9 },
    ],
  },
  {
    id: "654",
    name: "Sushi Harbor",
    price: 24,
    eta: "35-40 min",
    cuisine: "Japanese",
    rating: 4.9,
    accent: "#0ea5e9",
    image: require("../../assets/images/restaurants/green-bowl.png"),
    dishes: [
      { id: "salmon-roll", name: "Salmon Roll", description: "Salmon, avocado, rice.", price: 24 },
      { id: "miso-soup", name: "Miso Soup", description: "Tofu, wakame, scallion.", price: 7 },
      { id: "edamame", name: "Edamame", description: "Sea salt steamed soybeans.", price: 8 },
    ],
  },
];

export function getRestaurantById(id: string) {
  return restaurants.find((restaurant) => restaurant.id === id);
}
