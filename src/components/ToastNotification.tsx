"use client";

import React from "react";
import { Check, Undo2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ToastNotification() {
  const { toasts, dismissToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none no-print"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#18110D] dark:bg-[#FAF4ED] text-white dark:text-[#18110D] px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3 border border-white/10 dark:border-[#18110D]/10 animate-in slide-in-from-bottom-2 fade-in duration-200"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-[#1FBF73]/20 text-[#1FBF73] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs sm:text-sm font-medium truncate">
              {toast.message}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {toast.undoAction && (
              <button
                onClick={() => {
                  toast.undoAction?.();
                  dismissToast(toast.id);
                }}
                className="inline-flex items-center gap-1 bg-[#E8612C] hover:bg-[#D05120] text-white text-xs font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer touch-target"
              >
                <Undo2 className="w-3 h-3" />
                <span>{toast.undoLabel || "Undo"}</span>
              </button>
            )}

            <button
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss toast"
              className="p-1 text-white/60 dark:text-[#18110D]/60 hover:text-white dark:hover:text-[#18110D] rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
