"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Bike,
  Store,
  UtensilsCrossed,
  Tag,
  Copy,
  Check,
} from "lucide-react";
import { useCart, OrderType } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    setIsConfirmClearOpen,
    subtotal,
    deliveryFee,
    discount,
    totalPrice,
    orderType,
    setOrderType,
    appliedPromo,
    applyPromo,
    removePromo,
    setIsCheckoutOpen,
    showToast,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const success = applyPromo(promoInput);
    if (success) {
      showToast(`Promo ${promoInput.toUpperCase()} applied!`);
      setPromoInput("");
    } else {
      setPromoError("Invalid code. Use code: AFRIKBITE10");
    }
  };

  const handleCopyPromo = () => {
    navigator.clipboard.writeText("AFRIKBITE10");
    setCopiedCode(true);
    showToast("Copied code: AFRIKBITE10");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order Cart Drawer"
      className="fixed inset-0 z-50 overflow-hidden no-print"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#18110D] shadow-2xl flex flex-col justify-between border-l border-[#26130B]/10 dark:border-white/10 animate-in slide-in-from-right duration-300">
          {/* Mobile Swipe-to-dismiss Sheet Handle (Tip 10) */}
          <div className="w-full flex justify-center pt-2 sm:hidden">
            <div className="w-12 h-1.5 rounded-full bg-[#26130B]/20 dark:bg-white/20" />
          </div>

          {/* Drawer Header */}
          <div className="p-5 bg-[#FAF7F2] dark:bg-[#241A14] border-b border-[#26130B]/10 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8612C] text-white flex items-center justify-center shadow-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#26130B] dark:text-[#FAF4ED]">
                  Your Order Cart
                </h2>
                <p className="text-xs text-[#635348] dark:text-[#C7B9AD]">
                  {cart.length === 0
                    ? "Cart is empty"
                    : `${cart.length} unique dish${cart.length > 1 ? "es" : ""}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={() => setIsConfirmClearOpen(true)}
                  aria-label="Clear cart"
                  title="Empty cart"
                  className="p-2 rounded-lg text-[#8E7E73] hover:text-red-500 hover:bg-red-500/10 transition-colors touch-target"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
                className="w-9 h-9 rounded-xl bg-white dark:bg-[#18110D] text-[#8E7E73] hover:text-[#26130B] dark:hover:text-white flex items-center justify-center border border-[#26130B]/10 dark:border-white/10 transition-colors touch-target"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Order Type Toggle Segmented Control */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8E7E73] dark:text-[#8F8075] mb-2">
                Order Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "delivery", label: "Delivery", icon: Bike },
                  { id: "pickup", label: "Takeout", icon: Store },
                  { id: "dinein", label: "Dine-in", icon: UtensilsCrossed },
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = orderType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setOrderType(type.id as OrderType)}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-xs font-bold transition-all touch-target cursor-pointer ${
                        isSelected
                          ? "bg-[#1FBF73] text-white border-[#1FBF73] shadow-sm"
                          : "bg-[#FAF7F2] dark:bg-[#241A14] text-[#635348] dark:text-[#C7B9AD] border-[#26130B]/10 dark:border-white/10"
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-1" />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] dark:bg-[#241A14] text-[#8E7E73] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-[#26130B] dark:text-[#FAF4ED]">
                  Your cart is hungry!
                </p>
                <p className="text-xs text-[#635348] dark:text-[#C7B9AD] max-w-xs mx-auto">
                  Explore our authentic Jollof, Suya, and artisanal soups to build your feast.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((ci) => (
                  <div
                    key={ci.item.id}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF7F2] dark:bg-[#241A14] border border-[#26130B]/10 dark:border-white/10"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
                      <Image
                        src={ci.item.image}
                        alt={ci.item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#26130B] dark:text-[#FAF4ED] truncate">
                        {ci.item.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#E8612C] tabular-nums mt-0.5">
                        ₦{ci.item.price.toLocaleString()}
                      </p>

                      {/* Stepper controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center bg-white dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(ci.item.id, -1)}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 rounded flex items-center justify-center text-[#26130B] dark:text-white hover:bg-[#FAF7F2] dark:hover:bg-[#241A14] transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center font-bold text-xs text-[#26130B] dark:text-white tabular-nums">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(ci.item.id, 1)}
                            aria-label="Increase quantity"
                            className="w-7 h-7 rounded flex items-center justify-center text-[#26130B] dark:text-white hover:bg-[#FAF7F2] dark:hover:bg-[#241A14] transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(ci.item.id)}
                          aria-label={`Remove ${ci.item.name}`}
                          className="p-1.5 rounded-lg text-[#8E7E73] hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal for this item */}
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-bold text-[#26130B] dark:text-[#FAF4ED] tabular-nums">
                        ₦{(ci.item.price * ci.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Promo Code Box */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] dark:bg-[#241A14] border border-[#26130B]/10 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#26130B] dark:text-[#FAF4ED] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#E8612C]" />
                  Have a Promo Code?
                </span>
                <button
                  type="button"
                  onClick={handleCopyPromo}
                  className="text-[11px] font-semibold text-[#E8612C] flex items-center gap-1 hover:underline cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>Use AFRIKBITE10</span>
                </button>
              </div>

              {appliedPromo ? (
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#1FBF73]/15 text-[#1FBF73] text-xs font-bold">
                  <span>✓ 10% Off Discount ({appliedPromo})</span>
                  <button
                    onClick={removePromo}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 text-xs text-[#26130B] dark:text-[#FAF4ED] uppercase focus:outline-none focus:border-[#E8612C]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#26130B] dark:bg-white text-white dark:text-[#26130B] text-xs font-bold hover:opacity-90 transition-opacity touch-target cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] font-semibold text-red-500 mt-1">
                  {promoError}
                </p>
              )}
            </div>
          </div>

          {/* Drawer Footer with Calculation & Proceed Button (Tip 14: pb-safe, Tip 16: tabular-nums) */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#FAF7F2] dark:bg-[#120D0A] border-t border-[#26130B]/10 dark:border-white/10 space-y-3 pb-safe">
              <div className="space-y-1.5 text-xs text-[#635348] dark:text-[#C7B9AD]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#26130B] dark:text-[#FAF4ED] tabular-nums">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                {orderType === "delivery" && (
                  <div className="flex justify-between">
                    <span>Lekki Express Delivery</span>
                    <span className="font-semibold text-[#26130B] dark:text-[#FAF4ED] tabular-nums">
                      ₦{deliveryFee.toLocaleString()}
                    </span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-[#1FBF73] font-semibold">
                    <span>Promo Discount (10%)</span>
                    <span className="tabular-nums">-₦{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#26130B] dark:text-[#FAF4ED] pt-2 border-t border-[#26130B]/10 dark:border-white/10">
                  <span>Total Amount</span>
                  <span className="tabular-nums text-[#E8612C]">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#E8612C] hover:bg-[#D05120] active:scale-95 text-white font-bold text-sm shadow-md transition-all cursor-pointer touch-target"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
