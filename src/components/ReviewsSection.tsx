"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote, Star, Sparkles, CheckCircle2 } from "lucide-react";
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
    <section id="reviews" className="py-16 sm:py-24 bg-white dark:bg-[#0E0906] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 text-[#1FBF73] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Lekki Diners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#26130B] dark:text-[#FAF4ED] tracking-tight text-balance">
            Loved Across Lagos
          </h2>
          <p className="text-xs sm:text-sm text-[#635348] dark:text-[#C7B9AD] mt-2">
            Read what real food critics and everyday families say about our dishes.
          </p>
        </div>

        {/* Featured Quote Card (Flattened, continuous corners: rounded-3xl) */}
        <div className="relative bg-[#FAF7F2] dark:bg-[#18110D] rounded-3xl p-8 sm:p-12 border border-[#26130B]/10 dark:border-white/10 shadow-lg text-center transition-all duration-300">
          {/* Quote Icon */}
          <div className="w-12 h-12 rounded-2xl bg-[#E8612C] text-white flex items-center justify-center mx-auto mb-6 shadow-md shadow-[#E8612C]/20">
            <Quote className="w-5 h-5 fill-white" />
          </div>

          {/* Quote Text */}
          <blockquote className="text-base sm:text-lg md:text-xl text-[#26130B] dark:text-[#FAF4ED] font-medium leading-relaxed max-w-2xl mx-auto italic mb-6 text-balance">
            &ldquo;{activeReview.quote}&rdquo;
          </blockquote>

          {/* Reviewer Details */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#26130B] dark:text-[#FAF4ED]">
              {activeReview.name}
            </h3>
            <p className="text-xs text-[#635348] dark:text-[#C7B9AD]">
              {activeReview.role} • {activeReview.location}
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-1 mt-3">
            {[...Array(activeReview.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]"
              />
            ))}
          </div>

          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1FBF73] mt-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{activeReview.highlight}</span>
          </div>
        </div>

        {/* Reviewers Avatar Selector & Nav Arrows */}
        <div className="mt-8 flex items-center justify-between gap-4 max-w-sm mx-auto">
          <button
            onClick={handlePrev}
            aria-label="Previous review"
            className="w-10 h-10 rounded-xl border border-[#26130B]/10 dark:border-white/10 bg-[#FAF7F2] dark:bg-[#18110D] text-[#26130B] dark:text-[#FAF4ED] flex items-center justify-center transition-all hover:bg-white dark:hover:bg-[#241A14] active:scale-95 touch-target"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            {CUSTOMER_REVIEWS.map((review, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={review.id}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Select review by ${review.name}`}
                  className={`relative rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "ring-2 ring-[#E8612C] scale-110 shadow-md"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white dark:border-[#0E0906] shrink-0"
                    style={{ width: 44, height: 44 }}
                  >
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next review"
            className="w-10 h-10 rounded-xl bg-[#E8612C] text-white flex items-center justify-center transition-all hover:bg-[#D05120] active:scale-95 shadow-sm touch-target"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
