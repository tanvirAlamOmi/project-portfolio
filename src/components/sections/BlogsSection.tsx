import Image from "next/image";
import Link from "next/link";
import SectionBadge from "@/components/ui/SectionBadge";
import { blogPosts, BlogPost } from "@/data/blogs";

function VerticalBlogsTab() {
  return (
    <div className="hidden lg:flex flex-shrink-0 pt-2 lg:absolute lg:left-[calc(100%-1.5px)] lg:top-2">
      <Link
        href="/blogs"
        className="group flex items-center gap-3.5 select-none hover:opacity-85 transition-opacity"
        title="View All Blogs"
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
            VIEW ALL BLOGS
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

const BLOG_ICONS: Record<BlogPost["iconType"], string> = {
  design: "/assets/blogs/1.svg",
  photo: "/assets/blogs/2.svg",
  write: "/assets/blogs/3.svg",
};

function BlogIcon({ type }: { type: BlogPost["iconType"] }) {
  const iconSrc = BLOG_ICONS[type] || "/assets/blogs/1.svg";
  return (
    <Image
      src={iconSrc}
      alt={`${type} icon`}
      width={50}
      height={40}
      className="w-[50px] h-[40px] object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
    />
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const cardBorderStyle = {
    border: "1.5px solid",
    borderImageSource:
      "linear-gradient(97.51deg, #FEC163 -37.59%, #DE4313 94.05%)",
    borderImageSlice: 1,
  };

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group relative flex flex-col justify-between p-4 sm:p-5 pt-7 sm:pt-8 transition-transform duration-300 hover:-translate-y-1.5 cursor-pointer select-none"
      style={cardBorderStyle}
    >
      {/* Top border cutout notch for icon (spacious gap on both sides) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88px] h-3.5 card-badge-bg z-[1]"
      />

      {/* Floating SVG Icon (Sitting on border, touching the line) */}
      <div className="absolute -top-[34px] sm:-top-[35px] left-1/2 -translate-x-1/2 z-10 flex items-center justify-center pointer-events-none">
        <BlogIcon type={post.iconType} />
      </div>

      <div className="relative w-full aspect-square overflow-hidden bg-black/10">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="pt-5 pb-2 text-center flex items-center justify-center min-h-[58px]">
        <h4 className="font-dm font-bold text-xs sm:text-sm uppercase tracking-wider text-[var(--ink)] group-hover:text-[#DE4313] transition-colors leading-snug">
          {post.title}
        </h4>
      </div>
    </Link>
  );
}

export default function BlogsSection() {
  return (
    <section id="blogs" className="relative w-full py-16 sm:py-24 overflow-x-clip">
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
          <SectionBadge num="03" label="BLOGS" />

          <div className="flex-1 max-w-2xl flex flex-col justify-center gap-5 lg:pt-2">
            <h2 className="font-almarai text-2xl sm:text-3xl lg:text-[32px] font-normal text-[var(--ink)] leading-snug">
              Passion &amp; Play
            </h2>

            <p className="font-almarai text-sm sm:text-base text-[var(--body-muted)] leading-relaxed">
              A space to wander through ideas, reflections, and creative expression —
              exploring the beauty, wonder, and subtle magic in everyday life, and seeing
              the world through a thoughtful, artistic lens — offering inspiration,
              meaningful insights, and moments of quiet contemplation.
            </p>

            <h3 className="font-dm font-bold text-3xl sm:text-4xl text-gradient block leading-none pt-2">
              Design Photography Writing
            </h3>
          </div>

          <VerticalBlogsTab />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8 lg:gap-8 pt-10 sm:pt-12">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <svg
        width="0"
        height="0"
        className="absolute pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="blogsDiamondGrad"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
            gradientTransform="rotate(129.89 0.5 0.5)"
          >
            <stop offset="-29.32%" stopColor="#FEC163" />
            <stop offset="100%" stopColor="#DE4313" />
          </linearGradient>

          <linearGradient id="blogIconGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEC163" />
            <stop offset="100%" stopColor="#DE4313" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
