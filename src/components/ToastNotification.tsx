"use client";

import React from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ToastNotification() {
  const { toastMessage, setIsCartOpen } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className="bg-[#4A1F0E] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-[#FFD966]/30">
        <div className="w-6 h-6 rounded-full bg-[#1FBF73] text-white flex items-center justify-center">
          <Check className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        <button
          onClick={() => setIsCartOpen(true)}
          className="ml-2 bg-[#FFD966] text-[#4A1F0E] text-xs font-bold px-3 py-1 rounded-full hover:bg-[#f5cd55] transition-colors"
        >
          View Cart
        </button>
      </div>
    </div>
  );
}
