export default function StayingHealthySection() {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-xl bg-black sm:rounded-2xl md:rounded-2xl lg:rounded-3xl">
          {/* Background video – responsive aspect and min-height */}
          <div className="relative aspect-[4/3] w-full min-h-[200px] sm:aspect-[16/10] sm:min-h-[260px] md:aspect-[2/1] md:min-h-[300px] lg:min-h-[360px]">
            <video
              src="/assets/video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {/* Dark overlay for text readability */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
              aria-hidden
            />

            {/* Text overlay - responsive padding and typography */}
            <div className="absolute inset-x-0 bottom-0 left-0 right-0 p-4 text-white sm:p-6 sm:pb-7 md:p-8 md:pb-9 lg:p-12">
              <h2 className="mb-1.5 font-pp-neue-montreal text-[22px] font-normal leading-[1.05] tracking-normal sm:mb-2 sm:text-[36px] md:mb-3 md:text-[44px] lg:text-[60px] [leading-trim:none]">
                Staying healthy
                <br />
                feel still impossible?
              </h2>
              <p className="max-w-md font-manrope text-sm font-medium leading-[1.3] tracking-normal text-[#C4C4C4] sm:max-w-lg sm:text-base md:max-w-xl md:text-lg lg:text-[27px] [leading-trim:none]">
                Wearables, apps and advice bombard us daily, yet lifestyle
                disease is rising.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
