"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Flame,
  Clock,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function DishDetailModal() {
  const {
    selectedDishDetail,
    setSelectedDishDetail,
    addToCart,
    toggleFavorite,
    isFavorite,
  } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!selectedDishDetail) return null;

  const dish = selectedDishDetail;
  const isFav = isFavorite(dish.id);

  const handleAdd = () => {
    addToCart(dish, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setSelectedDishDetail(null);
      setQuantity(1);
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dish.name}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all"
      >
        {/* Modal Header Image */}
        <div className="relative w-full h-64 sm:h-72 bg-neutral-100 shrink-0">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => setSelectedDishDetail(null)}
            aria-label="Close dish details"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer touch-target"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Favorite button */}
          <button
            onClick={() => toggleFavorite(dish.id)}
            aria-label={isFav ? "Remove from favorites" : "Save to favorites"}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer touch-target"
          >
            <Heart
              className={`w-5 h-5 ${
                isFav ? "fill-[#E8612C] text-[#E8612C]" : "text-white"
              }`}
            />
          </button>

          {/* Bottom Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F59E0B] px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
              {dish.categoryLabel}
            </span>
            <h2 className="text-2xl font-bold tracking-tight mt-1 text-balance">
              {dish.name}
            </h2>
            <p className="text-xs text-white/80 line-clamp-1">{dish.localName}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#241A14] text-center">
            <div>
              <span className="text-[11px] text-[#8E7E73] dark:text-[#8F8075] block">
                Prep Time
              </span>
              <span className="text-xs font-bold text-[#26130B] dark:text-[#FAF4ED] flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#E8612C]" />
                {dish.prepTime}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#8E7E73] dark:text-[#8F8075] block">
                Calories
              </span>
              <span className="text-xs font-bold text-[#26130B] dark:text-[#FAF4ED] tabular-nums mt-0.5 block">
                {dish.calories}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#8E7E73] dark:text-[#8F8075] block">
                Spice Level
              </span>
              <span className="text-xs font-bold text-[#26130B] dark:text-[#FAF4ED] flex items-center justify-center gap-0.5 mt-0.5">
                {[...Array(dish.spiceLevel || 1)].map((_, i) => (
                  <Flame key={i} className="w-3.5 h-3.5 text-[#E8612C]" />
                ))}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E7E73] dark:text-[#8F8075] mb-2">
              Culinary Profile
            </h3>
            <p className="text-sm text-[#635348] dark:text-[#C7B9AD] leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Ingredients list */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E7E73] dark:text-[#8F8075] mb-2.5">
              Fresh Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#241A14] text-[#26130B] dark:text-[#FAF4ED] border border-[#26130B]/10 dark:border-white/10"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Allergens & Portion size */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#26130B]/10 dark:border-white/10 text-xs">
            <div className="flex items-center gap-2 text-[#8E7E73] dark:text-[#8F8075]">
              <ShieldCheck className="w-4 h-4 text-[#1FBF73]" />
              <span>
                Allergens:{" "}
                <strong className="text-[#26130B] dark:text-[#FAF4ED]">
                  {dish.allergens?.join(", ") || "None"}
                </strong>
              </span>
            </div>
            <div className="text-[#8E7E73] dark:text-[#8F8075]">
              Portion:{" "}
              <strong className="text-[#26130B] dark:text-[#FAF4ED]">
                {dish.portionSize}
              </strong>
            </div>
          </div>
        </div>

        {/* Modal Footer with Stepper & Add Button */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] dark:bg-[#120D0A] border-t border-[#26130B]/10 dark:border-white/10 flex items-center justify-between gap-4">
          {/* Stepper */}
          <div className="flex items-center bg-white dark:bg-[#241A14] border border-[#26130B]/10 dark:border-white/10 rounded-xl p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#26130B] dark:text-white hover:bg-[#FAF7F2] dark:hover:bg-[#18110D] disabled:opacity-40 transition-colors touch-target"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-9 text-center font-bold text-sm text-[#26130B] dark:text-white tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#26130B] dark:text-white hover:bg-[#FAF7F2] dark:hover:bg-[#18110D] transition-colors touch-target"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-md touch-target ${
              isAdded
                ? "bg-[#1FBF73] text-white"
                : "bg-[#E8612C] hover:bg-[#D05120] text-white"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-5 h-5" />
                <span>Added to Order</span>
              </>
            ) : (
              <>
                <span>Add to Order •</span>
                <span className="tabular-nums font-extrabold">
                  ₦{(dish.price * quantity).toLocaleString()}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

