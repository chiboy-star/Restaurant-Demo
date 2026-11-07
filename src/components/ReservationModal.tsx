"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Phone,
  User,
  Shield,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ReservationForm {
  guests: number;
  date: string;
  time: string;
  seatingArea: "indoor" | "terrace" | "private-dining";
  fullName: string;
  phone: string;
  email: string;
  specialRequests: string;
  pin: string;
  otpCode: string;
}

export default function ReservationModal() {
  const {
    isReservationOpen,
    setIsReservationOpen,
    getIdempotencyKey,
    showToast,
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [showPin, setShowPin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<ReservationForm>({
    guests: 2,
    date: "2026-11-08",
    time: "19:00",
    seatingArea: "indoor",
    fullName: "",
    phone: "",
    email: "",
    specialRequests: "",
    pin: "",
    otpCode: "",
  });

  if (!isReservationOpen) return null;

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!form.date) errors.date = "Please choose a reservation date";
    if (!form.time) errors.time = "Please pick a preferred time slot";
    if (form.guests < 1 || form.guests > 12)
      errors.guests = "Party size must be between 1 and 12 guests";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!form.fullName.trim()) errors.fullName = "Full name is required";
    if (!form.phone.trim() || form.phone.trim().length < 8)
      errors.phone = "Valid contact phone number is required";
    if (form.pin.length > 0 && form.pin.length < 4)
      errors.pin = "Reservation PIN must be at least 4 digits";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        // Mock sending SMS OTP
        setStep(3);
        showToast("Sent 4-digit verification code to your phone");
      }
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const idempotency = getIdempotencyKey();
    const refCode = `AFB-RES-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingRef(`${refCode} (${idempotency.slice(0, 8)})`);
      setStep(4);

      showToast(`Table confirmed! Reference: ${refCode}`);
    }, 800);
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setStep(1);
    setFormErrors({});
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Table reservation modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-[#18110D] border border-[#26130B]/10 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-all"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#FAF7F2] dark:bg-[#241A14] border-b border-[#26130B]/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8612C] text-white flex items-center justify-center shadow-sm">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#26130B] dark:text-[#FAF4ED]">
                Reserve a Table
              </h2>
              <p className="text-xs text-[#635348] dark:text-[#C7B9AD]">
                AfrikBite Lekki Phase 1 • Instant Confirmation
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close reservation dialog"
            className="w-8 h-8 rounded-lg bg-white dark:bg-[#18110D] text-[#8E7E73] hover:text-[#26130B] dark:hover:text-white flex items-center justify-center border border-[#26130B]/10 dark:border-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Goal-Gradient Step Indicator (Law 15: Goal-Gradient) */}
        {step < 4 && (
          <div className="px-6 pt-4 pb-2 bg-white dark:bg-[#18110D] flex items-center justify-between text-xs font-semibold text-[#8E7E73] dark:text-[#8F8075] border-b border-[#26130B]/5 dark:border-white/5">
            <div
              className={`flex items-center gap-1.5 ${
                step >= 1 ? "text-[#E8612C] font-bold" : ""
              }`}
            >
              <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Details</span>
            </div>
            <div className="h-0.5 w-8 bg-[#26130B]/10 dark:bg-white/10" />
            <div
              className={`flex items-center gap-1.5 ${
                step >= 2 ? "text-[#E8612C] font-bold" : ""
              }`}
            >
              <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Contact</span>
            </div>
            <div className="h-0.5 w-8 bg-[#26130B]/10 dark:bg-white/10" />
            <div
              className={`flex items-center gap-1.5 ${
                step >= 3 ? "text-[#E8612C] font-bold" : ""
              }`}
            >
              <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Verify</span>
            </div>
          </div>
        )}

        {/* Step Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div className="space-y-4">
              {/* Guests Count */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-2">
                  Number of Guests
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setForm({ ...form, guests: num })}
                      className={`py-2 rounded-xl text-xs font-bold transition-all tabular-nums touch-target ${
                        form.guests === num
                          ? "bg-[#E8612C] text-white shadow-sm"
                          : "bg-[#FAF7F2] dark:bg-[#241A14] text-[#26130B] dark:text-[#FAF4ED] hover:bg-[#FAF7F2]/80"
                      }`}
                    >
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </button>
                  ))}
                </div>
                {formErrors.guests && (
                  <p className="text-[11px] font-semibold text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {formErrors.guests}
                  </p>
                )}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#241A14] border border-[#26130B]/10 dark:border-white/10 text-xs sm:text-sm text-[#26130B] dark:text-[#FAF4ED] focus:border-[#E8612C] focus:outline-none"
                  />
                  {formErrors.date && (
                    <p className="text-[11px] font-semibold text-red-500 mt-1">
                      {formErrors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#241A14] border border-[#26130B]/10 dark:border-white/10 text-xs sm:text-sm text-[#26130B] dark:text-[#FAF4ED] focus:border-[#E8612C] focus:outline-none"
                  >
                    <option value="12:00">12:00 PM (Lunch)</option>
                    <option value="13:30">1:30 PM (Lunch)</option>
                    <option value="17:00">5:00 PM (Early Dinner)</option>
                    <option value="19:00">7:00 PM (Dinner Rush)</option>
                    <option value="20:30">8:30 PM (Dinner)</option>
                    <option value="22:00">10:00 PM (Late Bites)</option>
                  </select>
                </div>
              </div>

              {/* Seating Area */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-2">
                  Preferred Seating Atmosphere
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "indoor", label: "Indoor AC Lounge" },
                    { id: "terrace", label: "Lekki Breezy Terrace" },
                    { id: "private-dining", label: "VIP Private Room" },
                  ].map((seat) => (
                    <button
                      key={seat.id}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          seatingArea: seat.id as ReservationForm["seatingArea"],
                        })
                      }
                      className={`p-2.5 rounded-xl text-center text-xs font-semibold transition-all touch-target ${
                        form.seatingArea === seat.id
                          ? "bg-[#1FBF73] text-white shadow-sm"
                          : "bg-[#FAF7F2] dark:bg-[#241A14] text-[#26130B] dark:text-[#FAF4ED]"
                      }`}
                    >
                      {seat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-1.5">
                  Guest Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8E7E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    placeholder="e.g. Babatunde Williams"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#241A14] border border-[#26130B]/10 dark:border-white/10 text-xs sm:text-sm text-[#26130B] dark:text-[#FAF4ED] focus:border-[#E8612C] focus:outline-none"
                  />
                </div>
                {formErrors.fullName && (
                  <p className="text-[11px] font-semibold text-red-500 mt-1">
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-1.5">
                  WhatsApp / Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8E7E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+234 801 234 5678"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#241A14] border border-[#26130B]/10 dark:border-white/10 text-xs sm:text-sm text-[#26130B] dark:text-[#FAF4ED] focus:border-[#E8612C] focus:outline-none tabular-nums"
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-[11px] font-semibold text-red-500 mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              {/* Password / Booking PIN with Visibility Toggle (Feature 13) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-1.5">
                  Private Reservation PIN (for fast edits/check-in)
                </label>
                <div className="relative">
                  <input
                    type={showPin ? "text" : "password"}
                    maxLength={6}
                    value={form.pin}
                    onChange={(e) => setForm({ ...form, pin: e.target.value })}
                    placeholder="Create a 4-6 digit PIN"
                    className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#241A14] border border-[#26130B]/10 dark:border-white/10 text-xs sm:text-sm text-[#26130B] dark:text-[#FAF4ED] focus:border-[#E8612C] focus:outline-none tabular-nums"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    aria-label={showPin ? "Hide reservation PIN" : "Show reservation PIN"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E7E73] hover:text-[#26130B] dark:hover:text-white p-1"
                  >
                    {showPin ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {formErrors.pin && (
                  <p className="text-[11px] font-semibold text-red-500 mt-1">
                    {formErrors.pin}
                  </p>
                )}
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#26130B] dark:text-[#FAF4ED] mb-1.5">
                  Special Notes (Dietary, Birthday, Anniversary)
                </label>
                <textarea
                  rows={2}
                  value={form.specialRequests}
                  onChange={(e) =>
                    setForm({ ...form, specialRequests: e.target.value })
                  }
                  placeholder="e.g. Mild pepper for Jollof, birthday dessert celebration..."
                  className="w-full p-3 rounded-xl bg-[#FAF7F2] dark:bg-[#241A14] border border-[#26130B]/10 dark:border-white/10 text-xs sm:text-sm text-[#26130B] dark:text-[#FAF4ED] focus:border-[#E8612C] focus:outline-none"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            /* One-Time Code Autofill (Tip 15) */
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 rounded-xl bg-[#1FBF73]/15 text-[#1FBF73] flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#26130B] dark:text-[#FAF4ED]">
                  Confirm Phone Verification
                </h3>
                <p className="text-xs text-[#635348] dark:text-[#C7B9AD] mt-1">
                  We sent a 4-digit code to{" "}
                  <strong className="text-[#26130B] dark:text-[#FAF4ED] tabular-nums">
                    {form.phone}
                  </strong>
                </p>
              </div>

              <div className="max-w-xs mx-auto">
                <input
                  type="text"
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  maxLength={6}
                  value={form.otpCode}
                  onChange={(e) => setForm({ ...form, otpCode: e.target.value })}
                  placeholder="• • • •"
                  className="w-full text-center tracking-[0.5em] text-2xl font-bold py-3 rounded-xl bg-[#FAF7F2] dark:bg-[#241A14] border border-[#26130B]/10 dark:border-white/10 text-[#26130B] dark:text-[#FAF4ED] focus:border-[#1FBF73] focus:outline-none tabular-nums"
                />
                <p className="text-[11px] text-[#8E7E73] dark:text-[#8F8075] mt-2">
                  Demo auto-filled: enter any 4 digits to proceed
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            /* Form Success State (Feature 15) */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1FBF73]/20 text-[#1FBF73] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1FBF73] bg-[#1FBF73]/10 px-3 py-1 rounded-full">
                  Confirmed & Guaranteed
                </span>
                <h3 className="text-2xl font-bold text-[#26130B] dark:text-[#FAF4ED] mt-2">
                  Table Reserved Successfully!
                </h3>
                <p className="text-xs font-bold text-[#E8612C] mt-1 tabular-nums">
                  Reference: {bookingRef}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] dark:bg-[#241A14] text-left text-xs space-y-2 text-[#26130B] dark:text-[#FAF4ED]">
                <div className="flex justify-between">
                  <span className="text-[#8E7E73] dark:text-[#8F8075]">Guest Name:</span>
                  <span className="font-bold">{form.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E7E73] dark:text-[#8F8075]">Date & Time:</span>
                  <span className="font-bold tabular-nums">
                    {form.date} at {form.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E7E73] dark:text-[#8F8075]">Party Size:</span>
                  <span className="font-bold tabular-nums">
                    {form.guests} {form.guests === 1 ? "Guest" : "Guests"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E7E73] dark:text-[#8F8075]">Seating:</span>
                  <span className="font-bold capitalize">{form.seatingArea}</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-[#E8612C] hover:bg-[#D05120] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer touch-target"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Footer controls for steps 1-3 */}
        {step < 4 && (
          <div className="p-4 sm:p-5 bg-[#FAF7F2] dark:bg-[#120D0A] border-t border-[#26130B]/10 dark:border-white/10 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#26130B]/10 dark:border-white/10 text-xs font-semibold text-[#635348] dark:text-[#C7B9AD] hover:bg-white dark:hover:bg-[#241A14] transition-colors cursor-pointer touch-target"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#E8612C] hover:bg-[#D05120] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer touch-target"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmReservation}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1FBF73] hover:bg-[#1AA864] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer touch-target disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Table...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Reservation</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

