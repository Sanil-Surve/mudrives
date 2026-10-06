"use client";

import React from "react";
import { Car, Award, Shield, Users } from "lucide-react";

export function LiveStats() {
  const stats = [
    {
      label: "Premium Sanitized Fleet",
      value: "450+",
      sub: "Hatchbacks, SUVs, Sedans & EVs",
      icon: Car,
      iconColor: "text-[#1E6FD9]",
    },
    {
      label: "Safe Journeys Powered",
      value: "15,000+",
      sub: "Across Maharashtra & Goa routes",
      icon: Users,
      iconColor: "text-[#F5A623]",
    },
    {
      label: "On-Time Doorstep Handover",
      value: "98.6%",
      sub: "Within 45-min delivery window",
      icon: Award,
      iconColor: "text-[#22A06B]",
    },
    {
      label: "Customer Satisfaction",
      value: "4.9 / 5",
      sub: "Based on 12,000+ verified driver reviews",
      icon: Shield,
      iconColor: "text-[#0B1F3A]",
    },
  ];

  return (
    <section className="py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 lg:p-8 border border-white/80 shadow-[0_12px_36px_rgba(11,31,58,0.06)] backdrop-blur-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/70">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col justify-center ${
                    index > 0 ? "pt-4 lg:pt-0 lg:pl-8" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-white/90 border border-slate-200/60 flex items-center justify-center shadow-xs">
                      <Icon className={`w-4 h-4 ${item.iconColor}`} />
                    </div>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                      {item.value}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1A1F2B]">
                    {item.label}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#5B6676] mt-0.5">
                    {item.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
