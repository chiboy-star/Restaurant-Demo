"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Send,
  Check,
  MapPin,
  Phone,
  Copy,
  Printer,
  Clock,
} from "lucide-react";
import { RESTAURANT_INFO } from "@/data/menuData";
import { useCart } from "@/context/CartContext";

export default function Footer() {
  const { showToast } = useCart();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast("Subscribed! VIP tasting invitations will be sent to your email.");
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 5000);
    }
  };

  const copyToClipboard = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Copied ${label}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <footer className="bg-white dark:bg-[#0E0906] border-t border-[#26130B]/10 dark:border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#26130B]/10 dark:border-white/10">
          <div className="lg:col-span-5">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#E8612C] text-white flex items-center justify-center shadow-md shadow-[#E8612C]/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-[#26130B] dark:text-[#FAF4ED]">
                AfrikBite<span className="text-[#E8612C]">.</span>
              </span>
            </div>

            <p className="text-sm text-[#635348] dark:text-[#C7B9AD] max-w-sm mb-6 leading-relaxed">
              Authentic African dining, wood-fired Jollof, and Kano Suya crafted
              daily with heritage spices along Admiralty Way, Lekki Phase 1, Lagos.
            </p>

            {/* Newsletter Input Form */}
            <form
              onSubmit={handleSubscribe}
              className="relative max-w-md flex items-center"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email for VIP specials..."
                className="w-full pl-4 pr-32 py-3 rounded-xl bg-[#FAF7F2] dark:bg-[#18110D] text-xs sm:text-sm text-[#26130B] dark:text-[#FAF4ED] placeholder-[#8E7E73] border border-[#26130B]/10 dark:border-white/10 focus:border-[#E8612C] focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 inline-flex items-center gap-1.5 bg-[#E8612C] hover:bg-[#D05120] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs transition-all cursor-pointer touch-target"
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
                🎉 Welcome to the AfrikBite Lekki VIP Table!
              </p>
            )}
          </div>

          {/* Directory Links & Quick Actions */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-4">
                Explore Menu
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#635348] dark:text-[#C7B9AD]">
                <li>
                  <a
                    href="#menu"
                    className="hover:text-[#E8612C] transition-colors"
                  >
                    Smoky Party Jollof
                  </a>
                </li>
                <li>
                  <a
                    href="#menu"
                    className="hover:text-[#E8612C] transition-colors"
                  >
                    Kano Suya Platters
                  </a>
                </li>
                <li>
                  <a
                    href="#menu"
                    className="hover:text-[#E8612C] transition-colors"
                  >
                    Egusi & Pounded Yam
                  </a>
                </li>
                <li>
                  <a
                    href="#menu"
                    className="hover:text-[#E8612C] transition-colors"
                  >
                    Chilled Hibiscus Zobo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-4">
                Hospitality
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#635348] dark:text-[#C7B9AD]">
                <li>
                  <a
                    href="#about"
                    className="hover:text-[#E8612C] transition-colors"
                  >
                    Our Heritage Story
                  </a>
                </li>
                <li>
                  <a
                    href="#reviews"
                    className="hover:text-[#E8612C] transition-colors"
                  >
                    Customer Reviews
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-[#E8612C] transition-colors"
                  >
                    Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 hover:text-[#E8612C] transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Menu Sheet</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Quick Contact & Copy Details (Feature 9) */}
            <div className="col-span-2 sm:col-span-1 space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-4">
                Lekki Branch
              </h4>

              {/* Address with copy */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 text-xs text-[#635348] dark:text-[#C7B9AD]">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E8612C] shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{RESTAURANT_INFO.address}</span>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        RESTAURANT_INFO.address,
                        "address",
                        "restaurant address"
                      )
                    }
                    title="Copy address"
                    className="p-1 text-[#8E7E73] hover:text-[#E8612C] transition-colors"
                  >
                    {copiedKey === "address" ? (
                      <Check className="w-3.5 h-3.5 text-[#1FBF73]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone with copy */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 text-xs text-[#635348] dark:text-[#C7B9AD]">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#1FBF73] shrink-0" />
                    <span className="tabular-nums font-semibold">
                      {RESTAURANT_INFO.phone}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        RESTAURANT_INFO.phone,
                        "phone",
                        "phone number"
                      )
                    }
                    title="Copy hotline"
                    className="p-1 text-[#8E7E73] hover:text-[#E8612C] transition-colors"
                  >
                    {copiedKey === "phone" ? (
                      <Check className="w-3.5 h-3.5 text-[#1FBF73]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Last Updated Date (Feature 18) & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E7E73] dark:text-[#8F8075]">
          <p>© 2026 AfrikBite Lekki. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#E8612C]" />
              <span>Menu & Prices Updated: {RESTAURANT_INFO.lastUpdated}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
