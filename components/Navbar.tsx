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

          {/* Quick Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:+919820068374"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-xs font-semibold text-[#0B1F3A] hover:bg-white/90 transition-all border border-slate-200/60"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#1E6FD9]" />
              <span>+91 98200 68374</span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#22A06B] animate-pulse" />
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E09415] text-[#0B1F3A] font-semibold text-sm shadow-[0_4px_14px_rgba(245,166,35,0.35)] hover:shadow-[0_6px_20px_rgba(245,166,35,0.45)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-lg bg-[#F5A623] text-[#0B1F3A] font-semibold text-xs shadow-sm cursor-pointer"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/80 text-[#0B1F3A] hover:bg-white transition-colors border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Glassmorphism */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl glass-panel border border-white/80 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-[#1A1F2B] hover:bg-white/80 hover:text-[#1E6FD9] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-2 border-t border-slate-200/60 flex flex-col gap-2.5">
              <a
                href="tel:+919820068374"
                className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white/80 text-xs font-semibold text-[#0B1F3A]"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#1E6FD9]" />
                <span>24/7 Helpline: +91 98200 68374</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 rounded-xl bg-[#F5A623] text-[#0B1F3A] font-semibold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
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
