"use client";

import React from "react";
import Image from "next/image";
import { useLoader } from "@/context/LoaderContext";

export default function SiteLoader() {
  const { isLoading, isMounted } = useLoader();

  if (!isMounted) return null;

  return (
    <aside
      aria-label="Loading"
      role="status"
      className={`fixed inset-0 z-[99999] flex items-center justify-center select-none pointer-events-none transition-all duration-400 ease-out ${
        isLoading
          ? "opacity-100 backdrop-blur-[6px] bg-[var(--bg)]/70"
          : "opacity-0 backdrop-blur-none bg-transparent"
      }`}
    >
      <div
        className={`relative w-[130px] h-[130px] sm:w-[144px] sm:h-[144px] flex items-center justify-center transition-transform duration-400 ease-out ${
          isLoading ? "scale-100" : "scale-90"
        }`}
      >
        {/* Ambient Subtle Glow behind Logo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(222, 67, 19, 0.35) 0%, rgba(254, 193, 99, 0.15) 50%, transparent 70%)",
            filter: "blur(18px)",
          }}
        />

        {/* 1. Static Center Logo (Does NOT spin) */}
        <div className="relative z-10 w-[68px] h-[68px] sm:w-[78px] sm:h-[78px] rounded-full flex items-center justify-center shadow-[0_0_24px_rgba(222,67,19,0.35)] select-none">
          <Image
            src="/assets/icons/logo.svg"
            alt="Sejuti Logo"
            width={78}
            height={78}
            priority
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* 2. 360° Rotating Gradient Outer Arc Border */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none animate-spin"
          style={{
            animationDuration: "1.2s",
            animationTimingFunction: "linear",
          }}
        >
          <svg
            width="144"
            height="144"
            viewBox="0 0 144 144"
            fill="none"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="siteLoaderBorderGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
                gradientTransform="rotate(97.42 0.5 0.5)"
              >
                <stop offset="0%" stopColor="#FEC163" />
                <stop offset="95.67%" stopColor="#DE4313" />
              </linearGradient>
            </defs>

            <circle
              cx="72"
              cy="72"
              r="62"
              fill="none"
              stroke="url(#siteLoaderBorderGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="290 395"
            />
          </svg>
        </div>
      </div>
    </aside>
  );
}
