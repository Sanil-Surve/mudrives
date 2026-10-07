"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LiveStats } from "@/components/LiveStats";
import { FleetSection } from "@/components/FleetSection";
import { RentalCalculator } from "@/components/RentalCalculator";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { SafetyBanner } from "@/components/SafetyBanner";
import { Testimonials } from "@/components/Testimonials";
import { FAQSection } from "@/components/FAQSection";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { CarItem } from "@/lib/fleet-data";
import { PhoneCall, ArrowRight } from "lucide-react";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [bookingEstimate, setBookingEstimate] = useState<{
    carName: string;
    days: number;
    kmPackage: string;
    totalAmount: number;
    dailyRate: number;
  } | null>(null);

  const handleOpenBooking = (car?: CarItem) => {
    if (car) {
      setSelectedCar(car);
    } else {
      setSelectedCar(null);
    }
    setBookingEstimate(null);
    setIsBookingOpen(true);
  };

  const handleSearchFromHero = (criteria: {
    hubId: string;
    deliveryMode: "doorstep" | "hub";
    category: string;
    startDate: string;
    endDate: string;
  }) => {
    if (criteria.category) {
      setCategoryFilter(criteria.category);
    }
    // Smooth scroll down to the fleet section
    const fleetElement = document.getElementById("fleet");
    if (fleetElement) {
      fleetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReserveWithEstimate = (estimate: {
    carName: string;
    days: number;
    kmPackage: string;
    totalAmount: number;
    dailyRate: number;
  }) => {
    setBookingEstimate(estimate);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#1A1F2B] relative selection:bg-[#F5A623]/30 selection:text-[#0B1F3A]">
      {/* Sticky Glassmorphic Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main>
        {/* Hero Section with Glassmorphic Floating Search Widget */}
        <Hero onSearch={handleSearchFromHero} />

        {/* Live Metrics & Stats Strip */}
        <LiveStats />

        {/* Interactive Fleet Showcase */}
        <FleetSection
          onSelectCarForBooking={(car) => handleOpenBooking(car)}
          activeCategoryFilter={categoryFilter}
        />

        {/* Interactive Glassmorphic Rental Cost Calculator */}
        <RentalCalculator onReserveWithEstimate={handleReserveWithEstimate} />

        {/* Why Choose MU Drives Features */}
        <Features />

        {/* How It Works (Paperless 3-Step Process) */}
        <HowItWorks onStartBooking={() => handleOpenBooking()} />

        {/* Hygiene, 40-Point Inspection & Safety Standards */}
        <SafetyBanner />

        {/* Customer Testimonials & Verified Stories */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* High Conversion Glass Banner CTA */}
        <CallToAction onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Mobile Sticky Floating Quick Actions Bar (Visible only on mobile devices) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-white/92 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_24px_rgba(11,31,58,0.12)] flex items-center gap-2.5">
        <a
          href="tel:+919820068374"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-slate-100/90 active:bg-slate-200 text-[#0B1F3A] font-bold text-xs border border-slate-200 transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#1E6FD9]" />
          <span>Call Support</span>
        </a>
        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#F5A623] active:bg-[#E09415] text-[#0B1F3A] font-extrabold text-xs shadow-md shadow-[#F5A623]/25 transition-all cursor-pointer"
        >
          <span>Book a Car</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Booking & KYC Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedCar={selectedCar}
        initialEstimate={bookingEstimate}
      />
    </div>
  );
}
