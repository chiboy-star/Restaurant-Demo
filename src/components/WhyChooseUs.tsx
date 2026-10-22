"use client";

import React from "react";
import Image from "next/image";
import { Check, Star, Utensils, Award, Sparkles, DollarSign } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF8EC] text-[#1FBF73] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The AfrikBite Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#4A1F0E] leading-tight lg:leading-[44px]">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Concentric circular dish arrangement with green ring */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative">
              {/* Green accent outer ring */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-full border-4 border-[#1FBF73] pointer-events-none" />

              {/* Main circle */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[360px] md:h-[360px] rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <Image
                  src="/images/about-platter.jpg"
                  alt="Quality African Cuisine in Lekki"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Smaller overlapping offset circular dish image (matching screenshot) */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/images/dish-suya.jpg"
                  alt="Delicious Kano Suya"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Small top-left accent badge */}
              <div className="absolute -top-3 -left-3 bg-[#FFD966] text-[#4A1F0E] p-3 rounded-full shadow-lg">
                <Utensils className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Right Column: Content and 4 Key Value Points */}
          <div className="lg:col-span-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#4A1F0E] mb-4">
              Quality Food, Exceptional Service
            </h3>

            <p className="text-base text-[#7A6A5F] leading-relaxed mb-8">
              We are committed to delivering the best dining experience through high-quality ingredients, skilled African culinary masters, and swift reliable service. Every detail is carefully crafted to ensure comfort, authentic taste, and absolute satisfaction for every resident and visitor in Lekki.
            </p>

            {/* 4 Feature Badges with color dots matching reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFF8EC]/60 border border-[#4A1F0E]/5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#E8612C] shrink-0" />
                <span className="font-semibold text-sm text-[#4A1F0E]">
                  High Quality Food
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFF8EC]/60 border border-[#4A1F0E]/5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#1FBF73] shrink-0" />
                <span className="font-semibold text-sm text-[#4A1F0E]">
                  Hygienic Kitchen
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFF8EC]/60 border border-[#4A1F0E]/5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#FFD966] shrink-0" />
                <span className="font-semibold text-sm text-[#4A1F0E]">
                  Experienced Chefs
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFF8EC]/60 border border-[#4A1F0E]/5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#E8612C] shrink-0" />
                <span className="font-semibold text-sm text-[#4A1F0E]">
                  Affordable Price
                </span>
              </div>
            </div>

            {/* Social proof avatar row and rating */}
            <div className="pt-6 border-t border-[#4A1F0E]/10 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-3 overflow-hidden">
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white overflow-hidden relative">
                  <Image src="/images/avatars/avatar-1.jpg" alt="Customer" fill className="object-cover" />
                </div>
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white overflow-hidden relative">
                  <Image src="/images/avatars/avatar-2.jpg" alt="Customer" fill className="object-cover" />
                </div>
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white overflow-hidden relative">
                  <Image src="/images/avatars/avatar-3.jpg" alt="Customer" fill className="object-cover" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FFD966] text-[#FFD966]" />
                  ))}
                  <span className="text-xs font-bold text-[#4A1F0E] ml-1">5.0</span>
                </div>
                <p className="text-xs text-[#7A6A5F] font-medium">
                  1,500+ Happy Customers across Lekki & VI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
