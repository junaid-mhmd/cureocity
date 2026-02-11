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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-[32px]">
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
            className="h-7 w-auto object-contain"
            unoptimized
          />
        </Link>

        {/* Desktop navigation – pill container */}
        <nav
          className="hidden items-center gap-3 rounded-[33px] border border-[#FFFFFF1A] px-4 py-2 font-inter md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#C2C2C2] transition-colors hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#assessment"
            className="inline-flex items-center rounded-[12px] h-[62px] pl-[40px] pr-[32px] border-[0.78px] border-[rgba(255,255,255,0.13)] bg-[linear-gradient(284.52deg,rgba(0,0,0,0.15)_-96.98%,rgba(102,102,102,0.15)_150.89%)] px-4 py-2 text-sm font-medium text-[#C2C2C2] transition-colors hover:text-white"
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
        className={`overflow-hidden border-t border-zinc-800 bg-black/98 md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-base font-medium text-zinc-200 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              {label}
            </a>
          ))}
          <a
            href="#assessment"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 inline-flex justify-center rounded-full border border-zinc-600/60 bg-zinc-800/90 px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700 hover:text-white"
          >
            Get a Assessment
          </a>
        </div>
      </div>
    </header>
  );
}
