"use client";

import React from "react";
import Image from "next/image";
import { ArrowDownRight, Sparkles, Clock, Flame } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MENU_ITEMS } from "@/data/menuData";

export default function HeroSection() {
  const { addToCart, setIsCartOpen } = useCart();
  const heroDish = MENU_ITEMS[0]; // Jollof Rice with Chicken

  return (
    <section
      id="home"
      className="relative pt-6 sm:pt-10 pb-16 lg:pb-24 overflow-hidden bg-white"
    >
      {/* Background ambient warm gradient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFF8EC] rounded-full blur-3xl opacity-80 pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#FFD966]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Headline & Tilted Pill Badges Container */}
        <div className="relative text-center max-w-4xl mx-auto pt-2 pb-6">
          {/* Tilted Pill 1: Delicious (Ember #E8612C) */}
          <div className="inline-block transform -rotate-6 hover:rotate-0 transition-transform duration-300 absolute left-2 sm:left-12 lg:left-24 top-2 sm:top-1 z-20">
            <span className="bg-[#E8612C] text-white font-bold text-sm sm:text-lg lg:text-xl px-5 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-lg shadow-[#E8612C]/25 tracking-wide">
              Delicious
            </span>
          </div>

          {/* Tilted Pill 2: Food (Palm #1FBF73) */}
          <div className="inline-block transform rotate-12 hover:rotate-0 transition-transform duration-300 absolute right-4 sm:right-16 lg:right-28 top-4 sm:top-6 z-20">
            <span className="bg-[#1FBF73] text-[#4A1F0E] font-bold text-sm sm:text-lg lg:text-xl px-5 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-lg shadow-[#1FBF73]/25 tracking-wide">
              Food
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-[#4A1F0E] tracking-tight leading-[1.08] sm:leading-[66px] pt-6 sm:pt-8 pb-4">
            Experience The
            <br />
            <span className="relative inline-block mt-1">
              Taste You Deserve
              {/* Tilted Pill 3: Drink (Plantain #FFD966) centered over or under text */}
              <span className="hidden sm:inline-block transform rotate-3 hover:rotate-0 transition-transform duration-300 absolute -bottom-7 left-1/3 -translate-x-1/2 z-20">
                <span className="bg-[#FFD966] text-[#4A1F0E] font-bold text-base lg:text-lg px-6 py-1.5 rounded-full shadow-md shadow-[#FFD966]/40">
                  Drink
                </span>
              </span>
            </span>
          </h1>

          {/* Interactive Fast Filters / Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 mb-2">
            <a
              href="#menu"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-[#FFF8EC] text-[#4A1F0E] hover:bg-[#FFD966]/30 px-3.5 py-1.5 rounded-full border border-[#4A1F0E]/10 transition-all cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-[#E8612C]" />
              <span>Smoky Jollof</span>
            </a>
            <a
              href="#menu"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-[#FFF8EC] text-[#4A1F0E] hover:bg-[#FFD966]/30 px-3.5 py-1.5 rounded-full border border-[#4A1F0E]/10 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1FBF73]" />
              <span>Yaji Spiced Suya</span>
            </a>
            <a
              href="#menu"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-[#FFF8EC] text-[#4A1F0E] hover:bg-[#FFD966]/30 px-3.5 py-1.5 rounded-full border border-[#4A1F0E]/10 transition-all cursor-pointer"
            >
              <span>🥣 Egusi & Pounded Yam</span>
            </a>
          </div>
        </div>

        {/* Hero Visual & CTA Grid */}
        <div className="relative mt-2 lg:mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Subtitle & CTA Trigger */}
          <div className="lg:col-span-4 text-center lg:text-left z-20 order-2 lg:order-1">
            <p className="text-base sm:text-lg text-[#7A6A5F] leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
              Discover Curated Fresh Dishes Crafted By Expert African Chefs For
              Unforgettable Dining Experiences In Lekki, Lagos.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {/* Explore Menu button in Palm fill (#1FBF73) with white text */}
              <a
                href="#menu"
                id="explore-menu-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1FBF73] hover:bg-[#1aa864] text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-[#1FBF73]/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span>Explore Menu</span>
                <ArrowDownRight className="w-5 h-5" />
              </a>

              <button
                onClick={() => {
                  addToCart(heroDish);
                  setIsCartOpen(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFF8EC] hover:bg-[#FFD966]/30 text-[#4A1F0E] font-bold text-base px-6 py-4 rounded-full border border-[#4A1F0E]/10 hover:border-[#4A1F0E]/30 transition-all duration-200"
              >
                <Clock className="w-4 h-4 text-[#E8612C]" />
                <span>Quick Order (₦4,500)</span>
              </button>
            </div>

            {/* Quick highlight metrics */}
            <div className="mt-8 pt-6 border-t border-[#4A1F0E]/10 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#7A6A5F]">
              <div>
                <span className="block text-xl font-extrabold text-[#4A1F0E]">100%</span>
                <span>Authentic Spices</span>
              </div>
              <div className="h-8 w-px bg-[#4A1F0E]/15" />
              <div>
                <span className="block text-xl font-extrabold text-[#4A1F0E]">25-35m</span>
                <span>Fast Lekki Delivery</span>
              </div>
              <div className="h-8 w-px bg-[#4A1F0E]/15" />
              <div>
                <span className="block text-xl font-extrabold text-[#1FBF73]">4.9 ★</span>
                <span>1,500+ Reviews</span>
              </div>
            </div>
          </div>

          {/* Center Column: Big Signature Dish in Ceramic Bowl viewed from 45-degree angle */}
          <div className="lg:col-span-8 relative flex items-center justify-center order-1 lg:order-2">
            {/* Soft decorative concentric backdrop circles */}
            <div className="absolute w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full border border-[#FFD966]/40 -z-10 animate-pulse pointer-events-none" />
            <div className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full border border-[#1FBF73]/20 -z-10 pointer-events-none" />

            {/* Main Ceramic Bowl Image */}
            <div className="relative w-[300px] sm:w-[460px] lg:w-[520px] aspect-square rounded-full p-2 bg-gradient-to-tr from-[#FFD966]/30 via-white to-[#1FBF73]/20 shadow-2xl shadow-[#4A1F0E]/15">
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
                <Image
                  src="/images/hero-bowl.jpg"
                  alt="Signature Smoky Nigerian Party Jollof Rice with Spiced Beef and Sweet Plantains"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 460px, 520px"
                />
              </div>

              {/* Floating Badge Right: Dessert / Small Chops */}
              <div className="absolute -right-2 sm:right-2 top-8 sm:top-14 z-30">
                <a
                  href="#menu"
                  className="group flex flex-col items-center bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl shadow-[#4A1F0E]/10 border border-[#FFF8EC] hover:scale-105 transition-transform"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#E8612C] shadow-sm relative">
                    <Image
                      src="/images/dish-puffpuff.jpg"
                      alt="Sweet Puff Puff"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="mt-1 text-xs font-bold text-[#4A1F0E] px-2 py-0.5 rounded-full bg-[#FFF8EC] group-hover:bg-[#FFD966] transition-colors">
                    Dessert
                  </span>
                </a>
              </div>

              {/* Floating Badge Right Lower: Dishes / Grills */}
              <div className="absolute -right-3 sm:right-6 bottom-10 sm:bottom-16 z-30">
                <a
                  href="#menu"
                  className="group flex flex-col items-center bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl shadow-[#4A1F0E]/10 border border-[#FFF8EC] hover:scale-105 transition-transform"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#1FBF73] shadow-sm relative">
                    <Image
                      src="/images/dish-suya.jpg"
                      alt="Beef Suya"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="mt-1 text-xs font-bold text-[#4A1F0E] px-2 py-0.5 rounded-full bg-[#FFF8EC] group-hover:bg-[#1FBF73] group-hover:text-white transition-colors">
                    Dishes
                  </span>
                </a>
              </div>

              {/* Floating Badge Left Lower: Rating pill */}
              <div className="absolute -left-2 sm:left-4 bottom-8 sm:bottom-14 z-30 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl shadow-[#4A1F0E]/10 border border-[#FFF8EC] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E8612C] text-white flex items-center justify-center font-bold text-sm">
                  🍲
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#4A1F0E]">Signature Jollof</div>
                  <div className="text-[11px] font-semibold text-[#1FBF73]">₦4,500 • Fresh Daily</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
