"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu as MenuIcon, X, Sparkles, MapPin, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top micro bar for quick delivery status in Lekki */}
      <div className="bg-[#4A1F0E] text-[#FFF8EC] text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-4 border-b border-[#4A1F0E]/20">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#FFD966]" />
          <span>Delivering across Lekki Phase 1, Victoria Island & Ikoyi</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 opacity-80">
          <Phone className="w-3 h-3 text-[#1FBF73]" />
          <span>Hotline: +234 812 345 6789</span>
        </div>
        <div className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-[#1FBF73]/20 text-[#1FBF73] text-[11px] font-semibold">
          ⚡ 30-45 Min Fast Dispatch
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#4A1F0E]/5 py-3"
            : "bg-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="AfrikBite Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#E8612C] flex items-center justify-center shadow-md shadow-[#E8612C]/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight text-[#4A1F0E] flex items-center">
                AfrikBite<span className="text-[#E8612C]">.</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-[#7A6A5F] -mt-1">
                Lekki • Lagos
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#home"
              className="text-[#4A1F0E] hover:text-[#E8612C] font-semibold text-base transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-[#7A6A5F] hover:text-[#4A1F0E] font-medium text-base transition-colors"
            >
              About Us
            </a>
            <a
              href="#popular"
              className="text-[#7A6A5F] hover:text-[#4A1F0E] font-medium text-base transition-colors"
            >
              Popular
            </a>
            <a
              href="#menu"
              className="text-[#7A6A5F] hover:text-[#4A1F0E] font-medium text-base transition-colors"
            >
              Menu
            </a>
            <a
              href="#reviews"
              className="text-[#7A6A5F] hover:text-[#4A1F0E] font-medium text-base transition-colors"
            >
              Reviews
            </a>
          </nav>

          {/* Action: Order Now Pill with Interactive Cart Counter */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              id="order-now-header-btn"
              className="relative inline-flex items-center gap-2.5 bg-[#FFD966] hover:bg-[#f5cd55] active:scale-95 text-[#4A1F0E] font-bold text-sm sm:text-base px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <span>Order Now</span>
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-[#4A1F0E] text-[#FFD966] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#E8612C] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {totalCount}
                  </span>
                )}
              </div>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#4A1F0E] hover:bg-[#FFF8EC] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#4A1F0E]/10 px-6 py-5 shadow-xl transition-all">
            <nav className="flex flex-col gap-4">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold text-[#4A1F0E] hover:text-[#E8612C]"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-[#7A6A5F] hover:text-[#4A1F0E]"
              >
                About Us
              </a>
              <a
                href="#popular"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-[#7A6A5F] hover:text-[#4A1F0E]"
              >
                Popular Dishes
              </a>
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-[#7A6A5F] hover:text-[#4A1F0E]"
              >
                Our Main Menu
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-[#7A6A5F] hover:text-[#4A1F0E]"
              >
                Customer Reviews
              </a>
              <div className="pt-2 border-t border-[#4A1F0E]/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#E8612C] text-white py-3 rounded-full font-bold shadow-md"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>View Cart ({totalCount} items)</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
