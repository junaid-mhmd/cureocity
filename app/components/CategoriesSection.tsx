const categories = [
  { label: "MENTAL HEALTH", dimmed: false },
  { label: "DIET & NUTRITION", dimmed: false },
  { label: "PHYSICAL FITNESS", dimmed: false },
  { label: "MEDICAL CARE", dimmed: true },
];

export default function CategoriesSection() {
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-between sm:gap-4 md:gap-6 lg:gap-8">
          {categories.map(({ label, dimmed }) => (
            <div
              key={label}
              className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] sm:h-36 sm:w-36 md:h-40 md:w-40 lg:h-44 lg:w-44"
            >
              <span
                className={`font-neo-sans-pro px-3 text-center text-[18px] font-medium uppercase leading-[130%] tracking-[13%] sm:px-4 ${
                  dimmed ? "text-[#A0A0A0]" : "text-white"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
