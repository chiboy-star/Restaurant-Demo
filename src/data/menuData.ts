export interface MenuItem {
  id: string;
  name: string;
  localName: string;
  originNote: string;
  price: number;
  category: "all" | "rice" | "grill" | "soups" | "bites" | "drinks";
  categoryLabel: string;
  rating: number;
  reviewsCount: number;
  image: string;
  priceBadgeColor: "plantain" | "ember" | "palm";
  isPopular?: boolean;
  isChefSpecial?: boolean;
  dietary?: ("spicy" | "popular" | "gluten-free" | "vegetarian" | "halal")[];
  spiceLevel?: 0 | 1 | 2 | 3;
  allergens?: string[];
  prepTime: string;
  calories: string;
  portionSize: string;
  description: string;
  ingredients: string[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "jollof-chicken",
    name: "Jollof Rice with Chicken",
    localName: "Smoky Party Jollof & Crispy Chicken",
    originNote: "West African party classic",
    price: 4500,
    category: "rice",
    categoryLabel: "Rice & Mains",
    rating: 5.0,
    reviewsCount: 142,
    image: "/images/hero-bowl.jpg",
    priceBadgeColor: "plantain",
    isPopular: true,
    isChefSpecial: true,
    dietary: ["spicy", "popular", "halal"],
    spiceLevel: 2,
    allergens: ["None"],
    prepTime: "15-20 mins",
    calories: "680 kcal",
    portionSize: "Serves 1-2 • 500g",
    description:
      "Smoky wood-fired parboiled rice infused with fresh bell peppers, scotch bonnets, ripe tomatoes, and slow-braised tender spiced chicken.",
    ingredients: [
      "Long-grain parboiled rice",
      "Wood-fire smoked tomato reduction",
      "Tatashe sweet peppers",
      "Ata rodo habaneros",
      "Herb-marinated chicken quarter",
      "Thyme, curry & bay leaf",
    ],
  },
  {
    id: "suya-platter",
    name: "Suya Platter",
    localName: "Kano-Style Beef Suya",
    originNote: "Northern Nigerian grilled beef skewers",
    price: 3800,
    category: "grill",
    categoryLabel: "Grills & Suya",
    rating: 4.9,
    reviewsCount: 98,
    image: "/images/dish-suya.jpg",
    priceBadgeColor: "ember",
    isPopular: true,
    isChefSpecial: true,
    dietary: ["spicy", "popular", "halal", "gluten-free"],
    spiceLevel: 3,
    allergens: ["Peanuts (Groundnut)"],
    prepTime: "10-15 mins",
    calories: "520 kcal",
    portionSize: "Serves 1 • 300g (3 skewers)",
    description:
      "Thinly sliced prime Nigerian beef skewers chargrilled over open coals, coated with roasted peanut yaji spice, served with sliced red onions and vine tomatoes.",
    ingredients: [
      "Prime lean beef steak",
      "Authentic Kano yaji kuli-kuli blend",
      "Ginger, garlic & ground cloves",
      "Crisp purple onions",
      "Vine-ripened tomatoes",
      "Fresh cabbage slaw",
    ],
  },
  {
    id: "egusi-pounded-yam",
    name: "Egusi Soup with Pounded Yam",
    localName: "Ofe Egusi & Smooth Iyan",
    originNote: "Melon seed soup with goat meat",
    price: 5200,
    category: "soups",
    categoryLabel: "Soups & Swallows",
    rating: 5.0,
    reviewsCount: 184,
    image: "/images/dish-egusi.jpg",
    priceBadgeColor: "palm",
    isPopular: true,
    isChefSpecial: true,
    dietary: ["popular", "halal"],
    spiceLevel: 2,
    allergens: ["Fish (Stockfish)", "Crustaceans (Crayfish)"],
    prepTime: "20-25 mins",
    calories: "780 kcal",
    portionSize: "Soup 450ml + 2 Yam rolls",
    description:
      "Rich hand-ground melon seed soup slow-cooked with fresh pumpkin greens, tender goat meat, stockfish, and palm oil, paired with fluffy pounded yam.",
    ingredients: [
      "Stone-ground melon seeds (Egusi)",
      "Slow-braised goat meat",
      "Wild Atlantic stockfish & dried catfish",
      "Fresh ugwu leaves",
      "Pure unrefined palm oil",
      "Freshly pounded tuber yam",
    ],
  },
  {
    id: "puff-puff",
    name: "Golden Sweet Puff-Puff",
    localName: "Pillowy Warm Street Chops",
    originNote: "Sweet fried dough, golden crispy outside",
    price: 1000,
    category: "bites",
    categoryLabel: "Small Chops",
    rating: 4.8,
    reviewsCount: 220,
    image: "/images/dish-puffpuff.jpg",
    priceBadgeColor: "plantain",
    isPopular: false,
    dietary: ["vegetarian", "halal"],
    spiceLevel: 0,
    allergens: ["Gluten (Wheat)"],
    prepTime: "5 mins",
    calories: "340 kcal",
    portionSize: "6 freshly fried pieces",
    description:
      "Airy, pillowy golden fried dough dusted with sweet aromatic nutmeg and raw sugar. Perfect starter or midday sweet comfort snack.",
    ingredients: [
      "Stone-milled wheat flour",
      "Fresh baker's yeast",
      "Grated organic nutmeg",
      "Cane sugar & sea salt",
      "Clean sunflower oil",
    ],
  },
  {
    id: "plantain-beans",
    name: "Fried Plantain with Ewa Agoyin",
    localName: "Dodo & Creamy Honey Beans",
    originNote: "Sweet ripe plantain & caramelized pepper sauce",
    price: 2500,
    category: "rice",
    categoryLabel: "Rice & Mains",
    rating: 4.9,
    reviewsCount: 115,
    image: "/images/dish-plantain-beans.jpg",
    priceBadgeColor: "ember",
    isPopular: false,
    dietary: ["spicy", "vegetarian", "gluten-free", "halal"],
    spiceLevel: 2,
    allergens: ["None"],
    prepTime: "12 mins",
    calories: "590 kcal",
    portionSize: "Serves 1 • 450g",
    description:
      "Mashed slow-cooked honey beans drenched in signature spicy caramelized onion and dry pepper sauce, served with sweet caramelized plantain slices.",
    ingredients: [
      "Slow-boiled Oloyin honey beans",
      "Deep-caramelized palm oil sauce",
      "Sun-dried cameroon peppers & red onions",
      "Golden fried ripe plantain wheels",
    ],
  },
  {
    id: "zobo-drink",
    name: "Chilled Hibiscus Zobo Brew",
    localName: "Lekki Herbal Hibiscus & Cloves",
    originNote: "Organic hibiscus drink, lightly spiced",
    price: 1200,
    category: "drinks",
    categoryLabel: "Drinks & Mocktails",
    rating: 4.9,
    reviewsCount: 310,
    image: "/images/dish-zobo.jpg",
    priceBadgeColor: "plantain",
    isPopular: false,
    dietary: ["vegetarian", "gluten-free", "halal"],
    spiceLevel: 0,
    allergens: ["None"],
    prepTime: "Instant Chilled",
    calories: "110 kcal",
    portionSize: "500ml Bottle",
    description:
      "Refreshing iced crimson infusion of organic hibiscus petals, crushed ginger, cloves, fresh pineapple juice, and orange zest, lightly sweetened.",
    ingredients: [
      "Organic dry hibiscus calyces",
      "Fresh ginger root",
      "Crushed cloves & cinnamon stick",
      "Cold-pressed pineapple & orange juice",
    ],
  },
  {
    id: "asun-goat-meat",
    name: "Asun Spicy Peppered Goat Meat",
    localName: "Flame-Smoked Peppered Asun",
    originNote: "Smoked goat meat flash-sautéed in habaneros",
    price: 3500,
    category: "grill",
    categoryLabel: "Grills & Suya",
    rating: 4.9,
    reviewsCount: 89,
    image: "/images/about-platter.jpg",
    priceBadgeColor: "ember",
    isPopular: true,
    dietary: ["spicy", "halal", "gluten-free"],
    spiceLevel: 3,
    allergens: ["None"],
    prepTime: "15 mins",
    calories: "460 kcal",
    portionSize: "Serves 1 • 250g bowl",
    description:
      "Tender bite-sized pieces of smoked goat meat flash-sautéed in fiery scotch bonnet peppers, sweet red bell peppers, and fresh scallions.",
    ingredients: [
      "Hardwood-smoked tender goat meat",
      "Crushed scotch bonnet peppers",
      "Sautéed red onions & scallions",
      "Sea salt & native seasonings",
    ],
  },
  {
    id: "seafood-okro",
    name: "Seafood Okro Deluxe",
    localName: "Ila Alasepo with Jumbo Prawns",
    originNote: "Lagos coastal delicacy with tiger prawns",
    price: 6500,
    category: "soups",
    categoryLabel: "Soups & Swallows",
    rating: 5.0,
    reviewsCount: 76,
    image: "/images/hero-bowl.jpg",
    priceBadgeColor: "palm",
    isPopular: false,
    dietary: ["gluten-free", "halal"],
    spiceLevel: 1,
    allergens: ["Crustaceans (Prawns)", "Molluscs (Calamari)", "Fish"],
    prepTime: "25 mins",
    calories: "620 kcal",
    portionSize: "Soup 500ml + Swallow of choice",
    description:
      "Finely diced crisp okra simmered in aromatic seafood broth with succulent Atlantic tiger prawns, calamari rings, and flaked fish.",
    ingredients: [
      "Crisp farm-fresh okra",
      "Jumbo Atlantic tiger prawns",
      "Fresh calamari rings",
      "Flaked croaker fish",
      "Crayfish reduction & spinach",
    ],
  },
  {
    id: "chapman-punch",
    name: "Lagos Chapman Cocktail",
    localName: "Signature AfrikBite Fruit Punch",
    originNote: "Classic Nigerian sparkling citrus mocktail",
    price: 1800,
    category: "drinks",
    categoryLabel: "Drinks & Mocktails",
    rating: 4.8,
    reviewsCount: 165,
    image: "/images/dish-zobo.jpg",
    priceBadgeColor: "plantain",
    isPopular: false,
    dietary: ["vegetarian", "gluten-free", "halal"],
    spiceLevel: 0,
    allergens: ["None"],
    prepTime: "Instant Chilled",
    calories: "140 kcal",
    portionSize: "400ml Glass with garnishes",
    description:
      "Classic Lagos cocktail blend of citrus soda, blackcurrant cordial, aromatic Angostura bitters, crisp cucumber ribbons, and fresh lime slices.",
    ingredients: [
      "Fanta citrus & lemon-lime soda",
      "Blackcurrant cordial",
      "Angostura bitters",
      "Organic cucumber ribbons & fresh lime",
    ],
  },
];

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  avatar: string;
  rating: number;
  highlight: string;
  date: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    name: "Daniel Anderson",
    role: "Food Critic & Architect",
    location: "Lekki Phase 1, Lagos",
    quote:
      "An absolutely amazing dining experience! From the warm ambiance to the authentic wood-fire aroma, everything is world-class. The Smoky Party Jollof and Kano Suya were exquisitely plated and bursting with true heritage flavor. The staff make you feel truly valued every single visit.",
    avatar: "/images/avatars/avatar-1.jpg",
    rating: 5,
    highlight: "Best Party Jollof in Lekki Phase 1",
    date: "2 days ago",
  },
  {
    id: "rev-2",
    name: "Amina Bello",
    role: "Brand Director",
    location: "Victoria Island, Lagos",
    quote:
      "Finding authentic home-style Egusi soup with properly smooth pounded yam in Lagos can be tough, but AfrikBite consistently nails it. The stockfish aroma and goat meat tenderness were 10/10. The quick online checkout took less than a minute and dispatch arrived steaming hot.",
    avatar: "/images/avatars/avatar-2.jpg",
    rating: 5,
    highlight: "Arrived Steaming Hot in 35 Mins",
    date: "Yesterday",
  },
  {
    id: "rev-3",
    name: "Tunde Oladipo",
    role: "Tech Founder",
    location: "Ikoyi, Lagos",
    quote:
      "The Suya Platter accompanied by chilled spiced Zobo is our office's go-to feast after demanding product launches. Premium eco-packaging, consistent spice balance, and genuine Nigerian warmth. Highly recommended for quick weekday lunches and family weekends.",
    avatar: "/images/avatars/avatar-3.jpg",
    rating: 5,
    highlight: "Unmatched Suya & Spiced Zobo Pairing",
    date: "4 days ago",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
  category: "Ordering" | "Food & Dietary" | "Reservations";
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Which areas in Lagos do you deliver to?",
    answer:
      "We provide express 30-45 minute dispatch across Lekki Phase 1, Lekki Phase 2, Ikate, Victoria Island, Ikoyi, and Oniru. For larger orders or catering across the Mainland, please book 4 hours in advance.",
    category: "Ordering",
  },
  {
    question: "Can I adjust the spice levels of my dishes?",
    answer:
      "Yes! When placing your order or booking your table, add a note specifying mild, medium, or party-hot. Our kitchen prepares every pot and grill fresh to your custom preference.",
    category: "Food & Dietary",
  },
  {
    question: "Are all meats Halal and locally sourced?",
    answer:
      "100%. All beef, chicken, and goat meats are certified Halal and sourced fresh each morning from accredited farms. We use unadulterated cold-pressed oils and natural native herbs.",
    category: "Food & Dietary",
  },
  {
    question: "How do table reservations and private bookings work?",
    answer:
      "You can reserve tables instantly through our online reservation form with zero deposit for parties of up to 6 guests. You receive an instant SMS and WhatsApp confirmation with a unique booking reference code.",
    category: "Reservations",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We accept seamless Instant Bank Transfer, WhatsApp Direct Pay, POS on Delivery, and all major Debit/Credit Cards. You can also generate an instant printable receipt with order tracking.",
    category: "Ordering",
  },
];

export const RESTAURANT_INFO = {
  name: "AfrikBite Lekki",
  address: "Plot 14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
  phone: "+234 812 345 6789",
  whatsapp: "+2348123456789",
  email: "orders@afrikbite.ng",
  hours: {
    weekdays: "10:30 AM – 11:00 PM",
    weekends: "11:00 AM – 12:30 AM",
  },
  lastUpdated: "November 2026",
  currentPromo: "AFRIKBITE10",
  currentPromoDiscount: "10% off your first online order",
};
