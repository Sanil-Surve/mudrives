"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Car,
  Search,
  CheckCircle2,
} from "lucide-react";
import { SERVICE_HUBS } from "@/lib/fleet-data";

interface BookingWidgetProps {
  onSearch: (criteria: {
    hubId: string;
    deliveryMode: "doorstep" | "hub";
    category: string;
    startDate: string;
    endDate: string;
  }) => void;
}

export function BookingWidget({ onSearch }: BookingWidgetProps) {
  const [deliveryMode, setDeliveryMode] = useState<"doorstep" | "hub">("doorstep");
  const [selectedHub, setSelectedHub] = useState("airport-t2");
  const [category, setCategory] = useState("all");
  const [startDate, setStartDate] = useState("2026-10-08T09:00");
  const [endDate, setEndDate] = useState("2026-10-10T21:00");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      hubId: selectedHub,
      deliveryMode,
      category,
      startDate,
      endDate,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Outer Glassmorphic Card */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 lg:p-7 shadow-[0_16px_40px_rgba(11,31,58,0.08)] border border-white/80 relative overflow-hidden backdrop-blur-2xl">
        {/* Subtle accent highlight line on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B1F3A] via-[#1E6FD9] to-[#F5A623]" />

        {/* Delivery Mode Pill Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-200/60 pb-4">
          <div className="w-full sm:w-auto grid grid-cols-2 sm:flex items-center p-1 rounded-xl bg-white/70 border border-slate-200/80 shadow-xs">
            <button
              type="button"
              onClick={() => setDeliveryMode("doorstep")}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                deliveryMode === "doorstep"
                  ? "bg-[#0B1F3A] text-white shadow-sm"
                  : "text-[#5B6676] hover:text-[#0B1F3A]"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#F5A623] shrink-0" />
              <span>Doorstep</span>
              <span className="text-[9px] sm:text-[10px] bg-[#1E6FD9]/20 text-[#1E6FD9] px-1.5 py-0.5 rounded-full font-bold">
                FREE
              </span>
            </button>
            <button
              type="button"
              onClick={() => setDeliveryMode("hub")}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                deliveryMode === "hub"
                  ? "bg-[#0B1F3A] text-white shadow-sm"
                  : "text-[#5B6676] hover:text-[#0B1F3A]"
              }`}
            >
              <Car className="w-3.5 h-3.5 text-[#1E6FD9] shrink-0" />
              <span>Hub Pickup</span>
            </button>
          </div>

          {/* Value tags */}
          <div className="flex items-center justify-center sm:justify-end gap-3 text-xs text-[#5B6676]">
            <span className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B] shrink-0" />
              Zero Deposit
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B] shrink-0" />
              Unlimited KMs Option
            </span>
          </div>
        </div>

        {/* Search Fields Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3.5">
            {/* Location / Hub */}
            <div className="relative group min-w-0">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5B6676] mb-1.5">
                {deliveryMode === "doorstep" ? "Delivery Location / Hub" : "Pickup Hub"}
              </label>
              <div className="flex items-center bg-white/80 border border-slate-200/90 rounded-2xl px-3.5 py-2.5 focus-within:border-[#1E6FD9] focus-within:ring-2 focus-within:ring-[#1E6FD9]/20 transition-all shadow-xs min-w-0">
                <MapPin className="w-4 h-4 text-[#1E6FD9] shrink-0 mr-2.5" />
                <select
                  value={selectedHub}
                  onChange={(e) => setSelectedHub(e.target.value)}
                  className="w-full bg-transparent text-base sm:text-sm font-semibold text-[#1A1F2B] outline-none cursor-pointer min-w-0"
                >
                  {SERVICE_HUBS.map((hub) => (
                    <option key={hub.id} value={hub.id} className="text-[#1A1F2B] bg-white">
                      {hub.name} ({hub.tag})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pick-up Date & Time */}
            <div className="min-w-0">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5B6676] mb-1.5">
                Pick-up Date & Time
              </label>
              <div className="flex items-center bg-white/80 border border-slate-200/90 rounded-2xl px-3.5 py-2.5 focus-within:border-[#1E6FD9] focus-within:ring-2 focus-within:ring-[#1E6FD9]/20 transition-all shadow-xs min-w-0">
                <Calendar className="w-4 h-4 text-[#1E6FD9] shrink-0 mr-2.5" />
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-transparent text-base sm:text-sm font-semibold text-[#1A1F2B] outline-none min-w-0"
                />
              </div>
            </div>

            {/* Drop-off Date & Time */}
            <div className="min-w-0">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5B6676] mb-1.5">
                Drop-off Date & Time
              </label>
              <div className="flex items-center bg-white/80 border border-slate-200/90 rounded-2xl px-3.5 py-2.5 focus-within:border-[#1E6FD9] focus-within:ring-2 focus-within:ring-[#1E6FD9]/20 transition-all shadow-xs min-w-0">
                <Calendar className="w-4 h-4 text-[#F5A623] shrink-0 mr-2.5" />
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-transparent text-base sm:text-sm font-semibold text-[#1A1F2B] outline-none min-w-0"
                />
              </div>
            </div>
          </div>

          {/* Filter Bar & Submit Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
            {/* Quick Car Class Pills */}
            <div className="overflow-x-auto no-scrollbar flex items-center gap-1.5 w-full sm:w-auto pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
              {[
                { id: "all", label: "All Fleet" },
                { id: "suv", label: "SUVs" },
                { id: "sedan", label: "Sedans" },
                { id: "hatchback", label: "Hatchbacks" },
                { id: "muv", label: "7-Seaters" },
                { id: "electric", label: "EVs" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setCategory(pill.id)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    category === pill.id
                      ? "bg-[#0B1F3A] text-white shadow-xs"
                      : "bg-white/60 text-[#5B6676] hover:bg-white hover:text-[#0B1F3A] border border-slate-200/60"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Main Submit CTA in #F5A623 Amber */}
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-3 rounded-2xl bg-[#F5A623] hover:bg-[#E09415] text-[#0B1F3A] font-extrabold text-sm tracking-wide shadow-[0_6px_20px_rgba(245,166,35,0.4)] hover:shadow-[0_8px_25px_rgba(245,166,35,0.55)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Search Available Cars</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
