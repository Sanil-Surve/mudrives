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
    <section className="py-6 sm:py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/80 shadow-[0_12px_36px_rgba(11,31,58,0.06)] backdrop-blur-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`flex flex-col justify-center min-w-0 ${
                    index > 0 ? "lg:border-l lg:border-slate-200/70 lg:pl-8" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/90 border border-slate-200/60 flex items-center justify-center shadow-xs shrink-0">
                      <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${item.iconColor}`} />
                    </div>
                    <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                      {item.value}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1A1F2B] leading-tight">
                    {item.label}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[#5B6676] mt-0.5 leading-tight sm:leading-normal">
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
