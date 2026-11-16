# 🎨 Sejuti Mehjabin Portfolio — সম্পূর্ণ স্লাইডার অডিট ও সেন্ট্রালাইজড অ্যাসেট ম্যানেজমেন্ট গাইড

`AGENTS.md` ফাইলের আর্কিটেকচারাল নির্দেশনা ও আপনার রিকোয়েস্ট অনুযায়ী পুরো প্রজেক্টের **সমস্ত স্লাইডারের ডেটা অবজেক্ট একটি সেন্ট্রাল ডেটা ফাইলে (`src/data/sliders.ts`)** নিয়ে আসা হয়েছে এবং প্রতিটি স্লাইডারের জন্য ডেডিকেটেড **`public/sliders/<section-name>/` ফোল্ডার** তৈরি করা হয়েছে।

---

## 📊 ১. সর্বমোট কয়টি স্লাইডার আছে এবং তাদের অবস্থান?

| নং | স্লাইডারের নাম | পেজ ও সেকশন | সেন্ট্রাল অবজেক্টের নাম (`src/data/sliders.ts`) | ডেডিকেটেড ইমেজ ফোল্ডার পাথ (`public/sliders/`) |
|:---:|---|---|---|---|
| **১** | **Featured Projects Slider** | Home Page (`#work`) | `HOME_FEATURED_SLIDER` | `/public/sliders/home-featured-work/` |
| **২** | **Testimonials Slider** | Home Page (`#contact`) | `HOME_TESTIMONIALS_SLIDER` | `/public/sliders/home-testimonials/` |
| **৩** | **Websites Showcase Slider** | `/work` Page (Section 01) | `WORK_WEBSITE_SLIDES` | `/public/sliders/work-websites/` |
| **৪** | **Apps Showcase Slider** | `/work` Page (Section 02) | `WORK_APP_SLIDES` | `/public/sliders/work-apps/` |
| **৫** | **Softwares Showcase Slider** | `/work` Page (Section 03) | `WORK_SOFTWARE_SLIDES` | `/public/sliders/work-softwares/` |
| **৬** | **Modal Gallery Carousel** | Category Grid (`/work/[category]`) | `workProjects.ts` (`gallery`) | `/public/assets/work/<category>/` |
| **৭** | **Blog Page Slider** | `/blogs` Page | `blogs.ts` (`BLOG_POSTS`) | `/public/assets/blogs/` |

---

## 🗂️ ২. স্লাইডার ইমেজ ফোল্ডার স্ট্রাকচার (`public/sliders/`)

প্রতিটি স্লাইডারের ইমেজ আলাদা এবং সুনির্দিষ্ট ফোল্ডারে রাখা হয়েছে:

```
public/
└── sliders/
    ├── home-featured-work/      # হোম পেজের Featured Work স্লাইডারের ছবি
    │   └── aamar-pharma-mockup.png
    │
    ├── home-testimonials/       # হোম পেজের টেস্টমোনিয়াল ক্লায়েন্ট ছবি / অ্যাভাটার
    │   └── magfi-reza.png
    │
    ├── work-websites/           # Work পেজের Websites স্লাইডারের স্ক্রিনশট / মকআপ
    │   ├── 1.png
    │   ├── 2.png
    │   ├── 3.png
    │   └── ...
    │
    ├── work-apps/               # Work পেজের Apps স্লাইডারের মোবাইল স্ক্রিনশট
    │   ├── 01_Home 2.png
    │   ├── 09_BG_Meter 1.png
    │   ├── CONTINUE.png
    │   └── ...
    │
    └── work-softwares/          # Work পেজের Software স্লাইডারের ড্যাশবোর্ড স্ক্রিনশট
        ├── 01_DASHBOARD 1.png
        ├── 07_REPORTS 1.png
        ├── Calendar 1.png
        └── ...
```

---

## 🎯 ৩. সেন্ট্রাল স্লাইডার ডেটা হাব: `src/data/sliders.ts`

আপনার সমস্ত স্লাইডারের টাইটেল, সাবটাইটেল, লিংক এবং ইমেজ পাথ এই **একটি ফাইল** থেকেই সরাসরি পরিবর্তন করা যাবে:

📍 **ফাইল লোকেশন:** [`src/data/sliders.ts`](file:///d:/SiSir/project-portfolio/src/data/sliders.ts)

### ক) Home Featured Work Slider আপডেট করার নিয়ম:
```typescript
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
    // ইমেজ পাথ পরিবর্তন করতে:
    coverImage: "/sliders/home-featured-work/aamar-pharma-mockup.png",
    summary: "Designed a comprehensive online pharmacy solution...",
    caseStudyUrl: "/work/case-study/aamar-pharma",
  },
  // আরও স্লাইড যোগ করতে পারেন...
];
```

### খ) Home Testimonials Slider আপডেট করার নিয়ম:
```typescript
export const HOME_TESTIMONIALS_SLIDER: Testimonial[] = [
  {
    id: "magfi-reza-siddique",
    author: "MAGFI REZA SIDDIQUE",
    role: "Founder & Director",
    company: "Daahuk",
    quote: "Throughout the development process, Sejuti's attention to detail was remarkable...",
    // ক্লায়েন্টের ছবি পরিবর্তন করতে:
    avatar: "/sliders/home-testimonials/magfi-reza.png",
  },
  // আরও টেস্টমোনিয়াল যোগ করতে পারেন...
];
```

### গ) Work Page Sliders (Websites, Apps, Softwares) আপডেট করার নিয়ম:
```typescript
// ── 01. WEBSITES ──
export const WORK_WEBSITE_SLIDES: ProjectSlide[] = [
  {
    id: "elevate-solutions-web",
    client: "Elevate Solutions",
    clientLogo: "/assets/clients/elevate-solutions-c.png",
    title: "CORPORATE WEBSITE REDESIGN",
    categoryLabel: "Websites",
    caseStudyUrl: "/work/case-study/elevate-solutions-brand",
    mockupType: "laptop", // 'laptop' | 'device-bundle' | 'hospital-monitor' | 'phones-triplet'
    headline: "UNLOCKING EXCELLENCE",
    subheadline: "WITH MICROSOFT:",
    // ছবি পরিবর্তন করতে:
    coverImage: "/sliders/work-websites/1.png",
  },
];

// ── 02. APPS ──
export const WORK_APP_SLIDES: ProjectSlide[] = [
  {
    id: "ezeedrop",
    client: "ezeedrop",
    title: "AIRPORT RENTAL CAR RETURN VALET APP",
    categoryLabel: "Apps",
    caseStudyUrl: "/work/case-study/aamar-pharma",
    mockupType: "phones-triplet",
    // ছবি পরিবর্তন করতে:
    coverImage: "/sliders/work-apps/01_Home 2.png",
  },
];

// ── 03. SOFTWARES ──
export const WORK_SOFTWARE_SLIDES: ProjectSlide[] = [
  {
    id: "hospital-system",
    client: "ENT Foundation Hospital",
    title: "HOSPITAL MANAGEMENT SYSTEM",
    categoryLabel: "Softwares",
    caseStudyUrl: "/work/case-study/arbree-analytics",
    mockupType: "hospital-monitor",
    // ছবি পরিবর্তন করতে:
    coverImage: "/sliders/work-softwares/01_DASHBOARD 1.png",
  },
];
```

---

## 💡 ৪. আপনার দ্রুত ব্যবহারের চেকলিস্ট (Quick Workflow)

1. **ইমেজ যোগ করা:**
   - যে সেকশনের জন্য ছবি অ্যাড করবেন, সরাসরি `public/sliders/<ওই-সেকশন-নাম>/` ফোল্ডারে ছবি পেস্ট করুন।
2. **অবজেক্টে লিংক আপডেট করা:**
   - [`src/data/sliders.ts`](file:///d:/SiSir/project-portfolio/src/data/sliders.ts) ফাইলে গিয়ে ছবির নাম ও টেক্সট আপডেট বা নতুন আইটেম অ্যাড/ডিলিট করুন।
3. **টেস্টিং ও ভ্যালিডেশন:**
   - ব্রাউজারে চেক করার জন্য: `npm run dev`
   - স্ট্যাটিক এক্সপোর্ট বিল্ড চেক করতে: `npm run build`
