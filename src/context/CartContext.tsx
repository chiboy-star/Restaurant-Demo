"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { MenuItem } from "@/data/menuData";

export interface CartItem {
  item: MenuItem;
  quantity: number;
  addedAt: number;
}

export type OrderType = "delivery" | "pickup" | "dinein";

export interface ToastItem {
  id: string;
  message: string;
  type?: "info" | "success" | "warning";
  undoAction?: () => void;
  undoLabel?: string;
}

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

interface CartContextType {
  // Cart state
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalPrice: number;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  appliedPromo: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;

  // Modals & Navigation
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  isCommandMenuOpen: boolean;
  setIsCommandMenuOpen: (open: boolean) => void;
  selectedDishDetail: MenuItem | null;
  setSelectedDishDetail: (item: MenuItem | null) => void;
  isConfirmClearOpen: boolean;
  setIsConfirmClearOpen: (open: boolean) => void;

  // Favorites (optimistic)
  favorites: string[];
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;

  // Toasts with Undo
  toasts: ToastItem[];
  showToast: (message: string, undoAction?: () => void, undoLabel?: string) => void;
  dismissToast: (id: string) => void;

  // Dark Mode
  isDark: boolean;
  toggleDarkMode: () => void;

  // UTM Tracking & Idempotency
  utmParams: UtmParams;
  getIdempotencyKey: () => string;

  // SWR status
  liveWaitTime: number; // e.g., 22 mins
  liveTablesAvailable: number; // e.g., 6 tables
  lastSynced: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [selectedDishDetail, setSelectedDishDetail] = useState<MenuItem | null>(null);
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [utmParams, setUtmParams] = useState<UtmParams>({});

  // SWR Simulated Live State
  const [liveWaitTime, setLiveWaitTime] = useState(25);
  const [liveTablesAvailable, setLiveTablesAvailable] = useState(5);
  const [lastSynced, setLastSynced] = useState("Just now");

  // Undo history buffer for optimistic rollback
  const lastRemovedRef = useRef<{ item: MenuItem; quantity: number } | null>(null);

  // Initialize client state from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedCart = localStorage.getItem("afrikbite_cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
        const savedFavs = localStorage.getItem("afrikbite_favs");
        if (savedFavs) {
          setFavorites(JSON.parse(savedFavs));
        }
        const savedPromo = localStorage.getItem("afrikbite_promo");
        if (savedPromo) {
          setAppliedPromo(savedPromo);
        }
        const savedTheme = localStorage.getItem("afrikbite_theme");
        if (savedTheme === "dark") {
          setIsDark(true);
          document.documentElement.classList.add("dark");
        } else if (
          !savedTheme &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          setIsDark(true);
          document.documentElement.classList.add("dark");
        }
      } catch {
        // storage unavailable
      }

      // Capture UTM tracking params
      try {
        if (typeof window !== "undefined") {
          const urlParams = new URLSearchParams(window.location.search);
          const utm: UtmParams = {};
          ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach(
            (key) => {
              const val = urlParams.get(key);
              if (val) (utm as Record<string, string>)[key] = val;
            }
          );
          if (Object.keys(utm).length > 0) {
            sessionStorage.setItem("afrikbite_utm", JSON.stringify(utm));
            setUtmParams(utm);
          } else {
            const cachedUtm = sessionStorage.getItem("afrikbite_utm");
            if (cachedUtm) setUtmParams(JSON.parse(cachedUtm));
          }
        }
      } catch {
        // ignore
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem("afrikbite_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Save favorites changes
  useEffect(() => {
    try {
      localStorage.setItem("afrikbite_favs", JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Stale-While-Revalidate simulation for kitchen live wait times
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveWaitTime((prev) => Math.max(18, Math.min(35, prev + (Math.random() > 0.5 ? 1 : -1))));
      setLiveTablesAvailable((prev) => Math.max(2, Math.min(8, prev + (Math.random() > 0.5 ? 1 : -1))));
      setLastSynced(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener for Command Menu (Cmd+K / Ctrl+K) & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandMenuOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsCommandMenuOpen(false);
        setIsCartOpen(false);
        setIsCheckoutOpen(false);
        setIsReservationOpen(false);
        setSelectedDishDetail(null);
        setIsConfirmClearOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("afrikbite_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("afrikbite_theme", "light");
      }
      return next;
    });
  }, []);

  const showToast = useCallback(
    (message: string, undoAction?: () => void, undoLabel: string = "Undo") => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      setToasts((prev) => [...prev.slice(-3), { id, message, undoAction, undoLabel }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4500);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Optimistic Add to Cart
  const addToCart = useCallback(
    (item: MenuItem, quantity: number = 1) => {
      setCart((prev) => {
        const existing = prev.find((ci) => ci.item.id === item.id);
        if (existing) {
          return prev.map((ci) =>
            ci.item.id === item.id
              ? { ...ci, quantity: ci.quantity + quantity }
              : ci
          );
        }
        return [...prev, { item, quantity, addedAt: Date.now() }];
      });

      showToast(`Added ${item.name} to order`, () => {
        // Undo action: remove the added item
        setCart((prev) => {
          const target = prev.find((ci) => ci.item.id === item.id);
          if (!target) return prev;
          if (target.quantity <= quantity) {
            return prev.filter((ci) => ci.item.id !== item.id);
          }
          return prev.map((ci) =>
            ci.item.id === item.id ? { ...ci, quantity: ci.quantity - quantity } : ci
          );
        });
      });
    },
    [showToast]
  );

  // Optimistic Remove with Undo Toast
  const removeFromCart = useCallback(
    (itemId: string) => {
      setCart((prev) => {
        const target = prev.find((ci) => ci.item.id === itemId);
        if (target) {
          lastRemovedRef.current = { item: target.item, quantity: target.quantity };
          showToast(`Removed "${target.item.name}"`, () => {
            if (lastRemovedRef.current) {
              const { item, quantity } = lastRemovedRef.current;
              setCart((current) => [...current, { item, quantity, addedAt: Date.now() }]);
            }
          });
        }
        return prev.filter((ci) => ci.item.id !== itemId);
      });
    },
    [showToast]
  );

  const updateQuantity = useCallback(
    (itemId: string, delta: number) => {
      setCart((prev) =>
        prev
          .map((ci) => {
            if (ci.item.id === itemId) {
              const newQty = ci.quantity + delta;
              return newQty > 0 ? { ...ci, quantity: newQty } : null;
            }
            return ci;
          })
          .filter(Boolean) as CartItem[]
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    const backup = [...cart];
    setCart([]);
    setIsConfirmClearOpen(false);
    showToast("Cart cleared", () => {
      setCart(backup);
    });
  }, [cart, showToast]);

  const applyPromo = useCallback((code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === "AFRIKBITE10") {
      setAppliedPromo(clean);
      try {
        localStorage.setItem("afrikbite_promo", clean);
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  }, []);

  const removePromo = useCallback(() => {
    setAppliedPromo(null);
    try {
      localStorage.removeItem("afrikbite_promo");
    } catch {
      // ignore
    }
  }, []);

  const toggleFavorite = useCallback(
    (itemId: string) => {
      setFavorites((prev) => {
        const isFav = prev.includes(itemId);
        const next = isFav ? prev.filter((id) => id !== itemId) : [...prev, itemId];
        showToast(isFav ? "Removed from favorites" : "Saved to favorites ❤️");
        return next;
      });
    },
    [showToast]
  );

  const isFavorite = useCallback(
    (itemId: string) => favorites.includes(itemId),
    [favorites]
  );

  // Generate unique idempotency key for transactions to avoid double-charging
  const getIdempotencyKey = useCallback(() => {
    return `IDEM-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  }, []);

  const totalCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);
  const subtotal = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const deliveryFee = orderType === "delivery" && subtotal > 0 ? 1000 : 0;
  const discount = appliedPromo === "AFRIKBITE10" ? Math.round(subtotal * 0.1) : 0;
  const totalPrice = Math.max(0, subtotal + deliveryFee - discount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalCount,
        subtotal,
        deliveryFee,
        discount,
        totalPrice,
        orderType,
        setOrderType,
        appliedPromo,
        applyPromo,
        removePromo,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isReservationOpen,
        setIsReservationOpen,
        isCommandMenuOpen,
        setIsCommandMenuOpen,
        selectedDishDetail,
        setSelectedDishDetail,
        isConfirmClearOpen,
        setIsConfirmClearOpen,
        favorites,
        toggleFavorite,
        isFavorite,
        toasts,
        showToast,
        dismissToast,
        isDark,
        toggleDarkMode,
        utmParams,
        getIdempotencyKey,
        liveWaitTime,
        liveTablesAvailable,
        lastSynced,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
