"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Fuel,
} from "lucide-react";

interface RentalCalculatorProps {
  onReserveWithEstimate: (estimate: {
    carName: string;
    days: number;
    kmPackage: string;
    totalAmount: number;
    dailyRate: number;
  }) => void;
}

export function RentalCalculator({ onReserveWithEstimate }: RentalCalculatorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("suv");
  const [days, setDays] = useState<number>(3);
  const [kmPackage, setKmPackage] = useState<"unlimited" | "standard">("unlimited");
  const [withFuel, setWithFuel] = useState<boolean>(false);
  const [deliveryMode, setDeliveryMode] = useState<"doorstep" | "hub">("doorstep");

  const categoryTiers: {
    id: string;
    label: string;
    sub: string;
    baseRate: number;
    carName: string;
  } = useMemo(() => {
    switch (selectedCategory) {
      case "hatchback":
        return {
          id: "hatchback",
          label: "Compact Hatchback",
          sub: "Maruti Swift / Hyundai i20",
          baseRate: 1499,
          carName: "Maruti Swift ZXi+",
        };
      case "sedan":
        return {
          id: "sedan",
          label: "Executive Sedan",
          sub: "Honda City ZX",
          baseRate: 2199,
          carName: "Honda City ZX VTEC",
        };
      case "suv":
        return {
          id: "suv",
          label: "Adventure SUV",
          sub: "Hyundai Creta / Thar 4x4",
          baseRate: 2499,
          carName: "Hyundai Creta SX(O)",
        };
      case "muv":
        return {
          id: "muv",
          label: "7-Seater Family MUV",
          sub: "Toyota Innova Crysta / XUV700",
          baseRate: 3499,
          carName: "Toyota Innova Crysta ZX",
        };
      case "electric":
        return {
          id: "electric",
          label: "Electric / EV",
          sub: "Tata Nexon EV Long Range",
          baseRate: 2399,
          carName: "Tata Nexon EV Max",
        };
      case "luxury":
        return {
          id: "luxury",
          label: "Luxury Tier",
          sub: "BMW 3 Series Gran Limousine",
          baseRate: 6999,
          carName: "BMW 3 Series Gran Limousine",
        };
      default:
        return {
          id: "suv",
          label: "Adventure SUV",
          sub: "Hyundai Creta",
          baseRate: 2499,
          carName: "Hyundai Creta SX(O)",
        };
    }
  }, [selectedCategory]);

  // Pricing logic
  const calculations = useMemo(() => {
    const dailyBase = categoryTiers.baseRate;
    const rawTotal = dailyBase * days;

    // Multi-day discount
    let discountRate = 0;
    if (days >= 30) discountRate = 0.3; // 30% off monthly
    else if (days >= 7) discountRate = 0.15; // 15% off weekly
    else if (days >= 3) discountRate = 0.05; // 5% off weekend

    const discountAmount = Math.round(rawTotal * discountRate);
    const discountedBase = rawTotal - discountAmount;

    // Unlimited KM surcharge
    const kmSurcharge = kmPackage === "unlimited" ? days * 250 : 0;

    // Fuel estimate surcharge if toggled
    const fuelEstimate = withFuel ? days * 750 : 0;

    // Doorstep delivery fee (complimentary for 3+ days, ₹300 for 1-2 days)
    const deliveryFee = deliveryMode === "doorstep" && days < 3 ? 300 : 0;

    const grandTotal = discountedBase + kmSurcharge + fuelEstimate + deliveryFee;

    return {
      dailyBase,
      rawTotal,
      discountRate,
      discountAmount,
      discountedBase,
      kmSurcharge,
      fuelEstimate,
      deliveryFee,
      grandTotal,
    };
  }, [categoryTiers, days, kmPackage, withFuel, deliveryMode]);

  return (
    <section id="calculator" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-[#0B1F3A] border border-slate-200/80 mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>100% Transparent Price Estimate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Estimate Your Rental Fare
          </h2>
          <p className="text-sm sm:text-base text-[#5B6676] mt-2">
            No hidden surge fees, no surprise deductions. Zero security deposit across all plans.
          </p>
        </div>

        {/* Calculator Outer Box with Glassmorphism */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-[0_12px_36px_rgba(11,31,58,0.06)] space-y-7">
            {/* 1. Car Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6676] mb-3">
                1. Select Vehicle Segment
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: "hatchback", label: "Hatchback", price: "₹1,499/d" },
                  { id: "sedan", label: "Sedan", price: "₹2,199/d" },
                  { id: "suv", label: "SUV", price: "₹2,499/d" },
                  { id: "muv", label: "7-Seater", price: "₹3,499/d" },
                  { id: "electric", label: "Electric EV", price: "₹2,399/d" },
                  { id: "luxury", label: "Luxury", price: "₹6,999/d" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedCategory(tier.id)}
                    className={`p-3 rounded-2xl text-left transition-all border cursor-pointer ${
                      selectedCategory === tier.id
                        ? "bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-md shadow-[#0B1F3A]/20"
                        : "bg-white/80 text-[#1A1F2B] border-slate-200/80 hover:bg-white hover:border-[#1E6FD9]/40"
                    }`}
                  >
                    <span className="block text-xs font-bold">{tier.label}</span>
                    <span
                      className={`text-[11px] block mt-0.5 ${
                        selectedCategory === tier.id ? "text-[#F5A623]" : "text-[#5B6676]"
                      }`}
                    >
                      from {tier.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Duration Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5B6676]">
                  2. Rental Duration ({days} {days === 1 ? "Day" : "Days"})
                </label>
                {calculations.discountRate > 0 && (
                  <span className="text-[11px] font-bold text-[#22A06B] bg-[#22A06B]/10 px-2 py-0.5 rounded-full">
                    {(calculations.discountRate * 100).toFixed(0)}% Duration Discount Applied
                  </span>
                )}
              </div>

              {/* Quick Duration Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { label: "1 Day", val: 1 },
                  { label: "3 Days (Weekend)", val: 3 },
                  { label: "7 Days (Roadtrip)", val: 7 },
                  { label: "30 Days (Monthly)", val: 30 },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setDays(item.val)}
                    className={`py-2 px-2 rounded-xl text-center text-xs font-semibold transition-all cursor-pointer border ${
                      days === item.val
                        ? "bg-[#1E6FD9] text-white border-[#1E6FD9] shadow-sm"
                        : "bg-white/70 text-[#1A1F2B] border-slate-200/70 hover:bg-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Slider for precision */}
              <input
                type="range"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-[#1E6FD9] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#5B6676] mt-1 font-medium">
                <span>1 Day</span>
                <span>7 Days</span>
                <span>15 Days</span>
                <span>30 Days (Max)</span>
              </div>
            </div>

            {/* 3. Kilometers Plan & Fuel Toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200/70">
              {/* Kilometer Plan */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6676] mb-2">
                  Kilometers Plan
                </label>
                <div className="space-y-2">
                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      kmPackage === "unlimited"
                        ? "bg-[#1E6FD9]/10 border-[#1E6FD9] text-[#0B1F3A]"
                        : "bg-white/70 border-slate-200 text-[#5B6676]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="kmPackage"
                        checked={kmPackage === "unlimited"}
                        onChange={() => setKmPackage("unlimited")}
                        className="accent-[#1E6FD9]"
                      />
                      <span>Unlimited KMs</span>
                    </div>
                    <span className="text-[11px] text-[#1E6FD9] font-bold">+₹250/d</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      kmPackage === "standard"
                        ? "bg-[#1E6FD9]/10 border-[#1E6FD9] text-[#0B1F3A]"
                        : "bg-white/70 border-slate-200 text-[#5B6676]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="kmPackage"
                        checked={kmPackage === "standard"}
                        onChange={() => setKmPackage("standard")}
                        className="accent-[#1E6FD9]"
                      />
                      <span>Standard 150 km/day</span>
                    </div>
                    <span className="text-[11px] text-[#5B6676]">Included</span>
                  </label>
                </div>
              </div>

              {/* Delivery Mode */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B6676] mb-2">
                  Handover Location
                </label>
                <div className="space-y-2">
                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      deliveryMode === "doorstep"
                        ? "bg-[#1E6FD9]/10 border-[#1E6FD9] text-[#0B1F3A]"
                        : "bg-white/70 border-slate-200 text-[#5B6676]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="deliveryMode"
                        checked={deliveryMode === "doorstep"}
                        onChange={() => setDeliveryMode("doorstep")}
                        className="accent-[#1E6FD9]"
                      />
                      <span>Doorstep Handover</span>
                    </div>
                    <span className="text-[11px] text-[#22A06B] font-bold">
                      {days >= 3 ? "FREE" : "+₹300"}
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      deliveryMode === "hub"
                        ? "bg-[#1E6FD9]/10 border-[#1E6FD9] text-[#0B1F3A]"
                        : "bg-white/70 border-slate-200 text-[#5B6676]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="deliveryMode"
                        checked={deliveryMode === "hub"}
                        onChange={() => setDeliveryMode("hub")}
                        className="accent-[#1E6FD9]"
                      />
                      <span>Hub Self-Pickup</span>
                    </div>
                    <span className="text-[11px] text-[#22A06B] font-bold">FREE</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Fuel Option Toggle */}
            <div className="pt-3 border-t border-slate-200/70">
              <label
                className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                  withFuel
                    ? "bg-[#1E6FD9]/10 border-[#1E6FD9] text-[#0B1F3A]"
                    : "bg-white/70 border-slate-200 text-[#5B6676]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Fuel className="w-4 h-4 text-[#F5A623]" />
                  <div>
                    <span className="block font-bold">Include Pre-Paid Fuel Package</span>
                    <span className="text-[11px] font-normal text-[#5B6676]">
                      Car delivered with full tank; return at any fuel level
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={withFuel}
                    onChange={(e) => setWithFuel(e.target.checked)}
                    className="accent-[#1E6FD9] w-4 h-4 rounded cursor-pointer"
                  />
                  <span className="text-[11px] font-bold text-[#1E6FD9]">
                    +₹750/day
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Fare Summary Receipt Column (5 Cols) with Deep Glassmorphism */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 border border-white/90 shadow-xl relative overflow-hidden backdrop-blur-2xl">
            {/* Top Navy accent stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0B1F3A]" />

            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/70">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E6FD9]">
                  Instant Transparent Quotation
                </span>
                <h3 className="text-lg font-extrabold text-[#0B1F3A]">
                  {categoryTiers.label}
                </h3>
                <p className="text-xs text-[#5B6676]">{categoryTiers.sub}</p>
              </div>
              <span className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-[#F5A623] shadow-xs">
                <Calculator className="w-5 h-5" />
              </span>
            </div>

            {/* Line items list */}
            <div className="space-y-3 text-xs py-2">
              <div className="flex justify-between items-center text-[#1A1F2B]">
                <span>
                  Base Daily Rate (₹{calculations.dailyBase.toLocaleString("en-IN")} × {days}{" "}
                  {days === 1 ? "day" : "days"})
                </span>
                <span className="font-bold">
                  ₹{calculations.rawTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {calculations.discountAmount > 0 && (
                <div className="flex justify-between items-center text-[#22A06B]">
                  <span>Duration Discount ({(calculations.discountRate * 100).toFixed(0)}%)</span>
                  <span className="font-bold">
                    -₹{calculations.discountAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              {calculations.kmSurcharge > 0 && (
                <div className="flex justify-between items-center text-[#1A1F2B]">
                  <span>Unlimited KMs Package</span>
                  <span className="font-bold">
                    +₹{calculations.kmSurcharge.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              {calculations.deliveryFee > 0 ? (
                <div className="flex justify-between items-center text-[#1A1F2B]">
                  <span>Doorstep Handover Fee</span>
                  <span className="font-bold">+₹{calculations.deliveryFee}</span>
                </div>
              ) : (
                <div className="flex justify-between items-center text-[#22A06B]">
                  <span>Doorstep Delivery</span>
                  <span className="font-bold">Complimentary</span>
                </div>
              )}

              <div className="flex justify-between items-center text-[#5B6676]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B]" />
                  Comprehensive Insurance & RSA
                </span>
                <span className="text-[#22A06B] font-semibold">Included (₹0)</span>
              </div>

              <div className="flex justify-between items-center text-[#5B6676]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B]" />
                  Fastag Toll Transponder
                </span>
                <span className="text-[#22A06B] font-semibold">Pre-Activated</span>
              </div>

              <div className="flex justify-between items-center py-2 px-3 rounded-xl bg-[#22A06B]/10 border border-[#22A06B]/20 text-[#22A06B]">
                <span className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Refundable Security Deposit
                </span>
                <span className="font-black text-sm">₹0 (Zero Deposit)</span>
              </div>
            </div>

            {/* Total Section */}
            <div className="mt-5 pt-4 border-t border-slate-200/80">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-xs font-semibold text-[#5B6676] block">
                    Estimated Payable Amount
                  </span>
                  <span className="text-[11px] text-[#5B6676]">All taxes included</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-[#0B1F3A] tracking-tight">
                    ₹{calculations.grandTotal.toLocaleString("en-IN")}
                  </span>
                  <span className="block text-[11px] text-[#5B6676]">
                    (₹{Math.round(calculations.grandTotal / days).toLocaleString("en-IN")}/day)
                  </span>
                </div>
              </div>

              {/* Action Button in #F5A623 Amber */}
              <button
                type="button"
                onClick={() =>
                  onReserveWithEstimate({
                    carName: categoryTiers.carName,
                    days,
                    kmPackage,
                    totalAmount: calculations.grandTotal,
                    dailyRate: calculations.dailyBase,
                  })
                }
                className="w-full py-3.5 px-6 rounded-2xl bg-[#F5A623] hover:bg-[#E09415] text-[#0B1F3A] font-extrabold text-sm shadow-[0_6px_20px_rgba(245,166,35,0.4)] hover:shadow-[0_8px_25px_rgba(245,166,35,0.55)] transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Reserve at This Estimated Price</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <p className="text-[10px] text-center text-[#5B6676] mt-2.5">
                Instant confirmation • Free cancellation up to 6 hours before trip
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
