"use client";

import SectionBadge from "@/components/ui/SectionBadge";
import defaultStories from "@/data/testimonials.json";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface CollaborationStory {
  id: string;
  company: string;
  logo: string;
  author: string;
  role: string;
  quote: string;
  image?: string;
  avatar: string;
}

function VerticalContactTab() {
  return (
    <div className="hidden lg:flex flex-shrink-0 pt-2 lg:absolute lg:left-[calc(100%-1.5px)] lg:top-2">
      <Link
        href="/contact"
        className="group flex items-center gap-3.5 select-none hover:opacity-85 transition-opacity"
        title="Get In Touch"
      >
        <div
          className="w-[1.5px] h-[190px]"
          style={{
            background:
              "linear-gradient(97.51deg, #FEC163 -37.59%, #DE4313 94.05%)",
          }}
        />

        <div className="flex flex-col items-center justify-between h-[190px] py-1">
          <Image
            src="/btn-icon-dimond.png"
            alt=""
            width={18}
            height={17}
            className="w-[15px] h-[14px] object-contain flex-shrink-0"
          />

          <span
            className="text-xs font-dm font-bold tracking-[0.22em] text-transparent bg-clip-text [writing-mode:vertical-rl] whitespace-nowrap"
            style={{
              backgroundImage:
                "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
            }}
          >
            GET IN TOUCH
          </span>

          <Image
            src="/btn-icon-dimond.png"
            alt=""
            width={18}
            height={17}
            className="w-[15px] h-[14px] object-contain flex-shrink-0"
          />
        </div>
      </Link>
    </div>
  );
}

function OpenQuoteIcon() {
  return (
    <Image
      src="/quote-left.svg"
      alt=""
      width={33}
      height={25}
      className="inline-block mr-2.5 sm:mr-3 align-top -translate-y-1 w-[33px] h-[25px] flex-shrink-0 object-contain"
    />
  );
}

function CloseQuoteIcon() {
  return (
    <Image
      src="/quote-right.svg"
      alt=""
      width={33}
      height={25}
      className="inline-block ml-2.5 sm:ml-3 align-baseline translate-y-1 w-[33px] h-[25px] flex-shrink-0 object-contain"
    />
  );
}

function TestimonialCard({
  story,
  stories,
  currentIndex,
  onSelectStory,
  onPause,
  onResume,
}: {
  story: CollaborationStory;
  stories: CollaborationStory[];
  currentIndex: number;
  onSelectStory: (index: number) => void;
  onPause: () => void;
  onResume: () => void;
}) {
  const cardBorderStyle = {
    border: "1.5px solid",
    borderImageSource:
      "linear-gradient(97.51deg, #FEC163 -37.59%, #DE4313 94.05%)",
    borderImageSlice: 1,
  };

  return (
    <div
      style={cardBorderStyle}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      className="relative min-h-[500px] sm:min-h-[520px] flex flex-col justify-between pt-12 sm:pt-14 px-6 sm:px-10 pb-0 select-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[94%] max-w-[880px] h-8 sm:h-10 card-badge-bg z-[1]"
      />

      {/* Top Client Logos Strip */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-4 w-[94%] max-w-[880px] flex items-center justify-between sm:justify-around gap-6 sm:gap-10 md:gap-14 lg:gap-16 select-none">
        {stories.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={item.id || item.company}
              type="button"
              onClick={() => onSelectStory(idx)}
              title={item.company}
              aria-label={`Select ${item.company} story`}
              className={`flex items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none ${
                isActive
                  ? "grayscale-0 opacity-100 scale-105"
                  : "grayscale opacity-40 hover:opacity-85 hover:grayscale-0"
              }`}
              style={{
                filter: isActive ? "none" : "grayscale(100%)",
              }}
            >
              <Image
                src={item.logo}
                alt={item.company}
                width={160}
                height={56}
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain transition-all duration-300"
                priority
              />
            </button>
          );
        })}
      </div>

      <div
        className="w-[94%] max-w-[880px] mx-auto h-[1.5px] mt-5 sm:mt-5 mb-4 sm:mb-6 relative z-10"
        style={{
          background:
            "linear-gradient(97.51deg, #FEC163 -37.59%, #DE4313 94.05%)",
        }}
      />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-end justify-between gap-6 md:gap-8 flex-1 min-h-[380px] sm:min-h-[420px] overflow-hidden">
        <div className="w-full md:w-[42%] lg:w-[45%] flex justify-center items-end relative self-center md:self-end">
          {/* Ambient Glow Backdrop Shadow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 bottom-4 -translate-x-1/2 rounded-full z-0"
            style={{
              width: "360px",
              height: "320px",
              maxWidth: "100%",
              backgroundColor: "rgba(222, 67, 19, 0.45)",
              filter: "blur(75px)",
              transform: "translateZ(0)",
            }}
          />

          {/* Bottom Floor Contact Shadow (Separate underneath the image) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 rounded-[100%] z-[1]"
            style={{
              width: "280px",
              maxWidth: "85%",
              height: "22px",
              background:
                "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.25) 50%, transparent 75%)",
              filter: "blur(7px)",
              transform: "translateZ(0)",
            }}
          />

          {/* Dynamic Testimonial Image (Changes with story item) */}
          <div className="relative z-10 w-[280px] sm:w-[340px] lg:w-[380px] h-[280px] sm:h-[340px] lg:h-[360px] flex items-end justify-center">
            <Image
              key={story.id || story.author}
              src={story.image || story.avatar}
              alt={story.author}
              width={400}
              height={400}
              className="w-full h-full object-contain object-bottom transition-all duration-500 ease-in-out"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-[58%] lg:w-[55%] flex flex-col justify-center gap-6 pb-8 sm:pb-12 lg:pb-14 pt-4 self-center text-left items-start">
          <p className="font-almarai italic text-base sm:text-lg lg:text-[22px] text-[#2BB3A3] leading-relaxed text-left transition-all duration-300">
            <OpenQuoteIcon />
            {story.quote}
            <CloseQuoteIcon />
          </p>

          <div className="text-left transition-all duration-300">
            <h4 className="font-dm font-bold text-base sm:text-lg uppercase tracking-wider text-[var(--ink)] leading-snug">
              {story.author}
            </h4>

            <p className="font-almarai text-sm sm:text-base text-[var(--body-muted)] mt-1">
              {story.role}, {story.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialSliderBar({
  currentIndex,
  totalCount,
  onSelect,
  onPrev,
  onNext,
}: {
  currentIndex: number;
  totalCount: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="w-full flex items-center select-none pt-2">
      <button
        onClick={onPrev}
        className="flex-1 flex items-center text-[#DE4313] hover:opacity-80 transition-opacity cursor-pointer group"
        aria-label="Previous testimonial"
      >
        <svg
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
          className="flex-shrink-0"
        >
          <path
            d="M8 1L2 6L8 11M2 6H10"
            stroke="#DE4313"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div
          className="flex-1 h-[1.5px]"
          style={{
            background: "linear-gradient(to right, #DE4313, #FEC163)",
          }}
        />
      </button>

      <div className="flex items-center gap-6 sm:gap-8 px-5 sm:px-7 flex-shrink-0">
        {Array.from({ length: totalCount }).map((_, i) => {
          const isActive = i === currentIndex;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`font-dm text-sm sm:text-base cursor-pointer transition-all ${
                isActive
                  ? "font-bold text-transparent bg-clip-text"
                  : "font-normal text-[var(--ink)] opacity-50 hover:opacity-100"
              }`}
              style={
                isActive
                  ? {
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                    }
                  : undefined
              }
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        className="flex-1 flex items-center text-[#DE4313] hover:opacity-80 transition-opacity cursor-pointer group"
        aria-label="Next testimonial"
      >
        <div
          className="flex-1 h-[1.5px]"
          style={{
            background: "linear-gradient(to right, #FEC163, #DE4313)",
          }}
        />

        <svg
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
          className="flex-shrink-0"
        >
          <path
            d="M2 1L8 6L2 11M0 6H8"
            stroke="#DE4313"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default function ContactSection() {
  const [stories, setStories] = useState<CollaborationStory[]>(
    defaultStories as CollaborationStory[],
  );
  const [tidx, setTidx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Client-side fetch from /data/testimonials.json (supports external JSON updates)
  useEffect(() => {
    fetch("/data/testimonials.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch testimonials JSON");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setStories(data);
        }
      })
      .catch((err) => {
        // Fallback already loaded from defaultStories
        console.warn("Using bundled testimonials JSON:", err);
      });
  }, []);

  // 3-second auto-slide interval (pauses on hover for user reading experience)
  useEffect(() => {
    if (isPaused || stories.length === 0) return;
    const timer = setInterval(() => {
      setTidx((prev) => (prev + 1) % stories.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, stories.length]);

  const currentStory = stories[tidx] ?? stories[0];

  const prev = () =>
    setTidx((i) => (i - 1 + stories.length) % stories.length);
  const next = () =>
    setTidx((i) => (i + 1) % stories.length);

  return (
    <section id="contact" className="relative w-full py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(222, 67, 19, 0.4) 0%, rgba(222, 67, 19, 0) 70%)",
          width: "480px",
          height: "480px",
          top: "-60px",
          right: "-180px",
          filter: "blur(50px)",
          transform: "translateZ(0)",
        }}
      />

      <div className="w-full home-section-container relative z-10 flex flex-col gap-12 sm:gap-14">
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 relative">
          <SectionBadge num="04" label="CONTACT" />

          <div className="flex-1 max-w-2xl flex flex-col justify-center gap-5 lg:pt-2">
            <h2 className="font-almarai text-2xl sm:text-3xl lg:text-[32px] font-normal text-[var(--ink)] leading-snug">
              Vision Meets Design
            </h2>

            <p className="font-almarai text-sm sm:text-base text-[var(--body-muted)] leading-relaxed">
              It all begins with a vision — whether it&apos;s turning a fresh
              idea into a complete product, revamping an existing solution to
              align with evolving needs, or building a digital presence to grow
              brand visibility — each design is shaped by simplicity, built on
              quality, and delivered with care.
            </p>

            <h3 className="font-dm font-bold text-3xl sm:text-4xl text-gradient block leading-none pt-2">
              Collaboration Stories
            </h3>
          </div>

          <VerticalContactTab />
        </div>

        {currentStory && (
          <TestimonialCard
            story={currentStory}
            stories={stories}
            currentIndex={tidx}
            onSelectStory={(index) => setTidx(index)}
            onPause={() => setIsPaused(true)}
            onResume={() => setIsPaused(false)}
          />
        )}

        <TestimonialSliderBar
          currentIndex={tidx}
          totalCount={stories.length}
          onSelect={setTidx}
          onPrev={prev}
          onNext={next}
        />
      </div>

      <svg
        width="0"
        height="0"
        className="absolute pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="contactDiamondGrad"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
            gradientTransform="rotate(129.89 0.5 0.5)"
          >
            <stop offset="-29.32%" stopColor="#FEC163" />
            <stop offset="100%" stopColor="#DE4313" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
