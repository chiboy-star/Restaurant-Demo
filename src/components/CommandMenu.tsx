"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Search,
  X,
  Calendar,
  Moon,
  Sun,
  Phone,
  Tag,
  ArrowRight,
  Flame,
  Plus,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MENU_ITEMS, RESTAURANT_INFO, MenuItem } from "@/data/menuData";

export default function CommandMenu() {
  const {
    isCommandMenuOpen,
    setIsCommandMenuOpen,
    addToCart,
    setIsReservationOpen,
    toggleDarkMode,
    isDark,
    applyPromo,
    showToast,
  } = useCart();

  const [query, setQuery] = useState("");
  const [addedDishId, setAddedDishId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandMenuOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setQuery("");
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isCommandMenuOpen]);

  if (!isCommandMenuOpen) return null;

  const filteredDishes = MENU_ITEMS.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.localName.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q) ||
      item.originNote.toLowerCase().includes(q) ||
      item.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  }).slice(0, 5);

  const actions = [
    {
      id: "action-reserve",
      label: "Book a Table in Lekki",
      icon: Calendar,
      category: "Action",
      run: () => {
        setIsCommandMenuOpen(false);
        setIsReservationOpen(true);
      },
    },
    {
      id: "action-theme",
      label: `Switch to ${isDark ? "Light" : "Dark"} Mode`,
      icon: isDark ? Sun : Moon,
      category: "Settings",
      run: () => {
        toggleDarkMode();
        setIsCommandMenuOpen(false);
      },
    },
    {
      id: "action-promo",
      label: `Apply Promo Code: ${RESTAURANT_INFO.currentPromo} (10% Off)`,
      icon: Tag,
      category: "Discount",
      run: () => {
        applyPromo(RESTAURANT_INFO.currentPromo);
        showToast(`Promo ${RESTAURANT_INFO.currentPromo} applied!`);
        setIsCommandMenuOpen(false);
      },
    },
    {
      id: "action-call",
      label: `Call Restaurant: ${RESTAURANT_INFO.phone}`,
      icon: Phone,
      category: "Contact",
      run: () => {
        window.location.href = `tel:${RESTAURANT_INFO.phone}`;
        setIsCommandMenuOpen(false);
      },
    },
  ];

  const handleAddDish = (dish: MenuItem) => {
    addToCart(dish);
    setAddedDishId(dish.id);
    setTimeout(() => setAddedDishId(null), 1200);
  };

  return (
    <div
      id="command-menu-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Command search menu"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-all"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#26130B]/10 dark:border-white/10 gap-3">
          <Search className="w-5 h-5 text-[#8E7E73] dark:text-[#8F8075] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes, ingredients, or type a command..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#26130B] dark:text-[#FAF4ED] placeholder-[#8E7E73] dark:placeholder-[#8F8075] outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs px-2 py-1 rounded bg-[#26130B]/5 dark:bg-white/5 text-[#8E7E73]"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded bg-[#26130B]/5 dark:bg-white/10 text-[#8E7E73] dark:text-[#8F8075] border border-[#26130B]/10 dark:border-white/10">
            ESC
          </kbd>
          <button
            onClick={() => setIsCommandMenuOpen(false)}
            aria-label="Close command menu"
            className="p-1 rounded-lg hover:bg-[#26130B]/5 dark:hover:bg-white/5 text-[#8E7E73] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Dishes Section */}
          <div>
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#8E7E73] dark:text-[#8F8075]">
              Dishes & Menu Items
            </div>
            {filteredDishes.length === 0 ? (
              <p className="px-3 py-4 text-xs text-[#8E7E73] italic">
                No matching dishes found for &ldquo;{query}&rdquo;.
              </p>
            ) : (
              <div className="mt-1 space-y-1">
                {filteredDishes.map((dish) => {
                  const isAdded = addedDishId === dish.id;
                  return (
                    <div
                      key={dish.id}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF7F2] dark:hover:bg-[#241A14] transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
                          <Image
                            src={dish.image}
                            alt={dish.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-[#26130B] dark:text-[#FAF4ED]">
                              {dish.name}
                            </span>
                            {dish.isPopular && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#E8612C]/15 text-[#E8612C]">
                                <Flame className="w-2.5 h-2.5" />
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#635348] dark:text-[#C7B9AD] line-clamp-1">
                            {dish.originNote}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs sm:text-sm font-bold text-[#E8612C] tabular-nums">
                          ₦{dish.price.toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleAddDish(dish)}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isAdded
                              ? "bg-[#1FBF73] text-white"
                              : "bg-[#26130B] dark:bg-white text-white dark:text-[#26130B] hover:opacity-90"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="pt-2 border-t border-[#26130B]/10 dark:border-white/10">
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#8E7E73] dark:text-[#8F8075]">
              Quick Actions & Shortcuts
            </div>
            <div className="mt-1 space-y-1">
              {actions.map((act) => {
                const IconComponent = act.icon;
                return (
                  <button
                    key={act.id}
                    onClick={act.run}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF7F2] dark:hover:bg-[#241A14] text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#E8612C]/10 text-[#E8612C] flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-[#26130B] dark:text-[#FAF4ED]">
                        {act.label}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8E7E73] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-[#FAF7F2] dark:bg-[#120D0A] border-t border-[#26130B]/10 dark:border-white/10 flex items-center justify-between text-[11px] text-[#8E7E73] dark:text-[#8F8075]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-semibold">↑</kbd> <kbd className="font-semibold">↓</kbd> navigate
            </span>
            <span>
              <kbd className="font-semibold">↵</kbd> select
            </span>
            <span>
              <kbd className="font-semibold">ESC</kbd> close
            </span>
          </div>
          <span className="hidden sm:inline">AfrikBite Lekki Express</span>
        </div>
      </div>
    </div>
  );
}

