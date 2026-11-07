"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ConfirmClearModal() {
  const { isConfirmClearOpen, setIsConfirmClearOpen, clearCart } = useCart();

  if (!isConfirmClearOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Confirm clear cart"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 rounded-2xl p-6 shadow-2xl space-y-4"
      >
        <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
          <Trash2 className="w-6 h-6" />
        </div>

        <div className="text-center space-y-1.5">
          <h3 className="text-lg font-bold text-[#26130B] dark:text-[#FAF4ED]">
            Empty your cart?
          </h3>
          <p className="text-xs text-[#635348] dark:text-[#C7B9AD] leading-relaxed">
            All selected dishes and custom quantity preferences will be removed.
            You can still undo this immediately after.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => setIsConfirmClearOpen(false)}
            className="flex-1 py-2.5 px-4 rounded-xl border border-[#26130B]/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#635348] dark:text-[#C7B9AD] hover:bg-[#FAF7F2] dark:hover:bg-[#241A14] transition-colors cursor-pointer touch-target"
          >
            Keep Items
          </button>
          <button
            onClick={clearCart}
            className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer touch-target"
          >
            Yes, Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

