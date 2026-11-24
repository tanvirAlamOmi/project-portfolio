"use client";

import { WORK_PROJECTS, WorkProject } from "@/data/workProjects";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

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

  // Filter projects by category when browsing a specific category (e.g. websites, apps)
  const categoryProjects = WORK_PROJECTS.filter(
    (p) => p.category === project.category,
  );
  const projectList =
    categoryProjects.length > 1 ? categoryProjects : WORK_PROJECTS;
  const currentIdx = projectList.findIndex((p) => p.slug === project.slug);
  const safeIdx = currentIdx !== -1 ? currentIdx : 0;
  const prevIdx = (safeIdx - 1 + projectList.length) % projectList.length;
  const nextIdx = (safeIdx + 1) % projectList.length;
  const prevProject = projectList[prevIdx] ?? project;
  const nextProject = projectList[nextIdx] ?? project;

  const prevProjectHref = `/work/${prevProject.category}/${prevProject.slug}`;
  const nextProjectHref = `/work/${nextProject.category}/${nextProject.slug}`;
  const backHref = `/work/${project.category}`;

  // Keyboard navigation: ESC to return to category list, ArrowLeft/Right to switch projects
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push(backHref);
      } else if (e.key === "ArrowLeft") {
        router.push(prevProjectHref);
      } else if (e.key === "ArrowRight") {
        router.push(nextProjectHref);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevProjectHref, nextProjectHref, backHref, router]);

  // Gallery preview screenshots
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

  // Update thumb height and scroll progress based on scrollHeight vs clientHeight
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

      let currentActive = 0;
      for (let i = 0; i < imageRefs.current.length; i++) {
        const el = imageRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom >= containerRect.top + 20) {
          currentActive = i;
        }
      }

      setActiveImageIndex(currentActive);
    };

    // Forward mouse wheel smoothly inside gallery area
    const galleryRow = galleryRowRef.current;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const cont = scrollContainerRef.current;
      if (cont) {
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

  // Dragging custom scrollbar thumb (Mouse)
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

  // Dragging custom scrollbar thumb (Touch)
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

  // Click on scrollbar track jumps to that position
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
    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-4 select-none relative my-auto">
      {/* ── Ambient Radial Glow behind the frame (matching Figma) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(222, 67, 19, 0.45) 0%, rgba(222, 67, 19, 0.12) 50%, transparent 72%)",
            filter: "blur(90px)",
            width: "520px",
            height: "480px",
            top: "10%",
            right: "12%",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            background: "rgba(254, 193, 99, 0.12)",
            filter: "blur(100px)",
            width: "380px",
            height: "340px",
            bottom: "8%",
            left: "8%",
          }}
        />
      </div>

      {/* ── Container wrapper holding Main Frame and Full-Width Bottom Nav (Figma work_preview_all 423:6093) ── */}
      <div className="relative w-full max-w-[1082px] z-10 flex flex-col items-center">
        {/* Top-Right Circular Close Button (Figma Node 423:6114, sitting on top-right corner) */}
        <Link
          href={backHref}
          aria-label="Back to Work"
          title="Back to Work"
          className="group absolute -top-4 -right-4 sm:-top-5 sm:-right-5 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[var(--bg)] flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-[0_0_12px_rgba(228,93,35,0.4)] hover:shadow-[0_0_18px_rgba(228,93,35,0.7)]"
          style={{
            border: "1.5px solid transparent",
            backgroundImage:
              "linear-gradient(var(--bg), var(--bg)), linear-gradient(135deg, #FEC163 0%, #DE4313 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          <X
            className="w-4 h-4 sm:w-5 sm:h-5 text-[#DE4313] group-hover:text-[#FEC163] transition-colors"
            strokeWidth={2}
          />
        </Link>

        {/* ── Main Project Frame (1082px x 581px in Figma) ── */}
        <div
          className="relative w-full bg-[var(--bg)] p-4 sm:p-6 lg:p-7 shadow-[0_0_24px_rgba(222,67,19,0.12)] min-h-[500px] sm:min-h-[540px] lg:h-[581px] flex flex-col justify-between"
          style={{
            border: "1.5px solid transparent",
            borderImageSource:
              "linear-gradient(97.42deg, #FEC163 0%, #DE4313 95.67%)",
            borderImageSlice: 1,
          }}
        >
          {/* Main Grid: Left Gallery + Right Info */}
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch min-h-0">
            {/* ════════ LEFT GALLERY: MAIN SCREENSHOT + SCROLLBAR + THUMBNAILS (col-span-7) ════════ */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full min-h-0 overflow-hidden">
              <div
                ref={galleryRowRef}
                className="flex-1 min-h-0 flex gap-2.5 sm:gap-3.5 items-stretch overflow-hidden"
              >
                {/* 1. Large Main Scrollable Preview Canvas */}
                <div
                  ref={scrollContainerRef}
                  className="flex-1 min-h-0 h-full relative bg-black/5 dark:bg-[#020510]/80 border border-[#DE4313]/30 overflow-y-auto overflow-x-hidden p-2 sm:p-3 overscroll-contain select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
                        <div className="relative w-full overflow-hidden shadow-sm border border-[#DE4313]/20 bg-[var(--bg)]">
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

                {/* 2. Custom Scrollbar Track & Thumb */}
                <div
                  ref={scrollbarTrackRef}
                  onClick={handleTrackClick}
                  className="w-2 sm:w-2.5 h-full rounded-full bg-black/10 dark:bg-[#020510] border border-[#DE4313]/30 relative cursor-pointer flex-shrink-0 select-none overflow-hidden my-auto"
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

                {/* 3. Vertical Thumbnails Strip (Right of main screenshot) */}
                <div className="w-16 sm:w-20 md:w-[90px] flex-shrink-0 flex flex-col gap-2.5 h-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {galleryImages.map((thumb, idx) => {
                    const isActive = activeImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleThumbnailClick(idx)}
                        aria-label={`View image ${idx + 1}`}
                        className={`relative w-full aspect-square flex-shrink-0 bg-black/5 dark:bg-[#020510] overflow-hidden transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "border-2 border-[#DE4313] shadow-[0_0_12px_rgba(222,67,19,0.7)] scale-[1.02]"
                            : "border border-[#DE4313]/25 opacity-60 hover:opacity-100 hover:border-[#DE4313]/60"
                        }`}
                      >
                        <Image
                          src={thumb}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover p-1"
                          sizes="90px"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ════════ RIGHT DETAILS COLUMN: CLIENT + TITLE + DESC + TAGS + ACTION (col-span-5) ════════ */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#DE4313]/40 pl-0 lg:pl-6 flex flex-col justify-between h-full min-h-0 overflow-y-auto pt-4 lg:pt-0">
              <div className="space-y-4">
                {/* Client Name / Brand */}
                <div>
                  <h2 className="font-dm font-black text-xl sm:text-2xl lg:text-[26px] text-[var(--ink)] tracking-wide uppercase leading-tight">
                    {project.client}
                  </h2>
                </div>

                {/* Project Subtitle / Title in Gradient */}
                <h1
                  id="project-single-title"
                  className="font-dm font-bold text-sm sm:text-base tracking-[0.12em] uppercase text-transparent bg-clip-text leading-snug"
                  style={{
                    backgroundImage:
                      "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                  }}
                >
                  {project.title}
                </h1>

                {/* Description Paragraph */}
                <p className="font-almarai text-xs sm:text-[14px] text-[var(--body-text)] leading-relaxed">
                  {project.description}
                </p>

                {/* ── Category Pill Badges (Figma effect_c3301aff: boxShadow 0 0 4px #E45D23) ── */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-4 py-1.5 rounded-full text-xs font-dm font-bold tracking-wide uppercase text-transparent bg-clip-text transition-all select-none hover:scale-105"
                      style={{
                        backgroundImage:
                          "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                        backgroundColor: "var(--bg)",
                        border: "1px solid rgba(228, 93, 35, 0.6)",
                        boxShadow: "0px 0px 4px 0px rgba(228, 93, 35, 1)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons (VIEW CASE STUDY if available) */}
              <div className="pt-5 flex flex-col gap-3">
                {project.hasCaseStudy &&
                (project.caseStudyUrl || project.slug) ? (
                  <Link
                    href={
                      project.caseStudyUrl || `/work/case-study/${project.slug}`
                    }
                    className="group inline-flex items-center gap-3 select-none cursor-pointer w-fit"
                  >
                    <div
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0 shadow-[0_0_12px_rgba(222,67,19,0.55)]"
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
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain brightness-0 invert flex-shrink-0"
                      />
                    </div>

                    <span
                      className="font-dm font-bold text-sm sm:text-[16px] leading-tight tracking-[0.02em] text-transparent bg-clip-text transition-all uppercase"
                      style={{
                        backgroundImage:
                          "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                      }}
                    >
                      VIEW CASE STUDY
                    </span>
                  </Link>
                ) : (
                  <div className="text-xs font-dm text-[var(--body-muted)] italic">
                    Preview only
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ════════ FULL-WIDTH BOTTOM PREVIOUS / NEXT NAVIGATION BAR (Figma Nodes 423:6096, 423:6097, 423:6222, 423:6223) ════════ */}
        <div className="w-full flex items-center select-none pt-4 sm:pt-6 pb-2">
          {/* Left gradient line + Left Arrow pointing to Previous */}
          <Link
            href={prevProjectHref}
            className="flex-1 flex items-center text-[#DE4313] hover:text-[#FEC163] transition-colors group cursor-pointer"
            aria-label={`Previous project: ${prevProject.title}`}
            title={`Previous project: ${prevProject.title}`}
          >
            <div
              className="flex-1 h-[1.5px] transition-opacity group-hover:opacity-100"
              style={{
                background: "linear-gradient(to right, #DE4313, #FEC163)",
              }}
            />
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              className="flex-shrink-0 ml-1.5 transition-transform group-hover:-translate-x-1"
            >
              <path
                d="M6.5 1.5L1.5 6L6.5 10.5"
                stroke="#DE4313"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Previous & Next Text Links */}
          <div className="flex items-center gap-5 sm:gap-7 px-4 sm:px-6 flex-shrink-0 font-dm">
            <Link
              href={prevProjectHref}
              className="font-dm font-medium text-sm sm:text-base text-[var(--ink)] hover:text-[#DE4313] transition-colors cursor-pointer"
              title={`Previous: ${prevProject.title}`}
            >
              Previous
            </Link>

            <Link
              href={nextProjectHref}
              className="font-dm font-medium text-sm sm:text-base text-transparent bg-clip-text hover:opacity-85 transition-opacity cursor-pointer"
              style={{
                backgroundImage:
                  "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
              }}
              title={`Next: ${nextProject.title}`}
            >
              Next
            </Link>
          </div>

          {/* Right Arrow pointing from Next + Right gradient line */}
          <Link
            href={nextProjectHref}
            className="flex-1 flex items-center text-[#DE4313] hover:text-[#FEC163] transition-colors group cursor-pointer"
            aria-label={`Next project: ${nextProject.title}`}
            title={`Next project: ${nextProject.title}`}
          >
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              className="flex-shrink-0 mr-1.5 transition-transform group-hover:translate-x-1"
            >
              <path
                d="M1.5 1.5L6.5 6L1.5 10.5"
                stroke="#DE4313"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              className="flex-1 h-[1.5px] transition-opacity group-hover:opacity-100"
              style={{
                background: "linear-gradient(to right, #FEC163, #DE4313)",
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
