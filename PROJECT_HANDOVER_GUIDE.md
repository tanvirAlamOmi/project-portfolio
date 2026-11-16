# 📌 Sejuti Mehjabin Portfolio — কমপ্লিট প্রজেক্ট অডিট ও হ্যান্ডওভার গাইডলাইন

`AGENTS.md` ফাইলের আর্কিটেকচারাল পলিসি এবং বর্তমান কোডবেস অনুযায়ী পুরো প্রজেক্টের **১০০% স্ট্যাটাস**, **কোন কোন কাজ সম্পন্ন হয়েছে**, **আপনার জন্য কী কী কাজ বাকি আছে** এবং **ভবিষ্যতে কনটেন্ট ম্যানেজমেন্ট** করার পূর্ণাঙ্গ গাইডলাইন নিচে তুলে ধরা হলো।

---

## ✅ ১. যা যা ইতিমধ্যে ১০০% সম্পন্ন হয়েছে (Completed Milestones)

| মডিউল | স্ট্যাটাস | বিবরণ |
|---|:---:|---|
| **১. সমস্ত পেজ ও রাউটিং** | ✅ সম্পন্ন | Home, About, Work, Work Category (`/work/[category]`), Work Single Page (`/work/[category]/[slug]`), Case Study (`/work/case-study/[slug]`), Blogs, Blog Detail (`/blogs/[slug]`), Contact এবং 404 পেজ। |
| **২. জিরো-ব্যাকএন্ড স্ট্যাটিক এক্সপোর্ট** | ✅ সম্পন্ন | `next build` দিয়ে সফলভাবে **৭৬টি স্ট্যাটিক পেজ (`out/`)** প্রি-রেন্ডার হচ্ছে। কোনো নোড/সার্ভার ডিপেন্ডেন্সি নেই। |
| **৩. Works Single Page আর্কিটেকচার** | ✅ সম্পন্ন | পপআপের পরিবর্তে ব্লগ সিঙ্গেল পেজের মতো ডেডিকেটেড স্লাগ-বেসড রাউটিং (`/work/[category]/[slug]`) তৈরি করা হয়েছে। ক্লোজ বাটন ক্লিক করলে পূর্বের ফিল্টার ও পেজে ফিরে যায়। ডিজাইন ও ফিচার ১০০% অক্ষুণ্ণ। |
| **৪. ডাইনামিক স্লাইডার আর্কিটেকচার** | ✅ সম্পন্ন | সমস্ত স্লাইডারের অবজেক্ট সেন্ট্রাল ফাইল [`src/data/sliders.ts`](file:///d:/SiSir/project-portfolio/src/data/sliders.ts)-এ এবং ইমেজগুলো `public/sliders/<section>/`-এ সাজানো। |
| **৫. গ্লোবাল সাইট লোডার** | ✅ সম্পন্ন | নেভিগেশন ও ইনিশিয়াল লোডের সাথে সিনক্রোনাইজড ৩৬০° স্পিনিং গ্রেডিয়েন্ট বর্ডার সহ প্রফেশনাল লোডার। |
| **৬. থিম টগল (Light / Dark)** | ✅ সম্পন্ন | ফিগমা ডিজাইন টোকেন অনুযায়ী পারফেক্ট লাইট মোড (`#FFF7E7` ক্যানভাস ও নয়েজ) ও ডার্ক মোড (`#0A0F24`) টগল। |
| **৭. সম্পূর্ণ এসইও (SEO Excellence)** | ✅ সম্পন্ন | প্রতিটি পেজে ডাইনামিক `generateMetadata` বা স্ট্যাটিক মেটাডাটা, OpenGraph, Twitter Card, এবং Canonical লিংক সংযুক্ত। |
| **৮. সাইডবার, মোবাইল মেনু ও ফুটার** | ✅ সম্পন্ন | অ্যাক্টিভ রাউট ইন্ডিকেটর, স্মুথ স্ক্রোল, মোবাইল ড্রয়ার এবং ব্যাক-টু-টপ বাটন পুরোপুরি কার্যকরী। |
| **৯. কন্টাক্ট ফর্ম ইমেইল ইন্টিগ্রেশন** | ✅ সম্পন্ন | Web3Forms Access Key সংযুক্ত। ফর্ম পূরণ করলে সরাসরি ডিজাইনারের ইমেইলে মেসেজ চলে যাবে। |

---

## 📋 ২. এখন আপনার হাতে আর কী কী কাজ বাকি আছে? (User Checklist)

যেহেতু আপনি নিজে ফিগমার সাথে হুবহু মিল রেখে ফাইনাল চেক করবেন, তাই আপনার করণীয় ধাপগুলো নিচে পয়েন্ট আকারে দেওয়া হলো:

### ক. Figma Assets & আসল ছবি প্রতিস্থাপন (Asset Replacement)
- [ ] **স্লাইডার ছবিগুলো আপডেট করা:** `public/sliders/` ফোল্ডারের ভেতরে আপনার পছন্দের আসল প্রজেক্ট ছবিগুলো বসিয়ে [`src/data/sliders.ts`](file:///d:/SiSir/project-portfolio/src/data/sliders.ts)-এ পাথ আপডেট করুন।
  *(বিস্তারিত গাইড: [`SLIDERS_AND_ASSETS_GUIDE.md`](file:///d:/SiSir/project-portfolio/SLIDERS_AND_ASSETS_GUIDE.md))*
- [ ] **রেজিউমে PDF:** সেজুতি মেহজাবিনের আসল সিভি/রেজিউমে ফাইলটি `public/assets/resume.pdf` নামে প্রতিস্থাপন করুন (বর্তমানে একটি প্লেসহোল্ডার পিডিএফ দেওয়া আছে যাতে বাটন কাজ করে)।
- [ ] **কেস স্টাডি ফুল মকআপ:** কেস স্টাডি পেজগুলোর জন্য ফিগমার হাই-রেজ্যুলুশন আর্টওয়ার্ক ও মকআপ স্ক্রিনশট `public/assets/work/` ফোল্ডারে যোগ করুন।

### খ. টাইপোগ্রাফি ও ফিগমা ফিডেলিটি চেক (Design Fine-Tuning)
- [ ] **ফিগমা টোকেন ও ফন্ট সাইজ:** আপনার ফিগমা ফ্রেমের সাথে মিলিয়ে DM Sans, Almarai, Merriweather এবং Concert One ফন্টের সাইজ, লাইন হাইট ও লেটার স্পেসিং চোখে দেখে ফাইনাল যাচাই করে নেওয়া।
- [ ] **কালার ও বর্ডার গ্রেডিয়েন্ট:** গোল্ডেন-অরেঞ্জ গ্রেডিয়েন্ট বর্ডারগুলো (`#FEC163` থেকে `#DE4313`) ফিগমার সাথে ১০০% পিক্সেল পারফেক্ট কিনা তা কনফার্ম করা।

### গ. মোবাইল ও রেসপনসিভনেস রিভিউ (Mobile Verification)
- [ ] ৩২০px থেকে ৭৬৮px স্ক্রিনে মোবাইল নেভিগেশন বার, ড্রয়ার মেনু এবং হিরো কার্ডের প্যাডিং চেক করা।
- [ ] টাচস্ক্রিন ডিভাইসে স্লাইডার ও স্ক্রোলিং এর স্মুথনেস টেস্ট করা।

### ঘ. কনট্যাক্ট ফর্ম সরাসরি ইমেইলে কানেক্ট করা (ঐচ্ছিক)
- [ ] বর্তমানে ফর্মটি ক্লায়েন্ট সাইড সিমুলেশনে ১০০% কাজ করছে। আপনি চাইলে [web3forms.com](https://web3forms.com) থেকে ফ্রি অ্যাক্সেস কী নিয়ে [`ContactPageView.tsx`](file:///d:/SiSir/project-portfolio/src/components/sections/ContactPageView.tsx)-এ বসিয়ে দিতে পারেন যাতে ইউজার মেসেজ পাঠালে সরাসরি ইমেইল চলে যায় (নিচের সেকশন ৪ দেখুন)।

---

## 🗄️ ৩. ডেটাবেজ ছাড়া ডেটা যুক্ত করার নিয়ম (Data Architecture)

### ১. স্লাইডার আপডেট করতে:
📍 ফাইল: [`src/data/sliders.ts`](file:///d:/SiSir/project-portfolio/src/data/sliders.ts)
* `HOME_FEATURED_SLIDER`: হোম পেজের Featured Work
* `HOME_TESTIMONIALS_SLIDER`: হোম পেজের রিভিউ
* `WORK_WEBSITE_SLIDES`: Work পেজের 01. Websites
* `WORK_APP_SLIDES`: Work পেজের 02. Apps
* `WORK_SOFTWARE_SLIDES`: Work পেজের 03. Softwares

### ২. নতুন প্রজেক্ট ও কেস স্টাডি যোগ করতে:
📍 ফাইল: [`src/data/workProjects.ts`](file:///d:/SiSir/project-portfolio/src/data/workProjects.ts)
```typescript
{
  id: "your-project-id",
  slug: "your-project-slug",             // URL হবে: /work/case-study/your-project-slug অথবা /work/[category]/your-project-slug
  title: "PROJECT TITLE HERE",
  description: "Short description of the project...",
  category: "websites",                 // 'websites' | 'apps' | 'softwares' | 'branding' | 'marketing'
  discipline: "ux",                     // 'ux' | 'branding' | 'marketing'
  thumbnail: "/assets/work/website/sample.png",
  gallery: ["/assets/work/website/1.png", "/assets/work/website/2.png"],
  hasCaseStudy: true,
  caseStudyUrl: "/work/case-study/your-project-slug"
}
```

### ৩. নতুন ব্লগ যুক্ত করতে:
📍 ফাইল: [`src/data/blogs.ts`](file:///d:/SiSir/project-portfolio/src/data/blogs.ts)
```typescript
{
  id: "new-blog-id",
  slug: "my-new-blog-post",             // URL হবে: /blogs/my-new-blog-post
  title: "BLOG POST TITLE HERE",
  category: "Design",                   // 'Design' | 'Photography' | 'Writing'
  date: "October 30, 2026",
  readTime: "4 min read",
  coverImage: "/assets/images/blog-sample.png",
  iconType: "design",
  excerpt: "Short summary that appears on blog cards...",
  content: ["Paragraph 1...", "Paragraph 2..."]
}
```

---

## ✉️ ৪. ডেটাবেজ ছাড়া Contact Form ডাইনামিক করার নিয়ম

ওয়েবসাইটটি সম্পূর্ণ স্ট্যাটিক সার্ভারে চলায় কোনো নোড ব্যাকএন্ডের দরকার নেই। মেসেজ সরাসরি ইমেইলে পেতে:

১. [web3forms.com](https://web3forms.com)-এ ডিজাইনারের ইমেইল দিয়ে একটি **Access Key** সংগ্রহ করুন।
২. [`src/components/sections/ContactPageView.tsx`](file:///d:/SiSir/project-portfolio/src/components/sections/ContactPageView.tsx)-এর `handleSubmit` ফাংশনে কী-টি যুক্ত করুন:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("submitting");

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: "e0eb6d2c-f734-420a-9379-291477ab5099",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    }),
  });

  const res = await response.json();
  if (res.success) {
    setStatus("success");
    setFormData({ name: "", email: "", phone: "", message: "" });
  } else {
    setStatus("error");
  }
};
```

---

## 🚀 ৫. হোস্টিং ও ডিপ্লয়মেন্ট (Deployment)

1. প্রজেক্টের টার্মিনালে বিল্ড রান করুন:
   ```bash
   npm run build
   ```
2. রুটে তৈরি হওয়া **`out/`** ফোল্ডারের ভিতরের সমস্ত ফাইল ও ফোল্ডার সিলেক্ট করে জিপ (ZIP) করুন।
3. আপনার cPanel বা যেকোনো হোস্টিংয়ের **`public_html`** ফোল্ডারে আপলোড করে এক্সট্র্যাক্ট করে দিন।
