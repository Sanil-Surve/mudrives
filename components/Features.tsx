"use client";

import React from "react";
import {
  ShieldCheck,
  MapPin,
  Zap,
  Gauge,
  FileCheck2,
  Headphones,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Zero Security Deposit",
      description:
        "Keep your money in your bank. No blocked funds on credit cards or 2-week refund wait times. Verified renters pay only the rental fare.",
      icon: ShieldCheck,
      color: "text-[#22A06B]",
      bgColor: "bg-[#22A06B]/10",
      highlight: "No Frozen Balances",
    },
    {
      title: "Doorstep & Airport Handover",
      description:
        "Landing at Mumbai Airport T2/T1 or relaxing at home? Our verified concierge brings the car right to your location in showroom condition.",
      icon: MapPin,
      color: "text-[#1E6FD9]",
      bgColor: "bg-[#1E6FD9]/10",
      highlight: "Direct Terminal Valet",
    },
    {
      title: "Unlimited Kilometers Freedom",
      description:
        "Road trips are about spontaneity, not counting kilometers. Choose our unlimited package and drive anywhere without overage stress.",
      icon: Zap,
      color: "text-[#F5A623]",
      bgColor: "bg-[#F5A623]/10",
      highlight: "Drive Without Limits",
    },
    {
      title: "100% Insured Fleet",
      description:
        "Every MU Drives vehicle comes with comprehensive commercial coverage and zero-depreciation liability protection for peace of mind.",
      icon: Gauge,
      color: "text-[#0B1F3A]",
      bgColor: "bg-[#0B1F3A]/10",
      highlight: "Full Highway Cover",
    },
    {
      title: "5-Minute Paperless KYC",
      description:
        "Say goodbye to manual paperwork and photocopies. Upload your Driving License and Aadhaar/Passport digitally for instant approval.",
      icon: FileCheck2,
      color: "text-[#1E6FD9]",
      bgColor: "bg-[#1E6FD9]/10",
      highlight: "Instant Digital Pass",
    },
    {
      title: "24/7 Roadside Assistance",
      description:
        "Flat tire, battery discharge, or unexpected mechanical glitch? Our dedicated 24/7 on-road response team covers you anywhere in India.",
      icon: Headphones,
      color: "text-[#22A06B]",
      bgColor: "bg-[#22A06B]/10",
      highlight: "Pan-India SOS Support",
    },
  ];

  return (
    <section id="why-us" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-[#1E6FD9] border border-blue-200/50 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>The MU Drives Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Designed for Smooth, Stress-Free Road Trips
          </h2>
          <p className="text-sm sm:text-base text-[#5B6676] mt-2">
            We removed the friction from traditional car rentals. No arbitrary security
            deductions, no hidden charges, and total transparency from day one.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="glass-card-interactive rounded-3xl p-6 sm:p-7 border border-white/80 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl ${feat.bgColor} flex items-center justify-center border border-white/80 shadow-xs group-hover:scale-105 transition-transform`}
                    >
                      <Icon className={`w-6 h-6 ${feat.color}`} />
                    </div>
                    <span className="text-[11px] font-bold text-[#5B6676] bg-slate-100/80 px-2.5 py-1 rounded-full">
                      {feat.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0B1F3A] mb-2 group-hover:text-[#1E6FD9] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5B6676] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-[#0B1F3A]">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                  <span>Guaranteed on all bookings</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
