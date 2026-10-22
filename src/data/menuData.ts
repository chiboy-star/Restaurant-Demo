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
  prepTime: string;
  calories?: string;
  description: string;
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
    prepTime: "15-20 mins",
    calories: "680 kcal",
    description:
      "Smoky wood-fired parboiled rice infused with fresh bell peppers, scotch bonnets, ripe tomatoes, and slow-braised tender spiced chicken.",
  },
  {
    id: "suya-platter",
    name: "Suya Platter",
    localName: "Kano-Style Beef Suya",
    originNote: "Northern Nigerian grilled beef, spiced",
    price: 3800,
    category: "grill",
    categoryLabel: "Grills & Suya",
    rating: 4.9,
    reviewsCount: 98,
    image: "/images/dish-suya.jpg",
    priceBadgeColor: "ember",
    isPopular: true,
    prepTime: "10-15 mins",
    calories: "520 kcal",
    description:
      "Thinly sliced prime Nigerian beef skewers chargrilled over open coals, coated with roasted peanut yaji spice, served with sliced red onions and vine tomatoes.",
  },
  {
    id: "egusi-pounded-yam",
    name: "Egusi Soup with Pounded Yam",
    localName: "Ofe Egusi & Iyan",
    originNote: "Melon seed soup, Nigerian staple",
    price: 5200,
    category: "soups",
    categoryLabel: "Soups & Swallows",
    rating: 5.0,
    reviewsCount: 184,
    image: "/images/dish-egusi.jpg",
    priceBadgeColor: "palm",
    isPopular: true,
    prepTime: "20-25 mins",
    calories: "780 kcal",
    description:
      "Rich hand-ground melon seed soup slow-cooked with fresh pumpkin greens, tender goat meat, stockfish, and palm oil, paired with fluffy pounded yam.",
  },
  {
    id: "puff-puff",
    name: "Puff Puff",
    localName: "Golden Sweet Puff-Puff",
    originNote: "Sweet fried dough, street favorite",
    price: 1000,
    category: "bites",
    categoryLabel: "Small Chops",
    rating: 4.8,
    reviewsCount: 220,
    image: "/images/dish-puffpuff.jpg",
    priceBadgeColor: "plantain",
    isPopular: false,
    prepTime: "5 mins",
    calories: "340 kcal",
    description:
      "Six pieces of airy, pillowy golden fried dough dusted with sweet aromatic spice. Perfect starter or midday sweet craving.",
  },
  {
    id: "plantain-beans",
    name: "Fried Plantain with Beans",
    localName: "Dodo & Ewa Agoyin",
    originNote: "Ripe plantain and bean stew",
    price: 2500,
    category: "rice",
    categoryLabel: "Rice & Mains",
    rating: 4.9,
    reviewsCount: 115,
    image: "/images/dish-plantain-beans.jpg",
    priceBadgeColor: "ember",
    isPopular: false,
    prepTime: "12 mins",
    calories: "590 kcal",
    description:
      "Mashed slow-cooked honey beans drenched in signature spicy caramelized onion and dry pepper sauce, served with sweet caramelized plantain slices.",
  },
  {
    id: "zobo-drink",
    name: "Zobo",
    localName: "Chilled Lekki Hibiscus Brew",
    originNote: "Hibiscus drink, lightly spiced",
    price: 1200,
    category: "drinks",
    categoryLabel: "Drinks & Mocktails",
    rating: 4.9,
    reviewsCount: 310,
    image: "/images/dish-zobo.jpg",
    priceBadgeColor: "plantain",
    isPopular: false,
    prepTime: "Instant",
    calories: "110 kcal",
    description:
      "Refreshing iced crimson infusion of organic hibiscus petals, crushed ginger, cloves, fresh pineapple, and orange zest, lightly sweetened.",
  },
  {
    id: "asun-goat-meat",
    name: "Asun Spicy Goat Meat",
    localName: "Peppered Asun Bites",
    originNote: "Smoked tender goat, habanero tossed",
    price: 3500,
    category: "grill",
    categoryLabel: "Grills & Suya",
    rating: 4.9,
    reviewsCount: 89,
    image: "/images/about-platter.jpg",
    priceBadgeColor: "ember",
    isPopular: true,
    prepTime: "15 mins",
    calories: "460 kcal",
    description:
      "Tender bite-sized pieces of smoked goat meat flash-sautéed in fiery scotch bonnet peppers, sweet red bell peppers, and fresh scallions.",
  },
  {
    id: "seafood-okro",
    name: "Seafood Okro Deluxe",
    localName: "Ila Alasepo with Fresh Prawns",
    originNote: "Lagos coastal delicacy with jumbo prawns",
    price: 6500,
    category: "soups",
    categoryLabel: "Soups & Swallows",
    rating: 5.0,
    reviewsCount: 76,
    image: "/images/hero-bowl.jpg",
    priceBadgeColor: "palm",
    isPopular: false,
    prepTime: "25 mins",
    calories: "620 kcal",
    description:
      "Finely diced crisp okra simmered in aromatic seafood broth with succulent Atlantic tiger prawns, calamari rings, and flaked fish.",
  },
  {
    id: "chapman-punch",
    name: "Lagos Chapman Cocktail",
    localName: "Signature AfrikBite Chapman",
    originNote: "Classic Nigerian fizzy citrus punch",
    price: 1800,
    category: "drinks",
    categoryLabel: "Drinks & Mocktails",
    rating: 4.8,
    reviewsCount: 165,
    image: "/images/dish-zobo.jpg",
    priceBadgeColor: "plantain",
    isPopular: false,
    prepTime: "Instant",
    calories: "140 kcal",
    description:
      "Classic Lagos cocktail blend of citrus soda, blackcurrant cordial, aromatic Angostura bitters, cucumber ribbons, and fresh lime.",
  },
];

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  quote: string;
  avatar: string;
  rating: number;
  highlight: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    name: "Daniel Anderson",
    location: "Lekki Phase 1, Lagos",
    quote:
      "An absolutely amazing dining experience! From the cozy atmosphere to the authentic flavors, everything was perfect. The Smoky Party Jollof and Suya were beautifully presented and bursting with rich taste. The staff were friendly and attentive, making us feel truly welcomed. My family now orders every weekend!",
    avatar: "/images/avatars/avatar-1.jpg",
    rating: 5,
    highlight: "Best Jollof in Lekki Phase 1",
  },
  {
    id: "rev-2",
    name: "Amina Bello",
    location: "Victoria Island, Lagos",
    quote:
      "Finding authentic home-style Egusi soup with properly smooth pounded yam in Lagos can be tough, but AfrikBite nailed it! The stockfish aroma and goat meat tenderness were 10/10. The quick online checkout took less than a minute and delivery arrived steaming hot.",
    avatar: "/images/avatars/avatar-2.jpg",
    rating: 5,
    highlight: "Hot & Fast Delivery under 40 mins",
  },
  {
    id: "rev-3",
    name: "Tunde Oladipo",
    location: "Ikoyi, Lagos",
    quote:
      "The Suya Platter accompanied by chilled spiced Zobo is perfection after a long workday. Premium packaging, consistent taste, and genuine Nigerian hospitality. Highly recommended for both quick weekday lunches and weekend family feasts.",
    avatar: "/images/avatars/avatar-3.jpg",
    rating: 5,
    highlight: "Incredible Suya & Zobo pairing",
  },
];
