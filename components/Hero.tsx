"use client";

import React from "react";
import {
  ShieldCheck,
  Zap,
  MapPin,
  Star,
  Clock,
  Sparkles,
} from "lucide-react";
import { BookingWidget } from "./BookingWidget";

interface HeroProps {
  onSearch: (criteria: {
    hubId: string;
    deliveryMode: "doorstep" | "hub";
    category: string;
    startDate: string;
    endDate: string;
  }) => void;
}

export function Hero({ onSearch }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Ambient Glass Glow Orbs */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#1E6FD9]/15 via-[#F5A623]/10 to-[#0B1F3A]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 -left-20 w-96 h-96 bg-[#1E6FD9]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-60 -right-20 w-96 h-96 bg-[#F5A623]/12 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Trust Tag */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-slate-200/80 mb-6 shadow-xs animate-in fade-in duration-500">
            <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
            <span className="text-xs font-semibold text-[#0B1F3A]">
              Zero Security Deposit
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-[#5B6676]">
              Instant Paperless KYC
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-medium text-[#1E6FD9]">
              Doorstep Handover
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B1F3A] leading-[1.12] mb-6">
            Drive On Your Terms.{" "}
            <span className="bg-gradient-to-r from-[#0B1F3A] via-[#1E6FD9] to-[#0B1F3A] bg-clip-text text-transparent">
              Freedom on Every Road.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#5B6676] leading-relaxed max-w-2xl mx-auto font-normal">
            Experience premium self-drive cars across Mumbai, Pune, and beyond.
            Transparent daily rates, unlimited kilometer options, and doorstep delivery
            right when you need it.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#5B6676]">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-slate-200/60 shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
              <strong className="text-[#1A1F2B]">4.9/5</strong> Rating (12,500+ Trips)
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-slate-200/60 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22A06B]" />
              100% Comprehensive Insurance
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-slate-200/60 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-[#1E6FD9]" />
              45-Min Express Doorstep Delivery
            </span>
          </div>
        </div>

        {/* Central Glassmorphic Booking Widget */}
        <div className="mb-14">
          <BookingWidget onSearch={onSearch} />
        </div>

        {/* Glassmorphic Visual Feature Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {[
            {
              title: "Zero Security Deposit",
              subtitle: "No blocked funds or long refund waits",
              icon: ShieldCheck,
              accent: "text-[#22A06B]",
            },
            {
              title: "Unlimited Kilometers",
              subtitle: "Drive as far as you wish with no penalty",
              icon: Zap,
              accent: "text-[#F5A623]",
            },
            {
              title: "Airport & Doorstep Valet",
              subtitle: "Terminal 1, Terminal 2 & doorstep drops",
              icon: MapPin,
              accent: "text-[#1E6FD9]",
            },
            {
              title: "Sanitized & 40-pt Inspected",
              subtitle: "Showroom-clean interior & full tank",
              icon: Sparkles,
              accent: "text-[#0B1F3A]",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card-interactive rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-white/70"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white/90 border border-slate-200/70 flex items-center justify-center shadow-xs">
                    <Icon className={`w-4 h-4 ${item.accent}`} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">0{idx + 1}</span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B1F3A] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#5B6676] leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
