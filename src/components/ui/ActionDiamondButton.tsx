"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/utils/asset";

interface ActionDiamondButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}

export default function ActionDiamondButton({
  label,
  onClick,
  href,
  type = "button",
  disabled = false,
  className = "",
  target,
  rel,
}: ActionDiamondButtonProps) {
  const content = (
    <div
      className={`group inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none transition-transform duration-200 active:scale-95 ${
        disabled ? "opacity-60 pointer-events-none" : ""
      } ${className}`}
    >
      {/* Signature Notched Ring + Filled Circle + Real Diamond Icon */}
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        {/* Outer Crescent Ring (Notched on the right side) */}
        <svg
          width="54"
          height="58"
          viewBox="0 0 54 58"
          fill="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <defs>
            <linearGradient
              id="actionBtnRingGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FEC163" />
              <stop offset="100%" stopColor="#DE4313" />
            </linearGradient>
          </defs>
          <path
            d="M 46 44.5 A 25 25 0 1 1 46 13.5"
            stroke="url(#actionBtnRingGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>

        {/* Inner Filled Circle with Gradient & Diamond PNG */}
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

      {/* Button Text matching Figma Typography (DM Sans Bold 18px) */}
      <span
        className="font-dm font-bold text-base sm:text-[18px] leading-tight tracking-[0.02em] uppercase text-transparent bg-clip-text transition-opacity duration-200 group-hover:opacity-85 whitespace-nowrap"
        style={{
          backgroundImage:
            "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
        }}
      >
        {label}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className="inline-block"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-block bg-transparent border-0 p-0 text-left cursor-pointer focus:outline-none"
    >
      {content}
    </button>
  );
}
