import { Project, projects } from "./projects";
import { Testimonial, testimonials } from "./testimonials";
import { ProjectSlide } from "@/components/sections/WorkCategorySection";

/**
 * ============================================================================
 * 🎯 CENTRAL SLIDERS DATA HUB (সেন্ট্রাল স্লাইডার ডেটা কনফিগারেশন)
 * ============================================================================
 * 
 * আপনার ওয়েবসাইটের সমস্ত স্লাইডারের ডেটা ও অবজেক্ট এই একটি ফাইল থেকেই নিয়ন্ত্রিত হয়।
 * আপনি এখান থেকে সহজেই ছবির পাথ (Image Path), টাইটেল ও টেক্সট পরিবর্তন করতে পারবেন।
 *
 * 📁 ইমেজ রাখার ডেডিকেটেড ফোল্ডার:
 * 1. Home Featured Work Slider  -> public/sliders/home-featured-work/
 * 2. Home Testimonials Slider   -> public/sliders/home-testimonials/
 * 3. Work Websites Slider       -> public/sliders/work-websites/
 * 4. Work Apps Slider           -> public/sliders/work-apps/
 * 5. Work Softwares Slider      -> public/sliders/work-softwares/
 * ============================================================================
 */

// ── 01. HOME PAGE: FEATURED PROJECTS SLIDER ──
// Image Folder: /public/sliders/home-featured-work/
export const HOME_FEATURED_SLIDER: Project[] = [
  {
    id: "aamar-pharma",
    slug: "aamar-pharma",
    title: "DIGITAL PHARMACY PLATFORM: MEDICINE ORDERING AND DELIVERY SOLUTION",
    client: "Aamar Pharma",
    category: "apps",
    categoryLabel: "App Design & Development",
    tags: ["UX & UI Design", "Branding", "Print & Digital Marketing"],
    year: "2024",
    featured: true,
    coverImage: "/sliders/home-featured-work/aamar-pharma-mockup.png",
    summary:
      "Designed a comprehensive online pharmacy solution, featuring a customer app for ordering medicines and an admin panel for managing and processing orders efficiently.",
    caseStudyUrl: "/work/case-study/aamar-pharma",
  },
  {
    id: "daahuk-travel",
    slug: "daahuk-travel",
    title: "DAAHUK: ECO-CONSCIOUS TRAVEL & EXPEDITION PORTAL",
    client: "Daahuk",
    category: "websites",
    categoryLabel: "Website Design",
    tags: ["UX & UI Design", "Web Development", "Content Strategy"],
    year: "2023",
    featured: true,
    coverImage: "/assets/clients/daahuk.png",
    summary:
      "Created a modern visual storytelling website celebrating wild expeditions and thoughtful travel experiences across South Asia.",
    caseStudyUrl: "/work/case-study/daahuk-travel",
  },
  {
    id: "arbree-analytics",
    slug: "arbree-analytics",
    title: "ARBREE SOLUTIONS: ENTERPRISE DATA ANALYTICS & INSIGHTS",
    client: "Arbree Solutions",
    category: "softwares",
    categoryLabel: "Software & SaaS",
    tags: ["SaaS UX", "Data Visualization", "Design System"],
    year: "2024",
    featured: true,
    coverImage: "/assets/clients/arbree-solutions.png",
    summary:
      "Engineered high-density data visualizations and customizable dashboards for real-time business telemetry and operations monitoring.",
    caseStudyUrl: "/work/case-study/arbree-analytics",
  },
];

// ── 02. HOME PAGE: TESTIMONIALS SLIDER ──
// Image Folder: /public/sliders/home-testimonials/
export const HOME_TESTIMONIALS_SLIDER: Testimonial[] = [
  {
    id: "magfi-reza-siddique",
    author: "MAGFI REZA SIDDIQUE",
    role: "Founder & Director",
    company: "Daahuk",
    quote:
      "Throughout the development process, Sejuti's attention to detail was remarkable. She showcased an exceptional eye for design, creating a visually appealing website that perfectly captured our organization's ethos.",
    image: "/sliders/home-testimonials/daahuk.png",
    avatar: "/sliders/home-testimonials/daahuk.png",
  },
  {
    id: "rakibul-hasan",
    author: "RAKIBUL HASAN",
    role: "Operations Head",
    company: "Aamar Pharma",
    quote:
      "Sejuti delivered a seamless experience for both our patient-facing mobile application and the dense order processing admin portal.",
    image: "/sliders/home-testimonials/aamar-pharma.png",
    avatar: "/sliders/home-testimonials/aamar-pharma.png",
  },
  {
    id: "tanvir-ahmed",
    author: "TANVIR AHMED",
    role: "Chief Technology Officer",
    company: "Arbree Solutions",
    quote:
      "Her design translated complex telemetry data into intuitive dashboards that our enterprise customers love using every single day.",
    image: "/sliders/home-testimonials/arbree-solutions.png",
    avatar: "/sliders/home-testimonials/arbree-solutions.png",
  },
  {
    id: "shahrin-chowdhury",
    author: "SHAHRIN CHOWDHURY",
    role: "Head of Growth",
    company: "Elevate Solutions",
    quote:
      "Working with Sejuti elevated our brand identity to global standards. Her creative vision and execution are truly world-class.",
    image: "/sliders/home-testimonials/elevate-solutions.png",
    avatar: "/sliders/home-testimonials/elevate-solutions.png",
  },
  {
    id: "farhan-kabir",
    author: "FARHAN KABIR",
    role: "Product Manager",
    company: "HealthBridge",
    quote:
      "Her user research methodology and UI craft transformed our product onboarding flow, resulting in an immediate 35% bump in user engagement.",
    avatar: "/sliders/home-testimonials/magfi-reza.png",
  },
];

// ── 03. WORK PAGE: WEBSITES SHOWCASE SLIDER ──
// Image Folder: /public/sliders/work-websites/
export const WORK_WEBSITE_SLIDES: ProjectSlide[] = [
  {
    id: "elevate-solutions-web",
    client: "Elevate Solutions",
    clientLogo: "/assets/clients/elevate-solutions-c.png",
    title: "CORPORATE WEBSITE REDESIGN",
    categoryLabel: "Websites",
    caseStudyUrl: "/work/case-study/elevate-solutions-brand",
    mockupType: "laptop",
    headline: "UNLOCKING EXCELLENCE",
    subheadline: "WITH MICROSOFT:",
    coverImage: "/sliders/work-websites/1.png",
  },
  {
    id: "daahuk-travel",
    client: "Daahuk",
    clientLogo: "/assets/clients/daahuk-c.png",
    title: "ECO-CONSCIOUS TRAVEL & EXPEDITION PORTAL",
    categoryLabel: "Websites",
    caseStudyUrl: "/work/case-study/daahuk-travel",
    mockupType: "device-bundle",
    coverImage: "/sliders/work-websites/2.png",
  },
  {
    id: "digital-agency-web",
    client: "Innovate Labs",
    clientLogo: "/assets/clients/elevate-solutions-c.png",
    title: "CREATIVE AGENCY PORTFOLIO PLATFORM",
    categoryLabel: "Websites",
    caseStudyUrl: "/work/case-study/elevate-solutions-brand",
    mockupType: "laptop",
    headline: "TRANSFORMING IDEAS",
    subheadline: "INTO EXPERIENCES",
    coverImage: "/sliders/work-websites/3.png",
  },
];

// ── 04. WORK PAGE: APPS SHOWCASE SLIDER ──
// Image Folder: /public/sliders/work-apps/
export const WORK_APP_SLIDES: ProjectSlide[] = [
  {
    id: "ezeedrop",
    client: "ezeedrop",
    title: "AIRPORT RENTAL CAR RETURN VALET APP",
    categoryLabel: "Apps",
    caseStudyUrl: "/work/case-study/aamar-pharma",
    mockupType: "phones-triplet",
    coverImage: "/sliders/work-apps/01_Home 2.png",
  },
  {
    id: "aamar-pharma",
    client: "Aamar Pharma",
    clientLogo: "/assets/clients/aamar-pharma-c.png",
    title: "DIGITAL PHARMACY MOBILE APP & ORDERING PLATFORM",
    categoryLabel: "Apps",
    caseStudyUrl: "/work/case-study/aamar-pharma",
    mockupType: "device-bundle",
    coverImage: "/assets/images/work-mockup.png",
  },
  {
    id: "healthtrack-app",
    client: "HealthTrack",
    clientLogo: "/assets/clients/aamar-pharma-c.png",
    title: "TELEHEALTH & PATIENT VITAL MONITORING APP",
    categoryLabel: "Apps",
    caseStudyUrl: "/work/case-study/aamar-pharma",
    mockupType: "device-bundle",
    coverImage: "/sliders/work-apps/09_BG_Meter 1.png",
  },
  {
    id: "finpay-app",
    client: "FinPay Mobile",
    clientLogo: "/assets/clients/aamar-pharma-c.png",
    title: "FINANCIAL WALLET & INSTANT MONEY TRANSFER",
    categoryLabel: "Apps",
    caseStudyUrl: "/work/case-study/aamar-pharma",
    mockupType: "device-bundle",
    coverImage: "/sliders/work-apps/CONTINUE.png",
  },
];

// ── 05. WORK PAGE: SOFTWARES SHOWCASE SLIDER ──
// Image Folder: /public/sliders/work-softwares/
export const WORK_SOFTWARE_SLIDES: ProjectSlide[] = [
  {
    id: "hospital-system",
    client: "ENT Foundation Hospital",
    title: "HOSPITAL MANAGEMENT SYSTEM",
    categoryLabel: "Softwares",
    caseStudyUrl: "/work/case-study/arbree-analytics",
    mockupType: "hospital-monitor",
    coverImage: "/sliders/work-softwares/01_DASHBOARD 1.png",
  },
  {
    id: "arbree-analytics",
    client: "Arbree Solutions",
    clientLogo: "/assets/clients/arbree-solutions-c.png",
    title: "ENTERPRISE DATA ANALYTICS & INSIGHTS PLATFORM",
    categoryLabel: "Softwares",
    caseStudyUrl: "/work/case-study/arbree-analytics",
    mockupType: "device-bundle",
    coverImage: "/sliders/work-softwares/07_REPORTS 1.png",
  },
  {
    id: "cloudops-telemetry",
    client: "CloudOps Telemetry",
    clientLogo: "/assets/clients/arbree-solutions-c.png",
    title: "REAL-TIME INFRASTRUCTURE MONITORING SUITE",
    categoryLabel: "Softwares",
    caseStudyUrl: "/work/case-study/arbree-analytics",
    mockupType: "device-bundle",
    coverImage: "/sliders/work-softwares/Calendar 1.png",
  },
];

