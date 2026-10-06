"use client";

import React from "react";
import { ArrowRight, PhoneCall, Sparkles, CheckCircle2 } from "lucide-react";

interface CallToActionProps {
  onOpenBooking: () => void;
}

export function CallToAction({ onOpenBooking }: CallToActionProps) {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-dark rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/15 relative overflow-hidden text-center shadow-2xl">
          {/* Ambient luminous glow balls inside dark glass card */}
          <div className="absolute top-0 -left-20 w-80 h-80 bg-[#1E6FD9]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 -right-20 w-80 h-80 bg-[#F5A623]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#F5A623]">
              <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Instant Paperless Booking</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to Hit the Highway? Your Next Road Trip Starts Here.
            </h2>

            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
              Experience seamless self-drive car rentals with zero security deposit,
              unlimited kilometers, and doorstep delivery across Mumbai and Pune.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#F5A623] hover:bg-[#E09415] text-[#0B1F3A] font-extrabold text-base shadow-[0_8px_30px_rgba(245,166,35,0.45)] hover:shadow-[0_10px_35px_rgba(245,166,35,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Book Your Car Now</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <a
                href="tel:+919820068374"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-bold backdrop-blur-md transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#F5A623]" />
                <span>Call Concierge: +91 98200 68374</span>
              </a>
            </div>

            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                Zero Security Deposit
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                Free Cancellation up to 6h before
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#22A06B]" />
                100% Insured Fleet
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
