"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  Clock,
  Flame,
  Calendar,
  Star,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MENU_ITEMS } from "@/data/menuData";

export default function HeroSection() {
  const { addToCart, setIsReservationOpen, liveWaitTime } =
    useCart();
  const heroDish = MENU_ITEMS[0]; // Jollof Rice with Chicken

  return (
    <section
      id="home"
      className="relative pt-8 sm:pt-14 pb-16 lg:pb-24 overflow-hidden bg-[#FAF7F2] dark:bg-[#0E0906]"
    >
      {/* Subtle warm background glow without purple */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#F59E0B]/10 dark:bg-[#E8612C]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headlines, Value Badges, and Dual Primary CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 shadow-xs mb-5">
              <span className="w-2 h-2 rounded-full bg-[#1FBF73]" />
              <span className="text-xs font-semibold text-[#26130B] dark:text-[#FAF4ED]">
                Lekki Kitchen Open • ~{liveWaitTime} min average dispatch
              </span>
            </div>

            {/* Balanced Headline (Tip 17: text-balance, Law 10: Visual hierarchy) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#26130B] dark:text-[#FAF4ED] tracking-tight leading-[1.1] text-balance">
              Authentic African Flavors,{" "}
              <span className="text-[#E8612C]">Crafted with Passion.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#635348] dark:text-[#C7B9AD] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Indulge in smoky wood-fired party Jollof, chargrilled Kano Suya,
              rich melon-seed Egusi, and fresh tropical drinks right here in Lekki Phase 1.
            </p>

            {/* Dual CTAs (Hick's Law / Von Restorff: Clear primary & secondary) */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <a
                href="#menu"
                id="explore-menu-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E8612C] hover:bg-[#D05120] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg shadow-[#E8612C]/20 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer touch-target"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-[#18110D] hover:bg-[#FAF7F2] dark:hover:bg-[#241A14] text-[#26130B] dark:text-[#FAF4ED] font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-[#26130B]/10 dark:border-white/10 shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer touch-target"
              >
                <Calendar className="w-4 h-4 text-[#E8612C]" />
                <span>Reserve a Table</span>
              </button>
            </div>

            {/* Social Proof / Metrics Row (Miller's law: chunked social signals) */}
            <div className="mt-10 pt-6 border-t border-[#26130B]/10 dark:border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#635348] dark:text-[#C7B9AD]">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[
                    "/images/avatars/avatar-1.jpg",
                    "/images/avatars/avatar-2.jpg",
                    "/images/avatars/avatar-3.jpg",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white dark:border-[#0E0906] shrink-0"
                      style={{ width: 28, height: 28 }}
                    >
                      <Image
                        src={src}
                        alt="Diner"
                        width={28}
                        height={28}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 font-bold text-[#26130B] dark:text-[#FAF4ED]">
                  <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  <span>4.9 / 5</span>
                  <span className="font-normal text-[#8E7E73] dark:text-[#8F8075]">(650+ reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#1FBF73]" />
                <span>100% Halal & Fresh Daily</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Dish Showcase Card (Flattened, no nested cards) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 shadow-xl transition-all duration-300">
              <div className="relative w-full h-72 sm:h-80 bg-neutral-100">
                <Image
                  src={heroDish.image}
                  alt={heroDish.name}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#E8612C] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  <span>Chef&apos;s Signature</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-[#18110D]/95 backdrop-blur-sm text-[#26130B] dark:text-[#FAF4ED] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 tabular-nums">
                  <Clock className="w-3.5 h-3.5 text-[#E8612C]" />
                  <span>{heroDish.prepTime}</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#26130B] dark:text-[#FAF4ED]">
                      {heroDish.name}
                    </h3>
                    <p className="text-xs text-[#635348] dark:text-[#C7B9AD] mt-1 line-clamp-2">
                      {heroDish.description}
                    </p>
                  </div>
                  <span className="text-lg font-extrabold text-[#E8612C] tabular-nums whitespace-nowrap">
                    ₦{heroDish.price.toLocaleString()}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={() => {
                      addToCart(heroDish);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1FBF73] hover:bg-[#1AA864] text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer touch-target"
                  >
                    <span>Quick Add to Order</span>
                  </button>
                  <a
                    href="#menu"
                    className="px-4 py-2.5 rounded-xl border border-[#26130B]/10 dark:border-white/10 text-xs font-semibold text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B] dark:hover:text-white transition-colors touch-target"
                  >
                    View All
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
