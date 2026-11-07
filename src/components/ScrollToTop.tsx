"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShow(scrollY > 300);

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  const strokeDashoffset = 100 - scrollProgress;

  return (
    <button
      id="scroll-to-top-btn"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white dark:bg-[#1A120D] text-[#26130B] dark:text-[#FAF4ED] shadow-xl border border-[#26130B]/10 dark:border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer touch-target no-print"
    >
      {/* Circular SVG scroll indicator */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
        viewBox="0 0 36 36"
      >
        <path
          className="text-[#E8612C]/20"
          strokeWidth="2.5"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-[#E8612C] transition-all duration-150"
          strokeDasharray="100, 100"
          strokeDashoffset={strokeDashoffset}
          strokeWidth="2.5"
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <ArrowUp className="w-5 h-5 text-[#E8612C] group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}

