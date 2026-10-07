"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Users,
  Gauge,
  Fuel,
  SlidersHorizontal,
  Star,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Search,
  Sparkles,
  Info,
} from "lucide-react";
import { FLEET_CARS, CarItem } from "@/lib/fleet-data";

interface FleetSectionProps {
  onSelectCarForBooking: (car: CarItem) => void;
  activeCategoryFilter?: string;
}

export function FleetSection({
  onSelectCarForBooking,
  activeCategoryFilter = "all",
}: FleetSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategoryFilter);
  const [transmissionFilter, setTransmissionFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCarDetails, setSelectedCarDetails] = useState<CarItem | null>(null);

  const categories = [
    { id: "all", label: "All Fleet" },
    { id: "suv", label: "SUVs" },
    { id: "sedan", label: "Sedans" },
    { id: "hatchback", label: "Hatchbacks" },
    { id: "muv", label: "7-Seaters" },
    { id: "electric", label: "Electric EV" },
    { id: "luxury", label: "Luxury Tier" },
  ];

  const filteredCars = useMemo(() => {
    return FLEET_CARS.filter((car) => {
      // Category filter
      if (selectedCategory !== "all" && car.category !== selectedCategory) {
        return false;
      }
      // Transmission filter
      if (
        transmissionFilter !== "all" &&
        car.transmission.toLowerCase() !== transmissionFilter.toLowerCase()
      ) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(query);
        const matchesBrand = car.brand.toLowerCase().includes(query);
        const matchesCategory = car.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory) return false;
      }
      return true;
    });
  }, [selectedCategory, transmissionFilter, searchQuery]);

  return (
    <section id="fleet" className="py-20 relative">
      {/* Background ambient orbs */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#1E6FD9]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-[#1E6FD9] border border-blue-200/50 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Verified & Sanitized Fleet</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Choose Your Next Drive
            </h2>
            <p className="text-sm sm:text-base text-[#5B6676] mt-2 max-w-xl">
              Every vehicle undergoes a 40-point technical check before handover.
              Zero deposit, unlimited kilometers option, and doorstep delivery included.
            </p>
          </div>

          {/* Quick Search & Transmission Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#5B6676] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Creta, City, Thar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 pl-10 pr-4 py-2.5 sm:py-2 rounded-xl bg-white/80 border border-slate-200 text-base sm:text-sm text-[#1A1F2B] outline-none focus:border-[#1E6FD9] focus:ring-2 focus:ring-[#1E6FD9]/20 transition-all shadow-2xs"
              />
            </div>

            <select
              value={transmissionFilter}
              onChange={(e) => setTransmissionFilter(e.target.value)}
              className="py-2.5 sm:py-2 px-3 rounded-xl bg-white/80 border border-slate-200 text-base sm:text-sm font-medium text-[#1A1F2B] outline-none focus:border-[#1E6FD9] shadow-2xs cursor-pointer"
            >
              <option value="all">All Transmissions</option>
              <option value="automatic">Automatic Only</option>
              <option value="manual">Manual Only</option>
            </select>
          </div>
        </div>

        {/* Category Pills Navigation (Edge-to-Edge swipeable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-[#0B1F3A] text-white shadow-sm"
                  : "glass-pill text-[#5B6676] hover:text-[#0B1F3A] hover:bg-white/90 border border-slate-200/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cars Grid */}
        {filteredCars.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center max-w-lg mx-auto">
            <p className="text-base font-semibold text-[#0B1F3A] mb-2">
              No vehicles match your criteria
            </p>
            <p className="text-xs text-[#5B6676] mb-4">
              Try resetting your search or transmission filters to view all cars.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setTransmissionFilter("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-[#0B1F3A] text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="glass-card-interactive rounded-3xl overflow-hidden border border-white/80 flex flex-col justify-between group"
              >
                {/* Car Image with Tags */}
                <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="glass-pill px-2.5 py-1 rounded-full text-[11px] font-bold text-[#0B1F3A] bg-white/90 shadow-xs">
                      {car.categoryLabel}
                    </span>
                    {car.tag && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold text-[#0B1F3A] bg-[#F5A623] shadow-sm">
                        {car.tag}
                      </span>
                    )}
                  </div>

                  {/* Bottom Image Stats */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                    <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20">
                      <Star className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
                      <span className="font-bold">{car.rating}</span>
                      <span className="text-white/70">({car.tripsCount} trips)</span>
                    </span>
                    <span className="flex items-center gap-1 bg-[#22A06B]/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-bold text-white shadow-xs">
                      <ShieldCheck className="w-3 h-3" />
                      Zero Deposit
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E6FD9]">
                          {car.brand}
                        </span>
                        <h3 className="text-lg font-extrabold text-[#0B1F3A] group-hover:text-[#1E6FD9] transition-colors">
                          {car.name}
                        </h3>
                      </div>
                    </div>

                    {/* Key Specs Row */}
                    <div className="grid grid-cols-4 gap-1 sm:gap-1.5 py-3 border-y border-slate-200/70 my-3 text-center">
                      <div className="flex flex-col items-center min-w-0">
                        <Users className="w-3.5 h-3.5 text-[#5B6676] mb-1 shrink-0" />
                        <span className="text-[10px] sm:text-[11px] font-semibold text-[#1A1F2B] truncate w-full">
                          {car.seats} Seats
                        </span>
                      </div>
                      <div className="flex flex-col items-center min-w-0">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#5B6676] mb-1 shrink-0" />
                        <span className="text-[10px] sm:text-[11px] font-semibold text-[#1A1F2B] truncate w-full" title={car.transmission}>
                          {car.transmission}
                        </span>
                      </div>
                      <div className="flex flex-col items-center min-w-0">
                        <Fuel className="w-3.5 h-3.5 text-[#5B6676] mb-1 shrink-0" />
                        <span className="text-[10px] sm:text-[11px] font-semibold text-[#1A1F2B] truncate w-full">
                          {car.fuel}
                        </span>
                      </div>
                      <div className="flex flex-col items-center min-w-0">
                        <Gauge className="w-3.5 h-3.5 text-[#5B6676] mb-1 shrink-0" />
                        <span className="text-[10px] sm:text-[11px] font-semibold text-[#1A1F2B] truncate w-full">
                          {car.mileage}
                        </span>
                      </div>
                    </div>

                    {/* Features Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {car.features.slice(0, 3).map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="text-[10px] font-medium text-[#5B6676] bg-slate-100/90 px-2 py-0.5 rounded-md"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & CTA Section */}
                  <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between gap-2 sm:gap-3">
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg sm:text-2xl font-black text-[#0B1F3A] tracking-tight">
                          ₹{car.dailyRate.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-[#5B6676] font-medium">
                          /day
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#5B6676]">
                        <span className="line-through text-slate-400">
                          ₹{car.originalDailyRate.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[#22A06B] font-semibold">
                          ₹{car.hourlyRate}/hr
                        </span>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <button
                        onClick={() => setSelectedCarDetails(car)}
                        className="p-2 sm:p-2.5 rounded-xl bg-white/90 border border-slate-200/90 text-[#0B1F3A] hover:text-[#1E6FD9] hover:bg-white transition-all shadow-2xs cursor-pointer"
                        title="View Car Specifications"
                        aria-label="View Car Specifications"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onSelectCarForBooking(car)}
                        className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E09415] text-[#0B1F3A] font-bold text-xs shadow-md shadow-[#F5A623]/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Car Info Modal */}
        {selectedCarDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
            <div className="glass-panel max-w-lg w-full rounded-3xl p-5 sm:p-7 border border-white/90 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 mb-4">
                <div>
                  <span className="text-xs font-bold text-[#1E6FD9]">
                    {selectedCarDetails.brand}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0B1F3A]">
                    {selectedCarDetails.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCarDetails(null)}
                  className="w-9 h-9 sm:w-8 sm:h-8 min-h-[36px] min-w-[36px] rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#5B6676] hover:text-[#0B1F3A] transition-colors cursor-pointer"
                  aria-label="Close details"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src={selectedCarDetails.image}
                    alt={selectedCarDetails.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 512px"
                    className="object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/70 border border-slate-200/60">
                    <span className="text-[#5B6676] block mb-0.5">Transmission:</span>
                    <strong className="text-[#0B1F3A]">
                      {selectedCarDetails.transmission}
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/70 border border-slate-200/60">
                    <span className="text-[#5B6676] block mb-0.5">Fuel Type:</span>
                    <strong className="text-[#0B1F3A]">
                      {selectedCarDetails.fuel} ({selectedCarDetails.mileage})
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/70 border border-slate-200/60">
                    <span className="text-[#5B6676] block mb-0.5">Seating & Boot:</span>
                    <strong className="text-[#0B1F3A]">
                      {selectedCarDetails.seats} Passengers • {selectedCarDetails.luggage} Bags
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/70 border border-slate-200/60">
                    <span className="text-[#5B6676] block mb-0.5">Security Deposit:</span>
                    <strong className="text-[#22A06B]">
                      ₹0 (Zero Deposit Plan)
                    </strong>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-[#0B1F3A] mb-2 uppercase tracking-wider">
                    Included Vehicle Features
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#1A1F2B]">
                    {selectedCarDetails.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22A06B] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#5B6676] block">Daily Rate</span>
                    <span className="text-xl font-black text-[#0B1F3A]">
                      ₹{selectedCarDetails.dailyRate.toLocaleString("en-IN")}/day
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const car = selectedCarDetails;
                      setSelectedCarDetails(null);
                      onSelectCarForBooking(car);
                    }}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#F5A623] hover:bg-[#E09415] text-[#0B1F3A] font-bold text-sm shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <span>Proceed to Book</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
