"use client";

import React, { useState } from "react";
import { Sparkles, Send, Check, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-white border-t border-[#4A1F0E]/10 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#4A1F0E]/10">
          <div className="lg:col-span-5">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#E8612C] flex items-center justify-center shadow-md shadow-[#E8612C]/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-[#4A1F0E]">
                AfrikBite<span className="text-[#E8612C]">.</span>
              </span>
            </div>

            <p className="text-sm text-[#7A6A5F] max-w-sm mb-6 leading-relaxed">
              Experience authentic African home-style flavors crafted with fresh ingredients, heritage spices, and warm hospitality in Lekki Phase 1, Lagos.
            </p>

            {/* Newsletter input with Palm button matching reference */}
            <form onSubmit={handleSubscribe} className="relative max-w-md flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-5 pr-32 py-3 rounded-full bg-[#FFF8EC] text-sm text-[#4A1F0E] placeholder-[#7A6A5F] border border-[#4A1F0E]/10 focus:border-[#1FBF73] focus:outline-none focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 inline-flex items-center gap-1.5 bg-[#1FBF73] hover:bg-[#1aa864] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-all duration-200 cursor-pointer"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Done!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs font-semibold text-[#1FBF73] mt-2">
                🎉 Welcome to the AfrikBite Lekki Family! Check your inbox soon for VIP specials.
              </p>
            )}
          </div>

          {/* Links Directory matching reference: Discover, Company, Support */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-[#4A1F0E] mb-4">
                Discover
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#7A6A5F]">
                <li>
                  <a href="#menu" className="hover:text-[#E8612C] transition-colors">
                    Our Menu
                  </a>
                </li>
                <li>
                  <a href="#popular" className="hover:text-[#E8612C] transition-colors">
                    Chef&apos;s Specials
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-[#E8612C] transition-colors">
                    New Dishes
                  </a>
                </li>
                <li>
                  <a href="#popular" className="hover:text-[#E8612C] transition-colors">
                    Best Sellers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-[#4A1F0E] mb-4">
                Company
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#7A6A5F]">
                <li>
                  <a href="#about" className="hover:text-[#E8612C] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#E8612C] transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E8612C] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E8612C] transition-colors">
                    Terms Of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-[#4A1F0E] mb-4">
                Support
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#7A6A5F]">
                <li>
                  <a href="#contact" className="hover:text-[#E8612C] transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-[#E8612C] transition-colors">
                    Customer Reviews
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-[#E8612C] transition-colors">
                    Table Reservations
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-[#E8612C] transition-colors">
                    Delivery & Takeaway
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Location, Socials, Copyright */}
        <div id="contact" className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6A5F]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#E8612C]" />
              Plot 14, Admiralty Way, Lekki Phase 1, Lagos, Nigeria
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-[#FFF8EC] text-[#4A1F0E] hover:bg-[#E8612C] hover:text-white flex items-center justify-center transition-all shadow-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="w-9 h-9 rounded-full bg-[#FFF8EC] text-[#4A1F0E] hover:bg-[#E8612C] hover:text-white flex items-center justify-center transition-all shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-[#FFF8EC] text-[#4A1F0E] hover:bg-[#E8612C] hover:text-white flex items-center justify-center transition-all shadow-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>
          </div>

          <div className="text-center sm:text-right">
            <p>© 2026 AfrikBite Restaurant Lekki. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
