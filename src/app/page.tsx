import React from 'react';
import type { Metadata } from 'next';
import Sidebar from '@/components/layout/Sidebar';
import HeroHeader from '@/components/sections/HeroHeader';
import AboutSection from '@/components/sections/AboutSection';
import FeaturedWorkSection from '@/components/sections/FeaturedWorkSection';
import BlogsSection from '@/components/sections/BlogsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: "Sejuti Mehjabin | Multidisciplinary UX & UI Designer",
  description: "Portfolio of Sejuti Mehjabin — crafting digital products from concept to launch with 9+ years experience and 60+ projects.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col text-[var(--ink)]">
      <div className="w-full max-w-[1440px] mx-auto flex-1 relative">
        <Sidebar />

        <main className="w-full lg:pl-[var(--sidebar-w)] pt-14 lg:pt-0 pb-16 lg:pb-0">
          <HeroHeader />
          <AboutSection />
          <FeaturedWorkSection />
          <BlogsSection />
          <ContactSection />
        </main>
      </div>

      <Footer />
    </div>
  );
}
