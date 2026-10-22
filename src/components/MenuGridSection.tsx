"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Check, Sparkles, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MENU_ITEMS, MenuItem } from "@/data/menuData";

const CATEGORIES = [
  { id: "all", label: "All Dishes" },
  { id: "rice", label: "Rice & Mains" },
  { id: "grill", label: "Grills & Suya" },
  { id: "soups", label: "Soups & Swallows" },
  { id: "bites", label: "Small Chops" },
  { id: "drinks", label: "Drinks & Mocktails" },
];

export default function MenuGridSection() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.originNote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.localName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1400);
  };

  // Color palette helper for price badges
  const getBadgeStyle = (colorType: string) => {
    switch (colorType) {
      case "ember":
        return "bg-[#E8612C] text-white";
      case "palm":
        return "bg-[#1FBF73] text-white";
      case "plantain":
      default:
        return "bg-[#FFD966] text-[#4A1F0E]";
    }
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF8EC] text-[#E8612C] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Handcrafted Every Day</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#4A1F0E] leading-tight lg:leading-[44px] mb-3">
            Our Main Menu Selection
          </h2>
          <p className="text-base text-[#7A6A5F]">
            From flame-kissed grills to hearty aromatic soups, explore authentic
            flavors prepared fresh to order.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#E8612C] text-white shadow-md shadow-[#E8612C]/20"
                    : "bg-[#FFF8EC] text-[#7A6A5F] hover:text-[#4A1F0E] hover:bg-[#FFF8EC]/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#7A6A5F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-[12px] bg-[#FFF8EC] text-[#4A1F0E] placeholder-[#7A6A5F] border border-transparent focus:border-[#E8612C] focus:bg-white focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* 3-Column Compact Grid Layout matching reference screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((dish) => {
            const isJustAdded = addedId === dish.id;
            return (
              <div
                key={dish.id}
                className="group bg-white hover:bg-[#FFF8EC]/50 border border-[#4A1F0E]/10 hover:border-[#E8612C]/40 rounded-[20px] p-4 transition-all duration-200 hover:shadow-lg hover:shadow-[#4A1F0E]/6 flex items-center justify-between gap-3"
              >
                {/* Thumbnail Left */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-[#FFF8EC] border border-[#4A1F0E]/5 shadow-xs">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="96px"
                  />
                </div>

                {/* Content Center */}
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="font-semibold text-[15px] sm:text-base text-[#4A1F0E] truncate leading-tight group-hover:text-[#E8612C] transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-[#7A6A5F] line-clamp-1 mt-0.5 mb-2 font-normal">
                    {dish.originNote}
                  </p>

                  {/* Price Tag Pill */}
                  <span
                    className={`inline-block text-xs font-bold px-3 py-1 rounded-full shadow-xs ${getBadgeStyle(
                      dish.priceBadgeColor
                    )}`}
                  >
                    ₦{dish.price.toLocaleString()}
                  </span>
                </div>

                {/* Instant Add Button Right */}
                <button
                  onClick={() => handleAdd(dish)}
                  aria-label={`Add ${dish.name} to cart`}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 active:scale-90 cursor-pointer ${
                    isJustAdded
                      ? "bg-[#1FBF73] text-white shadow-md shadow-[#1FBF73]/25 scale-95"
                      : "bg-[#FFF8EC] hover:bg-[#E8612C] text-[#4A1F0E] hover:text-white border border-[#4A1F0E]/10 hover:border-transparent shadow-xs"
                  }`}
                >
                  {isJustAdded ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#FFF8EC]/60 rounded-3xl border border-[#4A1F0E]/10">
            <p className="text-[#4A1F0E] font-semibold text-lg">No dishes found</p>
            <p className="text-[#7A6A5F] text-sm mt-1">
              Try adjusting your search or category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 bg-[#E8612C] text-white text-xs font-bold px-4 py-2 rounded-full"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
