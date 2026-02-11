"use client";

import React from "react";
import { motion } from "framer-motion";

const categories = [
  { label: ["MENTAL", "HEALTH"], dimmed: true },
  { label: ["DIET &", "NUTRITION"], dimmed: false },
  { label: ["PHYSICAL", "FITNESS"], dimmed: false },
  { label: ["MEDICAL", "CARE"], dimmed: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
} as const;

export default function CategoriesSection() {
  return (
    <section className="bg-black py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8">
        {/* Left Shadow Gradient */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-black to-transparent sm:w-24 md:w-32 lg:w-40" />
        {/* Right Shadow Gradient */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-black to-transparent sm:w-24 md:w-32 lg:w-40" />

        <motion.div
          className="flex flex-nowrap items-center justify-start lg:justify-center gap-5 sm:gap-8 md:justify-between md:gap-6 lg:gap-8 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 1)" }}
              className={`group flex h-32 w-32 shrink-0 cursor-pointer flex-col items-center justify-center rounded-full border transition-colors duration-300 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 xl:h-64 xl:w-64 ${
                category.dimmed ? "border-white/10" : "border-white/30"
              }`}
            >
              <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                {category.label.map((line, i) => (
                  <span
                    key={i}
                    className={`font-neo-sans-pro px-1 text-center text-xs font-medium uppercase leading-tight tracking-[0.15em] transition-colors duration-300 sm:text-sm md:text-base lg:text-lg xl:text-xl ${
                      category.dimmed
                        ? "text-[#A0A0A0] group-hover:text-white"
                        : "text-white"
                    }`}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
