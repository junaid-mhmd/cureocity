"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pt-16">
      {/* Subtle red glow background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 h-[min(80vw,600px)] w-[min(80vw,600px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-950/60 blur-[80px]" />
        <div className="absolute left-1/2 top-1/2 h-[min(60vw,400px)] w-[min(60vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/30 blur-[60px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center pt-20 text-center">
        {/* Headline */}
        <h1 className="mb-12 max-w-4xl text-center font-pp-neue-montreal text-[60px] leading-[1.1] text-white md:text-[80px] lg:text-[100px]">
          <span>Built-in with </span>
          <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            the Science of you
          </span>
        </h1>

        {/* CTA buttons */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-6">
          <a
            href="#consultation"
            className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-white/10 to-transparent p-[1px] transition-transform active:scale-95"
          >
            <div className="relative flex items-center justify-center rounded-[11px] bg-black px-8 py-4 transition-colors group-hover:bg-white/5">
              <span className="text-base font-medium text-white">Book a consultation slot</span>
            </div>
          </a>
          <a
            href="#visit"
            className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-white/10 to-transparent p-[1px] transition-transform active:scale-95"
          >
            <div className="relative flex items-center justify-center rounded-[11px] bg-black px-8 py-4 transition-colors group-hover:bg-white/5">
              <span className="text-base font-medium text-white">Get a visit</span>
            </div>
          </a>
        </div>

        {/* Hero Graphic Container */}
        <div className="relative mt-8 flex w-full max-w-[1000px] items-center justify-center">
          
          {/* Background Concentric Circles & Glow */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-[40%]">
             {/* Red Glow Center */}
             <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/40 blur-[100px]" />
             
             {/* Concentric Rings - SVG */}
             <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 1000 1000">
                <circle cx="500" cy="500" r="250" fill="none" stroke="url(#red-gradient)" strokeWidth="1" className="opacity-40" />
                <circle cx="500" cy="500" r="350" fill="none" stroke="url(#red-gradient)" strokeWidth="1" className="opacity-30" />
                <circle cx="500" cy="500" r="450" fill="none" stroke="url(#red-gradient)" strokeWidth="1" className="opacity-20" />
                
                <defs>
                  <linearGradient id="red-gradient" x1="500" y1="0" x2="500" y2="1000" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#7F1D1D" stopOpacity="0" />
                    <stop offset="0.2" stopColor="#7F1D1D" stopOpacity="0.8" />
                    <stop offset="0.8" stopColor="#7F1D1D" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#7F1D1D" stopOpacity="0" />
                  </linearGradient>
                </defs>
             </svg>
          </div>

          {/* Icons & Main Image Container */}
          <div className="relative z-10 w-full max-w-[600px]">
            {/* Left Icon (DNA) */}
            <div className="absolute -left-[10%] top-[20%] z-20 hidden md:block">
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md">
                <Image src="/assets/left-icon.png" alt="DNA" width={50} height={50} className="object-contain" />
              </div>
            </div>

            {/* Right Icon (Heart/Dumbbell) */}
            <div className="absolute -right-[10%] top-[20%] z-20 hidden md:block">
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md">
                 <Image src="/assets/right-icon.png" alt="Health" width={50} height={50} className="object-contain" />
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

            {/* Bottom Text Card */}
            <div className="absolute bottom-10 left-1/2 z-30 w-[90%] -translate-x-1/2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:w-[80%] md:p-8">
              <p className="text-center font-manrope text-lg leading-relaxed text-white/90 md:text-xl">
                The world&apos;s most comprehensive and convenient healthcare system , all-in-one platform for achieve our personal health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
