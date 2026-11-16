import React from "react";
import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import ContactPageView from "@/components/sections/ContactPageView";

export const metadata: Metadata = {
  title: "Contact | Sejuti Mehjabin",
  description:
    "Let’s collaborate. Reach out to Sejuti Mehjabin for UX & UI design projects, freelance assignments, and creative collaborations.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Sejuti Mehjabin",
    description:
      "Let’s collaborate. Reach out to Sejuti Mehjabin for UX & UI design projects, freelance assignments, and creative collaborations.",
    url: "https://sejutimehjabin.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Sejuti Mehjabin",
    description:
      "Let’s collaborate. Reach out to Sejuti Mehjabin for UX & UI design projects, freelance assignments, and creative collaborations.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col text-[var(--ink)]">
      <div className="w-full max-w-[1440px] mx-auto flex-1 relative">
        <Sidebar defaultActive="contact" />

        <main className="w-full lg:pl-[var(--sidebar-w)] pt-14 lg:pt-0 pb-16 lg:pb-0">
          <ContactPageView />
        </main>
      </div>

      <Footer />
    </div>
  );
}
