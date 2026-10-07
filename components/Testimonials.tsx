"use client";

import React from "react";
import Image from "next/image";
import { Star, ShieldCheck, MapPin } from "lucide-react";
import { TESTIMONIALS } from "@/lib/fleet-data";

export function Testimonials() {
  return (
    <section id="reviews" className="py-14 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-[#0B1F3A] border border-slate-200/80 mb-3">
            <Star className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
            <span>Driver Stories & Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Loved by 12,000+ Highway Enthusiasts
          </h2>
          <p className="text-xs sm:text-base text-[#5B6676] mt-2">
            Real experiences from self-drive adventurers, weekend getaways, and corporate travelers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-7">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="glass-card-interactive rounded-3xl p-5 sm:p-7 border border-white/80 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#F5A623] text-[#F5A623]"
                      />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-[#22A06B] bg-[#22A06B]/10 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Renter
                  </span>
                </div>

                {/* Car & Trip Badge */}
                <div className="p-2.5 rounded-xl bg-slate-100/80 border border-slate-200/60 mb-4 text-[11px]">
                  <span className="font-bold text-[#0B1F3A] block">{item.car}</span>
                  <span className="text-[#5B6676] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#1E6FD9]" />
                    {item.trip}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-[#1A1F2B] leading-relaxed italic mb-6">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200/70 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white shadow-xs bg-slate-200">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#5B6676]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
