"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionBadge from "@/components/ui/SectionBadge";
import { Project } from "@/data/projects";
import defaultFeaturedProjects from "@/data/featuredProjects.json";

function VerticalWorkTab() {
  return (
    <div className="hidden lg:flex flex-shrink-0 pt-2 lg:absolute lg:left-[calc(100%-1.5px)] lg:top-2">
      <Link
        href="/work"
        className="group flex items-center gap-3.5 select-none hover:opacity-85 transition-opacity"
        title="View All Work"
      >
        <div
          className="w-[1.5px] h-[210px]"
          style={{
            background:
              "linear-gradient(97.51deg, #FEC163 -37.59%, #DE4313 94.05%)",
          }}
        />

        <div className="flex flex-col items-center justify-between h-[210px] py-1">
          <Image
            src="/btn-icon-dimond.png"
            alt=""
            width={18}
            height={17}
            className="w-[15px] h-[14px] object-contain flex-shrink-0"
          />

          <span
            className="text-xs font-dm font-bold tracking-[0.2em] text-transparent bg-clip-text [writing-mode:vertical-rl] whitespace-nowrap"
            style={{
              backgroundImage:
                "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
            }}
          >
            VIEW ALL WORK
          </span>

          <Image
            src="/btn-icon-dimond.png"
            alt=""
            width={18}
            height={17}
            className="w-[15px] h-[14px] object-contain flex-shrink-0"
          />
        </div>
      </Link>
    </div>
  );
}

function CaseStudyButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group/btn inline-flex items-center gap-3 select-none cursor-pointer"
      title={label}
    >
      <div className="relative w-[54px] h-[54px] flex items-center justify-center flex-shrink-0">
        <svg
          width="54"
          height="54"
          viewBox="0 0 58 58"
          fill="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M 51.1 13.5 A 27 27 0 1 0 51.1 44.5"
            stroke="url(#workBtnRingGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-300 group-hover/btn:stroke-[2]"
          />
        </svg>

        <div
          className="w-[36px] h-[36px] rounded-full flex items-center justify-center shadow-[0_0_14px_rgba(222,67,19,0.55)] transition-transform duration-300 group-hover/btn:scale-105"
          style={{
            background: "linear-gradient(135deg, #FEC163 0%, #DE4313 100%)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="white">
            <path d="M8 0C8 4.41828 4.41828 8 0 8C4.41828 8 8 11.5817 8 16C8 11.5817 11.5817 8 16 8C11.5817 8 8 4.41828 8 0Z" />
          </svg>
        </div>
      </div>

      <span
        className="font-dm font-bold text-xs sm:text-sm tracking-wider uppercase text-transparent bg-clip-text transition-opacity duration-200 group-hover/btn:opacity-85"
        style={{
          backgroundImage:
            "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
        }}
      >
        VIEW CASE STUDY
      </span>
    </Link>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardBorderStyle = {
    border: "1.5px solid",
    borderImageSource:
      "linear-gradient(97.51deg, #FEC163 -37.59%, #DE4313 94.05%)",
    borderImageSlice: 1,
  };

  return (
    <div
      style={cardBorderStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
      className="group relative p-6 sm:p-10 pt-12 sm:pt-14 lg:pt-16 min-h-[480px] sm:min-h-[520px] flex flex-col justify-between cursor-pointer select-none"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(222, 67, 19, 0.22) 0%, rgba(222, 67, 19, 0) 70%)",
            width: "420px",
            height: "420px",
            top: "20%",
            right: "10%",
            filter: "blur(80px)",
            transform: "translateZ(0)",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 sm:w-44 md:w-52 lg:w-60 h-6 sm:h-8 md:h-10 lg:h-12 card-badge-bg z-[1]"
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center px-4 select-none">
        <Image
          src={project.logo ?? "/assets/icons/work-logo.png"}
          alt={project.client}
          width={240}
          height={110}
          className="h-10 sm:h-12 md:h-14 lg:h-[72px] w-auto object-contain transition-all duration-300"
          priority
        />
      </div>

      <div className="relative z-10 w-full min-h-[380px] sm:min-h-[440px] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 flex-1 overflow-hidden">
        <div
          className={`transition-all duration-500 ease-out flex flex-col gap-4 sm:gap-5 ${
            isHovered
              ? "w-full lg:w-[46%] opacity-100 translate-x-0 pointer-events-auto max-h-[600px] visible"
              : "w-0 lg:w-0 opacity-0 -translate-x-8 pointer-events-none max-h-0 overflow-hidden invisible"
          } group-hover:w-full group-hover:lg:w-[46%] group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto group-hover:max-h-[600px] group-hover:visible`}
        >
          <h4 className="font-dm font-bold text-base sm:text-lg uppercase tracking-wide text-[var(--ink)] leading-snug">
            {project.title}
          </h4>

          <p className="font-almarai text-sm sm:text-base leading-relaxed text-[var(--body-muted)]">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 text-xs font-dm font-medium text-[var(--ink)] rounded-full select-none transition-shadow duration-200"
                style={{
                  boxShadow: "0px 0px 4px 0px #E45D23",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-3" onClick={(e) => e.stopPropagation()}>
            <CaseStudyButton
              href={project.caseStudyUrl ?? `/work/case-study/${project.slug}`}
              label={`View ${project.client} case study`}
            />
          </div>
        </div>

        <div
          className={`transition-all duration-500 ease-out flex items-center justify-center ${
            isHovered
              ? "w-full lg:w-[54%] lg:justify-end"
              : "w-full flex-1 justify-center mx-auto"
          } group-hover:w-full group-hover:lg:w-[54%] group-hover:lg:justify-end`}
        >
          <div
            className={`relative transition-all duration-500 ease-out ${
              isHovered
                ? "w-full h-[280px] sm:h-[360px] lg:h-[420px]"
                : "w-full max-w-[580px] sm:max-w-[660px] lg:max-w-[720px] h-[300px] sm:h-[380px] lg:h-[440px] mx-auto"
            } group-hover:w-full group-hover:h-[280px] group-hover:sm:h-[360px] group-hover:lg:h-[420px]`}
          >
            <Image
              src={
                project.coverImage ?? "/assets/projects/aamar-pharma-mockup.png"
              }
              alt={project.client}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectSliderBar({
  currentIndex,
  totalCount,
  onSelect,
  onPrev,
  onNext,
}: {
  currentIndex: number;
  totalCount: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  }) {
  return (
    <div className="w-full flex items-center select-none pt-2">
      <button
        onClick={onPrev}
        className="flex-1 flex items-center text-[#DE4313] hover:opacity-80 transition-opacity cursor-pointer group"
        aria-label="Previous project"
      >
        <svg
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
          className="flex-shrink-0"
        >
          <path
            d="M8 1L2 6L8 11M2 6H10"
            stroke="#DE4313"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div
          className="flex-1 h-[1.5px]"
          style={{
            background: "linear-gradient(to right, #DE4313, #FEC163)",
          }}
        />
      </button>

      <div className="flex items-center gap-6 sm:gap-8 px-5 sm:px-7 flex-shrink-0">
        {Array.from({ length: totalCount }).map((_, i) => {
          const isActive = i === currentIndex;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`font-dm text-sm sm:text-base cursor-pointer transition-all ${
                isActive
                  ? "font-bold text-transparent bg-clip-text"
                  : "font-normal text-[var(--ink)] opacity-50 hover:opacity-100"
              }`}
              style={
                isActive
                  ? {
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                    }
                  : undefined
              }
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        className="flex-1 flex items-center text-[#DE4313] hover:opacity-80 transition-opacity cursor-pointer group"
        aria-label="Next project"
      >
        <div
          className="flex-1 h-[1.5px]"
          style={{
            background: "linear-gradient(to right, #FEC163, #DE4313)",
          }}
        />

        <svg
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
          className="flex-shrink-0"
        >
          <path
            d="M2 1L8 6L2 11M0 6H8"
            stroke="#DE4313"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default function FeaturedWorkSection() {
  const [projects, setProjects] = useState<Project[]>(
    defaultFeaturedProjects as Project[]
  );
  const [idx, setIdx] = useState(0);

  // Client-side fetch from /data/featuredProjects.json
  useEffect(() => {
    fetch("/data/featuredProjects.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch featured projects JSON");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((err) => {
        console.warn("Using bundled featured projects JSON:", err);
      });
  }, []);

  const currentProject = projects[idx] ?? projects[0];

  const prev = () =>
    setIdx((i) => (i - 1 + projects.length) % projects.length);
  const next = () => setIdx((i) => (i + 1) % projects.length);

  return (
    <section id="work" className="relative w-full py-16 sm:py-24 overflow-x-clip">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(222, 67, 19, 0.4) 0%, rgba(222, 67, 19, 0) 70%)",
            width: "480px",
            height: "480px",
            top: "-60px",
            right: "-180px",
            filter: "blur(50px)",
            transform: "translateZ(0)",
          }}
        />
      </div>

      <div className="w-full home-section-container relative z-10 flex flex-col gap-12 sm:gap-14">
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 relative">
          <SectionBadge num="02" label="WORK" />

          <div className="flex-1 max-w-2xl flex flex-col justify-center gap-5 lg:pt-2">
            <h2 className="font-almarai text-2xl sm:text-3xl lg:text-[32px] font-normal text-[var(--ink)] leading-snug">
              Blending aesthetics &amp; functionality
            </h2>

            <p className="font-almarai text-sm sm:text-base text-[var(--body-muted)] leading-relaxed">
              From websites and apps to full-fledged digital systems, projects
              range from business tools to consumer products — spanning
              industries like healthcare, education, non-profits, e-commerce,
              travel, finance, and more — designed for companies of all sizes
              within agency, in-house, and freelance settings.
            </p>

            <h3 className="font-dm font-bold text-3xl sm:text-4xl text-gradient block leading-none pt-2">
              Featured Projects
            </h3>
          </div>

          <VerticalWorkTab />
        </div>

        {currentProject && <ProjectCard project={currentProject} />}

        <ProjectSliderBar
          currentIndex={idx}
          totalCount={projects.length}
          onSelect={setIdx}
          onPrev={prev}
          onNext={next}
        />
      </div>

      <svg
        width="0"
        height="0"
        className="absolute pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="workDiamondGrad"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
            gradientTransform="rotate(129.89 0.5 0.5)"
          >
            <stop offset="-29.32%" stopColor="#FEC163" />
            <stop offset="100%" stopColor="#DE4313" />
          </linearGradient>

          <linearGradient id="workBtnRingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEC163" />
            <stop offset="100%" stopColor="#DE4313" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
