"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote, Star, Sparkles } from "lucide-react";
import { CUSTOMER_REVIEWS } from "@/data/menuData";

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeReview = CUSTOMER_REVIEWS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? CUSTOMER_REVIEWS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === CUSTOMER_REVIEWS.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF8EC] text-[#1FBF73] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real Food Lovers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#4A1F0E] leading-tight lg:leading-[44px]">
            What Our Customers Say
          </h2>
        </div>

        {/* Featured Quote Card on Cream Panel (#FFF8EC) */}
        <div className="relative bg-[#FFF8EC] rounded-[28px] p-8 sm:p-12 md:p-14 border border-[#4A1F0E]/10 shadow-lg shadow-[#4A1F0E]/5 text-center">
          {/* Top Quote Mark Icon Badge (in Ember) */}
          <div className="w-14 h-14 rounded-full bg-[#E8612C] text-white flex items-center justify-center mx-auto mb-6 shadow-md shadow-[#E8612C]/25">
            <Quote className="w-6 h-6 fill-white" />
          </div>

          {/* Review Quote Text */}
          <p className="text-base sm:text-lg md:text-xl text-[#4A1F0E] font-medium leading-relaxed max-w-3xl mx-auto italic mb-6">
            &ldquo;{activeReview.quote}&rdquo;
          </p>

          {/* Author Name in Cocoa */}
          <h3 className="text-lg sm:text-xl font-bold text-[#4A1F0E]">
            {activeReview.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#7A6A5F] font-medium mt-1">
            {activeReview.location}
          </p>

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-1 mt-3">
            {[...Array(activeReview.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-[#FFD966] text-[#FFD966]"
              />
            ))}
          </div>

          {/* Downward triangle indicator pointing to avatars (as shown in reference image!) */}
          <div className="flex justify-center mt-6">
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[#E8612C]" />
          </div>
        </div>

        {/* Row of Reviewer Avatars with Active Indicator & Navigation Arrows */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center justify-center gap-4">
            {CUSTOMER_REVIEWS.map((review, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={review.id}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Select review by ${review.name}`}
                  className={`group relative rounded-full transition-all duration-300 ${
                    isActive
                      ? "ring-4 ring-[#1FBF73] scale-110 shadow-md"
                      : "opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-[#4A1F0E]/15 hover:border-[#4A1F0E]/40 bg-white text-[#4A1F0E] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-[#1FBF73] hover:bg-[#1aa864] text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-[#1FBF73]/25"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
