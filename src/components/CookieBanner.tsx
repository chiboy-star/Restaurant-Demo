"use client";

import React, { useState, useEffect } from "react";
import { Cookie, X, Check, Shield } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("afrikbite_cookie_consent");
      if (!consent) {
        // Small delay so it doesn't jarringly block initial render
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // storage unavailable
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("afrikbite_cookie_consent", "accepted");
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("afrikbite_cookie_consent", "declined");
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      id="cookie-banner"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 bg-white dark:bg-[#1A120D] border border-[#26130B]/10 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-[#26130B] dark:text-[#FAF4ED] flex items-center gap-1.5">
              <span>Fresh Experience</span>
              <Shield className="w-3.5 h-3.5 text-[#1FBF73]" />
            </h4>
            <button
              onClick={handleDecline}
              aria-label="Dismiss cookie notice"
              className="text-[#8E7E73] hover:text-[#26130B] dark:hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-[#635348] dark:text-[#C7B9AD] mt-1 leading-relaxed">
            We use essential local cookies to remember your cart items, table
            reservation draft, and flavor preferences in Lekki.
          </p>
          <div className="mt-3.5 flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E8612C] hover:bg-[#D05120] text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer touch-target justify-center flex-1 sm:flex-initial"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept Cookies</span>
            </button>
            <button
              onClick={handleDecline}
              className="px-3.5 py-2 rounded-xl bg-transparent hover:bg-[#26130B]/5 dark:hover:bg-white/5 text-xs font-medium text-[#635348] dark:text-[#C7B9AD] transition-all cursor-pointer touch-target flex-1 sm:flex-initial"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

