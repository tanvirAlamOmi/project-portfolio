"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { JOURNEY_YEAR_PATHS } from "./journeyPaths";

export interface JourneyMilestone {
  year: string;
  side: "left" | "right";
  top: number; // Desktop vertical top position (px)
  nodeCy: number; // SVG center y coordinate
  date: string;
  role: string;
  org: string;
  desc: string;
}

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    year: "2015",
    side: "right",
    top: 20,
    nodeCy: 72,
    date: "2011 - 2015",
    role: "BSc – IT GRADUATE",
    org: "Assumption University of Thailand",
    desc: "During my senior thesis, where our team of three built an online beauty store, I naturally gravitated toward handling the structure and visuals rather than coding. Although I had briefly encountered the concepts in an HCI elective, I didn’t yet realize UX/UI design was its own field— I only knew this was the part of development I loved most.",
  },
  {
    year: "2016",
    side: "left",
    top: 140,
    nodeCy: 196,
    date: "May 2016 - Mar 2017",
    role: "UX/UI DESIGN DISCOVERY",
    org: "My Network & Solutions Co., Ltd (MyNet)",
    desc: "My first full-time role in customer service and QA at this tech startup building a call and messaging app gave me a front-row view of how multiple teams collaborated to bring a product to life. Here, I discovered the UX/UI team — a turning point that sparked my decision to pivot to design.",
  },
  {
    year: "2017",
    side: "right",
    top: 260,
    nodeCy: 318,
    date: "Apr 2017 - Oct 2017",
    role: "UX/UI DESIGN INTERN",
    org: "Web Courses Bangkok",
    desc: "An internship where I worked alongside senior designers, gaining real-world experience in every stage of the UX process — from research to final design. Further expanded skills through courses in graphic design and web design.",
  },
  {
    year: "2018",
    side: "left",
    top: 380,
    nodeCy: 441,
    date: "Feb 2018 - Oct 2022",
    role: "UX/UI DESIGNER",
    org: "Arbree Limited",
    desc: "Serving as a one-person design team, I successfully led and delivered over 50 projects— from websites and apps to full-scale systems— while wearing many hats and single-handedly managing all company-wide design initiatives, from product to branding and marketing.",
  },
  {
    year: "2023",
    side: "right",
    top: 500,
    nodeCy: 564,
    date: "2023 - Present",
    role: "FREELANCE UX/UI DESIGNER",
    org: "Self-Employed",
    desc: "Working independently with clients across diverse creative projects, overseeing everything from design to administrative tasks.",
  },
];

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [revealed, setRevealed] = useState<boolean[]>([true, false, false, false, false]);

  // Handle scroll progress to update active milestone & reveal cards
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Trigger focal point at 45% of viewport
    const focalY = windowH * 0.45;
    const relativeY = focalY - rect.top;
    const totalH = rect.height || 640;

    // When section enters viewport (top is within 80% of window), reveal 2015
    if (rect.top <= windowH * 0.8) {
      setRevealed((prev) => {
        if (!prev[0]) {
          const next = [...prev];
          next[0] = true;
          return next;
        }
        return prev;
      });
    }

    // Determine active index based on relative progress through container
    // Milestones at cy: 72, 196, 318, 441, 564 (SVG height = 636)
    const progress = Math.max(0, Math.min(1, relativeY / totalH));

    let newActive = 0;
    if (progress >= 0.82) {
      newActive = 4; // 2023
    } else if (progress >= 0.62) {
      newActive = 3; // 2018
    } else if (progress >= 0.42) {
      newActive = 2; // 2017
    } else if (progress >= 0.22) {
      newActive = 1; // 2016
    } else {
      newActive = 0; // 2015
    }

    setActiveIndex(newActive);

    // Reveal all cards up to newActive
    setRevealed((prev) => {
      let changed = false;
      const next = [...prev];
      for (let i = 0; i <= newActive; i++) {
        if (!next[i]) {
          next[i] = true;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  // Click on a node to select it and smoothly scroll to its position
  const handleSelectMilestone = (index: number) => {
    setActiveIndex(index);
    setRevealed((prev) => {
      const next = [...prev];
      for (let i = 0; i <= index; i++) next[i] = true;
      return next;
    });

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const milestone = JOURNEY_MILESTONES[index];
      // Target center of node in container
      const targetY =
        scrollTop + rect.top + (milestone.nodeCy / 636) * rect.height - window.innerHeight * 0.45;
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-4 select-none">
      {/* ──────────────── DESKTOP TIMELINE (≥768px) ──────────────── */}
      <div className="hidden md:block relative w-full h-[640px]">
        {/* Centered S-Curve Timeline Background & Interactive SVG */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[144px] h-[636px] z-0">
          {/* S-Curve Ribbon Track Image */}
          <div className="absolute inset-0 pointer-events-none select-none">
            <Image
              src="/assets/about/journey-ribbon.png"
              alt="Career Journey Ribbon (2015 - 2023)"
              width={144}
              height={636}
              priority
              className="w-[144px] h-[636px] object-contain block"
            />
          </div>

          {/* Interactive SVG Overlay with Gradient Shift Motion */}
          <svg
            viewBox="0 0 144 636"
            className="absolute inset-0 w-[144px] h-[636px] overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Active Orange-Gold Glowing Gradient */}
              <linearGradient
                id="activeOrangeGrad"
                x1="20"
                y1="20"
                x2="124"
                y2="124"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#FEC163" />
                <stop offset="100%" stopColor="#DE4313" />
              </linearGradient>

              {/* Inactive Stroke Gradient */}
              <linearGradient id="inactiveStrokeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FEC163" stopOpacity="0.8" />
                <stop offset="95%" stopColor="#DE4313" stopOpacity="0.9" />
              </linearGradient>

              {/* Active Glow Halo Filter */}
              <filter
                id="activeGlowFilter"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
                filterUnits="userSpaceOnUse"
              >
                <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0.894 0 0 0 0 0.365 0 0 0 0 0.137 0 0 0 0.85 0"
                  result="coloredBlur"
                />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 5 Nodes with Sequential Active Gradient Shift */}
            {JOURNEY_MILESTONES.map((item, i) => {
              const isActive = activeIndex === i;
              const cy = item.nodeCy;

              return (
                <g key={item.year} className="transition-all duration-500 ease-out">
                  {/* 1. Base Inactive Circle: masks ribbon hole, carries metallic gradient stroke */}
                  <circle
                    cx="72"
                    cy={cy}
                    r={51.25}
                    fill="var(--bg, #0B0C10)"
                    stroke="url(#inactiveStrokeGrad)"
                    strokeWidth="1.5"
                    className="transition-colors duration-500"
                  />

                  {/* 2. Active Glowing Fill Circle: cross-fades smoothly on scroll */}
                  <circle
                    cx="72"
                    cy={cy}
                    r={52}
                    fill="url(#activeOrangeGrad)"
                    filter={isActive ? "url(#activeGlowFilter)" : undefined}
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "scale(1.025)" : "scale(0.97)",
                      transformOrigin: `72px ${cy}px`,
                      transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                    }}
                    className="pointer-events-none"
                  />

                  {/* 3. Outer Pulsing Glow Ring for active node */}
                  {isActive && (
                    <circle
                      cx="72"
                      cy={cy}
                      r={53.5}
                      fill="none"
                      stroke="#FEC163"
                      strokeWidth="1"
                      strokeOpacity="0.4"
                      className="animate-pulse pointer-events-none"
                    />
                  )}

                  {/* 4. Vector Year Number (2015, 2016, 2017, 2018, 2023) */}
                  <path
                    d={JOURNEY_YEAR_PATHS[i]}
                    fill="#FFF7E7"
                    style={{
                      filter: isActive ? "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" : undefined,
                      transition: "opacity 0.4s ease-out",
                    }}
                    className="pointer-events-none"
                  />

                  {/* 5. Clickable Area for Direct User Navigation */}
                  <circle
                    cx="72"
                    cy={cy}
                    r={52}
                    fill="transparent"
                    className="cursor-pointer focus:outline-none"
                    onClick={() => handleSelectMilestone(i)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Jump to year ${item.year}: ${item.role}`}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* 5 Milestone Content Cards with Alternating Left / Right Entrance Motion */}
        {JOURNEY_MILESTONES.map((item, i) => {
          const isLeft = item.side === "left";
          const isActive = activeIndex === i;
          const isRevealed = revealed[i];

          // Motion slide-in:
          // Left cards start at -48px X offset; right cards start at +48px X offset
          const initialTransform = isLeft ? "translateX(-48px)" : "translateX(48px)";
          const activeTransform = "translateX(0px)";

          return (
            <div
              key={item.year}
              onClick={() => handleSelectMilestone(i)}
              className={`absolute space-y-1.5 z-10 cursor-pointer group ${
                isLeft
                  ? "right-[calc(50%+85px)] left-0 text-right flex flex-col items-end"
                  : "left-[calc(50%+85px)] right-0 text-left"
              }`}
              style={{
                top: `${item.top}px`,
                transform: isRevealed ? activeTransform : initialTransform,
                opacity: isRevealed ? 1 : 0,
                pointerEvents: isRevealed ? "auto" : "none",
                transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s ease-out",
              }}
            >
              {/* Date Pill Badge with Active Orange Glow */}
              <span
                className={`inline-block px-3 py-0.5 rounded-full text-[13px] font-medium border transition-all duration-400 ${
                  isActive
                    ? "border-[#DE4313] text-[#DE4313] dark:text-[#FEC163] bg-[#DE4313]/10"
                    : "border-[#DE4313]/60 text-[var(--ink)] bg-[var(--bg)] card-badge-bg group-hover:border-[#DE4313]"
                }`}
                style={{
                  boxShadow: isActive
                    ? "0px 0px 12px 2px rgba(228, 93, 35, 0.5)"
                    : "0px 0px 4px 0px rgba(228, 93, 35, 0.3)",
                }}
              >
                {item.date}
              </span>

              {/* Role Title */}
              <h4
                className={`font-dm font-bold text-sm sm:text-[15px] uppercase tracking-wide transition-colors duration-300 ${
                  isActive ? "text-[var(--ink)]" : "text-[var(--ink-78)] group-hover:text-[var(--ink)]"
                }`}
              >
                {item.role}
              </h4>

              {/* Organization Subtitle with Warm Metallic Gradient */}
              <p
                className="font-dm font-semibold text-xs sm:text-[13px] text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                }}
              >
                {item.org}
              </p>

              {/* Description */}
              <p
                className={`font-dm font-normal text-xs sm:text-[13.5px] leading-[1.6] max-w-sm lg:max-w-[400px] transition-opacity duration-300 ${
                  isActive ? "text-[var(--ink)] opacity-100" : "text-[var(--ink-78)] opacity-85"
                }`}
              >
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* ──────────────── MOBILE RESPONSIVE LAYOUT (<768px) ──────────────── */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Interactive Year Pill Selector */}
        <div className="flex items-center justify-between gap-1.5 p-1.5 rounded-xl border border-[#DE4313]/30 bg-[var(--bg)] card-badge-bg overflow-x-auto no-scrollbar">
          {JOURNEY_MILESTONES.map((item, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={item.year}
                type="button"
                onClick={() => handleSelectMilestone(i)}
                className={`flex-1 min-w-[58px] py-1.5 px-2 rounded-lg text-xs font-bold transition-all duration-300 text-center ${
                  isActive
                    ? "text-white bg-gradient-to-r from-[#FEC163] to-[#DE4313] shadow-sm shadow-[#DE4313]/50 scale-[1.03]"
                    : "text-[var(--ink-78)] hover:text-[var(--ink)] bg-transparent"
                }`}
              >
                {item.year}
              </button>
            );
          })}
        </div>

        {/* Stacked Mobile Milestone Cards with Slide-in Entrance */}
        <div className="flex flex-col gap-3.5">
          {JOURNEY_MILESTONES.map((item, i) => {
            const isActive = activeIndex === i;
            const isRevealed = revealed[i];

            return (
              <div
                key={item.year}
                onClick={() => handleSelectMilestone(i)}
                className={`p-4 sm:p-5 border rounded-xl space-y-2 bg-[var(--bg)] card-badge-bg transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "border-[#DE4313] shadow-md shadow-[#DE4313]/20 scale-[1.01]"
                    : "border-[#DE4313]/40 shadow-sm hover:border-[#DE4313]/70"
                }`}
                style={{
                  transform: isRevealed ? "translateY(0)" : "translateY(24px)",
                  opacity: isRevealed ? 1 : 0,
                  transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out",
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium border transition-colors ${
                      isActive
                        ? "border-[#DE4313] text-[#DE4313] dark:text-[#FEC163] bg-[#DE4313]/10"
                        : "border-[#DE4313] text-[var(--ink)] bg-[var(--bg)]"
                    }`}
                    style={{
                      boxShadow: isActive
                        ? "0px 0px 8px 1px rgba(228, 93, 35, 0.5)"
                        : "0px 0px 4px 0px rgba(228, 93, 35, 0.3)",
                    }}
                  >
                    {item.date}
                  </span>
                  <span
                    className={`font-dm font-bold text-xs px-2.5 py-0.5 rounded-full transition-all ${
                      isActive
                        ? "text-white bg-gradient-to-r from-[#FEC163] to-[#DE4313] shadow-sm shadow-[#DE4313]/40"
                        : "text-[#DE4313] bg-[#DE4313]/10"
                    }`}
                  >
                    {item.year}
                  </span>
                </div>

                <h4 className="font-dm font-bold text-sm sm:text-[15px] text-[var(--ink)] uppercase">
                  {item.role}
                </h4>

                <p
                  className="font-dm font-semibold text-xs sm:text-[13px] text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                  }}
                >
                  {item.org}
                </p>

                <p className="font-dm font-normal text-xs sm:text-[13px] leading-relaxed text-[var(--ink-78)]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
