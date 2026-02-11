"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-10 md:pb-20 md:pt-14 lg:px-8 lg:pb-24 lg:pt-16">
      {/* Subtle red glow background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 h-[min(80vw,600px)] w-[min(80vw,600px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-950/60 blur-[80px]" />
        <div className="absolute left-1/2 top-1/2 h-[min(60vw,400px)] w-[min(60vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/30 blur-[60px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center pt-12 text-center sm:pt-16 md:pt-20 lg:pt-24">
        {/* Headline – responsive scale for mobile / tablet / desktop */}
        <h1 className="mb-8 max-w-4xl text-center font-pp-neue-montreal text-[clamp(2.25rem,6vw,4rem)] leading-[1.1] text-white sm:mb-10 sm:text-[clamp(2.5rem,7vw,5rem)] md:mb-12 md:text-[clamp(3rem,8vw,5.5rem)] lg:text-[clamp(4rem,9vw,6.25rem)]">
          <span>Built-in with </span>
          <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            the Science of you
          </span>
        </h1>

        {/* CTA buttons */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3 sm:mb-12 sm:gap-4 md:mb-16 md:gap-6">
          <a
            href="#consultation"
            className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-white/10 to-transparent p-[1px] transition-transform active:scale-95"
          >
            <div className="relative flex items-center justify-center rounded-[11px] bg-black px-5 py-3 transition-colors group-hover:bg-white/5 sm:px-6 sm:py-3.5 md:px-8 md:py-4">
              <span className="text-sm font-medium text-white sm:text-base">
                Book a consultation slot
              </span>
            </div>
          </a>
          <a
            href="#visit"
            className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-white/10 to-transparent p-[1px] transition-transform active:scale-95"
          >
            <div className="relative flex items-center justify-center rounded-[11px] bg-black px-5 py-3 transition-colors group-hover:bg-white/5 sm:px-6 sm:py-3.5 md:px-8 md:py-4">
              <span className="text-sm font-medium text-white sm:text-base">
                Get a visit
              </span>
            </div>
          </a>
        </div>

        {/* Hero Graphic Container */}
        <div className="relative mt-4 flex w-full max-w-[1000px] items-center justify-center sm:mt-6 md:mt-8">
          {/* Background Concentric Circles & Glow */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[min(100vw,1000px)] w-[min(100vw,1000px)] -translate-x-1/2 -translate-y-[40%] md:h-[800px] md:w-[800px] lg:h-[1000px] lg:w-[1000px]">
            {/* Red Glow Center */}
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/40 blur-[100px]" />

            {/* Concentric Rings - SVG */}
            <svg
              className="absolute inset-0 h-full w-full opacity-60"
              viewBox="0 0 1000 1000"
            >
              <circle
                cx="500"
                cy="500"
                r="250"
                fill="none"
                stroke="url(#red-gradient)"
                strokeWidth="1"
                className="opacity-40"
              />
              <circle
                cx="500"
                cy="500"
                r="350"
                fill="none"
                stroke="url(#red-gradient)"
                strokeWidth="1"
                className="opacity-30"
              />
              <circle
                cx="500"
                cy="500"
                r="450"
                fill="none"
                stroke="url(#red-gradient)"
                strokeWidth="1"
                className="opacity-20"
              />

              <defs>
                <linearGradient
                  id="red-gradient"
                  x1="500"
                  y1="0"
                  x2="500"
                  y2="1000"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#7F1D1D" stopOpacity="0" />
                  <stop offset="0.2" stopColor="#7F1D1D" stopOpacity="0.8" />
                  <stop offset="0.8" stopColor="#7F1D1D" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#7F1D1D" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Icons & Main Image Container */}
          <div className="relative z-10 w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
            {/* Left Icon (DNA) – show from md, position safe on tablet */}
            <div className="absolute -left-[5%] top-[18%] z-20 hidden md:block lg:-left-[10%] lg:top-[35%]">
              <div className="flex h-32 w-32 items-center justify-center rounded-xl border border-white/10 bg-black/60 backdrop-blur-md lg:h-36 lg:w-36 lg:rounded-2xl">
                <Image
                  src="/assets/left-icon.png"
                  alt="DNA"
                  width={113}
                  height={113}
                  className="h-12 w-12 object-contain lg:h-16 lg:w-16"
                />
              </div>
            </div>

            {/* Right Icon (Heart/Dumbbell) */}
            <div className="absolute -right-[5%] top-[18%] z-20 hidden md:block lg:-right-[10%] lg:top-[20%]">
              <div className="flex h-32 w-32 items-center justify-center rounded-xl border border-white/10 bg-black/60 backdrop-blur-md lg:h-36 lg:w-36 lg:rounded-2xl">
                <Image
                  src="/assets/right-icon.png"
                  alt="Health"
                  width={113}
                  height={113}
                  className="h-12 w-12 object-contain lg:h-16 lg:w-16"
                />
              </div>
            </div>

            {/* Main Character Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full">
              <Image
                src="/assets/hero1.png"
                alt="Hero"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-black to-transparent"></div>
            </div>

            {/* Bottom Text Card - full width of container, max-width for readability */}
            <div className="absolute bottom-4 left-1/2 z-30 w-[92%] max-w-7xl -translate-x-1/2 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:bottom-6 sm:w-[95%] sm:rounded-2xl sm:p-5 md:bottom-8 md:p-6 lg:bottom-10 lg:p-8">
              <p className="text-center font-manrope text-sm leading-relaxed text-white/90 sm:text-base md:text-lg lg:text-xl">
                The world&apos;s most comprehensive
                <br />
                and convenient healthcare system— an all-in-one platform to
                achieve your personal health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
