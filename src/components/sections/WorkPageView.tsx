"use client";

import BrandingProjectsView from "@/components/sections/BrandingProjectsView";
import MarketingProjectsView from "@/components/sections/MarketingProjectsView";
import WorkCategorySection from "@/components/sections/WorkCategorySection";
import BrandingMonitorMockup from "@/components/ui/BrandingMonitorMockup";
import MarketingMonitorMockup from "@/components/ui/MarketingMonitorMockup";
import WorkDeviceMockup from "@/components/ui/WorkDeviceMockup";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  WORK_WEBSITE_SLIDES,
  WORK_APP_SLIDES,
  WORK_SOFTWARE_SLIDES,
} from "@/data/sliders";

type Discipline = "ux" | "branding" | "marketing";
type TabId = "websites" | "apps" | "softwares";

interface WorkTab {
  id: TabId;
  label: string;
}

const WORK_TABS: WorkTab[] = [
  { id: "websites", label: "01. WEBSITE" },
  { id: "apps", label: "02. APP" },
  { id: "softwares", label: "03. SOFTWARE" },
];

const DISCIPLINE_DATA: Record<
  Discipline,
  {
    title: string;
    subtitle: string;
  }
> = {
  ux: {
    title: "UX & UI DESIGN",
    subtitle: "Curated Projects",
  },
  branding: {
    title: "LOGO & BRANDING",
    subtitle: "Curated Projects",
  },
  marketing: {
    title: "PRINT & DIGITAL MARKETING",
    subtitle: "Curated Projects",
  },
};

export default function WorkPageView() {
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline>("ux");
  const [activeTab, setActiveTab] = useState<TabId>("websites");

  const currentDiscipline = DISCIPLINE_DATA[activeDiscipline];

  // Scroll listener to update active tab based on scroll position (exact same logic as About Page)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 240;
      for (const tab of [...WORK_TABS].reverse()) {
        const el = document.getElementById(tab.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveTab(tab.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: TabId) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Sync discipline with URL parameters or hash on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("branding") || hash.includes("logo")) {
        setActiveDiscipline("branding");
      } else if (hash.includes("marketing") || hash.includes("print")) {
        setActiveDiscipline("marketing");
      }
      const params = new URLSearchParams(window.location.search);
      const d = params.get("discipline") || params.get("category");
      if (d === "branding" || d === "marketing" || d === "ux") {
        setActiveDiscipline(d as Discipline);
      }
    }
  }, []);

  const handleDisciplineChange = (d: Discipline) => {
    setActiveDiscipline(d);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/work?discipline=${d}`);
    }
  };

  const activeIdx = Math.max(
    0,
    WORK_TABS.findIndex((t) => t.id === activeTab),
  );

  return (
    <div className="w-full px-3 sm:px-6 lg:px-10 pt-12 sm:pt-18 lg:pt-24 pb-12 sm:pb-16 lg:pb-24">
      {/* ── Global SVG Gradient Defs ── */}
      <svg
        width="0"
        height="0"
        className="absolute pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="workSparkleGrad"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
            gradientTransform="rotate(129.89 0.5 0.5)"
          >
            <stop offset="-29.32%" stopColor="#FEC163" />
            <stop offset="100%" stopColor="#DE4313" />
          </linearGradient>

          <linearGradient
            id="workCategoryDiamondGrad"
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

      {/* ── 01. WORK HERO CARD (Pixel-perfect matching About & Blogs Hero Layout) ── */}
      <div className="relative w-full bg-transparent min-h-0 lg:min-h-[540px] flex flex-col lg:flex-row items-center pt-10 sm:pt-14 lg:pt-20 pb-8 sm:pb-12 lg:pb-20 pl-4 sm:pl-10 lg:pl-14 pr-4 sm:pr-10 lg:pr-14 mb-6 sm:mb-10">
        {/* Left vertical border line (starts at 0,0 to bottom) */}
        <div
          className="absolute top-0 left-0 bottom-0 w-[1.5px] pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #FEC163 0%, #DE4313 100%)",
          }}
        />

        {/* Bottom horizontal border line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1.5px] pointer-events-none"
          style={{
            background:
              "linear-gradient(97.51deg, #FEC163 -37.59%, #DE4313 94.05%)",
          }}
        />

        {/* Right vertical border line (starts below Work header to bottom) */}
        <div
          className="absolute top-[24px] sm:top-[30px] lg:top-[36px] right-0 bottom-0 w-[1.5px] pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #FEC163 0%, #DE4313 100%)",
          }}
        />

        {/* ── Top Border & Header Notch: 3 Discipline Icons + "Work" (Line terminates at 3rd icon) ── */}
        <div className="absolute top-0 left-0 right-3 sm:right-8 -translate-y-1/2 flex items-center pointer-events-none z-20">
          {/* Top border line from card's left edge up to Icon 1 */}
          <div
            className="flex-1 min-w-[16px] h-[1.5px] pointer-events-none -mr-[2px]"
            style={{
              background:
                "linear-gradient(97.51deg, #FEC163 -37.59%, #DE4313 94.05%)",
            }}
          />

          {/* 1. UX & UI Design Circle */}
          <button
            type="button"
            onClick={() => handleDisciplineChange("ux")}
            title="UX & UI Design"
            aria-label="UX & UI Design"
            className={`relative shrink-0 w-10 h-10 sm:w-13 sm:h-13 lg:w-15 lg:h-15 xl:w-16 xl:h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer pointer-events-auto select-none focus:outline-none focus:ring-0 focus-visible:outline-none active:outline-none ring-0 ${
              activeDiscipline === "ux"
                ? "shadow-[0_0_16px_rgba(222,67,19,0.7)] scale-105 z-10"
                : "bg-[var(--bg)] card-badge-bg border-[1.5px] border-[#DE4313] hover:border-[#FEC163] hover:scale-105 z-[2]"
            }`}
            style={{
              outline: "none",
              WebkitTapHighlightColor: "transparent",
              ...(activeDiscipline === "ux"
                ? {
                    background:
                      "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                  }
                : {}),
            }}
          >
            <Image
              src="/assets/icons/ux-icon.png"
              alt="UX & UI"
              width={36}
              height={36}
              className={`w-5 h-5 sm:w-6.5 sm:h-6.5 lg:w-8 lg:h-8 object-contain transition-all ${
                activeDiscipline === "ux" ? "brightness-0 invert" : ""
              }`}
            />
          </button>

          {/* Connecting line between Icon 1 and Icon 2 */}
          <div
            className="w-2.5 sm:w-4 lg:w-5 xl:w-6 h-[1.5px] shrink-0 pointer-events-none -mx-[2px] z-[1]"
            style={{
              background:
                "linear-gradient(97.51deg, #FEC163 -37.59%, #DE4313 94.05%)",
            }}
          />

          {/* 2. Logo & Branding Circle */}
          <button
            type="button"
            onClick={() => handleDisciplineChange("branding")}
            title="Logo & Branding"
            aria-label="Logo & Branding"
            className={`relative shrink-0 w-10 h-10 sm:w-13 sm:h-13 lg:w-15 lg:h-15 xl:w-16 xl:h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer pointer-events-auto select-none focus:outline-none focus:ring-0 focus-visible:outline-none active:outline-none ring-0 ${
              activeDiscipline === "branding"
                ? "shadow-[0_0_16px_rgba(222,67,19,0.7)] scale-105 z-10"
                : "bg-[var(--bg)] card-badge-bg border-[1.5px] border-[#DE4313] hover:border-[#FEC163] hover:scale-105 z-[2]"
            }`}
            style={{
              outline: "none",
              WebkitTapHighlightColor: "transparent",
              ...(activeDiscipline === "branding"
                ? {
                    background:
                      "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                  }
                : {}),
            }}
          >
            <Image
              src="/assets/icons/branding-icon.png"
              alt="Branding"
              width={36}
              height={36}
              className={`w-5 h-5 sm:w-6.5 sm:h-6.5 lg:w-8 lg:h-8 object-contain transition-all ${
                activeDiscipline === "branding" ? "brightness-0 invert" : ""
              }`}
            />
          </button>

          {/* Connecting line between Icon 2 and Icon 3 */}
          <div
            className="w-2.5 sm:w-4 lg:w-5 xl:w-6 h-[1.5px] shrink-0 pointer-events-none -mx-[2px] z-[1]"
            style={{
              background:
                "linear-gradient(97.51deg, #FEC163 -37.59%, #DE4313 94.05%)",
            }}
          />

          {/* 3. Print & Digital Marketing Circle (LAST ICON) */}
          <button
            type="button"
            onClick={() => handleDisciplineChange("marketing")}
            title="Print & Digital Marketing"
            aria-label="Print & Digital Marketing"
            className={`relative shrink-0 w-10 h-10 sm:w-13 sm:h-13 lg:w-15 lg:h-15 xl:w-16 xl:h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer pointer-events-auto select-none focus:outline-none focus:ring-0 focus-visible:outline-none active:outline-none ring-0 ${
              activeDiscipline === "marketing"
                ? "shadow-[0_0_16px_rgba(222,67,19,0.7)] scale-105 z-10"
                : "bg-[var(--bg)] card-badge-bg border-[1.5px] border-[#DE4313] hover:border-[#FEC163] hover:scale-105 z-[2]"
            }`}
            style={{
              outline: "none",
              WebkitTapHighlightColor: "transparent",
              ...(activeDiscipline === "marketing"
                ? {
                    background:
                      "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                  }
                : {}),
            }}
          >
            <Image
              src="/assets/icons/marketing-icon.png"
              alt="Marketing"
              width={36}
              height={36}
              className={`w-5 h-5 sm:w-6.5 sm:h-6.5 lg:w-8 lg:h-8 object-contain transition-all ${
                activeDiscipline === "marketing" ? "brightness-0 invert" : ""
              }`}
            />
          </button>

          {/* "Work" Page Heading — Notice: NO line connects to Work! The border ends cleanly at Icon 3. */}
          <span className="shrink-0 font-dm font-normal text-2xl sm:text-4xl lg:text-[42px] text-[var(--ink)] tracking-tight leading-none ml-2.5 sm:ml-5 lg:ml-6 select-none pointer-events-auto">
            Work
          </span>
        </div>

        {/* ── Inner Glow Effects (Exact Same as About / Blogs) ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Rich Radial Orange Glow underneath Responsive Mockup */}
          <div
            aria-hidden="true"
            className="absolute rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(222, 67, 19, 0.55) 0%, rgba(222, 67, 19, 0.2) 50%, transparent 72%)",
              filter: "blur(85px)",
              width: "480px",
              height: "420px",
              right: "40px",
              bottom: "10px",
            }}
          />

          {/* Soft Ambient Glow on Left behind Title */}
          <div
            aria-hidden="true"
            className="absolute rounded-full"
            style={{
              background: "rgba(222, 67, 19, 0.12)",
              filter: "blur(90px)",
              width: "340px",
              height: "260px",
              left: "20px",
              top: "60px",
            }}
          />
        </div>

        {/* ── Main Hero Content Grid: Left Title + Right Mockup ── */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Column: Heading + Subtitle */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-2 sm:space-y-3">
            <h1 className="font-dm font-bold text-2xl sm:text-4xl lg:text-[50px] leading-[1.08] text-[var(--ink)] uppercase tracking-tight">
              {currentDiscipline.title}
            </h1>
            <h2
              className="font-dm font-bold text-xl sm:text-2xl lg:text-[32px] leading-tight text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
              }}
            >
              {currentDiscipline.subtitle}
            </h2>
          </div>

          {/* Right Column: Multi-device Responsive Mockup Graphic (Sits cleanly below text on mobile) */}
          <div className="lg:col-span-7 w-full flex items-center justify-center lg:justify-end mt-4 sm:mt-6 lg:mt-0">
            <div className="w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[580px] mx-auto lg:mr-0 flex items-center justify-center">
              {activeDiscipline === "ux" && (
                <WorkDeviceMockup className="w-full" />
              )}
              {activeDiscipline === "branding" && (
                <BrandingMonitorMockup className="w-full" />
              )}
              {activeDiscipline === "marketing" && (
                <MarketingMonitorMockup className="w-full" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 02. DISCIPLINE CONTENT VIEW SWITCHER ── */}
      {activeDiscipline === "ux" && (
        <>
          {/* Sticky Sub-Navigation Bar for UX tabs */}
          <div className="sticky top-0 z-40 backdrop-blur-md pt-2 sm:pt-3 pb-2 select-none mb-8 sm:mb-12 lg:mb-14">
            <div className="w-full grid grid-cols-3 gap-1 sm:gap-3 md:gap-4 items-center text-center font-dm font-bold text-[9.5px] min-[380px]:text-[11px] sm:text-xs md:text-sm tracking-tight sm:tracking-wider uppercase">
              {WORK_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => scrollToSection(tab.id)}
                    className={`group flex items-center justify-center gap-1 sm:gap-2 md:gap-2.5 py-2 sm:py-3 px-0.5 sm:px-2 transition-opacity cursor-pointer ${
                      isActive ? "opacity-100" : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    {/* Diamond icon before */}
                    <Image
                      src="/btn-icon-dimond.png"
                      alt=""
                      width={18}
                      height={17}
                      className="w-[8px] h-[7px] sm:w-[11px] sm:h-[10px] object-contain flex-shrink-0"
                    />

                    {/* Tab Label */}
                    <span
                      className="text-transparent bg-clip-text whitespace-nowrap"
                      style={{
                        backgroundImage:
                          "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                      }}
                    >
                      {tab.label}
                    </span>

                    {/* Diamond icon after */}
                    <Image
                      src="/btn-icon-dimond.png"
                      alt=""
                      width={18}
                      height={17}
                      className="w-[8px] h-[7px] sm:w-[11px] sm:h-[10px] object-contain flex-shrink-0"
                    />
                  </button>
                );
              })}
            </div>

            {/* Track Line and Active Indicator Slider */}
            <div className="relative w-full h-[1.5px] bg-[#DE4313]/30 mt-1">
              <div
                className="absolute top-0 h-full bg-gradient-to-r from-[#FEC163] to-[#DE4313] transition-all duration-300"
                style={{
                  left: `${(activeIdx / WORK_TABS.length) * 100}%`,
                  width: `${100 / WORK_TABS.length}%`,
                  boxShadow: "0 0 10px rgba(222, 67, 19, 0.8)",
                }}
              />
            </div>
          </div>

          {/* ── 03. CATEGORY SHOWCASE SECTIONS (UX & UI DESIGN) ── */}
          <div className="space-y-10 sm:space-y-16 lg:space-y-24">
            {/* ── SECTION 01: WEBSITES ── */}
            <WorkCategorySection
              id="websites"
              number="01"
              title="WEBSITES"
              viewAllLabel="VIEW ALL WEBSITES"
              viewAllHref="/work/websites"
              slides={WORK_WEBSITE_SLIDES}
              isActive={activeTab === "websites"}
            />

            {/* ── SECTION 02: APPS ── */}
            <WorkCategorySection
              id="apps"
              number="02"
              title="APPS"
              viewAllLabel="VIEW ALL APPS"
              viewAllHref="/work/apps"
              slides={WORK_APP_SLIDES}
              isActive={activeTab === "apps"}
            />

            {/* ── SECTION 03: SOFTWARES ── */}
            <WorkCategorySection
              id="softwares"
              number="03"
              title="SOFTWARES"
              viewAllLabel="VIEW ALL SOFTWARE"
              viewAllHref="/work/softwares"
              slides={WORK_SOFTWARE_SLIDES}
              isActive={activeTab === "softwares"}
            />
          </div>
        </>
      )}

      {/* ── 03. LOGO & BRANDING VIEW ── */}
      {activeDiscipline === "branding" && <BrandingProjectsView />}

      {/* ── 04. PRINT & DIGITAL MARKETING VIEW ── */}
      {activeDiscipline === "marketing" && <MarketingProjectsView />}
    </div>
  );
}
