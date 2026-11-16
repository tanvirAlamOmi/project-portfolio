"use client";

import React, { useState, useEffect } from "react";
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

  // Reset active thumbnail index when navigating between projects
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project.slug]);

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

  // Close button functionality - direct redirect to main work page (/work)
  const handleClose = () => {
    router.push("/work");
  };

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

  // Ensure 5 thumbnails exist for the vertical strip matching Figma
  const baseGallery =
    project.cardScreenshots && project.cardScreenshots.length > 0
      ? project.cardScreenshots
      : project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.thumbnail];

  // Populate 5 slots using available gallery images
  const thumbnails = [
    baseGallery[0] || project.thumbnail,
    baseGallery[1] || baseGallery[0] || project.thumbnail,
    baseGallery[2] || baseGallery[0] || project.thumbnail,
    baseGallery[3] || baseGallery[1] || project.thumbnail,
    baseGallery[4] || baseGallery[0] || project.thumbnail,
  ];

  const currentImage = thumbnails[activeImageIndex] || thumbnails[0];

  return (
    <div className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center px-4 sm:px-6 lg:px-10 py-8 sm:py-14 select-none relative">
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
      <div className="relative w-full max-w-5xl z-10 animate-fade-in">
        {/* Top-Right Circular Close Button (Centered on top-right corner, directly redirects to /work) */}
        <Link
          href="/work"
          aria-label="Back to Work"
          title="Back to Work"
          className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[var(--bg)] card-badge-bg border-2 border-[#DE4313] hover:border-[#FEC163] text-[#DE4313] hover:text-[#FEC163] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(222,67,19,0.35)] hover:scale-105"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1.5 1.5L12.5 12.5M1.5 12.5L12.5 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Link>

        {/* Project Box */}
        <div className="relative w-full bg-[var(--bg)] card-badge-bg dark:bg-[#070B19] border-[1.5px] border-[#DE4313]/70 rounded-xs shadow-[0_0_40px_rgba(222,67,19,0.2)] dark:shadow-[0_0_60px_rgba(222,67,19,0.35)] overflow-hidden flex flex-col">
          {/* Main Grid: Left Gallery + Right Info */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[460px] sm:min-h-[520px]">
            {/* ════════ LEFT AREA: MAIN PREVIEW + 5 VERTICAL THUMBNAILS (col-span-8) ════════ */}
            <div className="lg:col-span-8 p-5 sm:p-7 flex flex-col justify-between">
              {/* Image + Thumbnail Strip Row */}
              <div className="flex-1 flex gap-4 sm:gap-5 items-stretch min-h-[340px] sm:min-h-[380px]">
                {/* 1. Large Main Preview Canvas */}
                <div className="flex-1 relative bg-[var(--input-bg)]/50 dark:bg-[#020510] border border-[#DE4313]/30 rounded-xs overflow-hidden flex items-center justify-center p-4">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={currentImage}
                      alt={project.title}
                      fill
                      className="object-contain transition-all duration-300"
                      priority
                    />
                  </div>
                </div>

                {/* 2. Vertical Thumbnail Column (5 Thumbnails matching Figma - Clicking changes active preview) */}
                <div className="w-16 sm:w-20 flex-shrink-0 flex flex-col justify-between gap-2.5">
                  {thumbnails.map((thumb, idx) => {
                    const isActive = activeImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        aria-label={`View image ${idx + 1}`}
                        className={`relative flex-1 w-full bg-[var(--input-bg)]/50 dark:bg-[#020510] rounded-xs overflow-hidden transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "border-2 border-[#DE4313] shadow-[0_0_12px_rgba(222,67,19,0.6)] scale-[1.03]"
                            : "border border-[var(--ink)]/20 dark:border-gray-700/60 opacity-60 hover:opacity-100 hover:border-[#DE4313]/60"
                        }`}
                      >
                        <Image
                          src={thumb}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-contain p-1"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Bottom Previous / Next PROJECT Navigation Bar (Switches full project) */}
              <div className="w-full pt-5 flex items-center select-none text-xs font-dm">
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
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#DE4313]/60 p-6 sm:p-8 flex flex-col justify-between space-y-6">
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
                    className="group w-full max-w-[280px] py-2.5 px-4 rounded-full border border-[#DE4313] hover:border-[#FEC163] bg-[var(--bg)] dark:bg-[#0A0F24] hover:bg-[#FFF0D4] dark:hover:bg-[#0E152E] flex items-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(222,67,19,0.2)] dark:shadow-[0_0_20px_rgba(222,67,19,0.35)]"
                  >
                    {/* Orange Sparkle Icon Circle */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{
                        background:
                          "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M7 0L8.8 5.2L14 7L8.8 8.8L7 14L5.2 8.8L0 7L5.2 5.2L7 0Z"
                          fill="white"
                        />
                      </svg>
                    </div>

                    {/* Text */}
                    <span className="font-dm font-bold text-xs uppercase tracking-wider text-[var(--ink)] group-hover:text-[#DE4313] dark:group-hover:text-[#FEC163] transition-colors">
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
