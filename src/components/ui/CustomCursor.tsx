"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast, responsive spring physics (tight tracking with zero noticeable lag)
  const springConfig = { damping: 26, stiffness: 750, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const checkClickable = useCallback((target: EventTarget | null) => {
    if (!target || !(target instanceof Element)) return false;
    return !!target.closest(
      'a, button, [role="button"], input[type="submit"], input[type="button"], select, summary, .cursor-pointer, [data-cursor="view"]'
    );
  }, []);

  useEffect(() => {
    // Detect touch / mobile devices (hide custom cursor on touch)
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0)
    ) {
      setIsTouchDevice(true);
      return;
    }

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Instant hit-test evaluation on every mouse tick
      const clickable = checkClickable(e.target);
      setIsHovered(clickable);
    };

    const handleMouseOver = (e: MouseEvent) => {
      setIsHovered(checkClickable(e.target));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, checkClickable]);

  if (!mounted || isTouchDevice) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[999999] select-none"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isPressed ? 0.92 : 1,
      }}
      transition={{ duration: 0.08 }}
    >
      <AnimatePresence>
        {isHovered ? (
          /* ── Expanded Hover State: Signature Notched Sparkle Icon (Enlarged, No background) ── */
          <motion.div
            key="cursor-hovered-view"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.08 } }}
            transition={{ type: "spring", stiffness: 750, damping: 28 }}
            className="relative flex items-center justify-center select-none"
          >
            {/* 1. Signature Notched Outer Ring with Gradient Stroke (Enlarged) */}
            <div className="relative w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] flex items-center justify-center flex-shrink-0">
              <svg
                width="54"
                height="54"
                viewBox="0 0 58 58"
                fill="none"
                className="absolute inset-0 w-full h-full"
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

              {/* 2. Inner Glowing Gradient Circle */}
              <div
                className="w-[32px] h-[32px] sm:w-[35px] sm:h-[35px] rounded-full flex items-center justify-center shadow-[0_0_16px_rgba(222,67,19,0.7)]"
                style={{
                  background:
                    "linear-gradient(135deg, #FEC163 0%, #DE4313 100%)",
                }}
              >
                {/* 3. Center White 4-Point Sparkle Icon */}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
                  <path d="M8 0C8 4.41828 4.41828 8 0 8C4.41828 8 8 11.5817 8 16C8 11.5817 11.5817 8 16 8C11.5817 8 8 4.41828 8 0Z" />
                </svg>
              </div>
            </div>

            {/* ── Optional VIEW Label (Commented out as requested; uncomment if needed later) ── */}
            {/*
            <span
              className="font-dm font-bold text-[11px] sm:text-xs tracking-[0.18em] uppercase pl-1.5 text-transparent bg-clip-text select-none"
              style={{
                backgroundImage:
                  "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
              }}
            >
              VIEW
            </span>
            */}
          </motion.div>
        ) : (
          /* ── Default State: Sleek glowing accent cursor ── */
          <motion.div
            key="cursor-default"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.08 } }}
            transition={{ type: "spring", stiffness: 750, damping: 28 }}
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
  );
}
