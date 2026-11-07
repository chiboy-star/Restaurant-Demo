"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Sparkles,
  Phone,
  Search,
  Moon,
  Sun,
  Calendar,
  Clock,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { RESTAURANT_INFO } from "@/data/menuData";

export default function Header() {
  const {
    totalCount,
    setIsCartOpen,
    setIsReservationOpen,
    setIsCommandMenuOpen,
    isDark,
    toggleDarkMode,
    liveWaitTime,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top micro bar for live kitchen status & delivery areas (SWR) */}
      <div className="bg-[#18110D] text-[#FAF4ED] text-xs py-2 px-4 font-medium flex items-center justify-between border-b border-white/10 no-print">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1FBF73]" />
            <span className="text-[11px] sm:text-xs">
              Kitchen Live: ~{liveWaitTime} min prep • Lekki Phase 1, VI & Ikoyi
            </span>
          </div>

          <div className="flex items-center gap-5 text-[11px] sm:text-xs">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="hidden sm:flex items-center gap-1.5 opacity-90 hover:opacity-100 hover:text-[#F59E0B] transition-colors tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-[#1FBF73]" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
            <div className="hidden md:flex items-center gap-1 opacity-80">
              <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Open: {RESTAURANT_INFO.hours.weekdays}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Glassmorphism Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 no-print ${
          isScrolled
            ? "bg-white/95 dark:bg-[#0E0906]/95 backdrop-blur-md shadow-sm border-b border-[#26130B]/10 dark:border-white/10 py-3"
            : "bg-white dark:bg-[#0E0906] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="AfrikBite Lekki Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#E8612C] text-white flex items-center justify-center shadow-md shadow-[#E8612C]/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight text-[#26130B] dark:text-[#FAF4ED] flex items-center leading-none">
                AfrikBite<span className="text-[#E8612C]">.</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-[#8E7E73] dark:text-[#8F8075] mt-1">
                Lekki • Lagos
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <a
              href="#home"
              className="text-sm font-semibold text-[#26130B] dark:text-[#FAF4ED] hover:text-[#E8612C] dark:hover:text-[#E8612C] transition-colors"
            >
              Home
            </a>
            <a
              href="#menu"
              className="text-sm font-medium text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B] dark:hover:text-[#FAF4ED] transition-colors"
            >
              Main Menu
            </a>
            <a
              href="#popular"
              className="text-sm font-medium text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B] dark:hover:text-[#FAF4ED] transition-colors"
            >
              Favorites
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B] dark:hover:text-[#FAF4ED] transition-colors"
            >
              About
            </a>
            <a
              href="#reviews"
              className="text-sm font-medium text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B] dark:hover:text-[#FAF4ED] transition-colors"
            >
              Reviews
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B] dark:hover:text-[#FAF4ED] transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action Tools: Search Cmd+K, Dark Mode, Reservation, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Menu Button */}
            <button
              onClick={() => setIsCommandMenuOpen(true)}
              aria-label="Open search command menu"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FAF7F2] dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 text-xs text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B] dark:hover:text-white transition-all cursor-pointer touch-target"
            >
              <Search className="w-4 h-4 text-[#8E7E73]" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-white dark:bg-[#241A14] rounded border border-[#26130B]/10 dark:border-white/10 text-[#8E7E73]">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle (Feature 1) */}
            <button
              onClick={toggleDarkMode}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="w-10 h-10 rounded-xl bg-[#FAF7F2] dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B] dark:hover:text-white flex items-center justify-center transition-all cursor-pointer touch-target"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#F59E0B]" />
              ) : (
                <Moon className="w-4 h-4 text-[#26130B]" />
              )}
            </button>

            {/* Table Reservation Button */}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E8612C]/40 text-[#E8612C] hover:bg-[#E8612C] hover:text-white text-xs font-bold transition-all cursor-pointer touch-target"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              id="order-now-header-btn"
              className="relative inline-flex items-center gap-2 bg-[#E8612C] hover:bg-[#D05120] active:scale-95 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer touch-target"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Order</span>
              {totalCount > 0 && (
                <span className="ml-1 bg-white text-[#E8612C] text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center tabular-nums">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#26130B] dark:text-[#FAF4ED] hover:bg-[#FAF7F2] dark:hover:bg-[#18110D] transition-colors touch-target"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer (Feature 5) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#18110D] border-b border-[#26130B]/10 dark:border-white/10 px-6 py-5 shadow-2xl transition-all animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col gap-4">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#26130B] dark:text-[#FAF4ED] hover:text-[#E8612C]"
              >
                Home
              </a>
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B]"
              >
                Our Main Menu
              </a>
              <a
                href="#popular"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B]"
              >
                Customer Favorites
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B]"
              >
                About Our Lekki Kitchen
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B]"
              >
                Customer Reviews
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#635348] dark:text-[#C7B9AD] hover:text-[#26130B]"
              >
                FAQ
              </a>

              <div className="pt-3 border-t border-[#26130B]/10 dark:border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsReservationOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 border border-[#E8612C] text-[#E8612C] py-2.5 rounded-xl font-bold text-xs touch-target"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Table</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#E8612C] text-white py-2.5 rounded-xl font-bold text-xs shadow-md touch-target"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>View Order ({totalCount} items)</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
