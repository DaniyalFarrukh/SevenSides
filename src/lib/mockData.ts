export type Branch = {
  id: string;
  name: string;
  phone: string;
  isOpen: boolean;
  minOrder: number;
  deliveryFee: number;
  lat: number;
  lng: number;
};

export type MenuItemVariant = {
  name: string;
  price: number;
};

export type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  isPopular?: boolean;
  variants?: MenuItemVariant[];
};

export type Category = {
  id: string;
  name: string;
};

export const MOCK_BRANCHES: Branch[] = [
  { id: "1", name: "Model Town", phone: "0303 4877017", isOpen: true, minOrder: 500, deliveryFee: 100, lat: 31.48, lng: 74.32 },
  { id: "2", name: "Girja Chowk Cantt", phone: "0322 7694926", isOpen: true, minOrder: 800, deliveryFee: 150, lat: 31.52, lng: 74.39 },
  { id: "3", name: "DHA Phase 5", phone: "0319 6481040", isOpen: true, minOrder: 1000, deliveryFee: 200, lat: 31.46, lng: 74.42 },
  { id: "4", name: "Lake City", phone: "0370 7743936", isOpen: true, minOrder: 1500, deliveryFee: 250, lat: 31.35, lng: 74.22 },
];

export type DeliveryRegion = {
  id: string;
  name: string;
  branchId: string;
};

export const MOCK_DELIVERY_REGIONS: DeliveryRegion[] = [
  { id: "r1", name: "Askari", branchId: "2" },
  { id: "r2", name: "Gulberg", branchId: "1" },
  { id: "r3", name: "Johar Town", branchId: "1" },
  { id: "r4", name: "DHA", branchId: "3" },
  { id: "r5", name: "Model Town", branchId: "1" },
  { id: "r6", name: "Cantt", branchId: "2" },
  { id: "r7", name: "Wapda Town", branchId: "4" },
  { id: "r8", name: "Bahria Town", branchId: "4" },
  { id: "r9", name: "Garden Town", branchId: "1" },
  { id: "r10", name: "Faisal Town", branchId: "1" },
  { id: "r11", name: "Cavalry Ground", branchId: "2" },
  { id: "r12", name: "Paragon City", branchId: "3" }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: "c-1", name: "Bird Menu" },
  { id: "c-2", name: "Tenders" },
  { id: "c-3", name: "Wraps" },
  { id: "c-4", name: "Hand Cut Fries" },
  { id: "c-5", name: "Sliders" },
  { id: "c-6", name: "Hand Spun Shakes" },
  { id: "c-7", name: "Extras" },
  { id: "c-8", name: "SS Treats" },
  { id: "c-9", name: "Sauce" },
  { id: "c-10", name: "Drinks" },
  { id: "c-11", name: "Make It A Meal" },
];

export const MOCK_MENU: MenuItem[] = [
  // BIRD MENU
  {
    id: "m-1",
    categoryId: "c-1",
    name: "The Sando",
    description: "House-recipe, crispy fried hot chicken, tenders, lettuce, cheese, and secret sauce.",
    price: 1070,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
    isPopular: true,
  },
  // TENDERS
  {
    id: "m-2",
    categoryId: "c-2",
    name: "Red Tenders",
    description: "10 pcs of Tenders, served with fries & comeback sauce.",
    price: 1380,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  {
    id: "m-3",
    categoryId: "c-2",
    name: "Crunchy Tenders",
    description: "10 pcs of Tenders, served with fries & comeback sauce.",
    price: 1380,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  // WRAPS
  {
    id: "m-4",
    categoryId: "c-3",
    name: "Crispy Chicken Wrap",
    description: "Crispy hot chicken strips, lettuce, and special sauce wrap.",
    price: 945,
    image: "https://images.unsplash.com/photo-1626804475297-41609ea05499?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  // HAND CUT FRIES
  {
    id: "m-5",
    categoryId: "c-4",
    name: "Loaded Waffle Fries",
    description: "Loaded with crispy hot chicken, house sauce, and spring onion.",
    price: 995,
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
    isPopular: true,
  },
  // SLIDERS
  {
    id: "m-6",
    categoryId: "c-5",
    name: "Hot Chicken Slider",
    description: "Classic recipe, hot chicken tenders, special sauce and coleslaw.",
    price: 895,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "m-7",
    categoryId: "c-5",
    name: "Honey Sriracha Slider",
    description: "Crispy hot chicken, lettuce, sriracha, honey, and pickled onions.",
    price: 895,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  {
    id: "m-8",
    categoryId: "c-5",
    name: "Hot Honey Ranch Slider",
    description: "Crispy hot chicken, lettuce, hot honey and ranch sauce.",
    price: 895,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  {
    id: "m-9",
    categoryId: "c-5",
    name: "Caesar Chicken Slider",
    description: "Crispy chicken, parmesan, and Caesar dressing.",
    price: 895,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  // HAND SPUN SHAKES
  { id: "m-10", categoryId: "c-6", name: "Choco Berry Shake", description: "Hand spun Choco Berry shake.", price: 750, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-11", categoryId: "c-6", name: "Chocolate Shake", description: "Hand spun Chocolate shake.", price: 750, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-12", categoryId: "c-6", name: "Strawberry Shake", description: "Hand spun Strawberry shake.", price: 750, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-13", categoryId: "c-6", name: "Cookies & Cream Shake", description: "Hand spun Cookies & Cream shake.", price: 750, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-14", categoryId: "c-6", name: "Vanilla Shake", description: "Hand spun Vanilla shake.", price: 750, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-15", categoryId: "c-6", name: "Salted Caramel Shake", description: "Hand spun Salted Caramel shake.", price: 750, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  // EXTRAS
  { id: "m-16", categoryId: "c-7", name: "Crinkle Fries", description: "Crispy crinkle cut fries.", price: 400, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-17", categoryId: "c-7", name: "Waffle Fries", description: "Crispy waffle fries.", price: 400, image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-18", categoryId: "c-7", name: "Mac & Cheese", description: "Creamy mac and cheese.", price: 550, image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  // SS TREATS
  {
    id: "m-19",
    categoryId: "c-8",
    name: "Toastie",
    description: "Choose your flavour: Nutella, Caramel, or Dark Choc.",
    price: 645,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  {
    id: "m-20",
    categoryId: "c-8",
    name: "Churros",
    description: "10 pcs of Churros, served with Cinnamon Sugar. Choose your dip: Nutella, Caramel, or Dark Choc.",
    price: 500,
    image: "https://images.unsplash.com/photo-1624371414325-e6a8dc5884ba?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  {
    id: "m-21",
    categoryId: "c-8",
    name: "Extra Dip",
    description: "Choose your flavour: Nutella, Caramel, or Dark Choc.",
    price: 200,
    image: "https://images.unsplash.com/photo-1585002996160-5f2122cc1be9?auto=format&fit=crop&w=600&q=80",
    isAvailable: true,
  },
  { id: "m-22", categoryId: "c-8", name: "Add 1 Scoop of Vanilla Ice Cream", description: "Add a scoop of vanilla ice cream to your dessert.", price: 100, image: "https://images.unsplash.com/photo-1570197781417-0c75a40735e5?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  // SAUCE
  { id: "m-23", categoryId: "c-9", name: "Comeback Sauce", description: "Our signature Comeback sauce.", price: 120, image: "https://images.unsplash.com/photo-1472476449509-db9e84b72cb1?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-24", categoryId: "c-9", name: "Salsa", description: "Tangy salsa dip.", price: 120, image: "https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-25", categoryId: "c-9", name: "Garlic Mayo", description: "Creamy garlic mayo.", price: 120, image: "https://images.unsplash.com/photo-1588674996901-4464d2ee6499?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-26", categoryId: "c-9", name: "Chipotle", description: "Spicy chipotle sauce.", price: 120, image: "https://images.unsplash.com/photo-1585002996160-5f2122cc1be9?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  // DRINKS
  { id: "m-27", categoryId: "c-10", name: "Pepsi", description: "Chilled Pepsi.", price: 130, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-28", categoryId: "c-10", name: "Diet Pepsi", description: "Chilled Diet Pepsi.", price: 130, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-29", categoryId: "c-10", name: "7UP", description: "Chilled 7UP.", price: 130, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-30", categoryId: "c-10", name: "Mirinda", description: "Chilled Mirinda.", price: 130, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-31", categoryId: "c-10", name: "Water", description: "Mineral Water.", price: 130, image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  // MAKE IT A MEAL
  { id: "m-32", categoryId: "c-11", name: "Fries & Drink", description: "Add fries and a drink to make it a meal.", price: 530, image: "https://images.unsplash.com/photo-1594212739345-d850a58145ae?auto=format&fit=crop&w=600&q=80", isAvailable: true },
  { id: "m-33", categoryId: "c-11", name: "Fries & Shake", description: "Add fries and a shake to make it a meal.", price: 1150, image: "https://images.unsplash.com/photo-1594212739345-d850a58145ae?auto=format&fit=crop&w=600&q=80", isAvailable: true },
];
