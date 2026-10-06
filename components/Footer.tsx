"use client";

import React from "react";
import Link from "next/link";
import { Car, PhoneCall, Mail, MapPin, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B1F3A] text-white pt-16 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Ambient background glow inside footer */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1E6FD9]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Car className="w-5 h-5 text-[#F5A623]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-xl tracking-tight text-white">
                    MU
                  </span>
                  <span className="font-extrabold text-xl tracking-tight text-[#1E6FD9]">
                    DRIVES
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                  Premium Self Drive Car Rentals
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              MU Drives is Mumbai&apos;s trusted self-drive car rental service. Built on
              transparent pricing, zero security deposit, unlimited kilometer freedom, and
              prompt doorstep delivery.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#22A06B]" />
              <span>Certified Commercial Fleet & All-India Permits</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a href="#fleet" className="hover:text-[#F5A623] transition-colors">
                  Our Fleet
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#F5A623] transition-colors">
                  Fare Calculator
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#F5A623] transition-colors">
                  Why MU Drives
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#F5A623] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#F5A623] transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-[#F5A623] transition-colors">
                  FAQs & Help
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Hubs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Service Hubs
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Mumbai Airport (T2 International)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Mumbai Airport (T1 Domestic)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Bandra Kurla Complex (BKC)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Andheri West & Juhu
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Thane & Navi Mumbai
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Pune Hub & Express Highway
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              24/7 Road Support
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <a
                href="tel:+919820068374"
                className="flex items-start gap-2.5 hover:text-[#F5A623] transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-white">+91 98200 68374</span>
                  <span className="text-[11px] text-slate-400">Toll-free 24/7 Emergency</span>
                </div>
              </a>

              <a
                href="mailto:support@mudrives.com"
                className="flex items-start gap-2.5 hover:text-[#F5A623] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#1E6FD9] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">support@mudrives.com</span>
                  <span className="text-[11px] text-slate-400">Response in &lt; 15 mins</span>
                </div>
              </a>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-[11px] text-slate-400">
                  Level 4, Platina Tower, Bandra Kurla Complex (BKC), Mumbai 400051
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} MU Drives Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms & Conditions
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Zero Deposit Policy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Toll & Fastag Rules
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
