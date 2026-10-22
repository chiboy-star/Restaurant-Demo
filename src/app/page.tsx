"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PopularDishesSection from "@/components/PopularDishesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import MenuGridSection from "@/components/MenuGridSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import ToastNotification from "@/components/ToastNotification";

export default function HomePage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#4A1F0E]">
        {/* Sticky Header with Navigation and Cart Counter */}
        <Header />

        {/* Main Content Bands */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <HeroSection />

          {/* 2. About Section */}
          <AboutSection />

          {/* 3. Popular Dishes Section */}
          <PopularDishesSection />

          {/* 4. Why Choose Us Section */}
          <WhyChooseUs />

          {/* 5. Our Main Menu Selection (3-Column Compact Grid) */}
          <MenuGridSection />

          {/* 6. Customer Reviews & Testimonials */}
          <ReviewsSection />
        </main>

        {/* 7. Footer */}
        <Footer />

        {/* Interactive Overlays */}
        <CartDrawer />
        <CheckoutModal />
        <ToastNotification />
      </div>
    </CartProvider>
  );
}
