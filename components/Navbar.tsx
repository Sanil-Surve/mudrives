"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Car, PhoneCall, Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Fleet", href: "#fleet" },
    { label: "Fare Calculator", href: "#calculator" },
    { label: "Why MU Drives", href: "#why-us" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQs", href: "#faqs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_24px_rgba(11,31,58,0.06)] py-3"
          : "bg-white/70 backdrop-blur-md border-b border-white/40 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-white shadow-md shadow-[#0B1F3A]/20 group-hover:scale-105 transition-transform">
              <Car className="w-5 h-5 text-[#F5A623]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-xl tracking-tight text-[#0B1F3A]">
                  MU
                </span>
                <span className="font-extrabold text-xl tracking-tight text-[#1E6FD9]">
                  DRIVES
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#5B6676]">
                Self Drive Car Rentals
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#1A1F2B] hover:text-[#1E6FD9] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1E6FD9] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Phone Call (Tablet & Desktop) */}
            <a
              href="tel:+919820068374"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-xs font-semibold text-[#0B1F3A] hover:bg-white/90 transition-all border border-slate-200/60"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#1E6FD9]" />
              <span>+91 98200 68374</span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#22A06B] animate-pulse" />
            </a>

            {/* Book Now Button */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E09415] text-[#0B1F3A] font-bold text-xs sm:text-sm shadow-[0_4px_14px_rgba(245,166,35,0.35)] hover:shadow-[0_6px_20px_rgba(245,166,35,0.45)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[44px]"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Mobile / Tablet Menu Button (Visible on screens below lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden p-2.5 rounded-xl bg-white/80 hover:bg-white text-[#0B1F3A] transition-colors border border-slate-200 shadow-2xs cursor-pointer items-center justify-center min-h-[44px] min-w-[44px]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Menu with Glassmorphism */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 sm:p-5 rounded-2xl glass-panel border border-white/80 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-sm font-semibold text-[#1A1F2B] hover:bg-white/90 hover:text-[#1E6FD9] active:bg-[#1E6FD9]/10 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-slate-300">›</span>
                </a>
              ))}
            </nav>
            <div className="pt-3 border-t border-slate-200/60 flex flex-col gap-2.5">
              <a
                href="tel:+919820068374"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/90 text-xs font-semibold text-[#0B1F3A] border border-slate-200/80 shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#1E6FD9]" />
                <span>24/7 Helpline: +91 98200 68374</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-[#F5A623] hover:bg-[#E09415] text-[#0B1F3A] font-extrabold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Car Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
