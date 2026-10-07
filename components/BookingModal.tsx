"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { FLEET_CARS, SERVICE_HUBS, CarItem } from "@/lib/fleet-data";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCar?: CarItem | null;
  initialEstimate?: {
    carName: string;
    days: number;
    kmPackage: string;
    totalAmount: number;
    dailyRate: number;
  } | null;
}

export function BookingModal({
  isOpen,
  onClose,
  preSelectedCar,
  initialEstimate,
}: BookingModalProps) {
  const [userSelectedCarId, setUserSelectedCarId] = useState<string | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<"doorstep" | "hub">("doorstep");
  const [selectedHub, setSelectedHub] = useState<string>("airport-t2");
  const [doorstepAddress, setDoorstepAddress] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("2026-10-08T10:00");
  const [endDate, setEndDate] = useState<string>("2026-10-10T18:00");
  const [kmPackage, setKmPackage] = useState<"unlimited" | "standard">(
    initialEstimate?.kmPackage === "standard" ? "standard" : "unlimited"
  );
  const [addons, setAddons] = useState<{
    childSeat: boolean;
    extraDriver: boolean;
    zeroLiability: boolean;
  }>({
    childSeat: false,
    extraDriver: false,
    zeroLiability: true,
  });

  // User form details
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  if (!isOpen) return null;

  const activeCarId = userSelectedCarId ?? preSelectedCar?.id ?? FLEET_CARS[0].id;
  const currentCar = FLEET_CARS.find((c) => c.id === activeCarId) || FLEET_CARS[0];

  // Calculate days
  const diffHours = Math.max(
    24,
    Math.round(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60)
    )
  );
  const rentalDays = Math.max(1, Math.ceil(diffHours / 24));

  // Cost tally
  const baseRental = currentCar.dailyRate * rentalDays;
  const kmSurcharge = kmPackage === "unlimited" ? rentalDays * 250 : 0;
  const addonsTotal =
    (addons.childSeat ? 300 : 0) +
    (addons.extraDriver ? 250 : 0) +
    (addons.zeroLiability ? rentalDays * 199 : 0);
  const deliveryFee = deliveryMode === "doorstep" && rentalDays < 3 ? 300 : 0;
  const totalAmount = baseRental + kmSurcharge + addonsTotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = `MU-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(generatedRef);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setUserSelectedCarId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="glass-panel w-full max-w-3xl rounded-3xl p-4 sm:p-7 border border-white/90 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-8 sm:h-8 min-h-[36px] min-w-[36px] rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#5B6676] hover:text-[#0B1F3A] transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="text-center py-5 sm:py-8 space-y-4 sm:space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-[#22A06B]/15 border border-[#22A06B]/30 flex items-center justify-center mx-auto text-[#22A06B] shadow-sm">
              <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>

            <div className="pr-6 sm:pr-0">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#22A06B] bg-[#22A06B]/10 px-3 py-1 rounded-full">
                Booking Confirmed
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-[#0B1F3A] mt-2">
                Your Road Trip is Reserved!
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6676] mt-1 max-w-md mx-auto">
                Reference ID: <strong className="text-[#0B1F3A]">{bookingRef}</strong>.
                We have dispatched confirmation details to your phone and email.
              </p>
            </div>

            {/* Trip Recap Card */}
            <div className="glass-panel-subtle rounded-2xl p-4 sm:p-5 max-w-lg mx-auto border border-white/80 text-left space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200/60">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src={currentCar.image}
                    alt={currentCar.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0B1F3A]">{currentCar.name}</h4>
                  <p className="text-xs text-[#5B6676]">
                    {rentalDays} {rentalDays === 1 ? "Day" : "Days"} •{" "}
                    {kmPackage === "unlimited" ? "Unlimited KMs" : "Standard KMs"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                <div>
                  <span className="text-[#5B6676] block">Pickup Schedule:</span>
                  <strong className="text-[#0B1F3A]">
                    {new Date(startDate).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </strong>
                </div>
                <div>
                  <span className="text-[#5B6676] block">Handover Type:</span>
                  <strong className="text-[#0B1F3A]">
                    {deliveryMode === "doorstep" ? "Doorstep Delivery" : "Hub Pickup"}
                  </strong>
                </div>
                <div>
                  <span className="text-[#5B6676] block">Security Deposit:</span>
                  <strong className="text-[#22A06B]">₹0 (Zero Deposit)</strong>
                </div>
                <div>
                  <span className="text-[#5B6676] block">Total Payable:</span>
                  <strong className="text-[#0B1F3A] text-sm">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>
            </div>

            {/* What to Expect Next */}
            <div className="max-w-md mx-auto text-left p-3.5 sm:p-4 rounded-xl bg-white/70 border border-slate-200/70 text-xs text-[#5B6676] space-y-1.5">
              <span className="font-bold text-[#0B1F3A] block">What Happens Next:</span>
              <p>• Our concierge will call {customerPhone || "+91 98200 XXXXX"} 45 mins prior to delivery.</p>
              <p>• Keep your physical Driving License handy for a 30-second digital scan.</p>
              <p>• Vehicle will arrive with full tank fuel and certified sanitized cabin.</p>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-[#0B1F3A] text-white font-bold text-xs shadow-md hover:bg-[#132D52] transition-all cursor-pointer"
            >
              Done & Return to Homepage
            </button>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div className="pb-3 sm:pb-4 border-b border-slate-200/70 mb-4 sm:mb-5 pr-8 sm:pr-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[11px] font-bold text-[#1E6FD9] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
                <span>Instant Self-Drive Reservation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A]">
                Reserve Your MU Drive
              </h3>
              <p className="text-xs text-[#5B6676]">
                Zero deposit • 100% Insured • Free cancellation up to 6 hours before departure
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Car Selection & Quick Specs */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6676] mb-2">
                  1. Selected Vehicle
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 p-3 sm:p-3.5 rounded-2xl bg-white/80 border border-slate-200 shadow-2xs">
                  <div className="relative w-full sm:w-28 h-28 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={currentCar.image}
                      alt={currentCar.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 112px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 w-full min-w-0">
                    <select
                      value={activeCarId}
                      onChange={(e) => setUserSelectedCarId(e.target.value)}
                      className="w-full text-base sm:text-sm font-extrabold text-[#0B1F3A] bg-transparent outline-none cursor-pointer border-b border-slate-200 pb-1"
                    >
                      {FLEET_CARS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} — ₹{c.dailyRate.toLocaleString("en-IN")}/day ({c.categoryLabel})
                        </option>
                      ))}
                    </select>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-[#5B6676]">
                      <span className="font-semibold text-[#1A1F2B]">
                        {currentCar.transmission}
                      </span>
                      <span>•</span>
                      <span>{currentCar.fuel}</span>
                      <span>•</span>
                      <span>{currentCar.seats} Seats</span>
                      <span>•</span>
                      <span className="text-[#22A06B] font-bold">Zero Deposit</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Trip Dates & Delivery Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div className="min-w-0">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6676] mb-1.5">
                    Pick-up Schedule
                  </label>
                  <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-200 text-base sm:text-sm font-semibold text-[#1A1F2B] outline-none focus:border-[#1E6FD9] min-w-0"
                  />
                </div>

                <div className="min-w-0">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6676] mb-1.5">
                    Drop-off Schedule
                  </label>
                  <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-200 text-base sm:text-sm font-semibold text-[#1A1F2B] outline-none focus:border-[#1E6FD9] min-w-0"
                  />
                </div>
              </div>

              {/* Handover Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6676] mb-2">
                  Handover Preference
                </label>
                <div className="grid grid-cols-2 gap-2 mb-2.5">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode("doorstep")}
                    className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold border transition-all cursor-pointer text-center ${
                      deliveryMode === "doorstep"
                        ? "bg-[#0B1F3A] text-white border-[#0B1F3A]"
                        : "bg-white/70 text-[#5B6676] border-slate-200"
                    }`}
                  >
                    Doorstep Delivery ({rentalDays >= 3 ? "FREE" : "+₹300"})
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMode("hub")}
                    className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold border transition-all cursor-pointer text-center ${
                      deliveryMode === "hub"
                        ? "bg-[#0B1F3A] text-white border-[#0B1F3A]"
                        : "bg-white/70 text-[#5B6676] border-slate-200"
                    }`}
                  >
                    Hub Self-Pickup (FREE)
                  </button>
                </div>

                {deliveryMode === "doorstep" ? (
                  <input
                    type="text"
                    placeholder="Enter complete delivery address (Building, Street, Landmark)..."
                    value={doorstepAddress}
                    onChange={(e) => setDoorstepAddress(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-200 text-base sm:text-sm text-[#1A1F2B] outline-none focus:border-[#1E6FD9]"
                  />
                ) : (
                  <select
                    value={selectedHub}
                    onChange={(e) => setSelectedHub(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-200 text-base sm:text-sm font-semibold text-[#1A1F2B] outline-none focus:border-[#1E6FD9] cursor-pointer"
                  >
                    {SERVICE_HUBS.map((hub) => (
                      <option key={hub.id} value={hub.id}>
                        {hub.name} ({hub.tag})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Package & Optional Add-ons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6676] mb-1.5">
                    Kilometers Option
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setKmPackage("unlimited")}
                      className={`py-2 sm:py-2.5 px-2 rounded-xl text-[11px] sm:text-xs font-bold border transition-all cursor-pointer text-center ${
                        kmPackage === "unlimited"
                          ? "bg-[#1E6FD9] text-white border-[#1E6FD9]"
                          : "bg-white/70 text-[#5B6676] border-slate-200"
                      }`}
                    >
                      Unlimited KMs (+₹250/d)
                    </button>
                    <button
                      type="button"
                      onClick={() => setKmPackage("standard")}
                      className={`py-2 sm:py-2.5 px-2 rounded-xl text-[11px] sm:text-xs font-bold border transition-all cursor-pointer text-center ${
                        kmPackage === "standard"
                          ? "bg-[#1E6FD9] text-white border-[#1E6FD9]"
                          : "bg-white/70 text-[#5B6676] border-slate-200"
                      }`}
                    >
                      150 KM/d (Standard)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6676] mb-1.5">
                    Optional Add-ons
                  </label>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <label className="flex items-center gap-1.5 bg-white/80 border border-slate-200 px-2.5 py-1.5 rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addons.childSeat}
                        onChange={(e) =>
                          setAddons({ ...addons, childSeat: e.target.checked })
                        }
                        className="accent-[#1E6FD9]"
                      />
                      <span>Baby Seat (+₹300)</span>
                    </label>
                    <label className="flex items-center gap-1.5 bg-white/80 border border-slate-200 px-2.5 py-1.5 rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addons.extraDriver}
                        onChange={(e) =>
                          setAddons({ ...addons, extraDriver: e.target.checked })
                        }
                        className="accent-[#1E6FD9]"
                      />
                      <span>Extra Driver (+₹250)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Step 3: Customer Details for KYC */}
              <div className="pt-2 border-t border-slate-200/70">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6676] mb-2.5">
                  2. Driver Details (For Paperless KYC)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name (as per Driving License)"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-200 text-base sm:text-sm text-[#1A1F2B] outline-none focus:border-[#1E6FD9]"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Mobile Number (e.g. 9820012345)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-200 text-base sm:text-sm text-[#1A1F2B] outline-none focus:border-[#1E6FD9]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-200 text-base sm:text-sm text-[#1A1F2B] outline-none focus:border-[#1E6FD9]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Driving License No. (e.g. MH02-2021XXXX)"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-200 text-base sm:text-sm text-[#1A1F2B] outline-none focus:border-[#1E6FD9]"
                    />
                  </div>
                </div>
              </div>

              {/* Price Breakdown & Confirmation */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-100/80 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#5B6676]">
                  <span className="pr-2">
                    Base Rental ({rentalDays} {rentalDays === 1 ? "day" : "days"})
                  </span>
                  <span className="font-bold text-[#1A1F2B] shrink-0">
                    ₹{baseRental.toLocaleString("en-IN")}
                  </span>
                </div>
                {kmSurcharge > 0 && (
                  <div className="flex justify-between items-center text-[#5B6676]">
                    <span className="pr-2">Unlimited KMs Plan</span>
                    <span className="font-bold text-[#1A1F2B] shrink-0">
                      +₹{kmSurcharge.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
                {addonsTotal > 0 && (
                  <div className="flex justify-between items-center text-[#5B6676]">
                    <span className="pr-2">Selected Add-ons</span>
                    <span className="font-bold text-[#1A1F2B] shrink-0">
                      +₹{addonsTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
                {deliveryFee > 0 && (
                  <div className="flex justify-between items-center text-[#5B6676]">
                    <span className="pr-2">Doorstep Handover Fee</span>
                    <span className="font-bold text-[#1A1F2B] shrink-0">
                      +₹{deliveryFee}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-[#22A06B] font-bold">
                  <span className="pr-2">Refundable Security Deposit</span>
                  <span className="shrink-0">₹0 (Zero Deposit)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm">
                  <span className="font-extrabold text-[#0B1F3A]">Total Amount</span>
                  <span className="text-xl font-black text-[#0B1F3A] shrink-0">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Agreement */}
              <div className="flex items-start gap-2 text-[11px] text-[#5B6676]">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  required
                  className="accent-[#1E6FD9] rounded mt-0.5 shrink-0"
                />
                <label htmlFor="terms" className="cursor-pointer">
                  I agree to the MU Drives rental terms and confirm I hold a valid Driving License.
                </label>
              </div>

              {/* Submit CTA in #F5A623 Amber */}
              <button
                type="submit"
                disabled={isSubmitting || !agreedTerms}
                className="w-full py-3.5 sm:py-4 rounded-2xl bg-[#F5A623] hover:bg-[#E09415] disabled:opacity-50 text-[#0B1F3A] font-extrabold text-sm sm:text-base shadow-[0_6px_20px_rgba(245,166,35,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Reserving Vehicle...</span>
                ) : (
                  <>
                    <span>Confirm Reservation</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
