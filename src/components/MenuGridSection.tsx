"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import {
  Plus,
  Check,
  Sparkles,
  Search,
  Flame,
  Eye,
  Heart,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MENU_ITEMS, MenuItem } from "@/data/menuData";

const CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "rice", label: "Rice & Mains" },
  { id: "grill", label: "Grills & Suya" },
  { id: "soups", label: "Soups & Swallows" },
  { id: "bites", label: "Small Chops" },
  { id: "drinks", label: "Drinks & Mocktails" },
];

const DIETARY_TAGS = [
  { id: "all", label: "All Flavors" },
  { id: "spicy", label: "🌶️ Spicy" },
  { id: "popular", label: "⭐ Most Popular" },
  { id: "vegetarian", label: "🌿 Vegetarian" },
  { id: "gluten-free", label: "Gluten-Free" },
];

export default function MenuGridSection() {
  const { addToCart, toggleFavorite, isFavorite, setSelectedDishDetail } =
    useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDietary, setSelectedDietary] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showSkeletonDemo, setShowSkeletonDemo] = useState(false);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesDietary =
      selectedDietary === "all" ||
      (item.dietary &&
        item.dietary.includes(
          selectedDietary as "spicy" | "popular" | "gluten-free" | "vegetarian" | "halal"
        ));
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.originNote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.localName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some((ing) =>
        ing.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesDietary && matchesSearch;
  });

  const handleCategoryChange = (catId: string) => {
    startTransition(() => {
      setSelectedCategory(catId);
    });
  };

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section
      id="menu"
      className="py-16 sm:py-24 bg-[#FAF7F2] dark:bg-[#120D0A] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 text-[#E8612C] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Handcrafted Fresh to Order</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#26130B] dark:text-[#FAF4ED] tracking-tight text-balance">
            Our Main Culinary Menu
          </h2>
          <p className="text-xs sm:text-sm text-[#635348] dark:text-[#C7B9AD] mt-2">
            From smoky wood-fired party pots to succulent charcoal grills and chilled native brews.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          {/* Top row: Categories & Search */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Tabs (Hick's law) */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-150 cursor-pointer touch-target ${
                    selectedCategory === cat.id
                      ? "bg-[#E8612C] text-white shadow-sm"
                      : "bg-white dark:bg-[#18110D] text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B] dark:hover:text-white border border-[#26130B]/10 dark:border-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Search & Skeleton Toggle */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="w-4 h-4 text-[#8E7E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by name or ingredient..."
                  className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-[#18110D] text-[#26130B] dark:text-[#FAF4ED] placeholder-[#8E7E73] border border-[#26130B]/10 dark:border-white/10 focus:border-[#E8612C] focus:outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8E7E73]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Skeleton Loader Preview Toggle (Tip 1) */}
              <button
                onClick={() => setShowSkeletonDemo(!showSkeletonDemo)}
                title="Toggle Skeleton Loader View"
                className={`p-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer touch-target ${
                  showSkeletonDemo
                    ? "bg-[#E8612C] text-white border-[#E8612C]"
                    : "bg-white dark:bg-[#18110D] text-[#8E7E73] border-[#26130B]/10 dark:border-white/10 hover:text-[#26130B]"
                }`}
              >
                Skeleton UI
              </button>
            </div>
          </div>

          {/* Secondary row: Dietary Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E7E73] shrink-0 mr-1">
              Dietary:
            </span>
            {DIETARY_TAGS.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedDietary(tag.id)}
                className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${
                  selectedDietary === tag.id
                    ? "bg-[#26130B] dark:bg-white text-white dark:text-[#26130B] border-transparent"
                    : "bg-white dark:bg-[#18110D] text-[#635348] dark:text-[#C7B9AD] border-[#26130B]/10 dark:border-white/10 hover:border-[#26130B]/30"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dish Grid / Skeletons */}
        {showSkeletonDemo || isPending ? (
          /* Skeleton Loader (Tip 1) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#18110D] rounded-2xl border border-[#26130B]/10 dark:border-white/10 p-5 space-y-4 animate-pulse"
              >
                <div className="w-full h-48 rounded-xl bg-neutral-200 dark:bg-neutral-800" />
                <div className="space-y-2">
                  <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
                </div>
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                  <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-20" />
                  <div className="h-9 bg-neutral-200 dark:bg-neutral-800 rounded-xl w-28" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty Search Fallback */
          <div className="text-center py-16 bg-white dark:bg-[#18110D] rounded-3xl border border-[#26130B]/10 dark:border-white/10 p-8 max-w-md mx-auto">
            <p className="text-base font-bold text-[#26130B] dark:text-[#FAF4ED]">
              No dishes found matching your criteria.
            </p>
            <p className="text-xs text-[#635348] dark:text-[#C7B9AD] mt-1">
              Try adjusting your category filter or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedDietary("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#E8612C] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Real Dishes Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isAdded = addedId === item.id;
              const isFav = isFavorite(item.id);

              return (
                <div
                  key={item.id}
                  className="group bg-white dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#26130B]/5 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container with Shimmer Blur Placeholder */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-4 shadow-xs">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Dietary / Spicy Badge */}
                      {item.dietary?.includes("spicy") && (
                        <div className="absolute top-3 left-3 bg-[#E8612C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          <span>Spicy</span>
                        </div>
                      )}

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        aria-label={isFav ? "Remove favorite" : "Save favorite"}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center text-[#26130B] dark:text-white transition-transform active:scale-90"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFav ? "fill-[#E8612C] text-[#E8612C]" : ""
                          }`}
                        />
                      </button>

                      {/* Prep Time */}
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full tabular-nums">
                        {item.prepTime}
                      </div>
                    </div>

                    {/* Category & Local Name */}
                    <div className="flex items-center justify-between text-[11px] text-[#8E7E73] dark:text-[#8F8075] mb-1 font-medium">
                      <span>{item.categoryLabel}</span>
                      <span className="tabular-nums">{item.calories}</span>
                    </div>

                    {/* Dish Title */}
                    <h3 className="text-base font-bold text-[#26130B] dark:text-[#FAF4ED] group-hover:text-[#E8612C] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#635348] dark:text-[#C7B9AD] mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Footer: Price & Actions */}
                  <div className="pt-4 mt-4 border-t border-[#26130B]/10 dark:border-white/10 flex items-center justify-between gap-2">
                    <span className="text-base sm:text-lg font-bold text-[#26130B] dark:text-[#FAF4ED] tabular-nums">
                      ₦{item.price.toLocaleString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedDishDetail(item)}
                        aria-label={`View details for ${item.name}`}
                        className="p-2 rounded-xl border border-[#26130B]/10 dark:border-white/10 text-[#8E7E73] hover:text-[#26130B] dark:hover:text-white transition-colors touch-target"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleAdd(item)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs touch-target ${
                          isAdded
                            ? "bg-[#1FBF73] text-white"
                            : "bg-[#E8612C] hover:bg-[#D05120] text-white active:scale-95"
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
