"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

export interface CertificateItem {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  width: number;
  height: number;
}

interface CertificateLightboxProps {
  isOpen: boolean;
  currentIndex: number;
  certificates: CertificateItem[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function CertificateLightbox({
  isOpen,
  currentIndex,
  certificates,
  onClose,
  onNavigate,
}: CertificateLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Reset zoom whenever image changes or modal closes
  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex, isOpen]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handlePrev = useCallback(() => {
    const nextIdx =
      (currentIndex - 1 + certificates.length) % certificates.length;
    onNavigate(nextIdx);
  }, [currentIndex, certificates.length, onNavigate]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % certificates.length;
    onNavigate(nextIdx);
  }, [currentIndex, certificates.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isZoomed) return; // While zoomed in, let user pan/scroll without triggering slide navigation
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen || certificates.length === 0) return null;

  const current = certificates[currentIndex] || certificates[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Certificate Preview Lightbox"
      className="fixed inset-0 z-50 flex flex-col justify-between select-none bg-black/92 backdrop-blur-md animate-fadeIn transition-opacity duration-200"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Top Bar ── */}
      <header className="relative z-30 w-full flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent">
        {/* Title & Counter */}
        <div className="flex flex-col max-w-[60%] sm:max-w-[70%]">
          <div className="flex items-center gap-2 sm:gap-3">
            <span
              className="text-xs sm:text-sm font-dm font-bold text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
              }}
            >
              {currentIndex + 1} / {certificates.length}
            </span>
            <span className="text-white/40 text-xs">•</span>
            <h3 className="font-almarai font-bold text-white text-xs sm:text-sm md:text-base truncate">
              {current.title}
            </h3>
          </div>
          <p className="font-dm text-[11px] sm:text-xs text-white/70 truncate mt-0.5">
            {current.subtitle}
          </p>
        </div>

        {/* Action Controls: Zoom Toggle & Close Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Zoom toggle button */}
          <button
            type="button"
            onClick={() => setIsZoomed((prev) => !prev)}
            title={isZoomed ? "Fit to screen (Zoom Out)" : "Zoom In (Original Size)"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 hover:border-[#FEC163] bg-white/10 hover:bg-white/20 text-white text-xs font-dm font-medium transition-all duration-200 cursor-pointer"
          >
            {isZoomed ? (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>Fit Screen</span>
              </>
            ) : (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>Zoom In</span>
              </>
            )}
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Certificate Lightbox"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 hover:border-[#DE4313] bg-white/10 hover:bg-[#DE4313]/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Main Image Viewport ── */}
      <div
        onClick={(e) => {
          // If clicked directly on backdrop area, close modal
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        className="relative flex-1 w-full flex items-center justify-center overflow-auto px-2 sm:px-16 py-2"
      >
        {/* Previous Button (Desktop) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous Certificate"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/25 hover:border-[#FEC163] bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl hover:scale-110 active:scale-95"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Certificate Image Container */}
        <div
          onClick={() => setIsZoomed((prev) => !prev)}
          className={`relative transition-all duration-300 ease-out flex items-center justify-center ${
            isZoomed
              ? "cursor-zoom-out p-4 sm:p-8 m-auto"
              : "cursor-zoom-in my-auto max-w-[95vw] sm:max-w-[88vw] max-h-[76vh] sm:max-h-[82vh]"
          }`}
          title={isZoomed ? "Click to Fit Screen" : "Click to Zoom In"}
        >
          <Image
            src={current.src}
            alt={current.title}
            width={current.width}
            height={current.height}
            priority
            className={
              isZoomed
                ? "w-auto h-auto min-w-[650px] sm:min-w-[1050px] lg:min-w-[1300px] max-w-none max-h-none object-contain rounded-lg shadow-[0_25px_65px_rgba(0,0,0,0.95)] border border-white/20 select-none"
                : "w-auto h-auto max-h-[74vh] sm:max-h-[80vh] md:max-h-[82vh] max-w-[94vw] sm:max-w-[88vw] lg:max-w-[1100px] object-contain rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/10 select-none"
            }
          />
        </div>

        {/* Next Button (Desktop) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next Certificate"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/25 hover:border-[#FEC163] bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xl hover:scale-110 active:scale-95"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ── Bottom Thumbnail Strip ── */}
      <footer className="relative z-30 w-full flex flex-col items-center justify-center px-4 py-2 sm:py-3 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto max-w-full px-2 py-1 scrollbar-none">
          {certificates.map((item, index) => {
            const isSelected = index === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(index)}
                title={item.title}
                className={`relative w-12 h-9 sm:w-16 sm:h-12 rounded overflow-hidden transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  isSelected
                    ? "ring-2 ring-[#DE4313] scale-110 shadow-[0_0_12px_rgba(222,67,19,0.8)] opacity-100"
                    : "opacity-50 hover:opacity-90 ring-1 ring-white/20"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  width={64}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
