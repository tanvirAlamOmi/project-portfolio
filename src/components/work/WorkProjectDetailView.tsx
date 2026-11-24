"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WorkProject, WORK_PROJECTS } from "@/data/workProjects";

interface WorkProjectDetailViewProps {
  project: WorkProject;
}

export default function WorkProjectDetailView({
  project,
}: WorkProjectDetailViewProps) {
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbHeightPercent, setThumbHeightPercent] = useState(25);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);
  const scrollbarThumbRef = useRef<HTMLDivElement>(null);
  const galleryRowRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isProgrammaticScroll = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);

  // Find previous and next projects across all work categories
  const allProjects = WORK_PROJECTS;
  const currentIdx = allProjects.findIndex((p) => p.slug === project.slug);
  const safeIdx = currentIdx !== -1 ? currentIdx : 0;
  const prevIdx = (safeIdx - 1 + allProjects.length) % allProjects.length;
  const nextIdx = (safeIdx + 1) % allProjects.length;
  const prevProject = allProjects[prevIdx] ?? project;
  const nextProject = allProjects[nextIdx] ?? project;

  const prevProjectHref = `/work/${prevProject.category}/${prevProject.slug}`;
  const nextProjectHref = `/work/${nextProject.category}/${nextProject.slug}`;

  // Keyboard navigation: ESC to return to /work, ArrowLeft/Right to switch projects
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push("/work");
      } else if (e.key === "ArrowLeft") {
        router.push(prevProjectHref);
      } else if (e.key === "ArrowRight") {
        router.push(nextProjectHref);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevProjectHref, nextProjectHref, router]);

  // Real gallery images for this project (unique set of preview screenshots)
  const galleryImages =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : project.cardScreenshots && project.cardScreenshots.length > 0
      ? project.cardScreenshots
      : [project.thumbnail];

  // Reset active thumbnail index and scroll when navigating between projects
  useEffect(() => {
    setActiveImageIndex(0);
    setScrollProgress(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [project.slug]);

  // Update thumb height and scroll progress based on real scrollHeight vs clientHeight
  const updateScrollMetrics = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll > 2) {
      const heightPercent = Math.max(
        18,
        Math.min(55, (clientHeight / scrollHeight) * 100),
      );
      setThumbHeightPercent(heightPercent);
      setScrollProgress(Math.max(0, Math.min(1, scrollTop / maxScroll)));
    } else {
      setThumbHeightPercent(100);
      setScrollProgress(0);
    }
  }, []);

  // Sync scroll position with active thumbnail index and custom scrollbar
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      updateScrollMetrics();

      if (isProgrammaticScroll.current) return;

      const containerRect = container.getBoundingClientRect();
      const triggerY = containerRect.top + containerRect.height * 0.35;

      let currentIdx = 0;
      for (let i = 0; i < imageRefs.current.length; i++) {
        const el = imageRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom >= containerRect.top + 20) {
          currentIdx = i;
        }
      }

      setActiveImageIndex(currentIdx);
    };

    // Forward mouse wheel smoothly inside the gallery area, supporting Windows deltaMode
    const galleryRow = galleryRowRef.current;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const cont = scrollContainerRef.current;
      if (cont) {
        // Windows wheel sends deltaMode 1 (lines, e.g. deltaY = 3). Multiply by line height ~36px.
        const delta =
          e.deltaMode === 1
            ? e.deltaY * 36
            : e.deltaMode === 2
            ? e.deltaY * 300
            : e.deltaY;
        cont.scrollTop += delta;
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    if (galleryRow) {
      galleryRow.addEventListener("wheel", handleWheel, { passive: false });
    }

    // ResizeObserver ensures metrics stay accurate when images finish loading
    const resizeObserver = new ResizeObserver(() => {
      updateScrollMetrics();
    });

    resizeObserver.observe(container);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    updateScrollMetrics();
    window.addEventListener("resize", updateScrollMetrics);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (galleryRow) {
        galleryRow.removeEventListener("wheel", handleWheel);
      }
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScrollMetrics);
    };
  }, [updateScrollMetrics]);

  // Dragging the custom scrollbar thumb (Mouse)
  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    dragStartScrollTopRef.current = scrollContainerRef.current?.scrollTop || 0;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (
        !isDraggingRef.current ||
        !scrollContainerRef.current ||
        !scrollbarTrackRef.current
      )
        return;

      const track = scrollbarTrackRef.current;
      const container = scrollContainerRef.current;
      const trackHeight = track.clientHeight;
      const thumbHeightPx = (thumbHeightPercent / 100) * trackHeight;
      const maxThumbTravel = trackHeight - thumbHeightPx;

      if (maxThumbTravel <= 0) return;

      const deltaY = moveEvent.clientY - dragStartYRef.current;
      const maxScroll = container.scrollHeight - container.clientHeight;
      const scrollDelta = (deltaY / maxThumbTravel) * maxScroll;

      container.scrollTop = Math.max(
        0,
        Math.min(maxScroll, dragStartScrollTopRef.current + scrollDelta),
      );
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Dragging the custom scrollbar thumb (Touch)
  const handleThumbTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    if (!touch) return;
    isDraggingRef.current = true;
    dragStartYRef.current = touch.clientY;
    dragStartScrollTopRef.current = scrollContainerRef.current?.scrollTop || 0;

    const onTouchMove = (moveEvent: TouchEvent) => {
      if (
        !isDraggingRef.current ||
        !scrollContainerRef.current ||
        !scrollbarTrackRef.current
      )
        return;

      const track = scrollbarTrackRef.current;
      const container = scrollContainerRef.current;
      const trackHeight = track.clientHeight;
      const thumbHeightPx = (thumbHeightPercent / 100) * trackHeight;
      const maxThumbTravel = trackHeight - thumbHeightPx;

      if (maxThumbTravel <= 0) return;

      const deltaY = moveEvent.touches[0].clientY - dragStartYRef.current;
      const maxScroll = container.scrollHeight - container.clientHeight;
      const scrollDelta = (deltaY / maxThumbTravel) * maxScroll;

      container.scrollTop = Math.max(
        0,
        Math.min(maxScroll, dragStartScrollTopRef.current + scrollDelta),
      );
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
  };

  // Clicking on the track jumps to that position
  const handleTrackClick = (e: React.MouseEvent) => {
    if (e.target === scrollbarThumbRef.current) return;
    const track = scrollbarTrackRef.current;
    const container = scrollContainerRef.current;
    if (!track || !container) return;

    const rect = track.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, clickY / rect.height));
    const maxScroll = container.scrollHeight - container.clientHeight;

    container.scrollTo({
      top: ratio * maxScroll,
      behavior: "smooth",
    });
  };

  // Click on a thumbnail smoothly scrolls the canvas directly to that image
  const handleThumbnailClick = (idx: number) => {
    setActiveImageIndex(idx);
    const targetEl = imageRefs.current[idx];
    const container = scrollContainerRef.current;
    if (targetEl && container) {
      isProgrammaticScroll.current = true;
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const targetScrollTop =
        targetRect.top - containerRect.top + container.scrollTop;

      container.scrollTo({
        top: Math.max(0, targetScrollTop - 6),
        behavior: "smooth",
      });

      setTimeout(() => {
        isProgrammaticScroll.current = false;
        updateScrollMetrics();
      }, 550);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 select-none relative">
      {/* ── Ambient Glow behind the container ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(222, 67, 19, 0.3) 0%, rgba(222, 67, 19, 0.08) 50%, transparent 70%)",
            filter: "blur(90px)",
            width: "520px",
            height: "480px",
            top: "15%",
            right: "10%",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            background: "rgba(254, 193, 99, 0.08)",
            filter: "blur(100px)",
            width: "400px",
            height: "360px",
            bottom: "10%",
            left: "5%",
          }}
        />
      </div>

      {/* ── Outer Project Single Container Frame with Circular Close Button ── */}
      <div className="relative w-full max-w-5xl h-[min(650px,86vh)] max-h-[86vh] z-10 animate-fade-in flex flex-col">
        {/* Top-Right Circular Close Button (Centered on top-right corner, directly redirects to /work) */}
        <Link
          href="/work"
          aria-label="Back to Work"
          title="Back to Work"
          className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--bg)] card-badge-bg border-2 border-[#DE4313] hover:border-[#FEC163] text-[#DE4313] hover:text-[#FEC163] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(222,67,19,0.35)] hover:scale-105"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path
              d="M1.5 1.5L12.5 12.5M1.5 12.5L12.5 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Link>

        {/* Project Box */}
        <div className="relative w-full h-full bg-[var(--bg)] card-badge-bg dark:bg-[#070B19] border-[1.5px] border-[#DE4313]/70 rounded-xs shadow-[0_0_40px_rgba(222,67,19,0.2)] dark:shadow-[0_0_60px_rgba(222,67,19,0.35)] overflow-hidden flex flex-col">
          {/* Main Grid: Left Gallery + Right Info */}
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-0">
            {/* ════════ LEFT AREA: MAIN PREVIEW + SCROLLBAR + THUMBNAILS (col-span-8) ════════ */}
            <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col justify-between h-full min-h-0 overflow-hidden">
              {/* Image + Thumbnail Strip Row with Scrollbar in the middle */}
              <div
                ref={galleryRowRef}
                className="flex-1 min-h-0 flex gap-2.5 sm:gap-3.5 items-stretch overflow-hidden"
              >
                {/* 1. Large Main Scrollable Preview Canvas (Only images inside here scroll!) */}
                <div
                  ref={scrollContainerRef}
                  className="flex-1 min-h-0 h-full relative bg-[var(--input-bg)]/50 dark:bg-[#020510] border border-[#DE4313]/30 rounded-xs overflow-y-auto overflow-x-hidden p-2 sm:p-3 overscroll-contain select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  tabIndex={0}
                  aria-label="Project images gallery"
                >
                  <div
                    ref={contentRef}
                    className="w-full flex flex-col gap-4 sm:gap-5 items-center pb-2"
                  >
                    {galleryImages.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        ref={(el) => {
                          imageRefs.current[idx] = el;
                        }}
                        data-image-index={idx}
                        className="w-full flex flex-col items-center justify-center flex-shrink-0"
                      >
                        <div className="relative w-full rounded-xs overflow-hidden shadow-md border border-[#DE4313]/25 bg-[var(--bg)] dark:bg-[#070B19]">
                          <Image
                            src={imgSrc}
                            alt={`${project.title} - Preview Page ${idx + 1}`}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-contain block select-none pointer-events-none"
                            priority={idx === 0}
                            onLoad={() => updateScrollMetrics()}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. DEDICATED SCROLLBAR (Positioned directly between Main Image and Right Side Small Images) */}
                <div
                  ref={scrollbarTrackRef}
                  onClick={handleTrackClick}
                  className="w-2 sm:w-2.5 h-full rounded-full bg-[var(--input-bg)]/80 dark:bg-[#020510] border border-[#DE4313]/30 relative cursor-pointer flex-shrink-0 select-none overflow-hidden my-auto"
                  title="Drag or click to scroll images"
                >
                  <div
                    ref={scrollbarThumbRef}
                    onMouseDown={handleThumbMouseDown}
                    onTouchStart={handleThumbTouchStart}
                    className="w-full rounded-full cursor-grab active:cursor-grabbing hover:brightness-110 transition-colors absolute left-0"
                    style={{
                      height: `${thumbHeightPercent}%`,
                      top: `${scrollProgress * (100 - thumbHeightPercent)}%`,
                      background:
                        "linear-gradient(180deg, #FEC163 0%, #DE4313 100%)",
                      boxShadow: "0 0 8px rgba(222, 67, 19, 0.7)",
                    }}
                  />
                </div>

                {/* 3. Vertical Thumbnail Column (Right Side Small Images with Fixed Heights) */}
                <div className="w-16 sm:w-20 flex-shrink-0 flex flex-col gap-2 sm:gap-2.5 h-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {galleryImages.map((thumb, idx) => {
                    const isActive = activeImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleThumbnailClick(idx)}
                        aria-label={`View image ${idx + 1}`}
                        className={`relative w-full h-[58px] sm:h-[66px] flex-shrink-0 bg-[var(--input-bg)]/50 dark:bg-[#020510] rounded-xs overflow-hidden transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "border-2 border-[#DE4313] shadow-[0_0_12px_rgba(222,67,19,0.6)] scale-[1.02]"
                            : "border border-[var(--ink)]/20 dark:border-gray-700/60 opacity-60 hover:opacity-100 hover:border-[#DE4313]/60"
                        }`}
                      >
                        <Image
                          src={thumb}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover p-1"
                          sizes="80px"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Previous / Next PROJECT Navigation Bar */}
              <div className="w-full pt-3 sm:pt-4 flex items-center select-none text-xs font-dm flex-shrink-0">
                {/* Left arrow and line -> Previous Project */}
                <Link
                  href={prevProjectHref}
                  className="flex-1 flex items-center text-[#DE4313] hover:text-[#FEC163] transition-colors cursor-pointer group pr-3"
                  aria-label={`Previous project: ${prevProject.title}`}
                  title={`Previous project: ${prevProject.title}`}
                >
                  <svg
                    width="8"
                    height="10"
                    viewBox="0 0 8 10"
                    fill="none"
                    className="flex-shrink-0 mr-1"
                  >
                    <path
                      d="M7 1L1 5L7 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div
                    className="flex-1 h-[1.5px]"
                    style={{
                      background:
                        "linear-gradient(to right, #DE4313, #FEC163)",
                    }}
                  />
                </Link>

                {/* Previous & Next Project Text Links */}
                <div className="flex items-center gap-4 sm:gap-6 px-3 flex-shrink-0">
                  <Link
                    href={prevProjectHref}
                    className="font-dm font-bold text-xs sm:text-sm text-[var(--ink)] hover:text-[#DE4313] dark:text-gray-300 dark:hover:text-[#FEC163] transition-colors cursor-pointer"
                    title={`Previous project: ${prevProject.title}`}
                  >
                    Previous
                  </Link>
                  <Link
                    href={nextProjectHref}
                    className="font-dm font-bold text-xs sm:text-sm text-[var(--ink)] hover:text-[#DE4313] dark:text-gray-300 dark:hover:text-[#FEC163] transition-colors cursor-pointer"
                    title={`Next project: ${nextProject.title}`}
                  >
                    Next
                  </Link>
                </div>

                {/* Right line and arrow -> Next Project */}
                <Link
                  href={nextProjectHref}
                  className="flex-1 flex items-center text-[#DE4313] hover:text-[#FEC163] transition-colors cursor-pointer group pl-3"
                  aria-label={`Next project: ${nextProject.title}`}
                  title={`Next project: ${nextProject.title}`}
                >
                  <div
                    className="flex-1 h-[1.5px]"
                    style={{
                      background:
                        "linear-gradient(to right, #FEC163, #DE4313)",
                    }}
                  />
                  <svg
                    width="8"
                    height="10"
                    viewBox="0 0 8 10"
                    fill="none"
                    className="flex-shrink-0 ml-1"
                  >
                    <path
                      d="M1 1L7 5L1 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* ════════ RIGHT COLUMN: CLIENT LOGO + DETAILS + VIEW CASE STUDY (col-span-4) ════════ */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#DE4313]/60 p-4 sm:p-6 flex flex-col justify-between h-full min-h-0 overflow-y-auto space-y-4">
              <div className="space-y-4">
                {/* Client Logo Header */}
                <div className="flex items-center gap-2">
                  {project.id === "elevate-solutions-web" ||
                  project.slug === "elevate-solutions-brand" ? (
                    <div className="flex items-center gap-1.5">
                      <span className="font-dm font-black text-xl tracking-wider text-[var(--ink)]">
                        ELE
                      </span>
                      <span className="text-[#DE4313] text-lg">◆</span>
                      <span className="font-dm font-black text-xl tracking-wider text-[var(--ink)] -ml-0.5">
                        ATE
                      </span>
                    </div>
                  ) : project.id === "ezeedrop" ? (
                    <div className="flex items-center gap-0.5">
                      <span className="font-sans font-bold text-lg text-[var(--ink)]">
                        e
                      </span>
                      <span className="font-sans font-black text-xl text-[#FEC163]">
                        Z
                      </span>
                      <span className="font-sans font-bold text-lg text-[var(--ink)]">
                        ee
                      </span>
                      <span className="text-[#DE4313]">📍</span>
                      <span className="font-sans font-bold text-lg text-[var(--ink)] -ml-1">
                        rop
                      </span>
                    </div>
                  ) : (
                    <span className="font-dm font-black text-lg text-[var(--ink)] tracking-wide">
                      {project.client}
                    </span>
                  )}
                </div>

                {/* Subtitle / Title */}
                <h1
                  id="project-single-title"
                  className="font-dm font-bold text-xs sm:text-sm tracking-[0.14em] uppercase text-[var(--ink)] leading-snug"
                >
                  {project.title}
                </h1>

                {/* Description Paragraph */}
                <p className="font-dm text-xs sm:text-[13px] text-[var(--body-text)] leading-relaxed">
                  {project.description}
                </p>

                {/* Tags Pill Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[11px] font-dm text-[var(--ink)] bg-[var(--bg)] card-badge-bg border border-[#DE4313]/60 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── CONDITIONAL CASE STUDY ACTION BUTTON ── */}
              {/* Button ONLY renders if project hasCaseStudy === true */}
              <div className="pt-4">
                {project.hasCaseStudy && (project.caseStudyUrl || project.slug) ? (
                  <Link
                    href={
                      project.caseStudyUrl ||
                      `/work/case-study/${project.slug}`
                    }
                    className="group relative inline-flex items-center gap-3.5 px-6 py-3 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                    style={{
                      border: "1.5px solid transparent",
                      backgroundImage:
                        "linear-gradient(var(--bg), var(--bg)), linear-gradient(135deg, #FEC163 0%, #DE4313 100%)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                      boxShadow: "0 0 20px rgba(222,67,19,0.25)",
                    }}
                  >
                    {/* Orange Diamond Icon Circle */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform duration-300 shadow-[0_2px_10px_rgba(222,67,19,0.4)]"
                      style={{
                        background:
                          "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                      }}
                    >
                      <Image
                        src="/btn-icon-dimond.png"
                        alt=""
                        width={18}
                        height={17}
                        className="w-[15px] h-[14px] object-contain brightness-0 invert"
                      />
                    </div>

                    {/* Text */}
                    <span className="font-dm font-bold text-[16px] sm:text-[18px] uppercase tracking-[0.02em] text-[var(--ink)] group-hover:text-[#DE4313] dark:group-hover:text-[#FEC163] transition-colors">
                      VIEW CASE STUDY
                    </span>
                  </Link>
                ) : (
                  <div className="text-[11px] font-dm text-[var(--body-muted)] italic">
                    Preview only (No case study attached)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
