"use client";

import React, { useState } from "react";
import { MessageCircle, Phone, Calendar, X, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { RESTAURANT_INFO } from "@/data/menuData";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsReservationOpen } = useCart();

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      "Hello AfrikBite Lekki! I'd like to check today's hot specials and place an order."
    );
    window.open(`https://wa.me/2348123456789?text=${text}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div
      id="floating-contact-btn"
      className="fixed bottom-6 left-6 z-40 no-print"
    >
      {/* Popover Menu */}
      {isOpen && (
        <div className="mb-3 bg-white dark:bg-[#1A120D] border border-[#26130B]/10 dark:border-white/10 rounded-2xl p-3 shadow-2xl space-y-2 w-64 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-[#26130B]/10 dark:border-white/10 px-1">
            <span className="text-xs font-bold text-[#26130B] dark:text-[#FAF4ED] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E8612C]" />
              Quick Lekki Help
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8E7E73] hover:text-[#26130B] dark:hover:text-white p-1 rounded-md"
              aria-label="Close contact options"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* WhatsApp Direct */}
          <button
            onClick={handleWhatsAppOrder}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#1FBF73]/10 text-left transition-colors cursor-pointer touch-target"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1FBF73]/20 text-[#1FBF73] flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#26130B] dark:text-[#FAF4ED]">
                Order on WhatsApp
              </p>
              <p className="text-[11px] text-[#635348] dark:text-[#C7B9AD]">
                Instant 2-minute dispatch
              </p>
            </div>
          </button>

          {/* Table Reservation */}
          <button
            onClick={() => {
              setIsOpen(false);
              setIsReservationOpen(true);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#E8612C]/10 text-left transition-colors cursor-pointer touch-target"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E8612C]/20 text-[#E8612C] flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#26130B] dark:text-[#FAF4ED]">
                Book a Table
              </p>
              <p className="text-[11px] text-[#635348] dark:text-[#C7B9AD]">
                Instant online reservation
              </p>
            </div>
          </button>

          {/* Call Hotline */}
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F59E0B]/10 text-left transition-colors cursor-pointer touch-target"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#26130B] dark:text-[#FAF4ED]">
                Call Restaurant
              </p>
              <p className="text-[11px] text-[#635348] dark:text-[#C7B9AD] tabular-nums">
                {RESTAURANT_INFO.phone}
              </p>
            </div>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open quick contact menu"
        className="w-12 h-12 rounded-full bg-[#1FBF73] hover:bg-[#1AA864] text-white shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer touch-target"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}

