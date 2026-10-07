"use client";

import React from "react";
import {
  Car,
  FileCheck2,
  KeyRound,
  ArrowRight,
  CreditCard,
  UserCheck,
} from "lucide-react";

interface HowItWorksProps {
  onStartBooking: () => void;
}

export function HowItWorks({ onStartBooking }: HowItWorksProps) {
  const steps = [
    {
      step: "01",
      title: "Choose Car & Schedule",
      desc: "Pick your favorite vehicle model, select pickup hub or doorstep delivery address, and customize your duration and kilometers package.",
      icon: Car,
      badge: "60 Seconds",
    },
    {
      step: "02",
      title: "Quick Paperless KYC",
      desc: "Upload your valid Driving License and Government ID (Aadhaar/Passport). Our AI document check verifies your profile in under 5 minutes.",
      icon: FileCheck2,
      badge: "Paperless Verification",
    },
    {
      step: "03",
      title: "Take Delivery & Drive",
      desc: "Vehicle is handed over sanitized and full tank. Complete a quick digital vehicle checklist with our concierge, grab the keys, and hit the open road.",
      icon: KeyRound,
      badge: "Showroom Sanitized",
    },
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-[#0B1F3A] border border-slate-200/80 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#1E6FD9]" />
            <span>Effortless Rental Flow</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            How MU Drives Works
          </h2>
          <p className="text-xs sm:text-base text-[#5B6676] mt-2">
            Rent a car in three straightforward steps. No long counter queues, no paperwork,
            no locked deposit money.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card-interactive rounded-3xl p-5 sm:p-7 border border-white/80 relative flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Badge */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className="text-2xl sm:text-3xl font-black text-[#0B1F3A]/20">
                      {item.step}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#1E6FD9] bg-[#1E6FD9]/10 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon Box */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0B1F3A] text-[#F5A623] flex items-center justify-center mb-3.5 sm:mb-4 shadow-md shadow-[#0B1F3A]/15">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] mb-1.5 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B6676] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-200/70 flex items-center text-xs font-semibold text-[#1E6FD9] gap-1.5">
                  <span>Step {idx + 1} of 3</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Checklist Bar */}
        <div className="glass-panel rounded-3xl p-5 sm:p-8 border border-white/90 shadow-lg">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 sm:gap-6">
            <div className="space-y-1 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E6FD9]">
                Renter Eligibility
              </span>
              <h4 className="text-base sm:text-lg font-extrabold text-[#0B1F3A]">
                What Do You Need to Drive?
              </h4>
              <p className="text-xs text-[#5B6676]">
                Simple requirements to ensure safe, legally compliant self-drive journeys.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-200/70 text-xs text-[#1A1F2B]">
                <UserCheck className="w-4 h-4 text-[#22A06B] shrink-0" />
                <span>
                  <strong>Age 21+ Years</strong> (Young Drivers Welcome)
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-200/70 text-xs text-[#1A1F2B]">
                <FileCheck2 className="w-4 h-4 text-[#1E6FD9] shrink-0" />
                <span>
                  <strong>Valid Driving License</strong> (Min. 1 yr old)
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-200/70 text-xs text-[#1A1F2B]">
                <CreditCard className="w-4 h-4 text-[#F5A623] shrink-0" />
                <span>
                  <strong>Zero Security Deposit</strong> (No card hold)
                </span>
              </div>
            </div>

            <button
              onClick={onStartBooking}
              className="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-2xl bg-[#0B1F3A] hover:bg-[#132D52] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get Verified & Book</span>
              <ArrowRight className="w-4 h-4 text-[#F5A623]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
