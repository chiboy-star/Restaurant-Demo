"use client";

import React from "react";
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
} from "lucide-react";
import { useCart, OrderType } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    totalPrice,
    orderType,
    setOrderType,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 bg-[#FFF8EC] border-b border-[#4A1F0E]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E8612C] text-white flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#4A1F0E]">Your Order</h2>
                <p className="text-xs text-[#7A6A5F]">
                  {cart.length === 0
                    ? "Cart is currently empty"
                    : `${cart.length} unique dish${cart.length > 1 ? "es" : ""}`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-full bg-white hover:bg-[#FFD966]/40 text-[#4A1F0E] flex items-center justify-center transition-colors shadow-xs"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Order Type Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1F0E] mb-2">
                Order Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType("delivery")}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl border text-xs font-bold transition-all ${
                    orderType === "delivery"
                      ? "bg-[#1FBF73] text-white border-[#1FBF73] shadow-md shadow-[#1FBF73]/20"
                      : "bg-[#FFF8EC] text-[#4A1F0E] border-[#4A1F0E]/10 hover:border-[#1FBF73]"
                  }`}
                >
                  <Bike className="w-4 h-4 mb-1" />
                  <span>Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType("pickup")}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl border text-xs font-bold transition-all ${
                    orderType === "pickup"
                      ? "bg-[#1FBF73] text-white border-[#1FBF73] shadow-md shadow-[#1FBF73]/20"
                      : "bg-[#FFF8EC] text-[#4A1F0E] border-[#4A1F0E]/10 hover:border-[#1FBF73]"
                  }`}
                >
                  <Store className="w-4 h-4 mb-1" />
                  <span>Takeout</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType("dinein")}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl border text-xs font-bold transition-all ${
                    orderType === "dinein"
                      ? "bg-[#1FBF73] text-white border-[#1FBF73] shadow-md shadow-[#1FBF73]/20"
                      : "bg-[#FFF8EC] text-[#4A1F0E] border-[#4A1F0E]/10 hover:border-[#1FBF73]"
                  }`}
                >
                  <UtensilsCrossed className="w-4 h-4 mb-1" />
                  <span>Dine-In</span>
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-[#FFF8EC] text-[#E8612C] flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-bold text-lg text-[#4A1F0E]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#7A6A5F] mt-1 max-w-xs mx-auto">
                  Browse our authentic Lekki menu and tap &quot;Add Item&quot; to place an
                  order in under a minute!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 bg-[#E8612C] text-white text-xs font-bold px-6 py-3 rounded-full shadow-md hover:bg-[#d45220]"
                >
                  Browse Delicious Dishes
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#7A6A5F] pb-1 border-b border-[#4A1F0E]/10">
                  <span>Selected Dishes</span>
                  <button
                    onClick={clearCart}
                    className="text-[#E8612C] hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#FFF8EC]/60 border border-[#4A1F0E]/5"
                  >
                    {/* Item Thumbnail */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#4A1F0E]/10">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-[#4A1F0E] truncate">
                        {item.name}
                      </h4>
                      <div className="text-xs font-bold text-[#E8612C] mt-0.5">
                        ₦{item.price.toLocaleString()}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-white border border-[#4A1F0E]/20 text-[#4A1F0E] flex items-center justify-center hover:bg-[#E8612C] hover:text-white hover:border-transparent transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#4A1F0E] min-w-4 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-white border border-[#4A1F0E]/20 text-[#4A1F0E] flex items-center justify-center hover:bg-[#1FBF73] hover:text-white hover:border-transparent transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Total for item & Delete */}
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-[#4A1F0E]">
                        ₦{(item.price * quantity).toLocaleString()}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#7A6A5F] hover:text-[#E8612C] p-1.5 transition-colors mt-2"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#FFF8EC] border-t border-[#4A1F0E]/10 space-y-4">
              <div className="space-y-1.5 text-xs text-[#7A6A5F]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#4A1F0E]">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {orderType === "delivery"
                      ? "Delivery (Lekki / VI / Ikoyi)"
                      : "Service / Packaging"}
                  </span>
                  <span className="font-semibold text-[#4A1F0E]">
                    {deliveryFee > 0 ? `₦${deliveryFee.toLocaleString()}` : "Free"}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#4A1F0E]/10 text-sm font-extrabold text-[#4A1F0E]">
                  <span>Total Due</span>
                  <span className="text-base text-[#E8612C]">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Fast 1-Minute Order Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FFD966] hover:bg-[#f5cd55] active:scale-95 text-[#4A1F0E] font-extrabold text-base py-4 rounded-full shadow-lg shadow-[#FFD966]/30 transition-all cursor-pointer"
              >
                <span>Proceed to 1-Min Order</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-[11px] text-center text-[#7A6A5F]">
                🔒 1-Minute express ordering • WhatsApp & Transfer supported
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
