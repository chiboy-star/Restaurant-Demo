"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Heart, ShieldCheck, Sparkles, X } from "lucide-react";

export default function AboutSection() {
  const [showStoryModal, setShowStoryModal] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FFF8EC] relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FFD966]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#1FBF73]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#E8612C] text-xs font-bold uppercase tracking-wider shadow-sm mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic African Hospitality</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#4A1F0E] leading-tight lg:leading-[44px] mb-3">
              About Our Dining Experience
            </h2>

            <h3 className="text-xl sm:text-2xl font-semibold text-[#E8612C] mb-6">
              A Taste Of Quality And Passion
            </h3>

            <p className="text-base text-[#4A1F0E]/90 leading-relaxed mb-6 font-normal">
              We bring together fresh local ingredients, skilled chefs, and a warm Lagos atmosphere to create memorable dining moments. Every dish is thoughtfully prepared to deliver rich flavors, stunning presentation, and a truly satisfying experience for every guest, every time they visit us in Lekki.
            </p>

            <p className="text-base text-[#7A6A5F] leading-relaxed mb-8">
              Founded in the heart of Lekki Phase 1, AfrikBite was born from a desire to elevate home-style Nigerian culinary traditions—from wood-smoked party Jollof to slow-simmered Egusi and artisanal street Suya—without sacrificing the soul and warmth of homemade African cooking.
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1FBF73]/20 text-[#1FBF73] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#4A1F0E]">100% Farm-Fresh Produce</h4>
                  <p className="text-xs text-[#7A6A5F]">Sourced daily from reputable local Lagos growers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#1FBF73]/20 text-[#1FBF73] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#4A1F0E]">Heritage Spice Blends</h4>
                  <p className="text-xs text-[#7A6A5F]">Authentic yaji pepper and stone-ground aromatics.</p>
                </div>
              </div>
            </div>

            {/* Read More primary button in Ember (#E8612C) */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowStoryModal(true)}
                id="about-read-more-btn"
                className="inline-flex items-center gap-2.5 bg-[#E8612C] hover:bg-[#d45220] active:scale-95 text-white font-bold text-base px-8 py-3.5 rounded-full shadow-lg shadow-[#E8612C]/25 hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#7A6A5F]">
                <ShieldCheck className="w-4 h-4 text-[#1FBF73]" />
                <span>Certified Lekki Kitchen</span>
              </div>
            </div>
          </div>

          {/* Right Column: Circular Photo accented with Palm green ring */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Green (Palm #1FBF73) concentric accent ring */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-full border-4 border-[#1FBF73] opacity-80 animate-pulse pointer-events-none" />
              <div className="absolute -inset-8 sm:-inset-10 rounded-full border-2 border-dashed border-[#FFD966] opacity-60 pointer-events-none" />

              {/* Main Circular Image */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <Image
                  src="/images/about-platter.jpg"
                  alt="Authentic African Dining Spread at AfrikBite Lekki"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 sm:left-2 bg-white px-5 py-3 rounded-2xl shadow-xl border border-[#FFF8EC] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFD966] text-[#4A1F0E] flex items-center justify-center font-bold">
                  <Heart className="w-5 h-5 fill-[#E8612C] text-[#E8612C]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#4A1F0E]">Lekki's Choice</div>
                  <div className="text-[11px] font-medium text-[#7A6A5F]">Home-Style Authentic Taste</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-[#FFF8EC]">
            <button
              onClick={() => setShowStoryModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FFF8EC] hover:bg-[#FFD966]/40 text-[#4A1F0E] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#E8612C]/10 text-[#E8612C] flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-bold text-[#4A1F0E] mb-2">
              Our Journey: From Lagos Heart to Your Table
            </h3>
            <p className="text-xs font-semibold text-[#1FBF73] uppercase tracking-wider mb-4">
              Est. 2021 • Lekki Phase 1, Lagos
            </p>

            <div className="space-y-3 text-sm text-[#4A1F0E]/80 leading-relaxed max-h-80 overflow-y-auto pr-2">
              <p>
                AfrikBite started with a simple belief: the deep comforting recipes passed down through generations across Nigeria deserve modern culinary precision without losing their soul.
              </p>
              <p>
                Our signature smoky Party Jollof gets its unmistakable aroma from aged cast-iron pots and fire roasting, while our Suya beef is hand-rubbed with 14 wild herbs and dried pepper harvested in Northern Nigeria.
              </p>
              <p>
                Whether you dine in our sunlit Lekki conservatory or order delivery directly to your home in Victoria Island or Ikoyi, our promise remains unchanged: every bite is crafted with integrity, hygiene, and authentic warmth.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#4A1F0E]/10 flex justify-end">
              <button
                onClick={() => setShowStoryModal(false)}
                className="bg-[#E8612C] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-[#d45220]"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
