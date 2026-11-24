import Image from "next/image";

export default function HeroHeader() {
  return (
    <section
      id="home"
      className="w-full home-section-container pt-[38px] sm:pt-[54px] lg:pt-[62px] overflow-hidden"
    >
      <div className="relative w-full figma-gradient-border p-5 pt-12 pb-20 sm:p-12 sm:pb-24 lg:p-14 text-center flex flex-col items-center justify-center min-h-[340px] sm:min-h-[460px] lg:min-h-[540px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[280px] h-3 card-badge-bg z-[1]"
        />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 sm:px-6 z-30 flex items-center justify-center select-none group">
          <Image
            src="/assets/header-sejuti.svg"
            alt="SEJUTI"
            width={234}
            height={42}
            className="h-6 sm:h-9 md:h-10 w-auto object-contain transition-all duration-700 hover:brightness-110 animate-sejuti-fill"
            priority
          />
          <span className="sr-only">SEJUTI</span>
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden z-[2]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 w-[260px] h-[260px] sm:w-[435px] sm:h-[416px] max-w-full rounded-full animate-hero-glow"
            style={{
              backgroundColor: "rgba(222, 67, 19, 0.45)",
              filter: "blur(70px)",
              transform: "translate(-50%, -50%) translateZ(0)",
            }}
          />
        </div>

        {/* Hero Lightbulb Artwork Centered Behind / Vertically Aligned with Title */}
        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] pointer-events-none animate-hero-bulb">
          <Image
            src="/assets/hero-lightbulb.png"
            alt="Hero Lightbulb Artwork"
            width={260}
            height={260}
            className="w-[170px] sm:w-[230px] lg:w-[280px] h-auto object-contain opacity-95"
            priority
          />
        </div>

        <div className="flex flex-col items-center gap-0 relative z-20">
          <h1 className="font-dm font-medium text-2xl sm:text-5xl lg:text-7xl uppercase leading-snug sm:leading-none text-[var(--ink)] break-words tracking-tight sm:tracking-normal drop-shadow-sm animate-stroke-fill">
            BRINGING IDEAS TO LIGHT
          </h1>

          <p className="font-almarai italic text-sm sm:text-xl lg:text-2xl text-gradient mt-2 sm:mt-4 leading-normal py-1 px-1 overflow-visible inline-block">
            by means of design
          </p>
        </div>
      </div>
    </section>
  );
}
