"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Award,
  Utensils,
  X,
} from "lucide-react";

export default function AboutSection() {
  const [showStoryModal, setShowStoryModal] = useState(false);

  return (
    <section
      id="about"
      className="py-16 sm:py-24 bg-white dark:bg-[#0E0906] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 text-[#E8612C] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic African Hospitality</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#26130B] dark:text-[#FAF4ED] leading-tight text-balance">
              Preserving African Heritage, One Plate at a Time.
            </h2>

            <p className="mt-4 text-base text-[#635348] dark:text-[#C7B9AD] leading-relaxed">
              Founded along Admiralty Way in Lekki Phase 1, AfrikBite brings the authentic soul of West African home cooking into a refined, contemporary dining atmosphere. We honor heritage cooking techniques—from wood-fire iron pots for that unmistakable party Jollof aroma to hand-ground Kano yaji spices.
            </p>

            {/* Flat Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#1FBF73]/15 text-[#1FBF73] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#26130B] dark:text-[#FAF4ED]">
                    100% Farm-Fresh Daily
                  </h4>
                  <p className="text-xs text-[#635348] dark:text-[#C7B9AD] mt-0.5">
                    Fresh produce & certified Halal meats delivered every morning.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#E8612C]/15 text-[#E8612C] flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#26130B] dark:text-[#FAF4ED]">
                    Master African Chefs
                  </h4>
                  <p className="text-xs text-[#635348] dark:text-[#C7B9AD] mt-0.5">
                    Decades of regional culinary mastery in Nigerian cuisine.
                  </p>
                </div>
              </div>
            </div>

            {/* Read More Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowStoryModal(true)}
                id="about-read-more-btn"
                className="inline-flex items-center gap-2 bg-[#E8612C] hover:bg-[#D05120] text-white font-bold text-sm sm:text-base px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer touch-target"
              >
                <span>Our Heritage Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#8E7E73] dark:text-[#8F8075]">
                <ShieldCheck className="w-4 h-4 text-[#1FBF73]" />
                <span>Certified Lekki Kitchen</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Platter Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-[#26130B]/10 dark:border-white/10 shadow-2xl">
                <Image
                  src="/images/about-platter.jpg"
                  alt="Authentic African Dining Spread at AfrikBite Lekki"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Stat card overlay with tabular numbers */}
              <div className="absolute -bottom-5 -left-4 sm:left-4 bg-white dark:bg-[#18110D] p-4 rounded-2xl shadow-xl border border-[#26130B]/10 dark:border-white/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center font-extrabold text-sm">
                  12k+
                </div>
                <div>
                  <p className="text-xs font-bold text-[#26130B] dark:text-[#FAF4ED]">
                    Dishes Served in Lekki
                  </p>
                  <p className="text-[11px] text-[#8E7E73] dark:text-[#8F8075]">
                    Consistent 4.9★ rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Modal (Progressive Disclosure) */}
      {showStoryModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="AfrikBite Heritage Story"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-[#FAF7F2] dark:bg-[#241A14] text-[#8E7E73] hover:text-[#26130B] dark:hover:text-white flex items-center justify-center"
              aria-label="Close story modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#E8612C]/10 text-[#E8612C] flex items-center justify-center mb-4">
              <Utensils className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-bold text-[#26130B] dark:text-[#FAF4ED] mb-3">
              The AfrikBite Story
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#635348] dark:text-[#C7B9AD] leading-relaxed">
              <p>
                AfrikBite was established in Lekki Phase 1 with a singular mission: to make the finest home-style African dishes accessible with the speed and convenience of modern dining, without compromising authentic time-tested recipes.
              </p>
              <p>
                Our signature smoky Jollof rice is cooked using traditional wood-fire techniques that caramelize the bottom layer of the pot (known as the coveted &ldquo;bottom pot flavor&rdquo;). Our Suya is chargrilled on open coals with authentic Kano groundnut yaji, and our soups are simmered with pure stone-ground melon seeds and tender meats.
              </p>
              <p>
                Whether you visit our welcoming Lekki dining room or order express delivery to your home in VI or Ikoyi, you are family at AfrikBite.
              </p>
            </div>

            <button
              onClick={() => setShowStoryModal(false)}
              className="w-full mt-6 py-3 rounded-xl bg-[#E8612C] text-white text-xs sm:text-sm font-bold shadow-sm"
            >
              Close Story
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
