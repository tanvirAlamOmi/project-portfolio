"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// ═════════════════════════════════════════════════════════════════════════════
// ⚡ CURSOR SPEED & MOTION SETTINGS (কার্সরের স্পিড ও সেটিংস)
// ═════════════════════════════════════════════════════════════════════════════
// USE_SPRING:
// • false (Default & Recommended): 1:1 Instant Speed (হার্ডওয়্যার মাউসের সাথে ০% ল্যাগ/ফুল স্পিড)
// • true: Smooth Spring Physics (মাউসের পেছনে স্মুথ ট্রেইল ইফেক্ট)
const USE_SPRING = false;

// যদি USE_SPRING = true রাখেন, তবে এখান থেকে স্পিড অ্যাডজাস্ট করতে পারবেন:
// • stiffness বেশি দিলে কার্সর দ্রুত ও টাইটলি মাউস ফলো করবে (যেমন: 1200 - 1800)
// • damping কম দিলে ল্যাগ কমবে
// • mass কম দিলে কার্সর হালকা ও দ্রুত চলবে (যেমন: 0.04 - 0.08)
const SPRING_CONFIG = { damping: 32, stiffness: 1400, mass: 0.05 };

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(false);

  const checkClickable = useCallback((target: EventTarget | null) => {
    if (!target || !(target instanceof Element)) return false;
    return !!target.closest(
      'a, button, [role="button"], input[type="submit"], input[type="button"], select, summary, .cursor-pointer, [data-cursor="view"], [data-cursor="pointer"]'
    );
  }, []);

  useEffect(() => {
    setMounted(true);

    // Only flag as touch if coarse-only screen with no hover
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    ) {
      setIsTouchDevice(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsTouchDevice(false);
      const x = e.clientX;
      const y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      const isClickable = checkClickable(e.target);
      if (isHoveredRef.current !== isClickable) {
        isHoveredRef.current = isClickable;
        setIsHovered(isClickable);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const isClickable = checkClickable(e.target);
      if (isHoveredRef.current !== isClickable) {
        isHoveredRef.current = isClickable;
        setIsHovered(isClickable);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
      isHoveredRef.current = false;
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleTouchStart = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
      setIsTouchDevice(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [checkClickable]);

  // Toggle class on <html> to hide default OS cursor when custom cursor is active
  useEffect(() => {
    if (mounted && !isTouchDevice && isVisible) {
      document.documentElement.classList.add("custom-cursor-active");
    } else {
      document.documentElement.classList.remove("custom-cursor-active");
    }
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [mounted, isTouchDevice, isVisible]);

  if (!mounted || isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[999999] select-none will-change-transform"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.15s ease",
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
      }}
    >
      <motion.div
        animate={{
          scale: isPressed ? 0.9 : 1,
        }}
        transition={{ duration: 0.05 }}
      >
        <AnimatePresence mode="wait">
          {isHovered ? (
            /* ── Expanded Hover State: Signature Notched Sparkle Icon + VIEW Badge ── */
            <motion.div
              key="cursor-hovered-view"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.04 } }}
              transition={{ type: "spring", stiffness: 1800, damping: 30 }}
              className="relative flex items-center justify-center gap-1.5 select-none"
            >
              {/* 1. Signature Notched Outer Ring with Gradient Stroke */}
              <div className="relative w-[46px] h-[46px] flex items-center justify-center flex-shrink-0">
                <svg
                  width="46"
                  height="46"
                  viewBox="0 0 58 58"
                  fill="none"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                >
                  <defs>
                    <linearGradient
                      id="customCursorViewRingGrad"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#FEC163" />
                      <stop offset="100%" stopColor="#DE4313" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 51.1 13.5 A 27 27 0 1 0 51.1 44.5"
                    stroke="url(#customCursorViewRingGrad)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>

                {/* 2. Inner Glowing Gradient Circle with Diamond PNG */}
                <div
                  className="w-[28px] h-[28px] rounded-full flex items-center justify-center shadow-[0_0_16px_rgba(222,67,19,0.7)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #FEC163 0%, #DE4313 100%)",
                  }}
                >
                  <Image
                    src="/btn-icon-dimond.png"
                    alt=""
                    width={18}
                    height={17}
                    className="w-3.5 h-3.5 object-contain brightness-0 invert flex-shrink-0"
                  />
                </div>
              </div>

              {/* 3. VIEW Text Badge */}
              <span
                className="font-dm font-bold text-xs tracking-[0.06em] uppercase text-transparent bg-clip-text select-none drop-shadow-sm pr-1 whitespace-nowrap"
                style={{
                  backgroundImage:
                    "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                }}
              >
                VIEW
              </span>
            </motion.div>
          ) : (
            /* ── Default State: Sleek glowing accent cursor ── */
            <motion.div
              key="cursor-default"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.04 } }}
              transition={{ type: "spring", stiffness: 1800, damping: 30 }}
              className="relative flex items-center justify-center"
            >
              {/* Outer halo ring */}
              <div className="w-8 h-8 rounded-full border border-[#DE4313]/50 shadow-[0_0_12px_rgba(222,67,19,0.35)] flex items-center justify-center bg-[var(--bg)]/10 backdrop-blur-[1px]">
                {/* Inner core gradient dot */}
                <div
                  className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(222,67,19,0.8)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #FEC163 0%, #DE4313 100%)",
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
