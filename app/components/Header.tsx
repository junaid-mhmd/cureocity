"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Healthscape", href: "#" },
  { label: "Cureocity App", href: "#" },
  { label: "360 Assessment", href: "#" },
  { label: "Flourish", href: "#" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="relative z-50 mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5 md:gap-3 md:py-5 lg:gap-4 lg:px-8 lg:py-[32px]">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-90"
        >
          <Image
            src="/assets/logo-text.png"
            alt="Cureocity"
            width={120}
            height={28}
            className="h-6 w-auto object-contain sm:h-7"
            unoptimized
          />
        </Link>

        {/* Desktop navigation – pill container (tablet + desktop) */}
        <nav
          className="hidden items-center gap-1 rounded-[33px] border border-[#FFFFFF1A] px-2 py-1.5 font-inter sm:gap-2 sm:px-3 sm:py-2 md:flex md:gap-2 md:px-3 lg:gap-3 lg:px-4 lg:py-2"
          aria-label="Main navigation"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="rounded-full px-2 py-1.5 text-xs font-medium text-[#C2C2C2] transition-colors hover:text-white sm:px-3 sm:py-2 sm:text-sm md:px-3 lg:px-4 lg:py-2"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA – compact on tablet, full size on lg */}
        <div className="hidden md:block">
          <a
            href="#assessment"
            className="inline-flex items-center rounded-[12px] border-[0.78px] border-[rgba(255,255,255,0.13)] bg-[linear-gradient(284.52deg,rgba(0,0,0,0.15)_-96.98%,rgba(102,102,102,0.15)_150.89%)] px-3 py-2 text-xs font-medium text-[#C2C2C2] transition-colors hover:text-white md:h-11 md:pl-5 md:pr-4 lg:h-[62px] lg:pl-[40px] lg:pr-[32px] lg:text-sm"
          >
            Get a Assessment
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white md:hidden"
        >
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex h-screen w-screen flex-col items-center justify-center gap-6 bg-black/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {navLinks.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-medium text-zinc-200 transition-colors hover:text-white"
          >
            {label}
          </Link>
        ))}
        <a
          href="#assessment"
          onClick={() => setMobileMenuOpen(false)}
          className="mt-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-white/20"
        >
          Get a Assessment
        </a>
      </div>
    </header>
  );
}
