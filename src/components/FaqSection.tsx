"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQ_ITEMS } from "@/data/menuData";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Ordering", "Food & Dietary", "Reservations"];

  const filteredFaqs =
    activeCategory === "All"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((f) => f.category === activeCategory);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white dark:bg-[#0E0906] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#241A14] text-[#E8612C] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#26130B] dark:text-[#FAF4ED] tracking-tight text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#635348] dark:text-[#C7B9AD] mt-2">
            Everything you need to know about dining, delivery times, and catering in Lekki.
          </p>
        </div>

        {/* Category Pills (Hick's law: fast categorical filtering) */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer touch-target ${
                activeCategory === cat
                  ? "bg-[#E8612C] text-white shadow-sm"
                  : "bg-[#FAF7F2] dark:bg-[#241A14] text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B] dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Stack */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#26130B]/10 dark:border-white/10 overflow-hidden bg-[#FAF7F2]/60 dark:bg-[#18110D] transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-[#26130B] dark:text-[#FAF4ED] hover:text-[#E8612C] dark:hover:text-[#E8612C] transition-colors cursor-pointer touch-target"
                >
                  <span className="pr-4">{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center bg-white dark:bg-[#241A14] text-[#8E7E73] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#E8612C]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#635348] dark:text-[#C7B9AD] leading-relaxed border-t border-[#26130B]/5 dark:border-white/5 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

