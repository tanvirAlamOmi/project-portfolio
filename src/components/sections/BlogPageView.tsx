"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { asset } from "@/utils/asset";

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
            stroke="url(#blogSparkleGrad)"
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

export default function BlogPageView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSort, setSelectedSort] = useState<string>("Featured");
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [showSubscribeBox, setShowSubscribeBox] = useState(false);

  const categories = ["All", "Design", "Photography", "Writing"];
  const sortOptions = ["Featured", "Newest", "Oldest"];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setShowSubscribeBox(false);
    }
  };

  return (
    <section
      id="blogs"
      className="w-full relative px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 lg:pt-24 pb-24 select-none"
    >
      <svg
        width="0"
        height="0"
        className="absolute pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="blogSparkleGrad"
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

      <div className="w-full max-w-[1240px] mx-auto space-y-10 sm:space-y-14">
        <div className="relative w-full bg-transparent min-h-0 md:min-h-[520px] lg:min-h-[540px] flex flex-col md:flex-row items-start md:items-center pt-8 sm:pt-14 lg:pt-20 pb-8 sm:pb-12 lg:pb-16 pl-4 sm:pl-10 lg:pl-14 pr-4 sm:pr-10 lg:pr-14 mb-10">
          <div
            className="absolute top-0 left-0 right-[120px] sm:right-[180px] h-[1.5px] pointer-events-none"
            style={{
              background:
                "linear-gradient(97.51deg, #FEC163 -37.59%, #DE4313 94.05%)",
            }}
          />

          <div
            className="absolute top-0 left-0 bottom-0 w-[1.5px] pointer-events-none"
            style={{
              background: "linear-gradient(180deg, #FEC163 0%, #DE4313 100%)",
            }}
          />

          <div
            className="absolute bottom-0 left-0 right-0 h-[1.5px] pointer-events-none"
            style={{
              background:
                "linear-gradient(97.51deg, #FEC163 -37.59%, #DE4313 94.05%)",
            }}
          />

          <div
            className="absolute top-[28px] sm:top-[34px] right-0 bottom-0 w-[1.5px] pointer-events-none"
            style={{
              background: "linear-gradient(180deg, #FEC163 0%, #DE4313 100%)",
            }}
          />

          <div className="absolute top-0 right-3 sm:right-8 -translate-y-1/2 flex items-center select-none z-20">
            <span className="font-dm font-medium text-2xl sm:text-4xl lg:text-[40px] text-[var(--ink)] tracking-tight leading-none">
              Blogs
            </span>
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div
              aria-hidden="true"
              className="absolute rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(222, 67, 19, 0.55) 0%, rgba(222, 67, 19, 0.22) 52%, transparent 75%)",
                filter: "blur(80px)",
                width: "460px",
                height: "400px",
                right: "10px",
                bottom: "0px",
              }}
            />

            <div
              aria-hidden="true"
              className="absolute rounded-full"
              style={{
                background: "rgba(222, 67, 19, 0.12)",
                filter: "blur(90px)",
                width: "340px",
                height: "260px",
                left: "20px",
                top: "60px",
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-[620px] lg:max-w-[700px] xl:max-w-[780px] flex flex-col justify-center space-y-1 sm:space-y-1">
            <h1
              className="font-dm uppercase whitespace-normal sm:whitespace-nowrap break-words text-[var(--ink)]"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 600,
                fontSize: "clamp(30px, 4.8vw, 72px)",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "var(--ink)",
                textShadow: "0px 0px 10px rgba(244, 115, 3, 0.40)",
              }}
            >
              OFF CANVAS JOURNAL
            </h1>

            <h2
              className="font-dm font-bold text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] text-transparent bg-clip-text leading-tight mt-2 sm:mt-3"
              style={{
                backgroundImage:
                  "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
              }}
            >
              A Personal Archive
            </h2>

            <p className="font-dm text-xs sm:text-[14px] text-[var(--ink-78)] leading-[1.65] mt-4 sm:mt-5 max-w-lg">
              Get notified when new posts are published.
              <br />
              Stay updated with fresh thoughts and ideas.
              <br />
              Explore{" "}
              <span
                className="font-semibold text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                }}
              >
                design
              </span>
              ,{" "}
              <span
                className="font-semibold text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                }}
              >
                photography
              </span>
              , and{" "}
              <span
                className="font-semibold text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                }}
              >
                creative writing
              </span>
              .
            </p>

            <div className="pt-4 sm:pt-6">
              {!subscribed ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <ActionSparkleButton
                    label="SUBSCRIBE"
                    onClick={() => setShowSubscribeBox(!showSubscribeBox)}
                  />

                  {showSubscribeBox && (
                    <form
                      onSubmit={handleSubscribe}
                      className="flex items-center gap-2 border border-[#DE4313]/60 bg-[var(--bg)] px-3 py-1.5 rounded-full"
                    >
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter your email"
                        className="bg-transparent text-xs font-dm text-[var(--ink)] placeholder:text-[var(--body-muted)] focus:outline-none w-44 sm:w-52"
                      />
                      <button
                        type="submit"
                        className="text-xs font-dm font-bold text-[#DE4313] hover:text-[#FEC163] transition-colors uppercase"
                      >
                        Join
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 text-xs font-dm font-bold text-[#DE4313]">
                  <span>✓ Subscribed to Off Canvas Journal!</span>
                </div>
              )}
            </div>
          </div>

          {/* Hero Illustration for Desktop (>=768px): Clipped cleanly within the border-box bounds so bottom circle is cropped at bottom border line without clipping 'Blogs' */}
          <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none z-10">
            <div className="absolute md:right-[-10px] lg:right-[-30px] xl:right-[-50px] md:bottom-[-20px] lg:bottom-[-50px] md:w-[400px] lg:w-[460px] xl:w-[520px] flex justify-end items-end">
              <Image
                src="/assets/blogs/blog-hero.png"
                alt="Off Canvas Journal Workspace"
                width={520}
                height={420}
                className="w-full h-auto object-contain object-bottom drop-shadow-xl"
                priority
              />
            </div>
          </div>

          {/* Hero Illustration for Mobile (<768px): In-flow below subscribe button */}
          <div className="md:hidden relative w-full max-w-[280px] sm:max-w-[340px] mx-auto flex justify-center items-end z-10 mt-8 pointer-events-none">
            <Image
              src="/assets/blogs/blog-hero.png"
              alt="Off Canvas Journal Workspace"
              width={340}
              height={280}
              className="w-full h-auto object-contain object-bottom drop-shadow-xl"
              priority
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-between px-1 font-dm">
          <div className="relative">
            <span
              className="block font-dm font-bold text-sm sm:text-base tracking-[0.15em] uppercase text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
              }}
            >
              CATEGORY
            </span>

            <button
              onClick={() => setShowCatMenu(!showCatMenu)}
              className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base font-normal text-[var(--ink)] hover:text-[#DE4313] transition-colors mt-1 cursor-pointer"
            >
              <span>{selectedCategory}</span>
              <svg
                width="14"
                height="9"
                viewBox="0 0 14 9"
                fill="none"
                className={`transition-transform duration-200 ${
                  showCatMenu ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M1.5 1.5L7 7L12.5 1.5"
                  stroke="#DE4313"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {showCatMenu && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-[var(--card-bg)] border border-[#DE4313]/60 shadow-[0_8px_24px_rgba(0,0,0,0.5)] z-30 py-1.5 rounded-sm backdrop-blur-md">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowCatMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-dm transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? "text-[#DE4313] font-bold bg-[#DE4313]/10"
                        : "text-[var(--ink)] hover:bg-[#DE4313]/5 hover:text-[#DE4313]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative text-right">
            <span
              className="block font-dm font-bold text-sm sm:text-base tracking-[0.15em] uppercase text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
              }}
            >
              SORT BY
            </span>

            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center justify-end gap-4 sm:gap-6 text-sm sm:text-base font-normal text-[var(--ink)] hover:text-[#DE4313] transition-colors mt-1 ml-auto cursor-pointer"
            >
              <span>{selectedSort}</span>
              <svg
                width="14"
                height="9"
                viewBox="0 0 14 9"
                fill="none"
                className={`transition-transform duration-200 ${
                  showSortMenu ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M1.5 1.5L7 7L12.5 1.5"
                  stroke="#DE4313"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {showSortMenu && (
              <div className="absolute top-full right-0 mt-2 w-44 bg-[var(--card-bg)] border border-[#DE4313]/60 shadow-[0_8px_24px_rgba(0,0,0,0.5)] z-30 py-1.5 text-left rounded-sm backdrop-blur-md">
                {sortOptions.map((sort) => (
                  <button
                    key={sort}
                    onClick={() => {
                      setSelectedSort(sort);
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-dm transition-colors cursor-pointer ${
                      selectedSort === sort
                        ? "text-[#DE4313] font-bold bg-[#DE4313]/10"
                        : "text-[var(--ink)] hover:bg-[#DE4313]/5 hover:text-[#DE4313]"
                    }`}
                  >
                    {sort}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Featured Card (Design) - visible on 'All' or 'Design' */}
        {(selectedCategory === "All" || selectedCategory === "Design") && (
          <div
            className="group relative w-full bg-[var(--bg)] p-5 sm:p-7 lg:p-9 transition-all duration-300 hover:-translate-y-1 shadow-[0_0_15px_rgba(222,67,19,0.08)] hover:shadow-[0_0_25px_rgba(222,67,19,0.32)]"
            style={{
              border: "1.5px solid transparent",
              borderImageSource:
                "linear-gradient(97.42deg, #FEC163 0%, #DE4313 95.67%)",
              borderImageSlice: 1,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <Link
                href="/blogs/navigating-road-to-ux-ui"
                className="lg:col-span-6 relative w-full aspect-[16/10] overflow-hidden bg-black/10 group cursor-pointer"
              >
                <Image
                  src="/assets/images/blog-design.png"
                  alt="Make Things Happen"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </Link>

              <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
                <div>
                  <span
                    className="inline-block px-4 py-1 rounded-full text-xs font-dm font-bold tracking-wide uppercase text-transparent bg-clip-text mb-3 transition-all"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                      backgroundColor: "var(--bg)",
                      border: "1px solid rgba(228, 93, 35, 0.6)",
                      boxShadow: "0px 0px 4px 0px rgba(228, 93, 35, 1)",
                    }}
                  >
                    Design
                  </span>

                  <Link href="/blogs/navigating-road-to-ux-ui" className="block group">
                    <h3 className="font-dm font-bold text-lg sm:text-xl lg:text-2xl text-[var(--ink)] tracking-normal leading-snug uppercase group-hover:text-[#FEC163] transition-colors">
                      NAVIGATING THE ROAD TO UX/UI DESIGN
                    </h3>
                  </Link>

                  <p
                    className="font-dm text-xs sm:text-sm font-semibold mt-1.5 mb-3 text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                    }}
                  >
                    February 17, 2026
                  </p>

                  <p className="font-dm text-xs sm:text-sm text-[var(--body-text)] leading-relaxed">
                    This post traces the road through day one — from discovering
                    design beyond code, to taking the first steps into UX,
                    learning through real projects, challenges, and growth. It is
                    a reflection on the milestones, lessons, and defining moments
                    that shaped the path toward becoming a UX/UI designer.
                  </p>
                </div>

                <div className="pt-2">
                  <Link href="/blogs/navigating-road-to-ux-ui">
                    <ActionSparkleButton label="VIEW FULL BLOG" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Masonry / Responsive Gallery: Layout matching Figma blogs_main (Node 1250:2158) */}
        {selectedCategory === "All" && (
          <>
            {/* Row 1: Left Tall Photography Card (522x582) + Right Two Stacked Compact Writing Cards (522x273 each) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {/* Left Column: Tall Photography Card 1 */}
              <Link
                href="/blogs/sunsets-fleeting-beauty"
                className="group relative bg-[var(--bg)] p-5 sm:p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 h-full shadow-[0_0_12px_rgba(222,67,19,0.08)] hover:shadow-[0_0_24px_rgba(222,67,19,0.32)]"
                style={{
                  border: "1.5px solid transparent",
                  borderImageSource:
                    "linear-gradient(97.42deg, #FEC163 0%, #DE4313 95.67%)",
                  borderImageSlice: 1,
                }}
              >
                <div className="relative w-full aspect-[16/11] overflow-hidden bg-black/10">
                  <Image
                    src="/assets/images/blog-photography.png"
                    alt="Sunsets Skyline"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="pt-4 sm:pt-6">
                  <span
                    className="inline-block px-4 py-1 rounded-full text-xs font-dm font-bold tracking-wide uppercase text-transparent bg-clip-text mb-3 transition-all"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                      backgroundColor: "var(--bg)",
                      border: "1px solid rgba(228, 93, 35, 0.6)",
                      boxShadow: "0px 0px 4px 0px rgba(228, 93, 35, 1)",
                    }}
                  >
                    Photography
                  </span>

                  <h4 className="font-dm font-bold text-base sm:text-[18px] text-[var(--ink)] leading-snug tracking-normal uppercase group-hover:text-[#FEC163] transition-colors">
                    SUNSETS – A CANVAS OF FLEETING BEAUTY
                  </h4>

                  <p
                    className="font-dm text-xs sm:text-sm font-semibold mt-2 text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                    }}
                  >
                    March 4, 2026
                  </p>
                </div>
              </Link>

              {/* Right Column: Two Stacked Compact Writing Cards */}
              <div className="flex flex-col gap-6 lg:gap-8 justify-between h-full">
                <Link
                  href="/blogs/verses-that-speak-to-soul"
                  className="group relative bg-[var(--bg)] p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 transition-all duration-300 hover:-translate-y-1 flex-1 shadow-[0_0_12px_rgba(222,67,19,0.08)] hover:shadow-[0_0_24px_rgba(222,67,19,0.32)]"
                  style={{
                    border: "1.5px solid transparent",
                    borderImageSource:
                      "linear-gradient(97.42deg, #FEC163 0%, #DE4313 95.67%)",
                    borderImageSlice: 1,
                  }}
                >
                  <div className="relative w-full sm:w-[150px] md:w-[170px] lg:w-[180px] aspect-square flex-shrink-0 overflow-hidden bg-black/10">
                    <Image
                      src="/assets/images/blog-writing.png"
                      alt="Emerald Companion"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 180px"
                    />
                  </div>

                  <div className="flex flex-col justify-center w-full pt-3 sm:pt-0">
                    <span
                      className="inline-block px-4 py-1 rounded-full text-xs font-dm font-bold tracking-wide uppercase text-transparent bg-clip-text w-fit mb-2.5 transition-all"
                      style={{
                        backgroundImage:
                          "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                        backgroundColor: "var(--bg)",
                        border: "1px solid rgba(228, 93, 35, 0.6)",
                        boxShadow: "0px 0px 4px 0px rgba(228, 93, 35, 1)",
                      }}
                    >
                      Writing
                    </span>

                    <h4 className="font-dm font-bold text-base sm:text-[18px] text-[var(--ink)] leading-snug tracking-normal uppercase group-hover:text-[#FEC163] transition-colors">
                      INSPIRATION – VERSES THAT SPEAK TO THE SOUL
                    </h4>

                    <p
                      className="font-dm text-xs sm:text-sm font-semibold mt-2 text-transparent bg-clip-text"
                      style={{
                        backgroundImage:
                          "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                      }}
                    >
                      March 4, 2026
                    </p>
                  </div>
                </Link>

                <Link
                  href="/blogs/verses-that-speak-to-soul"
                  className="group relative bg-[var(--bg)] p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 transition-all duration-300 hover:-translate-y-1 flex-1 shadow-[0_0_12px_rgba(222,67,19,0.08)] hover:shadow-[0_0_24px_rgba(222,67,19,0.32)]"
                  style={{
                    border: "1.5px solid transparent",
                    borderImageSource:
                      "linear-gradient(97.42deg, #FEC163 0%, #DE4313 95.67%)",
                    borderImageSlice: 1,
                  }}
                >
                  <div className="relative w-full sm:w-[150px] md:w-[170px] lg:w-[180px] aspect-square flex-shrink-0 overflow-hidden bg-black/10">
                    <Image
                      src="/assets/images/blog-writing.png"
                      alt="Emerald Companion"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 180px"
                    />
                  </div>

                  <div className="flex flex-col justify-center w-full pt-3 sm:pt-0">
                    <span
                      className="inline-block px-4 py-1 rounded-full text-xs font-dm font-bold tracking-wide uppercase text-transparent bg-clip-text w-fit mb-2.5 transition-all"
                      style={{
                        backgroundImage:
                          "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                        backgroundColor: "var(--bg)",
                        border: "1px solid rgba(228, 93, 35, 0.6)",
                        boxShadow: "0px 0px 4px 0px rgba(228, 93, 35, 1)",
                      }}
                    >
                      Writing
                    </span>

                    <h4 className="font-dm font-bold text-base sm:text-[18px] text-[var(--ink)] leading-snug tracking-normal uppercase group-hover:text-[#FEC163] transition-colors">
                      INSPIRATION – VERSES THAT SPEAK TO THE SOUL
                    </h4>

                    <p
                      className="font-dm text-xs sm:text-sm font-semibold mt-2 text-transparent bg-clip-text"
                      style={{
                        backgroundImage:
                          "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                      }}
                    >
                      March 4, 2026
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Row 2: Two Tall Photography Cards (522x582 each) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              <Link
                href="/blogs/sunsets-fleeting-beauty"
                className="group relative bg-[var(--bg)] p-5 sm:p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-[0_0_12px_rgba(222,67,19,0.08)] hover:shadow-[0_0_24px_rgba(222,67,19,0.32)]"
                style={{
                  border: "1.5px solid transparent",
                  borderImageSource:
                    "linear-gradient(97.42deg, #FEC163 0%, #DE4313 95.67%)",
                  borderImageSlice: 1,
                }}
              >
                <div className="relative w-full aspect-[16/11] overflow-hidden bg-black/10">
                  <Image
                    src="/assets/images/blog-photography.png"
                    alt="Sunsets Skyline"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="pt-4 sm:pt-6">
                  <span
                    className="inline-block px-4 py-1 rounded-full text-xs font-dm font-bold tracking-wide uppercase text-transparent bg-clip-text mb-3 transition-all"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                      backgroundColor: "var(--bg)",
                      border: "1px solid rgba(228, 93, 35, 0.6)",
                      boxShadow: "0px 0px 4px 0px rgba(228, 93, 35, 1)",
                    }}
                  >
                    Photography
                  </span>

                  <h4 className="font-dm font-bold text-base sm:text-[18px] text-[var(--ink)] leading-snug tracking-normal uppercase group-hover:text-[#FEC163] transition-colors">
                    SUNSETS – A CANVAS OF FLEETING BEAUTY
                  </h4>

                  <p
                    className="font-dm text-xs sm:text-sm font-semibold mt-2 text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                    }}
                  >
                    March 4, 2026
                  </p>
                </div>
              </Link>

              <Link
                href="/blogs/sunsets-fleeting-beauty"
                className="group relative bg-[var(--bg)] p-5 sm:p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-[0_0_12px_rgba(222,67,19,0.08)] hover:shadow-[0_0_24px_rgba(222,67,19,0.32)]"
                style={{
                  border: "1.5px solid transparent",
                  borderImageSource:
                    "linear-gradient(97.42deg, #FEC163 0%, #DE4313 95.67%)",
                  borderImageSlice: 1,
                }}
              >
                <div className="relative w-full aspect-[16/11] overflow-hidden bg-black/10">
                  <Image
                    src="/assets/images/blog-photography.png"
                    alt="Sunsets Skyline"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="pt-4 sm:pt-6">
                  <span
                    className="inline-block px-4 py-1 rounded-full text-xs font-dm font-bold tracking-wide uppercase text-transparent bg-clip-text mb-3 transition-all"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                      backgroundColor: "var(--bg)",
                      border: "1px solid rgba(228, 93, 35, 0.6)",
                      boxShadow: "0px 0px 4px 0px rgba(228, 93, 35, 1)",
                    }}
                  >
                    Photography
                  </span>

                  <h4 className="font-dm font-bold text-base sm:text-[18px] text-[var(--ink)] leading-snug tracking-normal uppercase group-hover:text-[#FEC163] transition-colors">
                    SUNSETS – A CANVAS OF FLEETING BEAUTY
                  </h4>

                  <p
                    className="font-dm text-xs sm:text-sm font-semibold mt-2 text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                    }}
                  >
                    March 4, 2026
                  </p>
                </div>
              </Link>
            </div>
          </>
        )}

        {/* When Category is 'Photography': Show Photography Grid */}
        {selectedCategory === "Photography" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {[1, 2, 3, 4].map((id) => (
              <Link
                key={id}
                href="/blogs/sunsets-fleeting-beauty"
                className="group relative bg-[var(--bg)] p-5 sm:p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-[0_0_12px_rgba(222,67,19,0.08)] hover:shadow-[0_0_24px_rgba(222,67,19,0.32)]"
                style={{
                  border: "1.5px solid transparent",
                  borderImageSource:
                    "linear-gradient(97.42deg, #FEC163 0%, #DE4313 95.67%)",
                  borderImageSlice: 1,
                }}
              >
                <div className="relative w-full aspect-[16/11] overflow-hidden bg-black/10">
                  <Image
                    src="/assets/images/blog-photography.png"
                    alt="Sunsets Skyline"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="pt-4 sm:pt-6">
                  <span
                    className="inline-block px-4 py-1 rounded-full text-xs font-dm font-bold tracking-wide uppercase text-transparent bg-clip-text mb-3 transition-all"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                      backgroundColor: "var(--bg)",
                      border: "1px solid rgba(228, 93, 35, 0.6)",
                      boxShadow: "0px 0px 4px 0px rgba(228, 93, 35, 1)",
                    }}
                  >
                    Photography
                  </span>

                  <h4 className="font-dm font-bold text-base sm:text-[18px] text-[var(--ink)] leading-snug tracking-normal uppercase group-hover:text-[#FEC163] transition-colors">
                    SUNSETS – A CANVAS OF FLEETING BEAUTY
                  </h4>

                  <p
                    className="font-dm text-xs sm:text-sm font-semibold mt-2 text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                    }}
                  >
                    March 4, 2026
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* When Category is 'Writing': Show Writing Grid */}
        {selectedCategory === "Writing" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {[1, 2, 3, 4].map((id) => (
              <Link
                key={id}
                href="/blogs/verses-that-speak-to-soul"
                className="group relative bg-[var(--bg)] p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 transition-all duration-300 hover:-translate-y-1 shadow-[0_0_12px_rgba(222,67,19,0.08)] hover:shadow-[0_0_24px_rgba(222,67,19,0.32)]"
                style={{
                  border: "1.5px solid transparent",
                  borderImageSource:
                    "linear-gradient(97.42deg, #FEC163 0%, #DE4313 95.67%)",
                  borderImageSlice: 1,
                }}
              >
                <div className="relative w-full sm:w-[150px] md:w-[170px] lg:w-[180px] aspect-square flex-shrink-0 overflow-hidden bg-black/10">
                  <Image
                    src="/assets/images/blog-writing.png"
                    alt="Emerald Companion"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 180px"
                  />
                </div>

                <div className="flex flex-col justify-center w-full pt-3 sm:pt-0">
                  <span
                    className="inline-block px-4 py-1 rounded-full text-xs font-dm font-bold tracking-wide uppercase text-transparent bg-clip-text w-fit mb-2.5 transition-all"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                      backgroundColor: "var(--bg)",
                      border: "1px solid rgba(228, 93, 35, 0.6)",
                      boxShadow: "0px 0px 4px 0px rgba(228, 93, 35, 1)",
                    }}
                  >
                    Writing
                  </span>

                  <h4 className="font-dm font-bold text-base sm:text-[18px] text-[var(--ink)] leading-snug tracking-normal uppercase group-hover:text-[#FEC163] transition-colors">
                    INSPIRATION – VERSES THAT SPEAK TO THE SOUL
                  </h4>

                  <p
                    className="font-dm text-xs sm:text-sm font-semibold mt-2 text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(129.89deg, #FEC163 -29.32%, #DE4313 100%)",
                    }}
                  >
                    March 4, 2026
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="pt-8 sm:pt-12 pb-6">
          <div className="w-full flex items-center select-none pt-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`flex-1 flex items-center text-[#DE4313] transition-opacity ${
                currentPage === 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:opacity-80 cursor-pointer"
              }`}
              aria-label="Previous page"
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
              {[1, 2, 3].map((num) => {
                const isActive = num === currentPage;
                return (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
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
                    0{num}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              disabled={currentPage === 3}
              className={`flex-1 flex items-center text-[#DE4313] transition-opacity ${
                currentPage === 3
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:opacity-80 cursor-pointer"
              }`}
              aria-label="Next page"
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
        </div>
      </div>
    </section>
  );
}
