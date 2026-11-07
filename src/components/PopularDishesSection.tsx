"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Star,
  Plus,
  ArrowLeft,
  ArrowRight,
  Check,
  Flame,
  Heart,
  Eye,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MENU_ITEMS, MenuItem } from "@/data/menuData";

export default function PopularDishesSection() {
  const { addToCart, toggleFavorite, isFavorite, setSelectedDishDetail } =
    useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const popularDishes = MENU_ITEMS.filter((d) => d.isPopular);
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(popularDishes.length / perPage);

  const displayedDishes = popularDishes.slice(
    page * perPage,
    (page + 1) * perPage
  );

  const handleAdd = (dish: MenuItem) => {
    addToCart(dish);
    setAddedId(dish.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const handlePrev = () => {
    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="popular"
      className="py-16 sm:py-24 bg-white dark:bg-[#0E0906] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#241A14] text-[#E8612C] text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#26130B] dark:text-[#FAF4ED] tracking-tight text-balance">
              Most Loved Dishes
            </h2>
            <p className="text-xs sm:text-sm text-[#635348] dark:text-[#C7B9AD] mt-1">
              Handpicked Nigerian staples ordered most frequently across Lagos.
            </p>
          </div>

          {/* Navigation Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous dishes"
                className="w-10 h-10 rounded-xl border border-[#26130B]/10 dark:border-white/10 bg-[#FAF7F2] dark:bg-[#18110D] text-[#26130B] dark:text-[#FAF4ED] flex items-center justify-center transition-all hover:bg-white dark:hover:bg-[#241A14] active:scale-95 touch-target"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next dishes"
                className="w-10 h-10 rounded-xl bg-[#E8612C] text-white flex items-center justify-center transition-all hover:bg-[#D05120] active:scale-95 shadow-sm touch-target"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* 3 Flattened Cards Grid (Continuous Corners: rounded-2xl, no nested card bloat) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedDishes.map((dish) => {
            const isJustAdded = addedId === dish.id;
            const isFav = isFavorite(dish.id);

            return (
              <div
                key={dish.id}
                className="group relative bg-[#FAF7F2]/60 dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#26130B]/5 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-neutral-100 mb-4 shadow-xs">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Popular Pill */}
                    <div className="absolute top-3 left-3 bg-[#E8612C] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      <span>Popular</span>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(dish.id)}
                      aria-label={isFav ? "Remove favorite" : "Add to favorites"}
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
                      {dish.prepTime}
                    </div>
                  </div>

                  {/* Rating Stars & Count */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#26130B] dark:text-[#FAF4ED] tabular-nums">
                      {dish.rating.toFixed(1)}
                    </span>
                    <span className="text-[11px] text-[#8E7E73] dark:text-[#8F8075] tabular-nums">
                      ({dish.reviewsCount})
                    </span>
                  </div>

                  {/* Dish Name & Description */}
                  <h3 className="text-lg font-bold text-[#26130B] dark:text-[#FAF4ED] group-hover:text-[#E8612C] transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-[#635348] dark:text-[#C7B9AD] mt-1 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                {/* Footer Bar: Price & Action Buttons */}
                <div className="pt-4 mt-4 border-t border-[#26130B]/10 dark:border-white/10 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-[#8E7E73] dark:text-[#8F8075] uppercase">
                      Price
                    </span>
                    <span className="text-lg font-bold text-[#26130B] dark:text-[#FAF4ED] tabular-nums">
                      ₦{dish.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedDishDetail(dish)}
                      aria-label={`View details for ${dish.name}`}
                      className="p-2.5 rounded-xl border border-[#26130B]/10 dark:border-white/10 text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B] dark:hover:text-white transition-colors touch-target"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleAdd(dish)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs touch-target ${
                        isJustAdded
                          ? "bg-[#1FBF73] text-white"
                          : "bg-[#E8612C] hover:bg-[#D05120] text-white active:scale-95"
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
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
