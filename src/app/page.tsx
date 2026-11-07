"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import SkipToContent from "@/components/SkipToContent";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PopularDishesSection from "@/components/PopularDishesSection";
import MenuGridSection from "@/components/MenuGridSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

// Interactive Overlays
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import ReservationModal from "@/components/ReservationModal";
import DishDetailModal from "@/components/DishDetailModal";
import ConfirmClearModal from "@/components/ConfirmClearModal";
import CommandMenu from "@/components/CommandMenu";
import ToastNotification from "@/components/ToastNotification";
import CookieBanner from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";

export default function HomePage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#0E0906] text-[#26130B] dark:text-[#FAF4ED] transition-colors duration-200">
        {/* Accessible Skip Link (Feature 12) */}
        <SkipToContent />

        {/* Top Scroll Depth Progress Bar (Feature 8) */}
        <ScrollProgressBar />

        {/* Main Sticky Glassmorphism Header (Feature 11) */}
        <Header />

        {/* Main Content Bands */}
        <main id="main-content" className="flex-1 focus:outline-none">
          {/* 1. Hero Section with Live SWR Status & Clear CTAs */}
          <HeroSection />

          {/* 2. Customer Favorites & Most Loved Dishes */}
          <PopularDishesSection />

          {/* 3. Main Culinary Menu with Categories, Dietary Filters & Skeletons */}
          <MenuGridSection />

          {/* 4. Why Choose Us (Pillars of Excellence) */}
          <WhyChooseUs />

          {/* 5. About Section (Authentic African Hospitality) */}
          <AboutSection />

          {/* 6. Customer Testimonials & Social Proof */}
          <ReviewsSection />

          {/* 7. Expandable FAQ Accordion */}
          <FaqSection />
        </main>

        {/* 8. Footer with Copyable Contact & Last Updated Date */}
        <Footer />

        {/* Interactive Modals, Sheets & Overlays */}
        <CartDrawer />
        <CheckoutModal />
        <ReservationModal />
        <DishDetailModal />
        <ConfirmClearModal />
        <CommandMenu />
        <ToastNotification />
        <CookieBanner />
        <ScrollToTop />
        <FloatingContact />
      </div>
    </CartProvider>
  );
}
