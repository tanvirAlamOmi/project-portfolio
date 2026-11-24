"use client";

import SectionBadge from "@/components/ui/SectionBadge";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { asset } from "@/utils/asset";
import CertificateLightbox, {
  CertificateItem,
} from "@/components/ui/CertificateLightbox";
import JourneyTimeline from "./JourneyTimeline";

const TABS = [
  { id: "profile", label: "01. PROFILE" },
  { id: "journey", label: "02. JOURNEY" },
  { id: "expertise", label: "03. EXPERTISE" },
  { id: "approach", label: "04. DESIGN APPROACH" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const CERTIFICATES: CertificateItem[] = [
  {
    id: "1",
    title: "Assumption University of Thailand",
    subtitle: "Bachelor of Science in Information Technology (2011 - 2015)",
    src: "/assets/about/certificate/1.png",
    width: 1392,
    height: 1152,
  },
  {
    id: "2.1",
    title: "Web Courses Bangkok",
    subtitle: "Certificate of Web Design",
    src: "/assets/about/certificate/2.1.png",
    width: 1242,
    height: 858,
  },
  {
    id: "2.2",
    title: "Web Courses Bangkok",
    subtitle: "Certificate of Graphic Design",
    src: "/assets/about/certificate/2.2.png",
    width: 1242,
    height: 864,
  },
  {
    id: "3",
    title: "Web Courses Bangkok",
    subtitle: "Letter of Recommendation (UX/UI Design Internship)",
    src: "/assets/about/certificate/3.png",
    width: 1040,
    height: 1440,
  },
  {
    id: "4",
    title: "Arbree Limited",
    subtitle: "Letter of Recommendation (UX/UI Designer)",
    src: "/assets/about/certificate/4.png",
    width: 1035,
    height: 1440,
  },
];

/**
 * Signature Notched Sparkle Action Button
 */
function ActionSparkleButton({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      role="button"
      tabIndex={0}
      className="group inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none"
    >
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
        <svg width="52" height="58" viewBox="0 0 52 58" fill="none" className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 46 44.5 A 25 25 0 1 1 46 13.5"
            stroke="url(#aboutSparkleGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(222,67,19,0.55)]"
          style={{
            background: "linear-gradient(135deg, #FEC163 0%, #DE4313 100%)",
          }}
        >
          <Image
            src={asset("/btn-icon-dimond.png")}
            alt=""
            width={18}
            height={17}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain brightness-0 invert flex-shrink-0"
          />
        </div>
      </div>

      <span
        className="font-dm font-bold text-base sm:text-[18px] leading-tight tracking-[0.02em] text-transparent bg-clip-text transition-all uppercase whitespace-nowrap"
        style={{
          backgroundImage:
            "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function AboutPageView() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Auto-scroll tabs container on mobile so the active tab is always centered/visible
  useEffect(() => {
    if (!tabsContainerRef.current) return;
    const activeEl = tabsContainerRef.current.querySelector<HTMLElement>(
      `[data-tab-id="${activeTab}"]`
    );
    if (activeEl) {
      const container = tabsContainerRef.current;
      const scrollLeft =
        activeEl.offsetLeft -
        container.clientWidth / 2 +
        activeEl.clientWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  // Scroll listener to update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 1024;
      const topOffset = isMobile ? 120 : 60;
      const scrollPos = window.scrollY + topOffset;
      for (const tab of [...TABS].reverse()) {
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

  const scrollToSection = (id: string) => {
    setActiveTab(id as TabId);
    const el = document.getElementById(id);
    if (!el) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
    const headerHeight = isMobile ? 70 : 20;
    const targetOffset =
      el.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    window.scrollTo({
      top: Math.max(0, targetOffset),
      behavior: "smooth",
    });
  };

  const playAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance("Sejuti");
      utterance.lang = "bn-BD";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full px-3.5 sm:px-6 lg:px-10 pt-6 sm:pt-12 lg:pt-20 pb-24">
      {/* ── Global SVG Gradient Defs ── */}
      <svg
        width="0"
        height="0"
        className="absolute pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="aboutSparkleGrad"
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

      {/* ── 01. ABOUT HERO CARD (Pixel-perfect matching Blogs Hero) ── */}
      <div className="relative w-full bg-transparent min-h-0 md:min-h-[520px] lg:min-h-[540px] flex flex-col md:flex-row items-start md:items-center pt-8 sm:pt-12 lg:pt-18 pb-0 md:pb-12 lg:pb-16 pl-4 sm:pl-10 lg:pl-14 pr-4 sm:pr-10 lg:pr-14 mb-10">
        {/* Top horizontal border line (starts at 0,0 and stops before About) */}
        <div
          className="absolute top-0 left-0 right-[115px] sm:right-[180px] h-[1.5px] pointer-events-none"
          style={{
            background:
              "linear-gradient(97.51deg, #FEC163 -37.59%, #DE4313 94.05%)",
          }}
        />

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

        {/* Right vertical border line (starts below About to bottom) */}
        <div
          className="absolute top-[28px] sm:top-[34px] right-0 bottom-0 w-[1.5px] pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #FEC163 0%, #DE4313 100%)",
          }}
        />

        {/* Top-Right About heading (font-weight: 500, centered on top line) */}
        <div className="absolute top-0 right-3 sm:right-8 -translate-y-1/2 flex items-center select-none z-20">
          <span className="font-dm font-medium text-2xl sm:text-4xl lg:text-[40px] text-[var(--ink)] tracking-tight leading-none">
            About
          </span>
        </div>

        {/* Left Hero Content Layer */}
        <div className="relative z-10 w-full max-w-[560px] lg:max-w-[620px] flex flex-col justify-center space-y-4 sm:space-y-5 pb-4 md:pb-0">
          <h1 className="font-almarai sm:font-dm font-extrabold uppercase text-3xl sm:text-5xl lg:text-[56px] tracking-tight leading-none text-[var(--ink)]">
            SEJUTI
          </h1>

          {/* Bengali Script, Pronunciation & Speaker */}
          <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap">
            <span
              className="font-bold text-xl sm:text-3xl text-transparent bg-clip-text inline-block py-1 sm:py-2 leading-normal overflow-visible"
              style={{
                backgroundImage:
                  "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
              }}
            >
              সেঁজুতি
            </span>

            <span
              className="font-dm text-sm sm:text-lg text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
              }}
            >
              /shay.joo.tee/
            </span>

            {/* Pronunciation Sound Button */}
            <button
              onClick={playAudio}
              type="button"
              aria-label="Listen to pronunciation of Sejuti"
              className="text-[#DE4313] hover:text-[#FEC163] transition-transform hover:scale-110 cursor-pointer ml-1 focus:outline-none focus:ring-0"
              style={{ outline: "none" }}
              title="Pronounce Sejuti"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 5L6 9H2V15H6L11 19V5Z"
                  fill="url(#aboutSparkleGrad)"
                  stroke="url(#aboutSparkleGrad)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.54 8.46C16.48 9.4 17 10.67 17 12C17 13.33 16.48 14.6 15.54 15.54"
                  stroke="url(#aboutSparkleGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M19.07 4.93C20.94 6.8 22 9.35 22 12C22 14.65 20.94 17.2 19.07 19.07"
                  stroke="url(#aboutSparkleGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Meaning & Essence */}
          <div className="space-y-1 font-dm text-xs sm:text-[13.5px] text-[var(--ink-78)] leading-[1.65] max-w-lg">
            <p>
              (Bengali) - evening light or lamp, light of the sunset, twilight.
            </p>
            <p>
              A name that means light in the dark — reflecting the values
              carried into work and beyond.
            </p>
            <p
              className="font-medium pt-2 text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
              }}
            >
              Also known as ERA.
            </p>
          </div>

          {/* View Resume Button */}
          <div className="pt-3 sm:pt-6">
            <a
              href={asset("/assets/resume.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <ActionSparkleButton label="VIEW RESUME" />
            </a>
          </div>
        </div>

        {/* Sejuti portrait: On mobile placed directly below text; on desktop pinned to bottom-right */}
        <div className="relative md:absolute md:right-10 lg:md:right-16 md:bottom-0 w-full md:w-auto flex justify-center md:justify-end items-end z-10 mt-6 md:mt-0 pointer-events-none">
          {/* Rich Ellipse Glow underneath Sejuti portrait */}
          <div
            aria-hidden="true"
            className="absolute rounded-full pointer-events-none -z-10"
            style={{
              background:
                "radial-gradient(circle, rgba(222, 67, 19, 0.65) 0%, rgba(222, 67, 19, 0.28) 52%, transparent 75%)",
              filter: "blur(60px)",
              width: "320px",
              height: "320px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          <div className="w-[230px] sm:w-[260px] md:w-[270px] lg:w-[310px] xl:w-[330px]">
            <Image
              src="/assets/about/sejuti.png"
              alt="Sejuti Mehjabin"
              width={330}
              height={400}
              className="w-full h-auto object-contain object-bottom drop-shadow-2xl block"
              priority
            />
          </div>
        </div>
      </div>

      {/* ── 02. SUB-NAVIGATION BAR (Sticky on scroll with backdrop blur) ── */}
      <div className="sticky top-0 lg:top-0 z-30 select-none mb-10 sm:mb-14 bg-[var(--bg)]/90 backdrop-blur-md py-2 transition-all">
        {/* Continuous bottom baseline across the full width (Matching Screenshot) */}
        <div className="relative w-full border-b border-[#DE4313]/35">
          <div
            ref={tabsContainerRef}
            className="w-full flex items-center justify-between overflow-x-auto sm:overflow-visible scrollbar-none font-dm text-[11px] sm:text-xs md:text-sm tracking-wider uppercase min-w-[500px] sm:min-w-full px-0"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-tab-id={tab.id}
                  type="button"
                  onClick={() => scrollToSection(tab.id)}
                  className={`group relative shrink-0 flex items-center justify-center gap-1.5 sm:gap-2 px-1 sm:px-3 pt-2 pb-2.5 transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-0 focus-visible:outline-none active:outline-none ring-0 ${
                    isActive
                      ? "font-bold text-[#DE4313]"
                      : "font-semibold text-[var(--ink)] opacity-70 hover:opacity-100"
                  }`}
                  style={{
                    outline: "none",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {/* Diamond icon before */}
                  <Image
                    src={asset("/btn-icon-dimond.png")}
                    alt=""
                    width={18}
                    height={17}
                    className={`w-[10px] h-[9px] sm:w-[12px] sm:h-[11px] object-contain shrink-0 transition-opacity duration-200 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-45 group-hover:opacity-75"
                    }`}
                  />

                  {/* Tab Label */}
                  <span
                    className={
                      isActive ? "text-transparent bg-clip-text" : "text-inherit"
                    }
                    style={
                      isActive
                        ? {
                            backgroundImage:
                              "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                          }
                        : undefined
                    }
                  >
                    {tab.label}
                  </span>

                  {/* Diamond icon after */}
                  <Image
                    src={asset("/btn-icon-dimond.png")}
                    alt=""
                    width={18}
                    height={17}
                    className={`w-[10px] h-[9px] sm:w-[12px] sm:h-[11px] object-contain shrink-0 transition-opacity duration-200 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-45 group-hover:opacity-75"
                    }`}
                  />

                  {/* Active Indicator: sits right on the bottom baseline with ZERO GAP */}
                  {isActive && (
                    <div
                      className="absolute -bottom-[1px] left-0 right-0 h-[3px] rounded-xs pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg, #DE4313 0%, #FEC163 100%)",
                        boxShadow: "0px 0px 8px rgba(222, 67, 19, 0.7)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 03. SEQUENTIAL SECTIONS (One after another matching Figma) ── */}
      <div className="space-y-20 sm:space-y-28">
        {/* ══════════════ SECTION 01: PROFILE ══════════════ */}
        <section id="profile" className="scroll-mt-28 space-y-10">
          {/* Header Row: SectionBadge 01 PROFILE on Left, Intro on Right (Exact Home Page Match) */}
          <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 relative">
            <SectionBadge num="01" label="PROFILE" className="flex-shrink-0" />

            <div className="flex-1 max-w-3xl flex flex-col justify-center gap-4 lg:pt-2">
              <h2 className="font-almarai text-2xl sm:text-3xl lg:text-[32px] font-bold text-[var(--ink)] leading-snug">
                A Quiet Visionary
              </h2>
              <p className="font-almarai text-sm sm:text-base text-[var(--ink-78)] leading-relaxed">
                Being an UX &amp; UI designer feels like a natural extension of
                who I am — a space where I get to merge my tech roots with
                creative instincts. I see UX everywhere, finding inspiration in
                everyday moments and the subtle ways we interact with the world.
                A Bangladeshi native shaped by over a decade in Bangkok, I am
                currently freelancing in Dhaka, while exploring other creative
                outlets outside work.
              </p>
            </div>
          </div>

          {/* Centered Heading: Behind The Designs */}
          <div className="pt-4 text-center">
            <h3
              className="font-dm font-bold text-2xl sm:text-3xl text-transparent bg-clip-text inline-block"
              style={{
                backgroundImage:
                  "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
              }}
            >
              Behind The Designs
            </h3>
          </div>

          {/* Framed Container with 5 Traits */}
          <div
            className="p-4 sm:p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-8 bg-transparent"
            style={{
              border: "1.5px solid transparent",
              borderImageSource:
                "linear-gradient(97.42deg, #FEC163 0%, #DE4313 95.67%)",
              borderImageSlice: 1,
            }}
          >
            {[
              {
                img: "/assets/about/infj.png",
                title: "INFJ-A +\nNEURODIVERGENT",
              },
              {
                img: "/assets/about/visual.png",
                title: "VISUAL\nSTORYTELLER",
              },
              {
                img: "/assets/about/nature.png",
                title: "NATURE\nDREAMER",
              },
              {
                img: "/assets/about/poetic.png",
                title: "POETIC\nTHINKER",
              },
              {
                img: "/assets/about/aesthetic.png",
                title: "AESTHETIC\nCURATOR",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`flex flex-col items-center text-center gap-3 transition-transform hover:-translate-y-1 duration-300 ${
                  index === 4 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className="relative w-18 h-18 sm:w-24 sm:h-24">
                  <Image
                    src={item.img}
                    alt={item.title.replace("\n", " ")}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-dm font-bold text-xs uppercase tracking-wider text-[var(--ink)] whitespace-pre-line leading-tight">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════ SECTION 02: JOURNEY ══════════════ */}
        <section id="journey" className="scroll-mt-28 space-y-6">
          {/* Header Row: SectionBadge 02 JOURNEY on Left, Intro on Right (Exact Home Page Match) */}
          <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8 relative">
            <SectionBadge num="02" label="JOURNEY" className="flex-shrink-0" />

            <div className="flex-1 max-w-3xl flex flex-col justify-center gap-3 lg:pt-1">
              <h2 className="font-almarai text-2xl sm:text-3xl lg:text-[32px] font-bold text-[var(--ink)] leading-snug">
                Education &amp; Experience
              </h2>
              <p className="font-almarai text-sm sm:text-base text-[var(--ink-78)] leading-relaxed">
                With a background in IT, I stumbled upon UX/UI design while
                watching how digital products take shape. What intrigued me most
                was how every experience is first imagined, planned, and
                designed long before it’s built. That curiosity soon became my
                calling — and since then, it’s been a path of continuous
                learning and growth.
              </p>
            </div>
          </div>

          {/* ── Animated S-Curve Journey Timeline (Interactive SVG with Sequential Active Nodes & Motion Cards) ── */}
          <JourneyTimeline />

          {/* ── Certifications Sub-Section (Gap <= 30px) ── */}
          <div className="pt-6 space-y-6">
            <div className="text-center">
              <h3
                className="font-dm font-bold text-2xl sm:text-3xl text-transparent bg-clip-text inline-block"
                style={{
                  backgroundImage:
                    "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                }}
              >
                Certifications
              </h3>
            </div>

            {/* Framed Container with All 5 Certificates (1, 2.1, 2.2, 3, 4) */}
            <div
              className="p-3.5 sm:p-6 lg:p-8 bg-transparent max-w-6xl mx-auto"
              style={{
                border: "1.5px solid transparent",
                borderImageSource:
                  "linear-gradient(97.42deg, #FEC163 0%, #DE4313 95.67%)",
                borderImageSlice: 1,
              }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-5 w-full">
                {/* 1. Assumption University Bachelor Degree */}
                <div className="w-full sm:flex-[1.68] flex items-center justify-center">
                  <div
                    onClick={() => openLightbox(0)}
                    title="Click to view Assumption University Degree"
                    className="relative w-full overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300 cursor-pointer group rounded-sm"
                  >
                    <Image
                      src="/assets/about/certificate/1.png"
                      alt="Assumption University - Bachelor of Science Information Technology"
                      width={1392}
                      height={1152}
                      className="w-full h-auto object-contain block"
                      priority
                    />
                    {/* Magnifying Glass Zoom Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-white shadow-xl text-xs font-dm font-bold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        <span>VIEW</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Middle Column: Stack of 2 Certificates (2.1 & 2.2) */}
                <div className="w-full sm:flex-[1] flex flex-col gap-2 sm:gap-2.5 lg:gap-3 justify-between">
                  {/* 2.1 Green Certificate */}
                  <div
                    onClick={() => openLightbox(1)}
                    title="Click to view Web Design Certificate"
                    className="relative w-full overflow-hidden shadow-md transition-transform hover:scale-[1.02] duration-300 cursor-pointer group rounded-sm"
                  >
                    <Image
                      src="/assets/about/certificate/2.1.png"
                      alt="Certificate of Web Design - Sejuti Mehjabin"
                      width={1242}
                      height={858}
                      className="w-full h-auto object-contain block"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-white shadow-xl text-[11px] font-dm font-bold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        <span>VIEW</span>
                      </div>
                    </div>
                  </div>

                  {/* 2.2 Orange Certificate */}
                  <div
                    onClick={() => openLightbox(2)}
                    title="Click to view Graphic Design Certificate"
                    className="relative w-full overflow-hidden shadow-md transition-transform hover:scale-[1.02] duration-300 cursor-pointer group rounded-sm"
                  >
                    <Image
                      src="/assets/about/certificate/2.2.png"
                      alt="Certificate of Graphic Design - Sejuti Mehjabin"
                      width={1242}
                      height={864}
                      className="w-full h-auto object-contain block"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-white shadow-xl text-[11px] font-dm font-bold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        <span>VIEW</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Recommendation Letter 1 */}
                <div className="w-full sm:flex-[1.01] flex items-center justify-center">
                  <div
                    onClick={() => openLightbox(3)}
                    title="Click to view Web Courses Bangkok Recommendation"
                    className="relative w-full overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300 cursor-pointer group rounded-sm"
                  >
                    <Image
                      src="/assets/about/certificate/3.png"
                      alt="Letter of Recommendation - Web Courses Bangkok"
                      width={1040}
                      height={1440}
                      className="w-full h-auto object-contain block"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-white shadow-xl text-xs font-dm font-bold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        <span>VIEW</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Arbree Limited Recommendation Letter */}
                <div className="w-full sm:flex-[1] flex items-center justify-center">
                  <div
                    onClick={() => openLightbox(4)}
                    title="Click to view Arbree Limited Recommendation"
                    className="relative w-full overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300 cursor-pointer group rounded-sm"
                  >
                    <Image
                      src="/assets/about/certificate/4.png"
                      alt="Arbree Limited - Recommendation Letter"
                      width={1035}
                      height={1440}
                      className="w-full h-auto object-contain block"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-white shadow-xl text-xs font-dm font-bold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        <span>VIEW</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ SECTION 03: EXPERTISE ══════════════ */}
        <section id="expertise" className="scroll-mt-28 space-y-12">
          {/* Header Row: SectionBadge 03 EXPERTISE on Left, Intro on Right (Exact Home Page Match) */}
          <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 relative">
            <SectionBadge
              num="03"
              label="EXPERTISE"
              className="flex-shrink-0"
            />

            <div className="flex-1 max-w-3xl flex flex-col justify-center gap-4 lg:pt-2">
              <h2 className="font-almarai text-2xl sm:text-3xl lg:text-[32px] font-bold text-[var(--ink)] leading-snug">
                Fueled by Passion, Defined by Skill
              </h2>
              <p className="font-almarai text-sm sm:text-base text-[var(--ink-78)] leading-relaxed">
                My craft sits at the intersection of innate traits and acquired
                capabilities. As a neurodivergent INFJ, I bring a balance of
                paradoxical strengths that gives me a unique edge in UX/UI
                design, allowing me to connect emotion with logic and structure
                with creativity.
              </p>
            </div>
          </div>

          {/* ── Analytical & Creative Brain Infographic ── */}
          {/* Desktop Version: Exact Figma 2166x1230 aspect ratio with 24 floating labels */}
          <div className="hidden md:flex relative w-full max-w-5xl mx-auto aspect-[2166/1230] items-center justify-center select-none overflow-hidden my-6">
            {/* Center Vertical Dividing Line */}
            <div
              className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] pointer-events-none"
              style={{
                background: "linear-gradient(180deg, #FEC163 0%, #DE4313 100%)",
              }}
            />

            {/* Left Horizontal Dividing Line */}
            <div
              className="absolute top-1/2 -translate-y-1/2 left-0 w-[36%] h-[1.5px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, #FEC163 0%, #DE4313 100%)",
              }}
            />

            {/* Right Horizontal Dividing Line */}
            <div
              className="absolute top-1/2 -translate-y-1/2 right-0 w-[36%] h-[1.5px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, #DE4313 0%, #FEC163 100%)",
              }}
            />

            {/* Center Brain Graphic (Clean, transparent illustration) */}
            <div className="relative z-10 w-[42%] h-[93%] flex items-center justify-center pointer-events-none">
              <Image
                src="/assets/about/expertise.png"
                alt="Analytical and Creative Brain Graphic"
                fill
                className="object-contain block drop-shadow-md"
                priority
              />
            </div>

            {/* ── 24 Expertise Skill & Mindset Labels (Inherits theme ink naturally) ── */}
            <div className="absolute inset-0 pointer-events-none font-dm font-medium text-xs md:text-sm lg:text-[14px] leading-none">
              {/* Top-Left: UX & Product Skills */}
              <span className="absolute top-[4.9%] left-[11.1%] whitespace-nowrap">
                Interaction Design
              </span>
              <span className="absolute top-[15.4%] left-[21.2%] whitespace-nowrap">
                Information Architecture
              </span>
              <span className="absolute top-[18.7%] left-[2.3%] whitespace-nowrap">
                Wireframing
              </span>
              <span className="absolute top-[27.6%] left-[14.3%] whitespace-nowrap">
                Prototyping
              </span>
              <span className="absolute top-[39.0%] left-[21.7%] whitespace-nowrap">
                Usability Testing
              </span>
              <span className="absolute top-[42.3%] left-[4.2%] whitespace-nowrap">
                User Research
              </span>

              {/* Bottom-Left: Analytical Mindset */}
              <span className="absolute top-[56.9%] left-[12.9%] whitespace-nowrap">
                Analytical
              </span>
              <span className="absolute top-[72.4%] left-[4.2%] whitespace-nowrap">
                Orderly
              </span>
              <span className="absolute top-[74.8%] left-[18.0%] whitespace-nowrap">
                Logical
              </span>
              <span className="absolute top-[83.7%] left-[28.2%] whitespace-nowrap">
                Detail Oriented
              </span>
              <span className="absolute top-[90.2%] left-[5.5%] whitespace-nowrap">
                Linear
              </span>
              <span className="absolute top-[95.1%] left-[18.5%] whitespace-nowrap">
                Scientific
              </span>

              {/* Top-Right: Visual & Creative Skills */}
              <span className="absolute top-[4.9%] left-[60.0%] whitespace-nowrap">
                Visual Design
              </span>
              <span className="absolute top-[6.5%] left-[88.2%] whitespace-nowrap">
                Typography
              </span>
              <span className="absolute top-[16.3%] left-[74.3%] whitespace-nowrap">
                Color Theory
              </span>
              <span className="absolute top-[30.1%] left-[69.3%] whitespace-nowrap">
                Design Systems
              </span>
              <span className="absolute top-[30.9%] left-[88.6%] whitespace-nowrap">
                Layouts
              </span>
              <span className="absolute top-[42.3%] left-[78.5%] whitespace-nowrap">
                Graphic Design
              </span>

              {/* Bottom-Right: Creative & Emotional Mindset */}
              <span className="absolute top-[56.9%] left-[82.2%] whitespace-nowrap">
                Imaginative
              </span>
              <span className="absolute top-[69.1%] left-[73.4%] whitespace-nowrap">
                Emotional
              </span>
              <span className="absolute top-[79.7%] left-[81.3%] whitespace-nowrap">
                Big Picture Thinker
              </span>
              <span className="absolute top-[80.5%] left-[65.6%] whitespace-nowrap">
                Intuitive
              </span>
              <span className="absolute top-[90.2%] left-[74.8%] whitespace-nowrap">
                Creative
              </span>
              <span className="absolute top-[95.1%] left-[58.6%] whitespace-nowrap">
                Empathetic
              </span>
            </div>
          </div>

          {/* ── Mobile Brain & 24 Skills Showcase (< md: Zero overlap, clean readable cards) ── */}
          <div className="md:hidden flex flex-col items-center space-y-6 my-4">
            {/* Center Brain Graphic with Ambient Glow */}
            <div className="relative w-full max-w-[260px] aspect-[4/3] flex items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(222, 67, 19, 0.35) 0%, rgba(254, 193, 99, 0.15) 50%, transparent 70%)",
                  filter: "blur(35px)",
                }}
              />
              <Image
                src="/assets/about/expertise.png"
                alt="Analytical and Creative Brain"
                width={260}
                height={200}
                className="w-full h-auto object-contain relative z-10 drop-shadow-md"
              />
            </div>

            {/* 4 Quadrants as Clean Categorized Badge Groups */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* 1. UX & Product Skills */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-[#DE4313]/40 bg-[var(--bg)] card-badge-bg space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FEC163] to-[#DE4313]" />
                  <h4
                    className="font-dm font-bold text-xs uppercase tracking-wider text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                    }}
                  >
                    UX & Product Skills
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Interaction Design",
                    "Information Architecture",
                    "Wireframing",
                    "Prototyping",
                    "Usability Testing",
                    "User Research",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-[#DE4313]/30 bg-[var(--bg)] card-badge-bg text-[var(--ink)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. Visual & Creative Skills */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-[#DE4313]/40 bg-[var(--bg)] card-badge-bg space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FEC163] to-[#DE4313]" />
                  <h4
                    className="font-dm font-bold text-xs uppercase tracking-wider text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                    }}
                  >
                    Visual & Creative Skills
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Visual Design",
                    "Typography",
                    "Color Theory",
                    "Design Systems",
                    "Layouts",
                    "Graphic Design",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-[#DE4313]/30 bg-[var(--bg)] card-badge-bg text-[var(--ink)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Analytical Mindset */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-[#DE4313]/40 bg-[var(--bg)] card-badge-bg space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FEC163] to-[#DE4313]" />
                  <h4
                    className="font-dm font-bold text-xs uppercase tracking-wider text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                    }}
                  >
                    Analytical Mindset
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Analytical",
                    "Orderly",
                    "Logical",
                    "Detail Oriented",
                    "Linear",
                    "Scientific",
                  ].map((trait) => (
                    <span
                      key={trait}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-[#DE4313]/30 bg-[var(--bg)] card-badge-bg text-[var(--ink)]"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. Creative & Emotional Mindset */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-[#DE4313]/40 bg-[var(--bg)] card-badge-bg space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FEC163] to-[#DE4313]" />
                  <h4
                    className="font-dm font-bold text-xs uppercase tracking-wider text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                    }}
                  >
                    Creative & Emotional Mindset
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Imaginative",
                    "Emotional",
                    "Big Picture Thinker",
                    "Intuitive",
                    "Creative",
                    "Empathetic",
                  ].map((trait) => (
                    <span
                      key={trait}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-[#DE4313]/30 bg-[var(--bg)] card-badge-bg text-[var(--ink)]"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Tools Section with Authentic Icons & Framed Box ── */}
          <div className="space-y-6 max-w-5xl mx-auto pt-6">
            <div className="text-center">
              <h3
                className="font-dm font-bold text-2xl sm:text-3xl text-transparent bg-clip-text inline-block"
                style={{
                  backgroundImage:
                    "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                }}
              >
                Tools
              </h3>
            </div>

            {/* Framed Container with Tool Icons */}
            <div
              className="p-4 sm:p-8 bg-transparent"
              style={{
                border: "1.5px solid transparent",
                borderImageSource:
                  "linear-gradient(97.42deg, #FEC163 0%, #DE4313 95.67%)",
                borderImageSlice: 1,
              }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-center">
                {[
                  { name: "FIGMA", icon: "/assets/tools/figma.png" },
                  { name: "SKETCH", icon: "/assets/tools/sketch.png" },
                  { name: "INVISION", icon: "/assets/tools/invision.png" },
                  { name: "ADOBE XD", icon: "/assets/tools/xd.png" },
                  { name: "PHOTOSHOP", icon: "/assets/tools/ps.png" },
                  { name: "ILLUSTRATOR", icon: "/assets/tools/ai.png" },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className="flex flex-col items-center justify-center gap-3 p-3 transition-transform hover:-translate-y-1 duration-300 group"
                  >
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-transform group-hover:scale-110">
                      <Image
                        src={tool.icon}
                        alt={tool.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-dm font-bold text-xs sm:text-sm uppercase tracking-wider text-[var(--ink)] text-center group-hover:text-[#FEC163] transition-colors">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ SECTION 04: DESIGN APPROACH ══════════════ */}
        <section id="approach" className="scroll-mt-28 space-y-12">
          {/* Header Row: SectionBadge 04 DESIGN APPROACH on Left, Intro on Right (Exact Figma Match) */}
          <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 relative">
            <SectionBadge
              num="04"
              label="DESIGN<br/>APPROACH"
              className="flex-shrink-0"
            />

            <div className="flex-1 max-w-3xl flex flex-col justify-center gap-4 lg:pt-2">
              <h2 className="font-almarai text-2xl sm:text-3xl lg:text-[32px] font-bold text-[var(--ink)] leading-snug">
                The pursuit of intentional design
              </h2>
              <p className="font-almarai text-sm sm:text-base text-[var(--ink-78)] leading-relaxed">
                I approach design as a way to solve problems elegantly. Every
                project is driven by purpose and the goal of leaving things
                better than I found them. It begins with understanding the
                vision, which then guides the design phase, where ideas take
                form through structure, interaction, and visual detail. The work
                is then refined through iteration and feedback, and finally
                brought to completion with a cohesive, well-executed design
                prepared for development.
              </p>

              {/* Core Principles Heading (Aligned with text above) */}
              <div className="pt-2">
                <h3
                  className="font-dm font-bold text-2xl sm:text-3xl text-transparent bg-clip-text inline-block"
                  style={{
                    backgroundImage:
                      "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                  }}
                >
                  Core Principles
                </h3>
              </div>
            </div>
          </div>

          {/* Single Bordered Container for Both Principles (Exact Figma Match) */}
          <div
            className="w-full max-w-5xl mx-auto p-4 sm:p-8 lg:p-10 bg-transparent transition-transform hover:-translate-y-0.5 duration-300"
            style={{
              border: "1.5px solid transparent",
              borderImageSource:
                "linear-gradient(97.42deg, #FEC163 0%, #DE4313 95.67%)",
              borderImageSlice: 1,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Principle 1: Meraki */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6 lg:gap-8">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-[155px] lg:h-[155px] flex-shrink-0">
                  <Image
                    src="/assets/tools/design-aproch/1.png"
                    alt="Meraki Principle"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="font-dm font-bold text-base sm:text-lg lg:text-xl uppercase tracking-wider text-[var(--ink)]">
                    MERAKI
                  </h4>
                  <p className="font-dm text-xs sm:text-sm text-[var(--ink-78)] leading-relaxed max-w-xs">
                    Designing with passion, devotion, and meticulous care,
                    ensuring the work is a true labor of love.
                  </p>
                </div>
              </div>

              {/* Principle 2: Simple Yet Significant */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-6 lg:gap-8">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-[155px] lg:h-[155px] flex-shrink-0">
                  <Image
                    src="/assets/tools/design-aproch/2.png"
                    alt="Simple yet significant Principle"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="font-dm font-bold text-base sm:text-lg lg:text-xl uppercase tracking-wider text-[var(--ink)]">
                    SIMPLE YET SIGNIFICANT
                  </h4>
                  <p className="font-dm text-xs sm:text-sm text-[var(--ink-78)] leading-relaxed max-w-xs">
                    Striving for solutions that are radically clear and
                    effortless, yet possess maximum impact, utility, and lasting
                    value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Certification Image Gallery Lightbox Modal (Magnific Popup style) ── */}
      <CertificateLightbox
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        certificates={CERTIFICATES}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
