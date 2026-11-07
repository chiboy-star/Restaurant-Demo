"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Send,
  Printer,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { RESTAURANT_INFO } from "@/data/menuData";

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    orderType,
    subtotal,
    deliveryFee,
    discount,
    totalPrice,
    getIdempotencyKey,
    utmParams,
    showToast,
  } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "whatsapp" | "transfer" | "pod"
  >("whatsapp");
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Please enter your name";
    if (!phone.trim() || phone.trim().length < 8)
      errs.phone = "Valid phone or WhatsApp number is required";
    if (orderType === "delivery" && (!address.trim() || address.trim().length < 5))
      errs.address = "Detailed delivery address in Lekki/Lagos is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const key = getIdempotencyKey();
    const orderId = `AFB-${Math.floor(10000 + Math.random() * 90000)}`;
    const nowStr = new Date().toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    setIdempotencyKey(key);
    setOrderNumber(orderId);
    setOrderDate(nowStr);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      if (paymentMethod === "whatsapp") {
        const itemsList = cart
          .map(
            (ci) =>
              `• ${ci.quantity}x ${ci.item.name} (₦${(
                ci.item.price * ci.quantity
              ).toLocaleString()})`
          )
          .join("\n");

        const utmInfo =
          Object.keys(utmParams).length > 0
            ? `\n*Campaign:* ${utmParams.utm_source || "direct"}`
            : "";

        const message = `Hello AfrikBite Lekki! I'd like to place an order:\n\n*Order ID:* ${orderId}\n*Customer:* ${fullName}\n*Phone:* ${phone}\n*Type:* ${orderType.toUpperCase()}\n*Address:* ${
          address || "Pickup at Lekki Branch"
        }\n\n*Items:*\n${itemsList}\n\n*Subtotal:* ₦${subtotal.toLocaleString()}\n*Delivery:* ₦${deliveryFee.toLocaleString()}${
          discount > 0 ? `\n*Discount:* -₦${discount.toLocaleString()}` : ""
        }\n*Total Due:* ₦${totalPrice.toLocaleString()}\n*Notes:* ${
          notes || "None"
        }\n*Idempotency Token:* ${key}${utmInfo}\n\nPlease confirm availability and dispatch!`;

        const whatsappUrl = `https://wa.me/2348123456789?text=${encodeURIComponent(
          message
        )}`;
        window.open(whatsappUrl, "_blank");
      }

      showToast("Order submitted successfully!");
    }, 700);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    if (isSuccess) {
      clearCart();
    }
    setIsCheckoutOpen(false);
    setIsSuccess(false);
    setErrors({});
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Checkout Dialog"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto"
      >
        <button
          onClick={handleClose}
          aria-label="Close checkout"
          className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-[#FAF7F2] dark:bg-[#241A14] text-[#8E7E73] hover:text-[#26130B] dark:hover:text-white flex items-center justify-center transition-colors no-print"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          /* Order Confirmation View (Feature 15: Form Success State & Feature 10: Print Stylesheet) */
          <div className="text-center py-4 space-y-4 printable-area">
            <div className="w-16 h-16 rounded-full bg-[#1FBF73]/20 text-[#1FBF73] flex items-center justify-center mx-auto no-print">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1FBF73] bg-[#1FBF73]/10 px-3 py-1 rounded-full">
                Order Received
              </span>
              <h3 className="text-2xl font-bold text-[#26130B] dark:text-[#FAF4ED] mt-2">
                Thank You, {fullName}!
              </h3>
              <p className="text-xs font-bold text-[#E8612C] mt-1 tabular-nums">
                Order Reference: {orderNumber}
              </p>
              <p className="text-[11px] text-[#8E7E73] dark:text-[#8F8075]">
                {orderDate}
              </p>
            </div>

            {/* Printable Receipt Card */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#241A14] text-left text-xs space-y-2.5 text-[#26130B] dark:text-[#FAF4ED] border border-[#26130B]/10 dark:border-white/10">
              <div className="flex justify-between border-b border-[#26130B]/10 dark:border-white/10 pb-2 font-bold">
                <span>Restaurant</span>
                <span>{RESTAURANT_INFO.name}</span>
              </div>
              <div className="flex justify-between text-[10px] text-[#8E7E73]">
                <span>Token</span>
                <span className="font-mono">{idempotencyKey}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E7E73] dark:text-[#8F8075]">Phone:</span>
                <span className="font-semibold tabular-nums">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E7E73] dark:text-[#8F8075]">Dispatch:</span>
                <span className="font-semibold capitalize">{orderType}</span>
              </div>
              {address && (
                <div className="flex justify-between">
                  <span className="text-[#8E7E73] dark:text-[#8F8075]">Address:</span>
                  <span className="font-semibold text-right max-w-[200px] truncate">
                    {address}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t border-[#26130B]/10 dark:border-white/10 pt-2 font-bold text-sm">
                <span>Total Paid / Due:</span>
                <span className="text-[#E8612C] tabular-nums">
                  ₦{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Print & Action Buttons */}
            <div className="flex items-center gap-3 no-print pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#26130B]/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#635348] dark:text-[#C7B9AD] hover:bg-[#FAF7F2] dark:hover:bg-[#241A14] transition-colors cursor-pointer touch-target"
              >
                <Printer className="w-4 h-4 text-[#8E7E73]" />
                <span>Print Receipt</span>
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 px-4 rounded-xl bg-[#E8612C] hover:bg-[#D05120] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer touch-target"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#26130B] dark:text-[#FAF4ED]">
                Complete Your Lekki Order
              </h2>
              <p className="text-xs text-[#635348] dark:text-[#C7B9AD] mt-0.5">
                Dispatch time ~35 minutes to your doorstep.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name with Error State (Feature 16) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Babatunde Adeleke"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#241A14] border text-xs sm:text-sm text-[#26130B] dark:text-[#FAF4ED] focus:outline-none ${
                    errors.fullName
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#26130B]/10 dark:border-white/10 focus:border-[#E8612C]"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] font-semibold text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-1.5">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 812 345 6789"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#241A14] border text-xs sm:text-sm text-[#26130B] dark:text-[#FAF4ED] focus:outline-none tabular-nums ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#26130B]/10 dark:border-white/10 focus:border-[#E8612C]"
                  }`}
                />
                {errors.phone && (
                  <p className="text-[11px] font-semibold text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Delivery Address (only if delivery) */}
              {orderType === "delivery" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-1.5">
                    Delivery Address (Lekki, VI, Ikoyi)
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street name, estate name, building/apartment number..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#241A14] border text-xs sm:text-sm text-[#26130B] dark:text-[#FAF4ED] focus:outline-none ${
                      errors.address
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#26130B]/10 dark:border-white/10 focus:border-[#E8612C]"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-[11px] font-semibold text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.address}
                    </p>
                  )}
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-1.5">
                  Chef Notes / Spice Preference (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Extra pepper on Suya, no onions..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#241A14] border border-[#26130B]/10 dark:border-white/10 text-xs sm:text-sm text-[#26130B] dark:text-[#FAF4ED] focus:border-[#E8612C] focus:outline-none"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "whatsapp" as const, label: "WhatsApp Direct" },
                    { id: "transfer" as const, label: "Instant Transfer" },
                    { id: "pod" as const, label: "POS on Delivery" },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all touch-target cursor-pointer ${
                        paymentMethod === pm.id
                          ? "bg-[#1FBF73] text-white border-[#1FBF73] shadow-sm"
                          : "bg-[#FAF7F2] dark:bg-[#241A14] text-[#635348] dark:text-[#C7B9AD] border-[#26130B]/10 dark:border-white/10"
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total & Submit Button */}
              <div className="pt-3 border-t border-[#26130B]/10 dark:border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-[#635348] dark:text-[#C7B9AD]">
                    Final Order Total:
                  </span>
                  <span className="text-xl font-bold text-[#E8612C] tabular-nums">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#E8612C] hover:bg-[#D05120] text-white font-bold text-sm shadow-md transition-all cursor-pointer touch-target disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Placing Your Order...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Place Order (₦{totalPrice.toLocaleString()})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
