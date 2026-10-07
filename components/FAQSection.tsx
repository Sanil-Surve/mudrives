"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";
import { FAQS } from "@/lib/fleet-data";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-14 sm:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-semibold text-[#1E6FD9] border border-blue-200/50 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#1E6FD9]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-base text-[#5B6676] mt-2">
            Everything you need to know about deposits, KYC, fuel policies, and roadside support.
          </p>
        </div>

        {/* Accordion List in Glassmorphism Container */}
        <div className="space-y-3 sm:space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-2xl border border-white/80 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:bg-white/40 transition-colors"
                >
                  <span className="text-xs sm:text-base font-bold text-[#0B1F3A] pr-1">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#1E6FD9] text-white" : "text-[#5B6676]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-[#5B6676] leading-relaxed border-t border-slate-200/60 mt-1 animate-in fade-in duration-200">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Box */}
        <div className="mt-8 sm:mt-10 glass-panel-subtle rounded-2xl p-4 sm:p-5 border border-white/80 text-center flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-[#0B1F3A]">
              Have a specific trip requirement?
            </h4>
            <p className="text-xs text-[#5B6676]">
              Our 24/7 concierge team is always available to assist with custom quotes.
            </p>
          </div>
          <a
            href="tel:+919820068374"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-xl bg-[#0B1F3A] hover:bg-[#132D52] text-white text-xs font-bold transition-all shadow-sm shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>Call +91 98200 68374</span>
          </a>
        </div>
      </div>
    </section>
  );
}
