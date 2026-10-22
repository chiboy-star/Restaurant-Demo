"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Plus, ArrowLeft, ArrowRight, Check, Flame } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MENU_ITEMS } from "@/data/menuData";

export default function PopularDishesSection() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  // Take the 3 top featured dishes
  const popularDishes = MENU_ITEMS.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAdd = (dish: (typeof MENU_ITEMS)[0]) => {
    addToCart(dish);
    setAddedId(dish.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? popularDishes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === popularDishes.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="popular" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF8EC] text-[#E8612C] text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#4A1F0E] leading-tight lg:leading-[44px]">
              Popular Menu
            </h2>
          </div>

          {/* Navigation Arrows (matching reference screenshot) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous dishes"
              className="w-11 h-11 rounded-full border border-[#4A1F0E]/15 hover:border-[#4A1F0E]/40 bg-white text-[#4A1F0E] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next dishes"
              className="w-11 h-11 rounded-full bg-[#1FBF73] hover:bg-[#1aa864] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-[#1FBF73]/25"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDishes.map((dish, idx) => {
            const isJustAdded = addedId === dish.id;
            return (
              <div
                key={dish.id}
                className="group relative bg-[#FFF8EC]/60 hover:bg-[#FFF8EC] border border-[#4A1F0E]/10 hover:border-[#E8612C]/30 rounded-[24px] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#4A1F0E]/8 flex flex-col justify-between"
              >
                <div>
                  {/* Photo with warm circular/rounded presentation */}
                  <div className="relative w-full h-56 sm:h-60 rounded-2xl overflow-hidden bg-white mb-5 shadow-sm">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Popular Pill Tag */}
                    <div className="absolute top-3 left-3 bg-[#E8612C] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      Top Choice #{idx + 1}
                    </div>

                    {/* Prep Time */}
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#4A1F0E] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                      ⚡ {dish.prepTime}
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#FFD966] text-[#FFD966]"
                      />
                    ))}
                    <span className="text-xs font-bold text-[#4A1F0E] ml-1.5">
                      {dish.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-[#7A6A5F]">
                      ({dish.reviewsCount})
                    </span>
                  </div>

                  {/* Dish Name in Cocoa */}
                  <h3 className="text-lg font-semibold text-[#4A1F0E] leading-6 mb-1 group-hover:text-[#E8612C] transition-colors">
                    {dish.name}
                  </h3>

                  {/* Local Subtitle / Note */}
                  <p className="text-xs font-medium text-[#E8612C] mb-2">
                    {dish.localName}
                  </p>

                  {/* Origin Note / Short Description */}
                  <p className="text-xs text-[#7A6A5F] line-clamp-2 leading-relaxed mb-6">
                    {dish.description}
                  </p>
                </div>

                {/* Bottom Row: Price tag in Plantain (#FFD966) with Cocoa text + Instant Add button in Ember */}
                <div className="pt-4 border-t border-[#4A1F0E]/10 flex items-center justify-between">
                  <div className="bg-[#FFD966] text-[#4A1F0E] font-bold text-base px-4 py-1.5 rounded-full shadow-xs">
                    ₦{dish.price.toLocaleString()}
                  </div>

                  {/* Instant Add button in Ember (#E8612C) */}
                  <button
                    onClick={() => handleAdd(dish)}
                    id={`add-popular-${dish.id}`}
                    className={`inline-flex items-center gap-1.5 font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-md ${
                      isJustAdded
                        ? "bg-[#1FBF73] text-white shadow-[#1FBF73]/25 scale-95"
                        : "bg-[#E8612C] hover:bg-[#d45220] active:scale-95 text-white shadow-[#E8612C]/25"
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add Item</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
