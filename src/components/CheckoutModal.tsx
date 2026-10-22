"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle,
  Clock,
  Sparkles,
  Phone,
  MapPin,
  CreditCard,
  Send,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    orderType,
    subtotal,
    deliveryFee,
    totalPrice,
  } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"whatsapp" | "transfer" | "pod">("whatsapp");
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `AFB-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(orderId);

    if (paymentMethod === "whatsapp") {
      // Build WhatsApp message
      const itemsList = cart
        .map((ci) => `• ${ci.quantity}x ${ci.item.name} (₦${(ci.item.price * ci.quantity).toLocaleString()})`)
        .join("\n");

      const message = `Hello AfrikBite Lekki! I'd like to place an order:\n\n*Order ID:* ${orderId}\n*Customer:* ${fullName}\n*Phone:* ${phone}\n*Type:* ${orderType.toUpperCase()}\n*Location/Address:* ${address}\n\n*Items:*\n${itemsList}\n\n*Subtotal:* ₦${subtotal.toLocaleString()}\n*Delivery:* ₦${deliveryFee.toLocaleString()}\n*Total Due:* ₦${totalPrice.toLocaleString()}\n*Notes:* ${notes || "None"}\n\nPlease confirm availability and dispatch!`;

      const whatsappUrl = `https://wa.me/2348123456789?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
    }

    setIsSuccess(true);
    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#FFF8EC] max-h-[92vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FFF8EC] hover:bg-[#FFD966]/40 text-[#4A1F0E] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          /* Order Confirmation View */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#1FBF73]/20 text-[#1FBF73] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-[#4A1F0E]">
              Order Placed Successfully!
            </h3>
            <p className="text-xs font-semibold text-[#1FBF73] uppercase tracking-wider mt-1">
              Order Ref: {orderNumber}
            </p>

            <div className="my-6 p-4 rounded-2xl bg-[#FFF8EC] text-left text-xs space-y-2 text-[#4A1F0E]">
              <div className="flex justify-between">
                <span className="text-[#7A6A5F]">Customer:</span>
                <span className="font-bold">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A6A5F]">Contact Phone:</span>
                <span className="font-bold">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A6A5F]">Delivery To:</span>
                <span className="font-bold truncate max-w-[200px]">{address}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#4A1F0E]/10 font-extrabold text-sm">
                <span>Total Amount:</span>
                <span className="text-[#E8612C]">₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#7A6A5F] mb-6">
              <Clock className="w-4 h-4 text-[#1FBF73]" />
              <span>Estimated Delivery: 30-45 Minutes</span>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-[#E8612C] hover:bg-[#d45220] text-white py-3.5 rounded-full font-bold text-sm shadow-md"
            >
              Back to Home
            </button>
          </div>
        ) : (
          /* Fast 1-Minute Order Form */
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-[#FFF8EC] text-[#E8612C] px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3" />
                <span>1-Minute Fast Checkout</span>
              </span>
            </div>

            <h3 className="text-2xl font-bold text-[#4A1F0E] mb-1">
              Complete Your Order
            </h3>
            <p className="text-xs text-[#7A6A5F] mb-6">
              Total:{" "}
              <span className="font-bold text-[#E8612C]">
                ₦{totalPrice.toLocaleString()}
              </span>{" "}
              ({orderType.toUpperCase()})
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#4A1F0E] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Babatunde Adeyemi"
                  className="w-full px-4 py-2.5 rounded-[12px] bg-[#FFF8EC] text-sm text-[#4A1F0E] placeholder-[#7A6A5F] border border-[#4A1F0E]/10 focus:border-[#E8612C] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A1F0E] mb-1">
                  Phone / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#7A6A5F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="080 1234 5678"
                    className="w-full pl-10 pr-4 py-2.5 rounded-[12px] bg-[#FFF8EC] text-sm text-[#4A1F0E] placeholder-[#7A6A5F] border border-[#4A1F0E]/10 focus:border-[#E8612C] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A1F0E] mb-1">
                  {orderType === "delivery"
                    ? "Lekki / Lagos Delivery Address *"
                    : "Table Number or Pickup Note *"}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#7A6A5F] absolute left-3.5 top-3" />
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={
                      orderType === "delivery"
                        ? "e.g. Flat 4B, Admiralty Way, Lekki Phase 1"
                        : "e.g. Table 7 or Picking up in 20 minutes"
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-[12px] bg-[#FFF8EC] text-sm text-[#4A1F0E] placeholder-[#7A6A5F] border border-[#4A1F0E]/10 focus:border-[#E8612C] focus:bg-white focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A1F0E] mb-1">
                  Special Kitchen Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Extra spicy, no cutlery, extra napkins"
                  className="w-full px-4 py-2.5 rounded-[12px] bg-[#FFF8EC] text-sm text-[#4A1F0E] placeholder-[#7A6A5F] border border-[#4A1F0E]/10 focus:border-[#E8612C] focus:bg-white focus:outline-none"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-[#4A1F0E] mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer text-xs font-bold transition-all ${
                      paymentMethod === "whatsapp"
                        ? "bg-[#1FBF73]/10 border-[#1FBF73] text-[#4A1F0E]"
                        : "border-[#4A1F0E]/10 text-[#7A6A5F]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="whatsapp"
                        checked={paymentMethod === "whatsapp"}
                        onChange={() => setPaymentMethod("whatsapp")}
                        className="accent-[#1FBF73]"
                      />
                      <span>⚡ Instant WhatsApp Fast Order (Recommended)</span>
                    </div>
                    <span className="text-[10px] text-[#1FBF73] bg-[#1FBF73]/20 px-2 py-0.5 rounded-full">
                      Direct Dispatch
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer text-xs font-bold transition-all ${
                      paymentMethod === "transfer"
                        ? "bg-[#E8612C]/10 border-[#E8612C] text-[#4A1F0E]"
                        : "border-[#4A1F0E]/10 text-[#7A6A5F]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        value="transfer"
                        checked={paymentMethod === "transfer"}
                        onChange={() => setPaymentMethod("transfer")}
                        className="accent-[#E8612C]"
                      />
                      <span>Direct Bank Transfer / Card</span>
                    </div>
                    <CreditCard className="w-4 h-4 text-[#E8612C]" />
                  </label>
                </div>
              </div>

              {/* Submit Button in Plantain / Ember */}
              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#FFD966] hover:bg-[#f5cd55] text-[#4A1F0E] font-extrabold text-base py-3.5 rounded-full shadow-lg shadow-[#FFD966]/30 transition-all cursor-pointer"
              >
                <span>Confirm & Place Order (₦{totalPrice.toLocaleString()})</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
