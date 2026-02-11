export default function StayingHealthySection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl ">
        <div className="relative overflow-hidden rounded-2xl bg-black sm:rounded-3xl">
          {/* Background video */}
          <div className="relative aspect-[16/10] w-full min-h-[280px] sm:aspect-[2/1] sm:min-h-[320px]">
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

            {/* Text overlay - bottom left */}
            <div className="absolute inset-x-0 bottom-0 left-0 right-0 p-6 text-white sm:p-8 md:p-10 lg:p-12">
              <h2 className="mb-3 font-pp-neue-montreal text-[60px] font-normal leading-[101%] tracking-normal [leading-trim:none]">
                Staying healthy
                <br />
                feel still impossible?
              </h2>
              <p className="max-w-xl font-manrope text-[27px] font-medium leading-[130%] tracking-normal text-[#C4C4C4] [leading-trim:none]">
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
