import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MU Drives | Premium Self-Drive Car Rentals",
  description:
    "Experience seamless self-drive car rentals with MU Drives. Zero security deposit, unlimited kilometers, 100% sanitized fleet, and doorstep delivery across Mumbai, Pune & beyond.",
  keywords: [
    "self drive car rental",
    "MU Drives",
    "car rental Mumbai",
    "unlimited km car hire",
    "zero deposit car rental",
    "doorstep car delivery",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", inter.variable)}>
      <body className="min-h-full flex flex-col font-sans bg-[#F7F9FC] text-[#1A1F2B] selection:bg-[#F5A623]/30 selection:text-[#0B1F3A]">
        {children}
      </body>
    </html>
  );
}
