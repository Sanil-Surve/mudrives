"use client";

import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export function SafetyBanner() {
  const standards = [
    {
      title: "Hospital-Grade Sanitization",
      desc: "Complete interior vacuuming, ozone purification, and touchpoint disinfection before every handover.",
    },
    {
      title: "40-Point Pre-Trip Check",
      desc: "Brake fluid, tire tread depth, suspension, air conditioning, and electrical systems rigorously certified.",
    },
    {
      title: "Real-Time Telematics & SOS",
      desc: "Instant panic button and telematics support connected directly to our 24/7 central emergency center.",
    },
    {
      title: "Contactless Digital Checklist",
      desc: "Photograph existing scratches or fuel levels on your phone for 100% indisputable transparency.",
    },
  ];

  return (
    <section className="py-8 sm:py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-5 sm:p-10 border border-white/80 shadow-[0_12px_36px_rgba(11,31,58,0.06)] relative overflow-hidden backdrop-blur-xl">
          {/* Subtle gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#22A06B] via-[#1E6FD9] to-[#F5A623]" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-slate-200/70">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22A06B]/10 text-[#22A06B] text-xs font-bold mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>MU Drives Safety & Hygiene Protocol</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-[#0B1F3A]">
                Drive with Total Peace of Mind
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6676] mt-2 leading-relaxed">
                We treat every car as if our own families are taking it on a long road trip.
                From safety inspections to hygienic interiors, quality is guaranteed.
              </p>
            </div>

            <div className="w-full sm:w-auto flex items-center gap-3 bg-white/80 border border-slate-200/80 p-3.5 sm:p-4 rounded-2xl shadow-xs">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#22A06B]/15 flex items-center justify-center text-[#22A06B] shrink-0">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="block text-xs font-bold text-[#0B1F3A]">
                  Certified Clean Seal
                </span>
                <span className="text-[11px] text-[#5B6676]">
                  Every trip vehicle certified
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {standards.map((std, i) => (
              <div key={i} className="space-y-1 sm:space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22A06B] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                    {std.title}
                  </h4>
                </div>
                <p className="text-xs text-[#5B6676] pl-6 leading-relaxed">
                  {std.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
