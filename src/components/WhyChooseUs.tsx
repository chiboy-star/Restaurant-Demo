"use client";

import React from "react";
import {
  Sparkles,
  ShieldCheck,
  Clock,
  UtensilsCrossed,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

export default function WhyChooseUs() {
  const pillars = [
    {
      title: "Wood-Fired Heritage Flavor",
      description: "Authentic Lagos bottom-pot aroma using natural hardwoods and seasoned cast-iron pots.",
      icon: UtensilsCrossed,
      color: "text-[#E8612C]",
      bg: "bg-[#E8612C]/10",
    },
    {
      title: "Express 30-45m Lekki Dispatch",
      description: "Insulated thermal packaging guarantees every bowl and grill arrives piping hot.",
      icon: Clock,
      color: "text-[#1FBF73]",
      bg: "bg-[#1FBF73]/10",
    },
    {
      title: "100% Certified Clean Kitchen",
      description: "Rigorous hygiene standards, inspected and certified by Lagos State safety agencies.",
      icon: ShieldCheck,
      color: "text-[#F59E0B]",
      bg: "bg-[#F59E0B]/10",
    },
    {
      title: "True Nigerian Hospitality",
      description: "Warm, attentive guest experience whether dining in our lounge or ordering takeaway.",
      icon: HeartHandshake,
      color: "text-[#E8612C]",
      bg: "bg-[#E8612C]/10",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] dark:bg-[#120D0A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 text-[#1FBF73] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The AfrikBite Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#26130B] dark:text-[#FAF4ED] tracking-tight text-balance">
            Why Lekki Chooses AfrikBite
          </h2>
          <p className="text-xs sm:text-sm text-[#635348] dark:text-[#C7B9AD] mt-2">
            We hold ourselves to the highest culinary, hygiene, and hospitality standards.
          </p>
        </div>

        {/* 4 Pillars Grid (Law 8: Similarity, Law 9: Common region, Continuous Corners: rounded-2xl) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-5`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#26130B] dark:text-[#FAF4ED] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#635348] dark:text-[#C7B9AD] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#26130B]/5 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-bold text-[#1FBF73]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
